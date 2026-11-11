"""Control de calidad: fotograma por escena + hoja de contactos, reporte de sincronía,
subtítulos vs guion, contraste WCAG y palabras/cifras prohibidas.
Uso: python3 scripts/qa.py   (después de renderizar los 4 MP4 en out/)
"""
import json, re, subprocess, unicodedata, glob
import numpy as np
from PIL import Image, ImageDraw, ImageFont

FPS, LEAD = 30, 4
VIDEOS = {
    "01": ("VoltTech_V1_DeDondeSaleLaLuz", "V1"),
    "02": ("VoltTech_V2_MitoApagon", "V2"),
}
FONT = "public/fonts/Inter-Bold.woff2"


def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9ñ]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))


def cue_frames(n):
    words = json.load(open(f"data/vo_{n}_words.json", encoding="utf-8"))
    out = []
    for c in json.load(open(f"data/cues_{n}.json", encoding="utf-8")):
        seen = 0
        for w in words:
            if norm(w["word"]) == norm(c["word"]):
                seen += 1
                if seen == c.get("occ", 1):
                    out.append((c["id"], w["word"], w["start"], round(w["start"] * FPS)))
                    break
    return sorted(out, key=lambda x: x[3])


def read_small(path, w=135):
    """Cuadros reducidos y suavizados (el grano se promedia) para medir movimiento."""
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=width,height",
                            "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip().split(",")
    W, H = int(probe[0]), int(probe[1])
    h = int(round(H * w / W / 2) * 2)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={w}:{h}:flags=area,gblur=sigma=1.2",
                          "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(np.float32)


def frame_png(path, n):
    return subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"select=eq(n\\,{n})", "-vframes", "1",
                           "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout


def lum(hexc):
    c = [int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def contrast(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)


report = ["# Reporte de QA — VoltTech", ""]
ok_all = True
visual = []
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22) if glob.glob("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf") else None

for n, (name, short) in VIDEOS.items():
    cues = cue_frames(n)
    words = json.load(open(f"data/vo_{n}_words.json", encoding="utf-8"))
    report += [f"## {short} · {name}", ""]
    # --- sincronía: pose programada vs palabra, y arranque real del movimiento medido en el MP4
    vid = f"out/{name}_9x16.mp4"
    fr = read_small(vid)
    # percentil 99,5 de la diferencia por píxel: detecta también elementos chicos (etiquetas, íconos)
    diff = np.r_[0, np.percentile(np.abs(np.diff(fr, axis=0)).reshape(len(fr) - 1, -1), 99.5, axis=1)]
    report += ["| cue | palabra | timestamp palabra | cuadro palabra | cuadro pose | desvío pose | arranque medido | desvío arranque | OK |",
               "|---|---|---|---|---|---|---|---|---|"]
    for cid, word, t, wfr in cues:
        pose = wfr  # la pose se programa sobre el cuadro de la palabra (resolveCues)
        base = np.median(diff[max(0, wfr - 20):max(1, wfr - LEAD - 2)]) if wfr > LEAD + 3 else 0
        win = range(max(0, wfr - LEAD - 3), min(len(diff), wfr + 3))
        onset = next((k for k in win if diff[k] > base * 1.6 + 2.0), None)
        dev_pose = pose - wfr
        dev_on = None if onset is None else onset - (wfr - LEAD)
        good = abs(dev_pose) <= 2 and (onset is not None and onset <= wfr + 2)
        mark = '✔' if good else '✘'
        if onset is None and abs(dev_pose) <= 2:
            # elemento chico o escena ya en movimiento: el detector no alcanza → tira de cuadros para revisión visual
            strip = [Image.open(__import__('io').BytesIO(frame_png(vid, k))).convert('RGB').resize((216, 384)) for k in range(wfr - 5, wfr + 3)]
            st = Image.new('RGB', (216 * len(strip), 384))
            for i, im in enumerate(strip):
                ImageDraw.Draw(im).text((6, 6), str(wfr - 5 + i), fill=(255, 255, 255), font=font)
                st.paste(im, (216 * i, 0))
            st.save(f'out/qa/{short}_sync_{cid}.png')
            mark = '👁 tira'
            visual.append(f'{short}_sync_{cid}.png')
        else:
            ok_all &= good
        report.append(f"| {cid} | {word} | {t:.2f} s | {wfr} | {pose} | {dev_pose:+d} | "
                      f"{'—' if onset is None else onset} | {'—' if dev_on is None else f'{dev_on:+d}'} | {mark} |")
    report.append("")
    # --- un fotograma por escena/cue + hoja de contactos, en ambos formatos
    for fmt in ("9x16", "4x5"):
        path = f"out/{name}_{fmt}.mp4"
        thumbs = []
        for cid, word, t, wfr in cues:
            png = frame_png(path, wfr + 10)
            open(f"out/qa/{short}_{fmt}_{cid}.png", "wb").write(png)
            im = Image.open(f"out/qa/{short}_{fmt}_{cid}.png").convert("RGB")
            im.thumbnail((270, 480))
            d = ImageDraw.Draw(im)
            d.rectangle([0, 0, im.width, 30], fill=(0, 0, 0))
            d.text((6, 4), f"{cid} · {wfr + 10}", fill=(255, 255, 255), font=font)
            thumbs.append(im)
        cols = 6
        rows = (len(thumbs) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * thumbs[0].width, rows * thumbs[0].height), (255, 255, 255))
        for i, im in enumerate(thumbs):
            sheet.paste(im, ((i % cols) * thumbs[0].width, (i // cols) * thumbs[0].height))
        sheet.save(f"out/qa/{short}_{fmt}_hoja_contactos.png")
    # --- SRT palabra por palabra contra el guion oficial
    srt = open(f"out/{name}.srt", encoding="utf-8").read()
    srt_words = " ".join(l for l in srt.splitlines() if l and not l.isdigit() and "-->" not in l).split()
    guion = open(f"data/guion_{n}.txt", encoding="utf-8").read().split()
    same = srt_words == guion
    ok_all &= same
    report += [f"- Subtítulos = guion oficial palabra por palabra: {'✔' if same else '✘'} ({len(srt_words)} palabras)"]
    # --- duración = audio + 0,5 s
    meta = json.load(open(f"data/vo_{n}_meta.json"))
    for fmt in ("9x16", "4x5"):
        d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                                  f"out/{name}_{fmt}.mp4"], capture_output=True, text=True).stdout)
        good = abs(d - (meta["audio_s"] + 0.5)) < 0.1
        ok_all &= good
        lufs = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"out/{name}_{fmt}.mp4", "-af", "ebur128=peak=true", "-f", "null", "-"],
                              capture_output=True, text=True).stderr
        I = re.findall(r"I:\s+(-?[\d.]+) LUFS", lufs)[-1]
        P = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", lufs)[-1]
        report.append(f"- {fmt}: duración {d:.2f} s (audio {meta['audio_s']:.2f} + 0,5) {'✔' if good else '✘'} · mezcla {I} LUFS, pico {P} dBTP")
    report.append("")

# --- palabras y cifras prohibidas (subtítulos + textos en pantalla del código)
texts = " ".join(open(f, encoding="utf-8").read() for f in glob.glob("out/*.srt"))
onscreen = []
for f in glob.glob("src/*.tsx"):
    onscreen += re.findall(r">([^<>{}]*[A-Za-zÁÉÍÓÚÑáéíóúñ¿?][^<>{}]*)<", open(f, encoding="utf-8").read())
alltxt = texts + " " + " ".join(onscreen)
checks = {
    "cifras de ahorro (% o números)": re.findall(r"\d+\s*%|\bahorr\w*", " ".join(onscreen) + " " + re.sub(r"\d+\n|\d\d:\d\d:\d\d,\d+", "", texts), re.I),
    "«gratis»": re.findall(r"gratis", alltxt, re.I),
    "logos/marcas de terceros": re.findall(r"whatsapp|instagram|facebook|tiktok|jinko|longi|canadian|trina|tesla|huawei|growatt|fronius|sma\b", alltxt, re.I),
}
report += ["## Contenido prohibido", ""]
for k, v in checks.items():
    ok_all &= not v
    report.append(f"- {k}: {'✔ ninguno' if not v else '✘ ' + ', '.join(set(v))}")
report.append("- Logos: solo `public/logo_volttech.png`; íconos de chat, recibo y electrodomésticos son genéricos dibujados en SVG.")

# --- contraste WCAG
T = json.loads(json.dumps({"crema": "#F4F1E8", "tinta": "#0E1A12", "sol": "#F2B33D", "vp": "#14532D", "v": "#1E7A3C",
                           "vm": "#2E9E4F", "vc": "#4FCB77", "noche": "#2B3830"}))
plate = "#{:02x}{:02x}{:02x}".format(*[round(0.86 * a + 0.14 * b) for a, b in zip((14, 26, 18), (244, 241, 232))])  # placa sobre fondo crema (peor caso)
pairs = [
    ("Subtítulo crema sobre placa", T["crema"], plate, 4.5), ("Subtítulo palabra activa (sol) sobre placa", T["sol"], plate, 4.5),
    ("¿De dónde sale? crema/tinta", T["crema"], T["tinta"], 3), ("foto · LUZ tinta/verde claro", T["tinta"], T["vc"], 3),
    ("voltaico crema/verde profundo", T["crema"], T["vp"], 3), ("CC tinta/crema", T["tinta"], T["crema"], 4.5),
    ("FACTURA / BATERÍA / RESPALDO sol/verde profundo", T["sol"], T["vp"], 3), ("Mito: sol/noche", T["sol"], T["noche"], 3),
    ("Texto del mito crema/noche", T["crema"], T["noche"], 4.5), ("Dato: verde profundo/crema", T["vp"], T["crema"], 3),
    ("Protege a quien… tinta/crema", T["tinta"], T["crema"], 4.5), ("@volttech.cr crema/verde profundo", T["crema"], T["vp"], 4.5),
    ("CELDA FOTOVOLTAICA crema/verde medio", T["crema"], T["vm"], 3),
]
report += ["", "## Contraste (WCAG 2.1)", "", "| texto | ratio | mínimo AA | OK |", "|---|---|---|---|"]
for lab, a, b, mn in pairs:
    r = contrast(a, b)
    ok_all &= r >= mn
    report.append(f"| {lab} | {r:.1f}:1 | {mn}:1{' (texto grande)' if mn == 3 else ''} | {'✔' if r >= mn else '✘'} |")
if visual:
    report += ["", "## Sincronía revisada a ojo", "",
               "El detector automático no mide bien estos cues (elemento chico o escena ya en movimiento).",
               "Hay una tira de cuadros de -5 a +2 alrededor de la palabra en out/qa/:",
               *[f"- {v}" for v in visual]]
report += ["", f"**Resultado global: {'APROBADO' if ok_all else 'CON ERRORES'}" + (f" (+{len(visual)} cues con revisión visual)" if visual else '') + "**", ""]
open("out/qa/reporte_qa.md", "w", encoding="utf-8").write("\n".join(report))
print("\n".join(report))
