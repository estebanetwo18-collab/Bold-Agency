#!/usr/bin/env python3
"""VolTech – serie de animaciones 9:16 (motor por escenas).

Cada tema es una lista de escenas en TEMAS; cada escena tiene un rango de tiempo
y elementos que entran animados. Para crear un tema nuevo, copia uno y cambia textos,
números y tiempos.
Uso:  python3 temas.py                 -> renderiza todos
      python3 temas.py ahorro apagon   -> solo esos
      python3 temas.py --preview       -> fotogramas de control en salida/preview_temas/
"""
import math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

import build as B
from build import (W, H, FPS, FOREST, FOREST2, CARD, GREEN, MINT, WHITE, SOFT, F, P, ease_out, ease_io,
                   back_out, prog, ss, put, rrect_sprite, logo_pill, sun_icon, panel_icon, arrow_icon,
                   check_icon, make_background, lines_layer, band, draw_bg, bg_weights, particles, comp, FOTOS, shadowed)

FALLBACK = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
NO_GLYPH = set("₡")


def text_sprite(parts, size, kind="ExtraBold", spacing=0, pad=8, maxw=960):
    """Igual que build.text_sprite pero con fuente de respaldo para ₡."""
    tmp = ImageDraw.Draw(Image.new("RGBA", (4, 4)))
    fb = lambda sz: ImageFont.truetype(FALLBACK, int(sz * 0.9))
    def flen(ch, sz):
        return tmp.textlength(ch, font=fb(sz) if ch in NO_GLYPH else F(kind, sz))
    def total(sz):
        return sum(sum(flen(c, sz) for c in s) + spacing * max(0, len(s) - 1) for s, _ in parts) \
            + spacing * (len(parts) - 1) + pad * 2
    if total(size) > maxw:
        size = int(size * maxw / total(size))
    f = F(kind, size)
    asc, desc = f.getmetrics()
    w, h = int(total(size)), asc + desc + pad * 2

    def draw(d, im, k):
        fk, fbk = F(kind, size * k), fb(size * k)
        x = pad * k
        for s, col in parts:
            for ch in s:
                ff = fbk if ch in NO_GLYPH else fk
                d.text((x, (pad + asc) * k), ch, font=ff, fill=col, anchor="ls")
                x += d.textlength(ch, font=ff) + spacing * k
    return ss(draw, w, h)


# ------------------------------------------------------------------ íconos extra
def battery_icon(size, level=1.0, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.rounded_rectangle([s * 0.08, s * 0.28, s * 0.86, s * 0.72], radius=s * 0.08, outline=color, width=int(6 * k))
        d.rounded_rectangle([s * 0.86, s * 0.42, s * 0.94, s * 0.58], radius=s * 0.03, fill=color)
        inner = (s * 0.86 - s * 0.08 - s * 0.1) * max(0.05, level)
        d.rounded_rectangle([s * 0.13, s * 0.33, s * 0.13 + inner, s * 0.67], radius=s * 0.04, fill=color)
    return ss(draw, size, size)


def bolt_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.polygon([(s * 0.58, s * 0.04), (s * 0.18, s * 0.56), (s * 0.46, s * 0.56), (s * 0.38, s * 0.96),
                   (s * 0.82, s * 0.40), (s * 0.54, s * 0.40)], fill=color)
    return ss(draw, size, size)


def moon_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.ellipse([s * 0.12, s * 0.12, s * 0.88, s * 0.88], fill=color)
        d.ellipse([s * 0.34, s * 0.02, s * 1.04, s * 0.72], fill=CARD + (255,))
    return ss(draw, size, size)


def home_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.polygon([(s * 0.5, s * 0.08), (s * 0.94, s * 0.48), (s * 0.06, s * 0.48)], fill=color)
        d.rectangle([s * 0.18, s * 0.46, s * 0.82, s * 0.9], fill=color)
        d.rectangle([s * 0.42, s * 0.62, s * 0.58, s * 0.9], fill=CARD + (255,))
    return ss(draw, size, size)


def grid_icon(size, color=MINT):
    """Torre de la red eléctrica."""
    def draw(d, im, k):
        s, w = size * k, int(6 * k)
        d.line([(s * 0.5, s * 0.06), (s * 0.2, s * 0.94)], fill=color, width=w)
        d.line([(s * 0.5, s * 0.06), (s * 0.8, s * 0.94)], fill=color, width=w)
        d.line([(s * 0.18, s * 0.3), (s * 0.82, s * 0.3)], fill=color, width=w)
        d.line([(s * 0.28, s * 0.55), (s * 0.72, s * 0.55)], fill=color, width=w)
        d.line([(s * 0.35, s * 0.3), (s * 0.66, s * 0.55)], fill=color, width=int(4 * k))
        d.line([(s * 0.65, s * 0.3), (s * 0.34, s * 0.55)], fill=color, width=int(4 * k))
    return ss(draw, size, size)


def shield_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.polygon([(s * 0.5, s * 0.04), (s * 0.9, s * 0.2), (s * 0.82, s * 0.62), (s * 0.5, s * 0.96),
                   (s * 0.18, s * 0.62), (s * 0.1, s * 0.2)], fill=color)
        d.line([(s * 0.32, s * 0.5), (s * 0.46, s * 0.64), (s * 0.7, s * 0.36)], fill=CARD + (255,), width=int(8 * k),
               joint="curve")
    return ss(draw, size, size)


def wrench_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.line([(s * 0.22, s * 0.8), (s * 0.62, s * 0.4)], fill=color, width=int(16 * k))
        d.ellipse([s * 0.5, s * 0.1, s * 0.92, s * 0.52], fill=color)
        d.ellipse([s * 0.64, s * 0.06, s * 0.84, s * 0.3], fill=CARD + (255,))
        d.ellipse([s * 0.12, s * 0.7, s * 0.32, s * 0.9], fill=color)
    return ss(draw, size, size)


def phone_icon(size, color=FOREST):
    def draw(d, im, k):
        s = size * k
        d.rounded_rectangle([s * 0.26, s * 0.06, s * 0.74, s * 0.94], radius=s * 0.1, outline=color, width=int(6 * k))
        d.ellipse([s * 0.46, s * 0.8, s * 0.54, s * 0.88], fill=color)
    return ss(draw, size, size)


ICONS = {"sol": lambda s: sun_icon(s, 0.3), "panel": lambda s: panel_icon(s), "bateria": battery_icon,
         "rayo": bolt_icon, "luna": moon_icon, "casa": home_icon, "red": grid_icon, "escudo": shield_icon,
         "llave": wrench_icon, "check": check_icon}


# ------------------------------------------------------------------ elementos
def fmt_num(v, dec, sep):
    s = f"{v:,.{dec}f}".replace(",", "X").replace(".", ",").replace("X", sep)
    return s


class El:
    """Elemento animado. kind ∈ chip, title, text, card, row, count, arrow, icons, flow, cta, logo, phone."""

    def __init__(self, kind, t, y, **kw):
        self.kind, self.t, self.y, self.kw = kind, t, y, kw
        self.sp = None
        self.build()

    def build(self):
        k, kw = self.kind, self.kw
        if k == "chip":
            lab = text_sprite([(kw["texto"], FOREST)], 30, "SemiBold", spacing=4)
            self.sp = rrect_sprite(lab.width + 48, 58, 29, MINT + (255,))
            self.sp.alpha_composite(lab, (24, (58 - lab.height) // 2))
        elif k == "title":
            self.lines = [shadowed(text_sprite(parts, kw.get("size", 108), maxw=kw.get("maxw", 960))) for parts in kw["lineas"]]
        elif k == "text":
            self.sp = shadowed(text_sprite(kw["partes"], kw.get("size", 44), kw.get("peso", "Medium"), maxw=kw.get("maxw", 940)))
        elif k == "card":
            h = kw.get("h", 190)
            c = rrect_sprite(920, h, 32, (kw.get("fondo", CARD)) + (255,), *(
                (MINT + (255,), 4) if kw.get("borde") else ()))
            ic = ICONS[kw["icono"]](130) if kw.get("icono") else None
            x = 40
            if ic:
                c.alpha_composite(ic, (40, (h - 130) // 2))
                x = 200
            big = text_sprite([(kw["grande"], kw.get("color", WHITE))], kw.get("size", 64), "Bold", maxw=920 - x - 30)
            c.alpha_composite(big, (x, 22 if kw.get("chico") else (h - big.height) // 2))
            if kw.get("chico"):
                c.alpha_composite(text_sprite([(kw["chico"], SOFT)], 36, "Medium", maxw=920 - x - 30), (x + 2, 112))
            self.sp = c
        elif k == "row":
            r = rrect_sprite(920, 104, 26, CARD + (255,))
            r.alpha_composite(check_icon(56), (30, 24))
            tn = text_sprite([(kw["texto"], WHITE)], 44, "SemiBold", maxw=780)
            r.alpha_composite(tn, (106, (104 - tn.height) // 2))
            self.sp = r
        elif k == "arrow":
            self.sp = arrow_icon(70)
        elif k == "icons":
            self.icons = [ICONS[kw["icono"]](kw.get("size", 150)) for _ in range(kw["n"])]
        elif k == "flow":
            self.nodes = [(ICONS[ic](120), text_sprite([(lab, WHITE)], 38, "SemiBold", maxw=300)) for ic, lab in kw["nodos"]]
            self.ring = rrect_sprite(170, 170, 85, CARD + (255,), MINT + (255,), 3)
        elif k == "cta":
            cc = rrect_sprite(920, 230, 36, MINT + (255,))
            t1 = text_sprite([(kw["l1"], FOREST)], 58, "Bold", maxw=860)
            t2 = text_sprite([(kw["l2"], FOREST)], 38, "Medium", maxw=860)
            cc.alpha_composite(t1, ((920 - t1.width) // 2, 44))
            cc.alpha_composite(t2, ((920 - t2.width) // 2, 140))
            self.sp = cc
        elif k == "logo":
            self.sp = logo_pill(kw.get("ancho", 520))
            self.sub = text_sprite([(kw.get("texto", "SÍGUENOS PARA MÁS"), MINT)], 38, "SemiBold", spacing=6)
        elif k == "phone":
            num = text_sprite([(kw["numero"], FOREST)], 86, "ExtraBold")
            pill = rrect_sprite(num.width + 200, 150, 75, WHITE + (255,))
            pill.alpha_composite(phone_icon(90), (50, 30))
            pill.alpha_composite(num, (140, (150 - num.height) // 2))
            self.sp = pill
        elif k == "foto":
            w, h = kw.get("w", 920), kw.get("h", 560)
            im = Image.open(os.path.join(FOTOS, kw["src"] + ".jpg")).convert("RGB")
            sc = max(w * 1.18 / im.width, h * 1.18 / im.height)
            self.big = im.resize((int(im.width * sc), int(im.height * sc)), Image.LANCZOS).convert("RGBA")
            m = Image.new("L", (w * 2, h * 2), 0)
            ImageDraw.Draw(m).rounded_rectangle([0, 0, w * 2 - 1, h * 2 - 1], radius=72, fill=255)
            self.mask = m.resize((w, h), Image.LANCZOS)
            self.frame = rrect_sprite(w + 28, h + 28, 46, (0, 0, 0, 0), MINT + (255,), 4)
            self.lab = text_sprite([(kw["etiqueta"], FOREST)], 30, "SemiBold", spacing=4) if kw.get("etiqueta") else None
            self.wh = (w, h)
        elif k == "timeline":
            self.labs = [(text_sprite([(m, WHITE)], 34, "SemiBold"), text_sprite([(m, SOFT)], 34, "SemiBold"))
                         for m in kw["marcas"]]

    def draw(self, fr, t, v):
        p = prog(t, self.t, self.kw.get("dur", 0.55))
        if p <= 0:
            return
        e, k, y, kw = ease_out(p), self.kind, self.y, self.kw
        cx = W / 2
        if k == "chip":
            put(fr, self.sp, cx, y, e * v, back_out(p) * 0.6 + 0.4)
        elif k == "title":
            for i, sp in enumerate(self.lines):
                pi = prog(t, self.t + i * 0.2, 0.55)
                put(fr, sp, cx, y + i * kw.get("lh", 128) + 46 * (1 - ease_out(pi)), ease_out(pi) * v)
        elif k in ("text",):
            put(fr, self.sp, cx, y + 24 * (1 - e), e * v)
        elif k in ("card", "row"):
            dx = {"izq": -150, "der": 150}.get(kw.get("desde", "der"), 0)
            dy = 60 if kw.get("desde") == "abajo" else 0
            put(fr, self.sp, cx + dx * (1 - e), y + dy * (1 - e), e * v)
        elif k == "arrow":
            put(fr, self.sp, cx, y + 10 * math.sin((t - self.t) * 6), e * v)
        elif k == "count":
            c = ease_out(prog(t, self.t + 0.15, kw.get("cuenta", 1.5)))
            val = kw["valor"] * c
            s = kw.get("prefijo", "") + fmt_num(val, kw.get("dec", 1), kw.get("sep", " "))
            n = text_sprite([(s, kw.get("color", WHITE))], kw.get("size", 180), maxw=kw.get("maxw", 900))
            u = text_sprite([(kw.get("unidad", ""), MINT)], kw.get("usize", 60), "Bold") if kw.get("unidad") else None
            pop = 1 + 0.07 * math.sin(math.pi * prog(t, self.t + 0.15 + kw.get("cuenta", 1.5), 0.35))
            wt = n.width * pop + (u.width if u else 0)
            put(fr, n, cx - wt / 2, y, e * v, pop, anchor="l")
            if u:
                put(fr, u, cx - wt / 2 + n.width * pop, y + kw.get("size", 180) * 0.24, e * v, anchor="l")
        elif k == "icons":
            n = len(self.icons)
            gap = kw.get("gap", 220)
            for i, sp in enumerate(self.icons):
                pi = prog(t, self.t + i * 0.18, 0.45)
                put(fr, sp, cx + (i - (n - 1) / 2) * gap, y, ease_out(pi) * v, back_out(pi, 2.2) * 0.7 + 0.3)
        elif k == "flow":
            n, gap = len(self.nodes), 320
            xs = [cx + (i - (n - 1) / 2) * gap for i in range(n)]
            d = ImageDraw.Draw(fr)
            for i in range(n - 1):
                pl = ease_out(prog(t, self.t + 0.3 + i * 0.35, 0.4))
                if pl > 0:
                    x0, x1 = xs[i] + 80, xs[i + 1] - 80
                    d.rounded_rectangle([x0, y - 4, x0 + (x1 - x0) * pl, y + 4], radius=4, fill=MINT + (int(255 * v),))
                    # pulso de energía que recorre la línea
                    ph = ((t - self.t) * 0.9 + i * 0.33) % 1
                    if pl >= 1:
                        px = x0 + (x1 - x0) * ph
                        d.ellipse([px - 11, y - 11, px + 11, y + 11], fill=WHITE + (int(230 * v),))
            for i, (ic, lab) in enumerate(self.nodes):
                pi = prog(t, self.t + i * 0.35, 0.45)
                put(fr, self.ring, xs[i], y, ease_out(pi) * v, back_out(pi) * 0.6 + 0.4)
                put(fr, ic, xs[i], y, ease_out(pi) * v, back_out(pi) * 0.6 + 0.4)
                put(fr, lab, xs[i], y + 140, ease_out(pi) * v)
        elif k == "cta":
            pulse = 1 + 0.02 * math.sin(max(0, t - self.t - 0.6) * 4) if p >= 1 else back_out(p) * 0.3 + 0.7
            put(fr, self.sp, cx, y, e * v, pulse)
        elif k == "logo":
            put(fr, self.sp, cx, y, e * v, back_out(p) * 0.4 + 0.6)
            put(fr, self.sub, cx, y + 130, ease_out(prog(t, self.t + 0.3, 0.5)) * v)
        elif k == "phone":
            put(fr, self.sp, cx, y, e * v, back_out(p) * 0.4 + 0.6)
        elif k == "foto":
            w, h = self.wh
            pk = prog(t, self.t, kw.get("vida", 6.0))
            bw, bh = self.big.size
            x = int((bw - w) * (0.2 + 0.6 * ease_io(pk)))
            yy = int((bh - h) * (0.6 - 0.3 * ease_io(pk)))
            card = self.big.crop((x, yy, x + w, yy + h))
            card.putalpha(self.mask)
            sp = Image.new("RGBA", (w + 40, h + 40), (0, 0, 0, 0))
            sp.alpha_composite(self.frame, (20, 26))
            sp.alpha_composite(card, (20, 12))
            if self.lab:
                chip = rrect_sprite(self.lab.width + 40, 54, 27, MINT + (255,))
                chip.alpha_composite(self.lab, (20, (54 - self.lab.height) // 2))
                sp.alpha_composite(chip, (48, h - 60))
            dx = {"izq": -200, "der": 200}.get(kw.get("desde", ""), 0)
            put(fr, sp, kw.get("x", cx) + dx * (1 - e), y + (0 if dx else 80 * (1 - e)), e * v, 0.88 + 0.12 * back_out(p))
        elif k == "timeline":
            # barra 0 → 25+ años con marcas
            x0, x1 = 120, W - 120
            pl = ease_io(prog(t, self.t, kw.get("cuenta", 2.0)))
            d = ImageDraw.Draw(fr)
            d.rounded_rectangle([x0, y - 10, x1, y + 10], radius=10, fill=CARD + (int(255 * v),))
            d.rounded_rectangle([x0, y - 10, x0 + (x1 - x0) * pl, y + 10], radius=10, fill=MINT + (int(255 * v),))
            for j, lab in enumerate(kw["marcas"]):
                u = j / (len(kw["marcas"]) - 1)
                a = ease_out(prog(t, self.t + u * kw.get("cuenta", 2.0), 0.3)) * v
                put(fr, self.labs[j][0 if u <= pl else 1], x0 + (x1 - x0) * u, y + 54, a)


def extent(el):
    k, kw, y = el.kind, el.kw, el.y
    if k == "title":
        n = len(el.lines)
        return y - el.lines[0].height / 2, y + (n - 1) * kw.get("lh", 128) + el.lines[-1].height / 2
    if k == "count":
        return y - kw.get("size", 180) * 0.62, y + kw.get("size", 180) * 0.62
    if k == "icons":
        return y - kw.get("size", 150) * 0.4, y + kw.get("size", 150) * 0.4
    if k == "flow":
        return y - 85, y + 165
    if k == "logo":
        return y - el.sp.height / 2, y + 150
    if k == "timeline":
        return y - 12, y + 80
    if k == "foto":
        return y - el.wh[1] / 2, y + el.wh[1] / 2
    h = el.sp.height if el.sp is not None else 80
    return y - h / 2, y + h / 2


class Escena:
    def __init__(self, t0, t1, elementos, logo=True, fondo=None, centro=1010, oscuro=0.66):
        self.t0, self.t1, self.els, self.logo, self.fondo, self.oscuro = t0, t1, elementos, logo, fondo, oscuro
        ext = [extent(e) for e in elementos]
        top, bot = min(a for a, _ in ext), max(b for _, b in ext)
        self.dy = centro - (top + bot) / 2


def render_tema(tema, t, BG, LINES, BANDS, LOGO_SMALL):
    fr = BG.copy()
    escenas = tema["escenas"]
    ws = bg_weights(t, [(sc.t0, sc.t1) for sc in escenas])
    for sc, w in sorted(zip(escenas, ws), key=lambda x: x[1], reverse=True):
        if sc.fondo and w > 0.01:
            draw_bg(fr, sc.fondo, prog(t, sc.t0 - 0.5, sc.t1 - sc.t0 + 1.0), w if w < 0.999 else 1.0, sc.oscuro)
    off = int((t * 18) % 60)
    fr.alpha_composite(LINES.crop((off, 0, off + W, H)))
    particles(fr, t)
    for sc in escenas:
        if sc.t0 - 0.1 < t < sc.t1:
            last = sc is escenas[-1]
            v = 1 if last else 1 - ease_io(prog(t, sc.t1 - 0.35, 0.35))
            if sc.logo:
                put(fr, LOGO_SMALL, W / 2, 250, v * (ease_out(prog(t, 0, 0.5)) if sc is escenas[0] else 1))
            L = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            for el in sc.els:
                el.draw(L, t, v)
            comp(fr, L, sc.dy - (0 if last else 70 * ease_io(prog(t, sc.t1 - 0.4, 0.4))))
    for sc in escenas[1:]:
        p = prog(t, sc.t0 - 0.45, 0.9)
        if 0 < p < 1:
            e = ease_io(p)
            for sp, dx, dy in BANDS:
                x = -1600 + e * (W + 3200) + dx
                fr.alpha_composite(sp, (int(x - sp.width / 2), int(H / 2 - sp.height / 2 + dy)))
    return fr


# ------------------------------------------------------------------ temas
def T(parts):
    return [(s, c) for s, c in parts]


TEMAS = {
    "ahorro": lambda: {"archivo": "VolTech_CuantoPuedesAhorrar_9x16.mp4", "dur": 36.0, "escenas": [
        Escena(0.0, 5.6, [
            El("chip", 0.3, 380, texto="CASO REAL · ATENAS"),
            El("title", 0.5, 600, lineas=[T([("¿CUÁNTO PUEDES", WHITE)]), T([("AHORRAR", MINT)]),
                                          T([("CON ENERGÍA SOLAR?", WHITE)])]),
            El("text", 2.0, 1010, partes=[("Te mostramos un proyecto real", SOFT)])], fondo="portada_casa", oscuro=0.42),
        Escena(5.6, 11.0, [
            El("chip", 5.8, 380, texto="EL PROYECTO"),
            El("foto", 6.1, 800, src="piscina", w=440, h=640, x=W / 2 - 236, desde="izq", vida=5.0),
            El("foto", 6.5, 800, src="techo2", w=440, h=640, x=W / 2 + 236, desde="der", vida=5.0),
            El("text", 7.6, 1190, partes=[("Un sistema solar para la ", WHITE), ("casa completa", MINT)], size=48,
               peso="SemiBold")], fondo="piscina"),
        Escena(11.0, 19.0, [
            El("chip", 11.2, 380, texto="EL SISTEMA"),
            El("title", 11.4, 500, lineas=[T([("LO QUE INSTALAMOS", WHITE)])], size=84),
            El("card", 12.2, 700, icono="panel", grande="10 paneles solares", chico="Marca Trina Solar"),
            El("card", 13.8, 920, icono="rayo", grande="Inversor de 15 kW", chico="Marca LuxPower", desde="izq"),
            El("card", 15.4, 1140, icono="bateria", grande="Batería de 16 kWh", chico="Respaldo de energía")],
            fondo="inversor"),
        Escena(19.0, 26.0, [
            El("chip", 19.2, 380, texto="DURANTE EL DÍA"),
            El("title", 19.4, 500, lineas=[T([("ALIMENTA", WHITE)])], size=84),
            El("row", 20.2, 680, texto="Aires acondicionados"),
            El("row", 21.0, 800, texto="La piscina"),
            El("row", 21.8, 920, texto="Los principales equipos del hogar"),
            El("card", 23.2, 1120, icono="luna", grande="De noche", chico="la batería da respaldo", desde="abajo")],
            fondo="techo1"),
        Escena(26.0, 31.4, [
            El("chip", 26.2, 420, texto="AHORRO PROYECTADO"),
            El("count", 26.6, 680, valor=85000, dec=0, prefijo="≈ ₡", size=190, cuenta=2.0),
            El("text", 27.8, 860, partes=[("al mes", MINT)], size=64, peso="Bold"),
            El("text", 28.8, 960, partes=[("aproximadamente, en este proyecto", SOFT)], size=38)],
            fondo="techo_final"),
        Escena(31.4, 36.0, [
            El("title", 31.6, 470, lineas=[T([("¿CUÁNTO PODRÍAS", WHITE)]), T([("AHORRAR ", WHITE), ("TÚ?", MINT)])],
               size=100),
            El("cta", 32.4, 830, l1="Escríbenos", l2="y te decimos qué sistema se adapta a tu hogar o negocio"),
            El("arrow", 33.0, 1040),
            El("logo", 33.6, 1230)], logo=False, fondo="portada_atardecer")]},

    "apagon": lambda: {"archivo": "VolTech_SiSeVaLaLuz_9x16.mp4", "dur": 34.0, "escenas": [
        Escena(0.0, 5.6, [
            El("chip", 0.3, 380, texto="CORTES DE ELECTRICIDAD"),
            El("title", 0.5, 600, lineas=[T([("¿QUÉ PASA", WHITE)]), T([("CUANDO SE VA", WHITE)]),
                                          T([("LA LUZ?", MINT)])], size=116),
            El("text", 2.0, 1010, partes=[("Con un sistema solar con batería", SOFT)])], fondo="portada_campo", oscuro=0.42),
        Escena(5.6, 11.2, [
            El("chip", 5.8, 380, texto="DE DÍA"),
            El("card", 6.4, 640, icono="sol", grande="Los paneles", chico="alimentan la casa", h=200),
            El("row", 7.8, 860, texto="Aires acondicionados"),
            El("row", 8.4, 980, texto="La piscina"),
            El("row", 9.0, 1100, texto="Los principales equipos")], fondo="techo1"),
        Escena(11.2, 16.0, [
            El("chip", 11.4, 380, texto="DE NOCHE"),
            El("card", 12.0, 700, icono="luna", grande="La batería", chico="da respaldo de energía", h=200),
            El("arrow", 13.0, 880),
            El("card", 13.4, 1060, icono="bateria", grande="Energía almacenada", chico="cuando más se necesita",
               desde="abajo", h=200)], fondo="inversor"),
        Escena(16.0, 23.4, [
            El("chip", 16.2, 380, texto="SI SE VA LA LUZ"),
            El("title", 16.4, 500, lineas=[T([("TRANSFERENCIA", WHITE)]), T([("AUTOMÁTICA", MINT)])], size=96, lh=112),
            El("flow", 17.6, 860, nodos=[("sol", "Solar"), ("bateria", "Batería"), ("red", "Red")]),
            El("text", 19.8, 1130, partes=[("Sin que tengas que intervenir", WHITE)], size=48, peso="SemiBold")],
            fondo="cableado"),
        Escena(23.4, 28.8, [
            El("chip", 23.6, 380, texto="CONTINUIDAD"),
            El("foto", 23.9, 640, src="tecnico_inversor", w=920, h=440, etiqueta="PROYECTO ATENAS", vida=5.0),
            El("card", 24.6, 960, icono="escudo", grande="Energía sin interrupciones", h=170),
            El("text", 25.6, 1110, partes=[("Fundamental si en casa", WHITE)], size=48, peso="SemiBold"),
            El("text", 26.0, 1180, partes=[("dependes de ", WHITE), ("equipos médicos", MINT)], size=48,
               peso="SemiBold")], fondo="conexiones"),
        Escena(28.8, 34.0, [
            El("title", 29.0, 470, lineas=[T([("¿QUIERES UN", WHITE)]), T([("SISTEMA ASÍ?", MINT)])], size=104),
            El("cta", 29.8, 830, l1="Escríbenos", l2="y te decimos qué sistema se adapta a tu hogar o negocio"),
            El("arrow", 30.4, 1040),
            El("logo", 31.0, 1230)], logo=False, fondo="portada_techo")]},

    "duracion": lambda: {"archivo": "VolTech_CuantoDuraUnPanel_9x16.mp4", "dur": 24.0, "escenas": [
        Escena(0.0, 6.0, [
            El("chip", 0.3, 380, texto="¿SABÍAS QUE…?"),
            El("title", 0.5, 560, lineas=[T([("¿CUÁNTO DURA", WHITE)]), T([("UN PANEL SOLAR?", MINT)])], size=110),
            El("foto", 1.8, 1080, src="panel_teja", w=820, h=500, vida=4.5)], fondo="portada_limpieza", oscuro=0.42),
        Escena(6.0, 14.6, [
            El("text", 6.3, 480, partes=[("UN PANEL SOLAR PUEDE DURAR", SOFT)], size=40, peso="SemiBold"),
            El("count", 6.6, 700, valor=25, dec=0, unidad="AÑOS", size=260, usize=90, cuenta=2.2),
            El("text", 9.0, 880, partes=[("o más", MINT)], size=80, peso="ExtraBold"),
            El("timeline", 7.0, 1080, marcas=["0", "5", "10", "15", "20", "25+"], cuenta=2.2)], fondo="portada_campo"),
        Escena(14.6, 24.0, [
            El("title", 14.8, 470, lineas=[T([("UNA INVERSIÓN", WHITE)]), T([("QUE DURA", WHITE)])], size=104),
            El("cta", 15.8, 830, l1="Cotiza tu proyecto", l2="y empieza a ahorrar"),
            El("arrow", 16.4, 1040),
            El("logo", 17.0, 1230)], logo=False, fondo="portada_atardecer")]},

    "electricas": lambda: {"archivo": "VolTech_SolucionesElectricas_9x16.mp4", "dur": 24.0, "escenas": [
        Escena(0.0, 5.4, [
            El("title", 0.4, 520, lineas=[T([("SOLUCIONES", WHITE)]), T([("ELÉCTRICAS", MINT)])], size=124, lh=140),
            El("chip", 1.6, 760, texto="DESDE AVERÍAS HASTA INSTALACIONES"),
            El("foto", 2.4, 1120, src="cableado", w=820, h=500, vida=3.6)], fondo="portada_techo", oscuro=0.42),
        Escena(5.4, 11.0, [
            El("card", 5.7, 700, icono="llave", grande="Averías", chico="Te ayudamos a resolverlas", desde="izq"),
            El("arrow", 6.9, 870),
            El("card", 7.5, 1040, icono="rayo", grande="Instalaciones", chico="Eléctricas y solares", desde="der")],
            fondo="instalando"),
        Escena(11.0, 24.0, [
            El("title", 11.2, 470, lineas=[T([("AGENDA TU", WHITE)]), T([("SERVICIO", MINT)]), T([("AHORA MISMO", WHITE)])],
               size=110, lh=124),
            El("phone", 12.6, 900, numero="8559-3214"),
            El("arrow", 13.2, 1060),
            El("logo", 13.8, 1230)], logo=False, fondo="portada_casa")]},
}


def main():
    names = [a for a in sys.argv[1:] if not a.startswith("--")] or list(TEMAS)
    preview = "--preview" in sys.argv
    BG, LINES = make_background(), lines_layer()
    BANDS = [(band(2600, 520, GREEN + (255,)), 0, 0), (band(2600, 40, MINT + (255,)), -420, 0),
             (band(2600, 22, MINT + (255,)), 420, 0)]
    LOGO_SMALL = logo_pill(300)
    out_dir = P("salida")
    for name in names:
        tema = TEMAS[name]()
        if preview:
            pd = os.path.join(out_dir, "preview_temas")
            os.makedirs(pd, exist_ok=True)
            pts = []
            for sc in tema["escenas"]:
                pts += [sc.t0 + 0.6, (sc.t0 + sc.t1) / 2 + 0.6, sc.t1 - 0.5]
            for tt in pts:
                render_tema(tema, tt, BG, LINES, BANDS, LOGO_SMALL).convert("RGB").resize((360, 640)).save(
                    os.path.join(pd, f"{name}_{tt:05.1f}.jpg"), quality=85)
            print("preview", name)
            continue
        out = os.path.join(out_dir, tema["archivo"])
        dur = tema["dur"]
        pr = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                               "-r", str(FPS), "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
                               "-t", f"{dur}", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-maxrate", "12M",
                               "-bufsize", "20M", "-pix_fmt", "yuv420p", "-profile:v", "high", "-c:a", "aac",
                               "-b:a", "128k", "-shortest", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
        for i in range(int(round(dur * FPS))):
            pr.stdin.write(render_tema(tema, i / FPS, BG, LINES, BANDS, LOGO_SMALL).convert("RGB").tobytes())
        pr.stdin.close()
        if pr.wait():
            sys.exit("FALLÓ ffmpeg " + name)
        print("Listo:", out, flush=True)


if __name__ == "__main__":
    main()
