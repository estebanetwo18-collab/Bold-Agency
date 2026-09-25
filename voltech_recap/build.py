#!/usr/bin/env python3
"""VolTech – video recap vertical 9:16.

Todo lo editable vive en config.json (planos, textos, colores, tiempos, audio).
Uso:  python3 build.py            -> render completo
      python3 build.py --preview  -> render rápido a 540x960 para revisar
Requiere: ffmpeg (con libass), Python 3 + Pillow.
"""
import hashlib, json, math, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(ROOT, "config.json"), encoding="utf-8"))
CACHE = os.path.join(ROOT, ".cache")
os.makedirs(CACHE, exist_ok=True)
W, H, FPS = CFG["salida"]["ancho"], CFG["salida"]["alto"], CFG["salida"]["fps"]
B = CFG["marca"]
T = CFG["transicion_duracion"]
P = lambda p: os.path.join(ROOT, p)


def hexrgb(h, a=255):
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)


FOREST, FOREST2, GREEN, MINT, WHITE = (hexrgb(B[k]) for k in ("bosque", "bosque_2", "verde", "mint", "blanco"))


def font(key, size):
    return ImageFont.truetype(P(B[key]), size)


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode:
        sys.exit(f"\nFALLÓ: {' '.join(map(str, cmd))[:600]}\n{r.stderr[-2500:]}")
    return r


def dur_of(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).stdout)


def key(*parts):
    return hashlib.md5(json.dumps(parts, sort_keys=True).encode()).hexdigest()[:12]


def ease(p):
    p = max(0.0, min(1.0, p))
    return p * p * (3 - 2 * p)


def ease_out(p):
    p = max(0.0, min(1.0, p))
    return 1 - (1 - p) ** 3


# ---------------------------------------------------------------- gráficos de marca
def logo_img():
    im = Image.open(P(B["logo"])).convert("RGBA")
    return im.crop(im.getchannel("A").getbbox())


def diagonal_lines(size, spacing=58, width=2, alpha=16, offset=0.0):
    w, h = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    col = MINT[:3] + (alpha,)
    off = offset % spacing
    for x in range(-h, w + spacing, spacing):
        x0 = x + off
        d.line([(x0, h), (x0 + h, 0)], fill=col, width=width)
    return layer


def rotated_band(canvas, cx, cy, length, thick, angle, color, radius=None):
    """Banda redondeada en diagonal (forma curva de la marca)."""
    radius = radius if radius is not None else thick // 2
    band = Image.new("RGBA", (length, thick), (0, 0, 0, 0))
    ImageDraw.Draw(band).rounded_rectangle([0, 0, length - 1, thick - 1], radius=radius, fill=color)
    band = band.rotate(angle, expand=True, resample=Image.BICUBIC)
    canvas.alpha_composite(band, (int(cx - band.width / 2), int(cy - band.height / 2)))


def brand_bg(t=0.0, glow_y=0.45):
    bg = Image.new("RGBA", (W, H), FOREST)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-W * 0.3, H * glow_y - W * 0.7, W * 1.3, H * glow_y + W * 0.7], fill=FOREST2[:3] + (255,))
    bg.alpha_composite(glow.filter(ImageFilter.GaussianBlur(W * 0.18)))
    bg.alpha_composite(diagonal_lines((W, H), offset=t * 14))
    return bg


def text_spaced(draw, xy, text, fnt, fill, spacing=0, anchor_center=False):
    widths = [draw.textlength(c, font=fnt) for c in text]
    total = sum(widths) + spacing * (len(text) - 1)
    x, y = xy
    if anchor_center:
        x -= total / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=fnt, fill=fill)
        x += w + spacing
    return total


def fade_rgba(im, a):
    if a >= 1:
        return im
    im = im.copy()
    im.putalpha(im.getchannel("A").point(lambda v: int(v * max(0, a))))
    return im


def render_frames(path, n, draw_fn):
    if os.path.exists(path):
        return path
    tmp = path + ".tmp.mp4"
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "12", "-preset", "fast",
                          "-pix_fmt", "yuv420p", tmp], stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(draw_fn(i / FPS).convert("RGB").tobytes())
    p.stdin.close()
    if p.wait():
        sys.exit("FALLÓ render de gráficos: " + path)
    os.rename(tmp, path)
    return path


def intro_frame_fn(total):
    logo = logo_img()
    lw = 860
    logo = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    f_txt = font("fuente_texto", 38)
    txt = CFG["intro"]["texto"]

    def fn(t):
        im = brand_bg(t)
        # bandas diagonales que entran desde abajo-izquierda
        k = ease_out(t / 0.9)
        rotated_band(im, -260 + 520 * k, H * 0.86 - 260 * k, 1500, 230, 32, GREEN[:3] + (215,))
        rotated_band(im, -200 + 520 * k, H * 0.86 - 50 - 260 * k, 1500, 14, 32, MINT[:3] + (255,))
        k2 = ease_out((t - 0.15) / 0.9)
        rotated_band(im, W + 300 - 520 * k2, H * 0.12 + 200 * k2, 1300, 150, 32, GREEN[:3] + (120,))
        # logo
        a = ease((t - 0.25) / 0.7)
        s = 0.94 + 0.06 * ease_out((t - 0.25) / 0.9)
        lg = logo.resize((int(logo.width * s), int(logo.height * s)), Image.LANCZOS)
        im.alpha_composite(fade_rgba(lg, a), (int(W / 2 - lg.width / 2), int(H * 0.44 - lg.height / 2)))
        d = ImageDraw.Draw(im)
        # línea mint que se dibuja
        lk = ease_out((t - 0.9) / 0.5)
        if lk > 0:
            y = H * 0.44 + logo.height / 2 + 60
            d.rounded_rectangle([W / 2 - 150 * lk, y, W / 2 + 150 * lk, y + 6], radius=3, fill=MINT)
        ta = ease((t - 1.15) / 0.5)
        if ta > 0:
            layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            text_spaced(ImageDraw.Draw(layer), (W / 2, H * 0.44 + logo.height / 2 + 100 + 20 * (1 - ta)), txt, f_txt,
                        WHITE, spacing=6, anchor_center=True)
            im.alpha_composite(fade_rgba(layer, ta))
        return im
    return fn


def outro_frame_fn(total):
    logo = logo_img()
    lw = 760
    logo = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    o = CFG["outro"]
    f_q = font("fuente_texto", 50)
    f_cta = font("fuente_titulo", 82)
    f_tel = font("fuente_titulo", 58)

    def wrap(text, fnt, maxw, d):
        words, lines, cur = text.split(), [], ""
        for w in words:
            test = (cur + " " + w).strip()
            if d.textlength(test, font=fnt) > maxw and cur:
                lines.append(cur); cur = w
            else:
                cur = test
        return lines + [cur]

    def fn(t):
        im = brand_bg(t, glow_y=0.4)
        k = ease_out(t / 0.9)
        rotated_band(im, W + 260 - 520 * k, H * 1.02 - 200 * k, 1500, 230, -32, GREEN[:3] + (215,))
        rotated_band(im, W + 200 - 520 * k, H * 1.02 - 50 - 200 * k, 1500, 14, -32, MINT[:3] + (255,))
        a = ease((t - 0.2) / 0.6)
        im.alpha_composite(fade_rgba(logo, a), (int(W / 2 - logo.width / 2), int(H * 0.30 - logo.height / 2)))
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        y = H * 0.30 + logo.height / 2 + 110
        for ln in wrap(o["pregunta"], f_q, W - 200, d):
            d.text((W / 2, y), ln, font=f_q, fill=WHITE, anchor="mt")
            y += 70
        im.alpha_composite(fade_rgba(layer, ease((t - 0.7) / 0.5)))
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        y += 50
        d.text((W / 2, y), o["cta"], font=f_cta, fill=MINT, anchor="mt")
        y += 140
        if o.get("telefono"):
            tw = d.textlength(o["telefono"], font=f_tel)
            d.rounded_rectangle([W / 2 - tw / 2 - 50, y, W / 2 + tw / 2 + 50, y + 110], radius=55, fill=WHITE)
            d.text((W / 2, y + 55), o["telefono"], font=f_tel, fill=FOREST, anchor="mm")
        im.alpha_composite(fade_rgba(layer, ease((t - 1.1) / 0.5)))
        return im
    return fn


FALLBACK = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
NO_GLYPH = set("₡")


def _fb(fnt):
    return ImageFont.truetype(FALLBACK, int(fnt.size * 0.92))


def text_len_fallback(d, text, fnt):
    return sum(d.textlength(ch, font=_fb(fnt) if ch in NO_GLYPH else fnt) for ch in text)


def draw_fallback(d, xy, text, fnt, fill):
    """Dibuja texto usando una fuente de respaldo para glifos que Poppins no trae (₡)."""
    x, y = xy
    asc = fnt.getmetrics()[0]
    for ch in text:
        f = _fb(fnt) if ch in NO_GLYPH else fnt
        d.text((x, y + asc), ch, font=f, fill=fill, anchor="ls")
        x += d.textlength(ch, font=f)


def card_png(c, path):
    f_label = font("fuente_label", 30 if not c.get("grande") else 34)
    f_val = font("fuente_titulo" if c.get("grande") else "fuente_texto", 118 if c.get("grande") else 56)
    f_sub = font("fuente_texto", 46)
    tmp = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    lw = sum(tmp.textlength(ch, font=f_label) for ch in c["label"]) + 4 * (len(c["label"]) - 1)
    vw = text_len_fallback(tmp, c["valor"], f_val)
    sw = tmp.textlength(c.get("sub", ""), font=f_sub) if c.get("sub") else 0
    pad_x, bar = 40, 10
    grande = c.get("grande")
    inner = max(lw, vw + (sw + 24 if grande and sw else 0))
    w = int(inner + pad_x * 2 + bar + 10)
    h = 250 if grande else 170
    im = Image.new("RGBA", (w + 20, h + 20), (0, 0, 0, 0))
    sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([10, 14, w + 8, h + 12], radius=30, fill=(0, 0, 0, 90))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8)))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([6, 6, w, h], radius=30, fill=FOREST[:3] + (232,))
    d.rounded_rectangle([6, 6, 6 + bar + 20, h], radius=30, fill=MINT)
    d.rectangle([6 + bar, 6, 6 + bar + 22, h], fill=FOREST[:3] + (232,))
    x = 6 + bar + pad_x
    text_spaced(d, (x, 30), c["label"], f_label, MINT, spacing=4)
    if grande:
        draw_fallback(d, (x, 70), c["valor"], f_val, WHITE)
        if sw:
            d.text((x + vw + 24, 70 + 118 * 0.62), c["sub"], font=f_sub, fill=MINT)
    else:
        d.text((x, 68), c["valor"], font=f_val, fill=WHITE)
    im.save(path)
    return im.size


def logo_bug(path):
    lg = logo_img()
    lw = 250
    lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
    im = Image.new("RGBA", (lw + 56, lg.height + 36), (0, 0, 0, 0))
    ImageDraw.Draw(im).rounded_rectangle([0, 0, im.width - 1, im.height - 1], radius=im.height // 2,
                                         fill=FOREST[:3] + (215,))
    im.alpha_composite(lg, (28, 18))
    im.save(path)


def accent_png(path):
    im = Image.new("RGBA", (260, 200), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for i, a in enumerate((230, 150, 90)):
        x = 60 + i * 34
        d.line([(x, 190), (x + 150, 40)], fill=MINT[:3] + (a,), width=4)
    im.save(path)


def marco_assets(bg_path, mask_path, box):
    x, y, w, h = box
    bg = brand_bg(0)
    rotated_band(bg, W * 0.9, H * 0.86, 1200, 170, 32, GREEN[:3] + (170,))
    rotated_band(bg, W * 0.1, H * 0.16, 1000, 12, 32, MINT[:3] + (200,))
    d = ImageDraw.Draw(bg)
    d.rounded_rectangle([x + 22, y + 22, x + w + 22, y + h + 22], radius=44, outline=MINT, width=4)
    bg.convert("RGB").save(bg_path)
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], radius=40, fill=255)
    m.save(mask_path)


# ---------------------------------------------------------------- segmentos
GRADE = "eq=saturation=1.06:contrast=1.03"
MOV = {
    "acercar":   ("1+0.12*E", "(iw-ow)/2", "(ih-oh)/2"),
    "alejar":    ("1.12-0.12*E", "(iw-ow)/2", "(ih-oh)/2"),
    "derecha":   ("1.12", "(iw-ow)*(0.2+0.6*E)", "(ih-oh)/2"),
    "izquierda": ("1.12", "(iw-ow)*(0.8-0.6*E)", "(ih-oh)/2"),
    "bajar":     ("1.12", "(iw-ow)/2", "(ih-oh)*(0.15+0.7*E)"),
    "subir":     ("1.12", "(iw-ow)/2", "(ih-oh)*(0.85-0.7*E)"),
}


def cover_resize(src, tw, th, out):
    if not os.path.exists(out):
        im = Image.open(src)
        from PIL import ImageOps
        im = ImageOps.exif_transpose(im).convert("RGB")
        s = max(tw / im.width, th / im.height) * 1.01
        im.resize((math.ceil(im.width * s), math.ceil(im.height * s)), Image.LANCZOS).save(out, quality=95)
    return out


def kb_filter(mov, L, cw, ch, iw):
    z, x, y = MOV[mov]
    e = f"(3*pow(t/{L},2)-2*pow(t/{L},3))"
    z, x, y = (s.replace("E", e) for s in (z, x, y))
    return (f"scale=w='trunc({iw}*({z})/2)*2':h=-2:eval=frame,"
            f"crop={cw}:{ch}:x='{x}':y='{y}'")


def seg_video(pl, L, out, pre=T / 2):
    t0 = max(0.0, pl["entrada"] - pre)
    e = f"(t/{L})"
    vf = (f"scale={2*W}:{2*H}:force_original_aspect_ratio=increase,crop={2*W}:{2*H},"
          f"scale=w='trunc({2*W}*(1.004+0.04*{e})/2)*2':h=-2:eval=frame,crop={2*W}:{2*H},"
          f"scale={W}:{H}:flags=lanczos,fps={FPS},{GRADE},format=yuv420p,setsar=1")
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t0}", "-i", P(pl["src"]), "-t", f"{L}", "-an", "-vf", vf,
         "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-r", str(FPS), out])


def seg_foto(pl, L, out, pre=0):
    pre = os.path.join(CACHE, key("cover", pl["src"], 2 * W, 2 * H) + ".jpg")
    cover_resize(P(pl["src"]), 2 * W, 2 * H, pre)
    iw = Image.open(pre).width
    vf = (kb_filter(pl.get("movimiento", "acercar"), L, 2 * W, 2 * H, iw) +
          f",scale={W}:{H}:flags=lanczos,{GRADE},format=yuv420p,setsar=1")
    run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{L}", "-i", pre,
         "-vf", vf, "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-r", str(FPS), out])


MARCO = (60, 560, 960, 720)


def seg_foto_marco(pl, L, out, pre=0):
    x, y, w, h = MARCO
    bgp, mp = os.path.join(CACHE, "marco_bg.png"), os.path.join(CACHE, "marco_mask.png")
    if not os.path.exists(bgp):
        marco_assets(bgp, mp, MARCO)
    pre = os.path.join(CACHE, key("cover", pl["src"], 2 * w, 2 * h) + ".jpg")
    cover_resize(P(pl["src"]), 2 * w, 2 * h, pre)
    iw = Image.open(pre).width
    fc = (f"[1:v]{kb_filter(pl.get('movimiento', 'derecha'), L, 2*w, 2*h, iw)},scale={w}:{h}:flags=lanczos,"
          f"{GRADE},format=rgba[p];[2:v]format=gray[m];[p][m]alphamerge[pm];"
          f"[0:v]format=rgba[b];[b][pm]overlay={x}:{y},format=yuv420p,setsar=1[v]")
    run(["ffmpeg", "-v", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-i", bgp,
         "-loop", "1", "-framerate", str(FPS), "-i", pre, "-loop", "1", "-framerate", str(FPS), "-i", mp,
         "-filter_complex", fc, "-map", "[v]", "-t", f"{L}", "-c:v", "libx264", "-crf", "12", "-preset", "fast",
         "-r", str(FPS), out])


INTRO_ON = CFG["intro"].get("activar", True)
OUTRO_ON = CFG["outro"].get("activar", True)


def margins(i):
    """Colchón antes/después de cada plano para la transición (0 en los extremos sin intro/cierre)."""
    n = len(CFG["planos"])
    pre = T / 2 if (i > 0 or INTRO_ON) else 0.0
    post = T / 2 if (i < n - 1 or OUTRO_ON) else 0.0
    return pre, post


def build_segments():
    planos = CFG["planos"]
    outro_start = planos[-1]["fin"]
    outro_len = CFG["outro"]["duracion"]
    segs = []
    if INTRO_ON:
        L = CFG["intro"]["fin"] + T / 2
        segs.append((render_frames(os.path.join(CACHE, key("intro", CFG["intro"], L, B) + ".mp4"),
                                   round(L * FPS), intro_frame_fn(L)), 0.0, "fade"))
    for i, pl in enumerate(planos):
        pre, post = margins(i)
        L = pl["fin"] - pl["inicio"] + pre + post
        out = os.path.join(CACHE, key("plano", pl, L, pre, T, GRADE, MOV) + ".mp4")
        if not os.path.exists(out):
            print(f"  plano {pl['id']} ({L:.2f}s)")
            {"video": seg_video, "foto": seg_foto, "foto_marco": seg_foto_marco}[pl["tipo"]](pl, L, out + ".mp4", pre)
            os.rename(out + ".mp4", out)
        segs.append((out, pl["inicio"] - pre, pl.get("transicion", "fade")))
    if not OUTRO_ON:
        return segs, outro_start
    L = outro_len + T / 2
    segs.append((render_frames(os.path.join(CACHE, key("outro", CFG["outro"], L, B) + ".mp4"),
                               round(L * FPS), outro_frame_fn(L)), outro_start - T / 2, "fade"))
    return segs, outro_start + outro_len


def xfade_chain(segs, out):
    args, fc, prev = [], [], "0:v"
    for i, (p, _, _) in enumerate(segs):
        args += ["-i", p]
    for i in range(1, len(segs)):
        _, off, tr = segs[i]
        lab = f"x{i}"
        fc.append(f"[{prev}][{i}:v]xfade=transition={tr}:duration={T}:offset={off:.3f}[{lab}]")
        prev = lab
    run(["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", ";".join(fc), "-map", f"[{prev}]",
         "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", out])


# ---------------------------------------------------------------- audio
def loudnorm_file(src, out, pre="", ss=None, t=None, tp=-2.0):
    target = CFG["salida"]["loudness_lufs"]
    inp = (["-ss", f"{ss}"] if ss is not None else []) + ["-i", src] + (["-t", f"{t}"] if t else [])
    chain = (pre + "," if pre else "")
    m = run(["ffmpeg", "-hide_banner", *inp, "-vn", "-af", chain + f"loudnorm=I={target}:TP={tp}:LRA=11:print_format=json",
             "-f", "null", "-"]).stderr
    j = json.loads(m[m.rindex("{"):m.rindex("}") + 1])
    ln = (f"loudnorm=I={target}:TP={tp}:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
          f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}")
    run(["ffmpeg", "-v", "error", "-y", *inp, "-vn", "-af", chain + ln + ",aresample=48000", "-ac", "2", out])


def build_audio(total, out):
    parts = []
    for i, pl in enumerate(CFG["planos"]):
        if pl["id"] in CFG["audio"]["clips_con_audio"]:
            pre, post = margins(i)
            ss = max(0.0, pl["entrada"] - pre)
            L = pl["fin"] - pl["inicio"] + pre + post
            f = os.path.join(CACHE, key("aud", pl, L) + ".wav")
            if not os.path.exists(f):
                loudnorm_file(P(pl["src"]), f, pre=f"highpass=f=90,afftdn=nf=-28,afade=t=in:d={0.25 if pre else 0.05},"
                              f"afade=t=out:st={L-0.35:.2f}:d=0.35", ss=ss, t=L)
            parts.append((f, pl["inicio"] - pre))
    vo = os.path.join(CACHE, key("vo", CFG["audio"]) + ".wav")
    if not os.path.exists(vo):
        loudnorm_file(P(CFG["audio"]["locucion"]), vo)
    parts.append((vo, CFG["audio"]["locucion_inicio"]))
    args, fc = [], []
    for i, (f, st) in enumerate(parts):
        args += ["-i", f]
        fc.append(f"[{i}:a]adelay={int(st*1000)}|{int(st*1000)}[a{i}]")
    fc.append("".join(f"[a{i}]" for i in range(len(parts))) +
              f"amix=inputs={len(parts)}:normalize=0:duration=longest,apad,atrim=0:{total:.3f},"
              f"aresample=48000[aout]")
    mix = out.replace(".wav", "_mix.wav")
    run(["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", ";".join(fc), "-map", "[aout]",
         "-ar", "48000", "-ac", "2", mix])
    loudnorm_file(mix, out, tp=-2.0)


# ---------------------------------------------------------------- subtítulos
def build_captions(path):
    tr = json.load(open(P("assets/transcripcion.json"), encoding="utf-8"))
    fix = CFG["subtitulos"]["correcciones"]
    words = []
    for pl in CFG["planos"]:
        if pl["id"] == "german":
            for s in tr["german"]:
                for a, b, w in s["w"]:
                    g = pl["inicio"] + a - pl["entrada"]
                    if pl["inicio"] <= g and g + 0.2 < pl["fin"]:
                        words.append((g, pl["inicio"] + b - pl["entrada"], w.strip()))
    off = CFG["audio"]["locucion_inicio"]
    for s in tr["vo"]:
        for a, b, w in s["w"]:
            words.append((off + a, off + b, w.strip()))
    words = [(a, b, fix.get(w.strip(".,"), w.strip(".,")) + w[len(w.rstrip(".,")):]) for a, b, w in words]
    mx, ms = CFG["subtitulos"]["max_palabras"], CFG["subtitulos"]["max_segundos"]
    chunks, cur = [], []
    for i, wd in enumerate(words):
        cur.append(wd)
        nxt = words[i + 1] if i + 1 < len(words) else None
        brk = (len(cur) >= mx or wd[1] - cur[0][0] >= ms or re.search(r"[.,?;:]$", wd[2])
               or (nxt and nxt[0] - wd[1] > 0.6))
        if brk or not nxt:
            chunks.append(cur); cur = []
    def ts(t):
        return f"{int(t//3600)}:{int(t%3600//60):02d}:{t%60:05.2f}"
    ev = []
    for i, c in enumerate(chunks):
        a = c[0][0] - 0.05
        b = c[-1][1] + 0.25
        if i + 1 < len(chunks):
            b = min(b, chunks[i + 1][0][0] - 0.06)
        txt = " ".join(w for _, _, w in c)
        txt = txt[0].upper() + txt[1:] if txt else txt
        ev.append(f"Dialogue: 0,{ts(a)},{ts(b)},Sub,,0,0,0,,{txt}")
    fr, fg, fb, _ = FOREST
    box = f"&H40{fb:02X}{fg:02X}{fr:02X}"
    head = ["[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "WrapStyle: 0",
            "ScaledBorderAndShadow: yes", "", "[V4+ Styles]",
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, "
            "Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, "
            "MarginR, MarginV, Encoding",
            f"Style: Sub,Poppins SemiBold,58,&H00FFFFFF,&H00FFFFFF,{box},{box},0,0,0,0,100,100,0,0,3,16,0,2,110,110,440,1",
            "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
    open(path, "w", encoding="utf-8").write("\n".join(head + ev) + "\n")
    srt = []
    for i, e in enumerate(ev, 1):
        _, a, b, *_r = e.split(",", 3)
        txt = e.split(",,0,0,0,,", 1)[1]
        cv = lambda s: "0" + s.replace(".", ",") + "0"
        srt.append(f"{i}\n{cv(a)} --> {cv(b)}\n{txt}\n")
    return "\n".join(srt)


# ---------------------------------------------------------------- final
def main():
    preview = "--preview" in sys.argv
    print("1/5 Segmentos (intro, planos, cierre)…")
    segs, total = build_segments()
    base = os.path.join(CACHE, "base.mp4")
    print("2/5 Transiciones…")
    xfade_chain(segs, base)
    print("3/5 Audio…")
    aud = os.path.join(CACHE, "audio.wav")
    build_audio(total, aud)
    print("4/5 Tarjetas y subtítulos…")
    ass = os.path.join(CACHE, "subs.ass")
    srt = build_captions(ass)
    bug, acc = os.path.join(CACHE, "logo_bug.png"), os.path.join(CACHE, "accent.png")
    logo_bug(bug); accent_png(acc)
    body0 = CFG["intro"]["fin"] if INTRO_ON else 0.0
    body1 = CFG["planos"][-1]["fin"]
    inputs = ["-i", base, "-i", aud, "-loop", "1", "-framerate", str(FPS), "-t", f"{total}", "-i", bug,
              "-loop", "1", "-framerate", str(FPS), "-t", f"{total}", "-i", acc]
    fl = [f"[2:v]format=rgba,fade=t=in:st={body0}:d=0.4:alpha=1,fade=t=out:st={body1-0.4}:d=0.4:alpha=1[bug]",
          f"[3:v]format=rgba,fade=t=in:st={body0}:d=0.4:alpha=1,fade=t=out:st={body1-0.4}:d=0.4:alpha=1[acc]",
          f"[0:v][bug]overlay=(W-w)/2:170:enable='between(t,{body0},{body1})'[v0]",
          f"[v0][acc]overlay={W-300}:{H-330}:enable='between(t,{body0},{body1})'[v1]"]
    prev, idx = "v1", 4
    for j, c in enumerate(CFG["tarjetas"]):
        cp = os.path.join(CACHE, f"card_{j}.png")
        cw, ch = card_png(c, cp)
        d = c["fin"] - c["inicio"]
        inputs += ["-loop", "1", "-framerate", str(FPS), "-t", f"{d}", "-i", cp]
        x0 = (W - cw) // 2 if c.get("grande") else 52
        y0 = c.get("y", 400 if not c.get("grande") else 420)
        t0 = c["inicio"]
        fl.append(f"[{idx}:v]format=rgba,fade=t=in:st=0:d=0.35:alpha=1,fade=t=out:st={d-0.35}:d=0.35:alpha=1,"
                  f"setpts=PTS-STARTPTS+{t0}/TB[c{j}]")
        fl.append(f"[{prev}][c{j}]overlay=x='{x0}-60*pow(max(0,1-(t-{t0})/0.5),3)':y={y0}:eof_action=pass:"
                  f"enable='between(t,{t0},{c['fin']})'[v{j+2}]")
        prev, idx = f"v{j+2}", idx + 1
    ff = CFG.get("fundido_final", 0) if not OUTRO_ON else 0
    fade_v = f",fade=t=out:st={total-ff:.3f}:d={ff}" if ff else ""
    fl.append(f"[{prev}]ass={ass}:fontsdir={P('assets/fonts')}{fade_v}" +
              (f",scale={W//2}:{H//2}" if preview else "") + "[vout]")
    out = P(CFG["salida"]["archivo"])
    if preview:
        out = out.replace(".mp4", "_preview.mp4")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    print("5/5 Render final…")
    run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(fl), "-map", "[vout]", "-map", "1:a",
         *(["-af", f"afade=t=out:st={total-ff:.3f}:d={ff}"] if ff else []),
         "-t", f"{total}", "-c:v", "libx264", "-preset", "veryfast" if preview else "slow", "-profile:v", "high",
         "-b:v", "3M" if preview else CFG["salida"]["bitrate_video"], "-maxrate", "16M", "-bufsize", "24M",
         "-pix_fmt", "yuv420p", "-r", str(FPS), "-colorspace", "bt709", "-color_primaries", "bt709",
         "-color_trc", "bt709", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", out])
    open(out.replace(".mp4", ".srt"), "w", encoding="utf-8").write(srt)
    print(f"Listo: {out}  ({total:.1f}s)")


if __name__ == "__main__":
    main()
