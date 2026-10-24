#!/usr/bin/env python3
"""Adora Nail Salon · Reel "Cejas Perfectas".

Todo lo editable está en config.json (planos, tiempos, textos, colores, fuentes, grade).
Uso:
  python3 build.py --preview        render rápido a 540x960 → salida/adora_cejas_reel_preview.mp4
  python3 build.py                  render final 1080x1920 → salida/adora_cejas_reel_final.mp4
  python3 build.py --textos         exporta cada texto animado como ProRes 4444 con alfa → salida/textos/
  python3 build.py --frames 0,1.2   guarda fotogramas sueltos para revisar → salida/frames/
Requiere ffmpeg, Python 3, numpy, Pillow y opencv-python-headless.
"""
import json, math, os, subprocess, sys
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(ROOT, "config.json"), encoding="utf-8"))
ARGS = sys.argv[1:]
K = 0.5 if "--preview" in ARGS else 1.0          # escala de resolución
W, H = int(CFG["salida"]["ancho"] * K), int(CFG["salida"]["alto"] * K)
FPS = CFG["salida"]["fps"]
P = lambda p: os.path.expanduser(p) if p.startswith("~") or p.startswith("/") else os.path.join(ROOT, p)
px = lambda v: int(round(v * K))


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


C = {k: hexrgb(v) for k, v in CFG["colores"].items()}
FONT = CFG["rutas"]["fuentes"]


def ease_out(p):
    p = min(1.0, max(0.0, p))
    return 1 - (1 - p) ** 3


def ease_io(p):
    p = min(1.0, max(0.0, p))
    return p * p * (3 - 2 * p)


# ------------------------------------------------------------------ grade
G = CFG["grade"]


def build_lut():
    x = np.arange(256) / 255.0
    x = (x - 0.5) * G["contraste"] + 0.5
    x = G["negros_mate"] + np.clip(x, 0, 1) * (1 - G["negros_mate"])
    hl = np.clip((x - 0.6) / 0.4, 0, 1) ** 2
    r = x * (1 + G["calidez"]) + G["rosa_altas_luces"] * hl
    g = x - 0.35 * G["rosa_altas_luces"] * hl
    b = x * (1 - G["calidez"] * 1.25) + 0.55 * G["rosa_altas_luces"] * hl
    return [np.clip(c * 255, 0, 255).astype(np.uint8) for c in (r, g, b)]


LUT = build_lut()
RNG = np.random.default_rng(3)


def grade(fr, gain):
    f = cv2.convertScaleAbs(fr, alpha=gain, beta=0)
    f = cv2.merge([cv2.LUT(f[:, :, i], LUT[i]) for i in range(3)])
    gray = cv2.cvtColor(f, cv2.COLOR_RGB2GRAY)[:, :, None].astype(np.float32)
    f = gray + G["saturacion"] * (f.astype(np.float32) - gray)
    if G["grano"] > 0:
        noise = RNG.normal(0, G["grano"], (f.shape[0] // 2, f.shape[1] // 2)).astype(np.float32)
        f += cv2.resize(noise, (f.shape[1], f.shape[0]), interpolation=cv2.INTER_LINEAR)[:, :, None]
    return np.clip(f, 0, 255).astype(np.uint8)


# ------------------------------------------------------------------ clips
def src_path(clip):
    d = P(CFG["rutas"]["clips"])
    for ext in (".MOV", ".mov"):
        if os.path.exists(os.path.join(d, clip + ext)):
            return os.path.join(d, clip + ext)
    sys.exit("No encuentro el clip " + clip)


def read_frames(clip, t0, t1):
    t0 = max(0.0, t0)
    cmd = ["ffmpeg", "-v", "error", "-ss", f"{t0:.3f}", "-i", src_path(clip), "-t", f"{t1 - t0:.3f}",
           "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS}",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    raw = subprocess.run(cmd, capture_output=True).stdout
    n = len(raw) // (W * H * 3)
    return np.frombuffer(raw[:n * W * H * 3], np.uint8).reshape(n, H, W, 3), t0


def ramp_map(u, dur):
    """Speed ramp estilo CapCut: rápido al entrar, lento en el detalle, rápido al salir."""
    n = 200
    us = np.linspace(0, dur, n)
    sp = 1.55 - 0.95 * np.sin(np.pi * us / dur) ** 2
    cum = np.concatenate([[0], np.cumsum((sp[1:] + sp[:-1]) / 2 * np.diff(us))])
    if u <= 0:
        return u * sp[0]
    if u >= dur:
        return cum[-1] + (u - dur) * sp[-1]
    return float(np.interp(u, us, cum))


class Shot:
    HANDLE = 0.45

    def __init__(self, spec, start):
        self.s, self.start, self.dur = spec, start, spec["dur"]
        self.end = start + self.dur
        self.frames = None

    def src_len(self):
        return ramp_map(self.dur, self.dur) if self.s.get("rampa") else self.dur

    def load(self):
        if self.frames is not None:
            return
        if self.s.get("tipo") == "split":
            self.L = self._load_one(self.s["izq"]["clip"], self.s["izq"]["entrada"], self.dur)
            self.R = self._load_one(self.s["der"]["clip"], self.s["der"]["entrada"], self.dur)
            self.frames = True
            return
        self.frames, self.t0, self.gain = self._load_one(self.s["clip"], self.s["entrada"], self.src_len())

    def _load_one(self, clip, entrada, srclen):
        fr, t0 = read_frames(clip, entrada - self.HANDLE * 1.6, entrada + srclen + self.HANDLE * 1.6)
        mid = fr[len(fr) // 2]
        luma = cv2.cvtColor(mid, cv2.COLOR_RGB2GRAY).mean() / 255
        gain = float(np.clip(G["exposicion_objetivo"] / max(luma, 1e-3), 0.85, 1.22))
        return fr, t0, gain

    def free(self):
        self.frames = None
        self.L = self.R = None

    def _pick(self, frames, t0, entrada, src_t):
        i = int(round((entrada + src_t - t0) * FPS))
        return frames[min(max(i, 0), len(frames) - 1)]

    def motion(self, img, u):
        mv = self.s.get("mov", "zoom")
        p = ease_io(u / self.dur) if self.dur else 0
        if mv == "zoom":
            z, dx = 1.0 + 0.08 * p, 0
        elif mv == "push":
            z, dx = 1.0 + 0.12 * p, 0
        elif mv in ("pan_izq", "pan_der"):
            z = 1.08
            dx = (W * 0.035) * (1 - 2 * p) * (1 if mv == "pan_izq" else -1)
        else:
            z, dx = 1.0, 0
        M = np.float32([[z, 0, (1 - z) * W / 2 + dx], [0, z, (1 - z) * H / 2]])
        return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

    def frame(self, t):
        self.load()
        u = t - self.start
        if self.s.get("tipo") == "split":
            fl, t0l, gl = self.L
            fr_, t0r, gr = self.R
            a = grade(self._pick(fl, t0l, self.s["izq"]["entrada"], u), gl)
            b = grade(self._pick(fr_, t0r, self.s["der"]["entrada"], u), gr)
            out = np.empty_like(a)
            q = W // 4
            out[:, :W // 2] = a[:, q:q + W // 2]
            out[:, W // 2:] = b[:, q:q + W // 2]
            out[:, W // 2 - px(3):W // 2 + px(3)] = C["crema"]
            return out
        src_t = ramp_map(u, self.dur) if self.s.get("rampa") else u
        img = grade(self._pick(self.frames, self.t0, self.s["entrada"], src_t), self.gain)
        return self.motion(img, u)


# ------------------------------------------------------------------ transiciones
TRANS_DUR = {"slider": 0.33, "disolver": 5 / 30, "zoom_punch": 0.2, "whip": 0.24, "flash": 0.3,
             "light_leak": 0.45, "flash_zoom": 0.3}


def zoom_img(img, z):
    M = np.float32([[z, 0, (1 - z) * W / 2], [0, z, (1 - z) * H / 2]])
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)


def transition(kind, A, B, p):
    if kind == "disolver":
        return cv2.addWeighted(A, 1 - p, B, p, 0)
    if kind == "slider":
        e = ease_io(p)
        x = int(W * e)
        out = A.copy()
        out[:, :x] = B[:, :x]
        lw = px(7)
        x0, x1 = max(0, x - lw // 2), min(W, x + lw // 2)
        out[:, x0:x1] = C["crema"]
        return out
    if kind == "zoom_punch":
        if p < 0.5:
            return zoom_img(A, 1 + 0.35 * ease_io(p * 2))
        return zoom_img(B, 1.35 - 0.35 * ease_out((p - 0.5) * 2))
    if kind == "whip":
        img, s = (A, -1) if p < 0.5 else (B, 1)
        q = p * 2 if p < 0.5 else (1 - p) * 2
        shift = int(W * 0.5 * ease_io(q)) * (-1 if p < 0.5 else 1)
        M = np.float32([[1, 0, shift], [0, 1, 0]])
        moved = cv2.warpAffine(img, M, (W, H), borderMode=cv2.BORDER_REFLECT)
        k = max(1, int(px(120) * math.sin(math.pi * p)))
        return cv2.blur(moved, (k, 1))
    if kind in ("flash", "flash_zoom"):
        base = A if p < 0.5 else B
        if kind == "flash_zoom" and p >= 0.5:
            base = zoom_img(B, 1.12 - 0.12 * ease_out((p - 0.5) * 2))
        a = 0.75 * math.sin(math.pi * p) if kind == "flash" else 0.9 * math.sin(math.pi * p)
        white = np.full_like(base, C["blanco_calido"])
        return cv2.addWeighted(base, 1 - a, white, a, 0)
    if kind == "light_leak":
        mix = cv2.addWeighted(A, 1 - ease_io(p), B, ease_io(p), 0)
        yy, xx = np.mgrid[0:H:4, 0:W:4]
        cx = W * (-0.2 + 1.4 * p)
        g = np.exp(-(((xx - cx) / (W * 0.45)) ** 2 + ((yy - H * 0.35) / (H * 0.5)) ** 2))
        g = cv2.resize(g.astype(np.float32), (W, H)) * math.sin(math.pi * p) * 0.75
        leak = np.array([255, 196, 168], np.float32)
        out = mix.astype(np.float32) * (1 - g[:, :, None]) + leak * g[:, :, None] + 18 * g[:, :, None]
        return np.clip(out, 0, 255).astype(np.uint8)
    return B if p >= 0.5 else A


# ------------------------------------------------------------------ textos
def emoji_img(ch, size):
    f = ImageFont.truetype(FONT["emoji"], 109)
    im = Image.new("RGBA", (136, 128), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((0, 0), ch, font=f, embedded_color=True)
    im = im.crop(im.getbbox())
    s = size / im.height
    return im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)


def is_emoji(ch):
    return ord(ch) > 0x2500 and ch not in "…·—–"


def text_run(text, font, color, size):
    """Imagen RGBA de un texto con emojis (fuente de color para emojis)."""
    tmp = ImageDraw.Draw(Image.new("RGBA", (4, 4)))
    asc, desc = font.getmetrics()
    parts, x = [], 0
    for ch in text:
        if ch == "️":
            continue
        if is_emoji(ch):
            em = emoji_img(ch, int(size * 1.0))
            parts.append(("e", em, x)); x += em.width + int(size * 0.08)
        else:
            parts.append(("t", ch, x)); x += tmp.textlength(ch, font=font)
    im = Image.new("RGBA", (int(x) + 4, asc + desc + 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for k, v, xx in parts:
        if k == "t":
            d.text((xx, 2), v, font=font, fill=color)
        else:
            im.alpha_composite(v, (int(xx), int(2 + asc - v.height * 0.92)))
    return im


def serif(size, italic=False, weight="Medium"):
    f = ImageFont.truetype(P(FONT["serif_italica" if italic else "serif"]), size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def soft_shadow(sp, blur, alpha, color, pad):
    out = Image.new("RGBA", (sp.width + pad * 2, sp.height + pad * 2), (0, 0, 0, 0))
    a = Image.new("L", out.size, 0)
    a.paste(sp.getchannel("A").point(lambda v: int(v * alpha)), (pad, pad + pad // 6))
    sh = Image.new("RGBA", out.size, color + (0,))
    sh.putalpha(a.filter(ImageFilter.GaussianBlur(blur)))
    out.alpha_composite(sh)
    out.alpha_composite(sp, (pad, pad))
    return out


class Texto:
    def __init__(self, s):
        self.s = s
        self.t0, self.t1 = s["inicio"], s["fin"]
        getattr(self, "_build_" + s["tipo"])()

    # --- títulos serif: palabra por palabra, fade-up + blur→nítido
    def _build_titulo(self):
        size = px(self.s.get("tam", 124))
        words, cur = [], []
        for txt, st in self.s["partes"]:
            cur.append((txt.strip(), st))
            if txt.endswith(" "):
                words.append(cur); cur = []
        if cur:
            words.append(cur)
        self.words = []
        for w in words:
            ims = [text_run(t, serif(size, st == "i", "SemiBold"), C["crema"], size) for t, st in w]
            wd = sum(i.width for i in ims)
            hh = max(i.height for i in ims)
            im = Image.new("RGBA", (wd, hh), (0, 0, 0, 0))
            x = 0
            for i in ims:
                im.alpha_composite(i, (x, hh - i.height)); x += i.width - px(2)
            self.words.append(soft_shadow(soft_shadow(im, px(10), 0.55, C["chocolate"], px(40)), px(30), 0.40, C["chocolate"], 0))
        # layout a la izquierda; salta de línea si no cabe en 920 px
        space = int(size * 0.26)
        maxw, x0 = px(940), px(80) - px(40)
        self.pos, x, y = [], x0, px(self.s["y"]) - px(40)
        for im in self.words:
            if x > x0 and x + im.width - px(80) > x0 + maxw:
                x, y = x0, y + int(size * 1.05)
            self.pos.append((x, y)); x += im.width - px(80) + space

    def _draw_titulo(self, layer, t):
        out_p = ease_io((t - (self.t1 - 0.3)) / 0.3)
        for i, (im, (x, y)) in enumerate(zip(self.words, self.pos)):
            p = ease_out((t - self.t0 - i * 0.14) / 0.4)
            if p <= 0:
                continue
            a = p * (1 - out_p)
            sp = im
            blur = (1 - p) * px(9)
            if blur > 0.4:
                sp = sp.filter(ImageFilter.GaussianBlur(blur))
            if a < 0.999:
                sp = sp.copy(); sp.putalpha(sp.getchannel("A").point(lambda v, a=a: int(v * a)))
            layer.alpha_composite(sp, (int(x), int(y + px(26) * (1 - p) - px(14) * out_p)))

    # --- burbujas rosadas: pop 85→100 % + fade
    def _build_pill(self):
        size = px(44 if self.s.get("grande") else 36)
        f = ImageFont.truetype(P(FONT["sans"]), size)
        txt = text_run(self.s["texto"], f, C["chocolate"], size)
        padx, pady = px(30), px(16)
        w, h = txt.width + padx * 2, txt.height + pady * 2 - px(6)
        big = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
        ImageDraw.Draw(big).rounded_rectangle([0, 0, w * 2 - 1, h * 2 - 1], radius=h, fill=C["rosa"] + (255,))
        pill = big.resize((w, h), Image.LANCZOS)
        pill.alpha_composite(txt, (padx, (h - txt.height) // 2 + px(2)))
        self.sp = soft_shadow(pill, px(14), 0.22, C["chocolate"], px(24))

    def _anchor(self, sp):
        x = self.s.get("x", "izq")
        if x == "izq":
            return px(80) - px(24)
        if x == "der":
            return W - px(80) - sp.width + px(24)
        return px(x) - sp.width // 2

    def _draw_pill(self, layer, t):
        p = ease_out((t - self.t0) / 0.32)
        if p <= 0:
            return
        o = ease_io((t - (self.t1 - 0.25)) / 0.25)
        a = p * (1 - o)
        s = 0.85 + 0.15 * p
        sp = self.sp.resize((max(1, int(self.sp.width * s)), max(1, int(self.sp.height * s))), Image.BICUBIC) if s < 0.999 else self.sp
        if a < 0.999:
            sp = sp.copy(); sp.putalpha(sp.getchannel("A").point(lambda v, a=a: int(v * a)))
        x = self._anchor(self.sp) + (self.sp.width - sp.width) // 2
        y = px(self.s["y"]) - sp.height // 2 + int(px(10) * o)
        layer.alpha_composite(sp, (int(x), int(y)))

    # --- logo oficial sobre círculo crema
    def _build_logo(self):
        d = px(self.s.get("diametro", 440))
        circ = Image.new("RGBA", (d * 2, d * 2), (0, 0, 0, 0))
        ImageDraw.Draw(circ).ellipse([0, 0, d * 2 - 1, d * 2 - 1], fill=C["crema"] + (255,),
                                     outline=C["chocolate"] + (255,), width=px(6) * 2)
        circ = circ.resize((d, d), Image.LANCZOS)
        lg = Image.open(P(CFG["rutas"]["logo"])).convert("RGBA")
        lw = int(d * 0.74)
        lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
        circ.alpha_composite(lg, ((d - lg.width) // 2, (d - lg.height) // 2))
        self.sp = soft_shadow(circ, px(30), 0.35, C["chocolate"], px(40))

    def _draw_logo(self, layer, t):
        p = ease_out((t - self.t0) / 0.6)
        if p <= 0:
            return
        s = 0.95 + 0.05 * p
        sp = self.sp.resize((int(self.sp.width * s), int(self.sp.height * s)), Image.BICUBIC)
        sp.putalpha(sp.getchannel("A").point(lambda v: int(v * p)))
        layer.alpha_composite(sp, ((W - sp.width) // 2, px(self.s["y"]) - sp.height // 2))

    # --- firma serif itálica
    def _build_firma(self):
        size = px(58)
        im = text_run(self.s["texto"], serif(size, True), C["crema"], size)
        self.sp = soft_shadow(im, px(22), 0.4, C["chocolate"], px(36))

    def _draw_firma(self, layer, t):
        p = ease_out((t - self.t0) / 0.5)
        if p <= 0:
            return
        sp = self.sp.copy()
        sp.putalpha(sp.getchannel("A").point(lambda v: int(v * p)))
        layer.alpha_composite(sp, ((W - sp.width) // 2, px(self.s["y"]) - sp.height // 2 + int(px(16) * (1 - p))))

    def active(self, t):
        return self.t0 <= t <= self.t1 + 0.02

    def draw(self, layer, t):
        getattr(self, "_draw_" + self.s["tipo"])(layer, t)


# ------------------------------------------------------------------ línea de tiempo
def build_timeline():
    shots, t = [], 0.0
    for spec in CFG["planos"]:
        shots.append(Shot(spec, t))
        t += spec["dur"]
    return shots, t


def compose(shots, t, hook_variant=None):
    for i, sh in enumerate(shots):
        nxt = shots[i + 1] if i + 1 < len(shots) else None
        kind = nxt.s.get("trans") if nxt else None
        if hook_variant and i == 0 and kind == "slider":
            kind = hook_variant
        d = TRANS_DUR.get(kind, 0)
        if nxt and d and sh.end - d / 2 <= t < sh.end + d / 2:
            p = (t - (sh.end - d / 2)) / d
            return transition(kind, sh.frame(t), nxt.frame(t), p)
        if sh.start <= t < sh.end or (nxt is None and t >= sh.start):
            return sh.frame(t)
    return shots[-1].frame(t)


_TOP = {}


def top_shade(fr):
    """Sombra suave de chocolate en el tercio superior para que los títulos crema se lean sobre fondos claros."""
    if "m" not in _TOP:
        y = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
        _TOP["m"] = 1 - 0.34 * np.clip(1 - y / 0.40, 0, 1) ** 1.4
        tint = np.array(C["chocolate"], np.float32)[None, None, :] / 255.0
        _TOP["t"] = tint
    m = _TOP["m"]
    return np.clip(fr.astype(np.float32) * m + (1 - m) * 0.0, 0, 255).astype(np.uint8)


def overlay(frame, layer):
    a = np.asarray(layer, dtype=np.float32)
    al = a[:, :, 3:4] / 255.0
    return (frame.astype(np.float32) * (1 - al) + a[:, :, :3] * al).astype(np.uint8)


def render(out, hook_variant=None, t_range=None):
    shots, total = build_timeline()
    textos = [Texto(s) for s in CFG["textos"]]
    t_a, t_b = t_range or (0, total)
    n0, n1 = int(round(t_a * FPS)), int(round(t_b * FPS))
    enc = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high",
           "-crf", str(CFG["salida"]["crf"] if K == 1 else 23), "-preset", CFG["salida"]["preset"] if K == 1 else "veryfast",
           "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", out]
    pr = subprocess.Popen(enc, stdin=subprocess.PIPE)
    for n in range(n0, n1):
        t = n / FPS
        for sh in shots:                          # libera memoria de planos ya pasados
            if sh.frames is not None and sh.end + 0.6 < t:
                sh.free()
        fr = top_shade(compose(shots, t, hook_variant))
        act = [x for x in textos if x.active(t)]
        if act:
            layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            for x in act:
                x.draw(layer, t)
            fr = overlay(fr, layer)
        pr.stdin.write(fr.tobytes())
        if n % 60 == 0:
            print(f"  {t:5.1f}s / {total:.1f}s", flush=True)
    pr.stdin.close()
    if pr.wait():
        sys.exit("Falló ffmpeg")
    return total


def export_textos():
    od = os.path.join(ROOT, "salida", "textos")
    os.makedirs(od, exist_ok=True)
    for s in CFG["textos"]:
        x = Texto(s)
        t0, t1 = s["inicio"], s["fin"] + 0.05
        out = os.path.join(od, f"{s['id']}.mov")
        pr = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}",
                               "-r", str(FPS), "-i", "-", "-c:v", "prores_ks", "-profile:v", "4444",
                               "-pix_fmt", "yuva444p10le", "-alpha_bits", "16", out], stdin=subprocess.PIPE)
        for n in range(int(round(t0 * FPS)), int(round(t1 * FPS)) + 1):
            layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            x.draw(layer, n / FPS)
            pr.stdin.write(layer.tobytes())
        pr.stdin.close(); pr.wait()
        print("  texto", s["id"])


def export_timeline(total):
    shots, _ = build_timeline()
    segs = []
    for i, sh in enumerate(shots):
        s = sh.s
        e = {"n": i + 1, "linea_inicio": round(sh.start, 3), "linea_fin": round(sh.end, 3), "seccion": s.get("seccion"),
             "movimiento": s.get("mov", "zoom"), "transicion_entrada": s.get("trans", "corte"),
             "velocidad": "rampa 1,55x → 0,6x → 1,55x" if s.get("rampa") else "1x"}
        if s.get("tipo") == "split":
            e["clip"] = f"{s['izq']['clip']} | {s['der']['clip']} (pantalla dividida)"
            e["in"] = [s["izq"]["entrada"], s["der"]["entrada"]]
        else:
            e["clip"] = s["clip"]
            e["in"] = s["entrada"]
            e["out"] = round(s["entrada"] + sh.src_len(), 3)
        e["textos"] = [t["id"] for t in CFG["textos"] if t["inicio"] < sh.end and t["fin"] > sh.start]
        segs.append(e)
    tx = [{"id": t["id"], "tipo": t["tipo"], "texto": t.get("texto") or "".join(p[0] for p in t.get("partes", [])),
           "inicio": t["inicio"], "fin": t["fin"], "archivo": f"textos/{t['id']}.mov"} for t in CFG["textos"]]
    json.dump({"duracion": round(total, 3), "fps": FPS, "bpm": CFG["ritmo"]["bpm"], "segmentos": segs, "textos": tx},
              open(os.path.join(ROOT, "salida", "timeline.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)


def save_frames(times, prefix="f"):
    shots, total = build_timeline()
    textos = [Texto(s) for s in CFG["textos"]]
    od = os.path.join(ROOT, "salida", "frames")
    os.makedirs(od, exist_ok=True)
    for t in times:
        fr = top_shade(compose(shots, t))
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for x in textos:
            if x.active(t):
                x.draw(layer, t)
        Image.fromarray(overlay(fr, layer)).save(os.path.join(od, f"{prefix}_{t:05.2f}.jpg"), quality=88)


if __name__ == "__main__":
    os.makedirs(os.path.join(ROOT, "salida"), exist_ok=True)
    if "--frames" in ARGS:
        save_frames([float(v) for v in ARGS[ARGS.index("--frames") + 1].split(",")])
    elif "--textos" in ARGS:
        export_textos()
    elif "--hooks" in ARGS:
        for v in ("slider", "flash_zoom"):
            render(os.path.join(ROOT, "salida", f"hook_{v}.mp4"), hook_variant=v, t_range=(0, 3.6))
    else:
        out = P(CFG["salida"]["preview" if K < 1 else "final"])
        total = render(out)
        export_timeline(total)
        print("Listo:", out, f"({total:.1f}s)")
