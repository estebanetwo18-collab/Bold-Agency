#!/usr/bin/env python3
"""VolTech – música corporativa original y efectos de sonido, sintetizados aquí mismo.

Todo el audio se genera por síntesis (sin muestras de terceros), así que no tiene
derechos de autor de nadie más. Luego se mezcla con los videos ya renderizados.
Uso:  python3 audio.py            -> agrega audio a los 5 videos de salida/
"""
import json, os, subprocess, sys
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
ROOT = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(7)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def env_adsr(n, a=0.01, d=0.1, s=0.7, r=0.2, length=None):
    length = length or n / SR
    t = np.arange(n) / SR
    e = np.where(t < a, t / a, np.where(t < a + d, 1 - (1 - s) * (t - a) / d, s))
    rel = np.clip((t - (length - r)) / r, 0, 1)
    return e * (1 - rel)


def add(buf, sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= buf.shape[1] or i + len(sig) <= 0:
        return
    s = sig[max(0, -i):]
    i = max(0, i)
    n = min(len(s), buf.shape[1] - i)
    lg, rg = gain * np.sqrt(0.5 * (1 - pan)), gain * np.sqrt(0.5 * (1 + pan))
    buf[0, i:i + n] += s[:n] * lg
    buf[1, i:i + n] += s[:n] * rg


# ------------------------------------------------------------------ instrumentos
def saw_pad(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for det in (-0.12, 0.0, 0.11):
        f = freq * 2 ** (det / 12)
        for h in range(1, 9):
            out += np.sin(2 * np.pi * f * h * t + h * det) / h ** 1.6
    return lp(out, 2600) * env_adsr(n, 0.35, 0.4, 0.8, 0.5)


def pluck(freq, dur=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = sum(np.sin(2 * np.pi * freq * h * t) * np.exp(-t * (5 + 3 * h)) / h for h in range(1, 6))
    return out * np.minimum(1, t / 0.004)


def bass(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(4 * np.pi * freq * t)
    return out * env_adsr(n, 0.005, 0.12, 0.6, 0.06)


def kick():
    n = int(0.4 * SR)
    t = np.arange(n) / SR
    f = 45 + 85 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)


def clap():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    nz = bp(rng.standard_normal(n), 900, 4200)
    e = sum(np.exp(-np.maximum(0, t - o) * 60) * (t >= o) for o in (0, 0.012, 0.024)) + np.exp(-t * 14) * 0.5
    return nz * e * 0.6


def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR)
    t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7000) * np.exp(-t * (18 if open_ else 70)) * 0.35


# ------------------------------------------------------------------ música
PROGS = {  # (raíz del bajo, notas del pad, notas del arpegio)
    "a": [(48, [60, 64, 67], [72, 76, 79, 76]), (43, [59, 62, 67], [71, 74, 79, 74]),
          (45, [60, 64, 69], [72, 76, 81, 76]), (41, [60, 65, 69], [72, 77, 81, 77])],
    "b": [(45, [57, 60, 64], [69, 72, 76, 72]), (41, [57, 60, 65], [69, 72, 77, 72]),
          (48, [55, 60, 64], [67, 72, 76, 72]), (43, [55, 59, 62], [67, 71, 74, 71])],
}


def music(dur, bpm=112, prog="a", intro_bars=2):
    buf = np.zeros((2, int((dur + 2) * SR)))
    beat = 60 / bpm
    bar = beat * 4
    chords = PROGS[prog]
    nbars = int(np.ceil(dur / bar)) + 1
    for b in range(nbars):
        t0 = b * bar
        root, pad, arp = chords[b % 4]
        full = b >= intro_bars
        for nt in pad:
            add(buf, saw_pad(midi(nt), bar + 0.5), t0, 0.055, pan=(nt % 3 - 1) * 0.4)
        for i in range(8):
            nt = arp[i % 4] + (12 if (i // 4) % 2 and b % 2 else 0)
            p = pluck(midi(nt))
            add(buf, p, t0 + i * beat / 2, 0.11, pan=-0.35)
            add(buf, p, t0 + i * beat / 2 + beat * 0.75, 0.05, pan=0.45)   # eco ping-pong
        if full:
            for i in range(8):
                add(buf, bass(midi(root), beat / 2 * 0.9), t0 + i * beat / 2, 0.22 if i % 2 else 0.14)
            for i in range(4):
                add(buf, kick(), t0 + i * beat, 0.55)
                if i in (1, 3):
                    add(buf, clap(), t0 + i * beat, 0.38)
                add(buf, hat(), t0 + i * beat + beat / 2, 0.28, pan=0.25)
                for j in (0.25, 0.75):
                    add(buf, hat(), t0 + i * beat + beat * j, 0.09, pan=-0.3)
            if b % 4 == 3:
                add(buf, hat(True), t0 + 3.5 * beat, 0.25)
    # bombeo tipo sidechain en el pad/arpegio (sutil, solo desde que entra el ritmo)
    t = np.arange(buf.shape[1]) / SR
    ph = (t % beat)
    pump = np.where(t > intro_bars * bar, 1 - 0.28 * np.exp(-ph * 9), 1)
    buf *= pump
    buf = buf[:, :int(dur * SR)]
    fade = np.clip((dur - np.arange(buf.shape[1]) / SR) / 2.0, 0, 1)
    buf *= fade
    return buf


# ------------------------------------------------------------------ efectos
def sfx_whoosh(d=0.75):
    n = int(d * SR)
    t = np.arange(n) / SR
    nz = rng.standard_normal(n)
    lo, hi = bp(nz, 250, 1400), bp(nz, 1800, 9000)
    u = np.sin(np.pi * np.clip(t / d, 0, 1))
    return (lo * (1 - u) + hi * u * 0.8) * u ** 1.5 * 0.8


def sfx_pop(f0=880):
    n = int(0.16 * SR)
    t = np.arange(n) / SR
    f = f0 * (1 + 0.6 * np.exp(-t * 40))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26) * 0.8


def sfx_ding():
    n = int(1.1 * SR)
    t = np.arange(n) / SR
    out = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * k) for f, a, k in
              ((1318.5, 1, 4), (1975.5, 0.5, 5), (2637, 0.25, 7), (659.3, 0.3, 3)))
    return out * np.minimum(1, t / 0.003) * 0.5


def sfx_tick():
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 3000) * np.exp(-t * 200) * 0.5


def sfx_chime():
    out = np.zeros(int(1.8 * SR))
    for i, nt in enumerate((72, 76, 79, 84)):
        p = sfx_ding() if i == 3 else pluck(midi(nt), 1.2) * 0.6
        s = int(i * 0.09 * SR)
        out[s:s + len(p)] += p[:len(out) - s]
    return out


def sfx_rise(d=0.6):
    n = int(d * SR)
    t = np.arange(n) / SR
    f = 300 + 900 * (t / d) ** 2
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) * np.exp(-np.maximum(0, t - d * 0.8) * 30) * 0.25


def render_sfx(buf, events):
    for t, kind in events:
        if kind == "whoosh":
            add(buf, sfx_whoosh(), t - 0.35, 0.38)
        elif kind == "pop":
            add(buf, sfx_pop(880), t, 0.35, pan=0.15)
        elif kind == "pop_lo":
            add(buf, sfx_pop(560), t, 0.4, pan=-0.15)
        elif kind == "ding":
            add(buf, sfx_ding(), t, 0.4)
        elif kind == "chime":
            add(buf, sfx_chime(), t, 0.45)
        elif kind == "rise":
            add(buf, sfx_rise(), t - 0.3, 0.5)
        elif kind.startswith("count:"):
            d = float(kind.split(":")[1])
            for k in range(int(d / 0.06)):
                add(buf, sfx_tick(), t + k * 0.06, 0.25 * (1 - k * 0.06 / d))
            add(buf, sfx_ding(), t + d, 0.4)


def write_wav(path, buf):
    import wave
    x = np.clip(buf, -1, 1)
    pcm = (x.T * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def mix_into(video, events, dur, prog, bpm, out):
    m = music(dur, bpm=bpm, prog=prog)
    s = np.zeros_like(m)
    render_sfx(s, events)
    mixbuf = m * 0.9 + s
    tmp = out + ".wav"
    write_wav(tmp, mixbuf / max(1.0, np.abs(mixbuf).max() * 1.05))
    m1 = subprocess.run(["ffmpeg", "-hide_banner", "-i", tmp, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json",
                         "-f", "null", "-"], capture_output=True, text=True).stderr
    j = json.loads(m1[m1.rindex("{"):m1.rindex("}") + 1])
    ln = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
          f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}")
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-i", tmp, "-map", "0:v", "-map", "1:a",
                        "-c:v", "copy", "-af", ln + ",aresample=48000,alimiter=limit=0.84:attack=1:release=50:level=false", "-c:a", "aac", "-b:a", "192k", "-shortest",
                        "-movflags", "+faststart", out], capture_output=True, text=True)
    os.remove(tmp)
    if r.returncode:
        sys.exit(r.stderr[-1500:])


# ------------------------------------------------------------------ eventos por video
def eventos_paneles():
    import build as B
    g = B.GUION
    ev = [(0.15, "rise"), (g["hook"]["alerta"][2], "pop_lo"), (g["hook"]["nota"][1], "pop")]
    for k in ("paso1", "paso2", "paso3", "cta"):
        ev.append((g[k]["t"][0], "whoosh"))
    for k in ("paso1", "paso2"):
        ev += [(g[k]["t"][0] + 0.2, "pop")]
    ev += [(tr - 0.1, "pop") for _, _, tr in g["paso1"]["filas"]]
    ev.append((g["paso1"]["total"][1] + 0.2, "count:1.6"))
    ev += [(g["paso2"]["sol"][2], "pop"), (g["paso2"]["panel"][2], "pop"),
           (g["paso2"]["resultado"][2] + 0.2, "count:1.4")]
    te = g["paso3"]["ecuacion"][1]
    ev += [(te + i * 0.28 + (0.6 if i == 4 else 0), "pop") for i in range(5)]
    tm = g["paso3"]["minimo"][1]
    ev += [(tm, "pop_lo"), (tm + 0.35, "pop"), (tm + 0.55, "pop"), (g["paso3"]["ideal"][2], "ding")]
    ev += [(g["cta"]["card"][2], "pop_lo"), (g["cta"]["sigue"][1], "chime")]
    return ev


def eventos_tema(tema):
    ev = []
    for i, sc in enumerate(tema["escenas"]):
        if i:
            ev.append((sc.t0, "whoosh"))
        for el in sc.els:
            k = el.kind
            if k == "title":
                if i == 0:
                    ev.append((el.t, "rise"))
            elif k in ("chip", "row", "card", "foto", "flow"):
                ev.append((el.t, "pop" if k != "card" else "pop_lo"))
            elif k == "count":
                ev.append((el.t + 0.15, f"count:{el.kw.get('cuenta', 1.5)}"))
            elif k == "timeline":
                ev.append((el.t + el.kw.get("cuenta", 2.0), "ding"))
            elif k in ("cta", "phone"):
                ev.append((el.t, "pop_lo"))
            elif k == "logo":
                ev.append((el.t, "chime"))
    return ev


def main():
    sys.path.insert(0, ROOT)
    import temas as TM
    sal = os.path.join(ROOT, "salida")
    jobs = [("VolTech_CuantosPaneles_9x16.mp4", eventos_paneles(), 49.5, "a", 112)]
    for name, prog, bpm in (("ahorro", "b", 108), ("apagon", "a", 104), ("duracion", "b", 112), ("electricas", "a", 116)):
        tema = TM.TEMAS[name]()
        jobs.append((tema["archivo"], eventos_tema(tema), tema["dur"], prog, bpm))
    os.makedirs(os.path.join(sal, "con_audio"), exist_ok=True)
    for f, ev, dur, prog, bpm in jobs:
        out = os.path.join(sal, "con_audio", f)
        mix_into(os.path.join(sal, f), ev, dur, prog, bpm, out)
        print("Listo:", out, flush=True)


if __name__ == "__main__":
    main()
