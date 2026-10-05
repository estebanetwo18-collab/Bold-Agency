#!/usr/bin/env python3
"""VolTech – "¿Cuántos paneles solares necesitas?" (animación 9:16, 1080x1920).

Todo el texto, los números y los tiempos están en GUION (abajo). Los tiempos
siguen el guion de locución, así se puede grabar una voz encima.
Uso:  python3 build.py              -> salida/VolTech_CuantosPaneles_9x16.mp4
      python3 build.py --preview    -> fotogramas de control en salida/preview/
Requiere: ffmpeg y Python 3 con Pillow.
"""
import math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
P = lambda *p: os.path.join(ROOT, *p)
W, H, FPS = 1080, 1920, 30
DUR = 49.5

# ------------------------------------------------------------------ marca
FOREST, FOREST2, CARD = (11, 42, 30), (18, 61, 43), (20, 66, 47)
GREEN, MINT, WHITE = (46, 158, 79), (78, 203, 113), (255, 255, 255)
SOFT = (196, 226, 205)            # blanco verdoso para textos secundarios
WARN = (255, 138, 101)            # acento cálido solo para "compran MAL"
FONTS = {k: P("assets", "fonts", f"Poppins-{k}.ttf") for k in ("ExtraBold", "Bold", "SemiBold", "Medium")}
LOGO = P("assets", "logo_voltech.png")

# ------------------------------------------------------------------ guion
GUION = {
    "hook": {"t": (0.0, 10.2), "titulo": [("¿CUÁNTOS", WHITE), ("PANELES SOLARES", MINT), ("NECESITAS?", WHITE)],
             "sub": ("Sin depender de la corriente", 1.6), "alerta": ("Casi todos compran", "MAL", 5.3),
             "nota": ("Te lo calculamos en 40 segundos", 7.8)},
    "paso1": {"t": (10.2, 20.7), "paso": "PASO 1", "titulo": "SUMA LO QUE GASTAS",
              "filas": [("Refrigerador", 1.2, 12.5), ("2 Ventiladores", 1.2, 13.5), ("Luces LED", 0.3, 14.4),
                        ("Televisor", 0.4, 15.2), ("Teléfonos + router", 0.2, 16.1)],
              "total": (3.3, 17.4, "TOTAL AL DÍA")},
    "paso2": {"t": (20.7, 32.1), "paso": "PASO 2", "titulo": "¿CUÁNTO DA UN PANEL?",
              "sol": ("≈ 5 horas", "de sol fuerte en Costa Rica", 21.6),
              "panel": ("1 panel de 550 W", "con pérdidas (calor, polvo, cables)", 25.0),
              "resultado": (2.1, "kWh/día", 28.1)},
    "paso3": {"t": (32.1, 42.6), "paso": "EL RESULTADO", "ecuacion": (["3.3", "÷", "2.1", "=", "1.6"], 32.3),
              "minimo": (2, 34.9), "ideal": (3, "Por los días nublados y para cargar la batería", 37.5)},
    "cta": {"t": (42.6, DUR), "titulo": [("¿QUÉ EQUIPOS", WHITE), ("TIENES ", WHITE, "TÚ?", MINT)],
            "card": ("Escríbelo en los comentarios", "y te decimos qué sistema te toca", 43.4),
            "sigue": ("SÍGUENOS PARA MÁS", 47.6)},
}


# ------------------------------------------------------------------ utilidades
def F(kind, size):
    return ImageFont.truetype(FONTS[kind], size)


def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def ease_out(p):
    p = clamp(p)
    return 1 - (1 - p) ** 3


def ease_io(p):
    p = clamp(p)
    return p * p * (3 - 2 * p)


def back_out(p, s=1.7):
    p = clamp(p) - 1
    return 1 + p * p * ((s + 1) * p + s)


def prog(t, t0, d):
    return clamp((t - t0) / d)


def ss(fn, w, h):
    """Sprite antialiasado: dibuja a 2x y reduce."""
    big = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
    fn(ImageDraw.Draw(big), big, 2)
    return big.resize((w, h), Image.LANCZOS)


def put(frame, sp, cx, cy, a=1.0, s=1.0, anchor="c"):
    """Compone un sprite con alfa, escala y anclaje (c=centro, l=izquierda-centro)."""
    if a <= 0.003 or sp is None:
        return
    if abs(s - 1) > 0.004:
        sp = sp.resize((max(1, int(sp.width * s)), max(1, int(sp.height * s))), Image.BICUBIC)
    if a < 0.997:
        sp = sp.copy()
        sp.putalpha(sp.getchannel("A").point(lambda v: int(v * a)))
    x = cx - sp.width / 2 if anchor == "c" else cx
    frame.alpha_composite(sp, (int(round(x)), int(round(cy - sp.height / 2))))


def text_sprite(parts, size, kind="ExtraBold", spacing=0, pad=6, maxw=960):
    """parts = [(texto, color), ...] en una sola línea. Se achica sola si supera maxw."""
    tmp = ImageDraw.Draw(Image.new("RGBA", (4, 4)))
    def total(sz):
        f = F(kind, sz)
        return sum(sum(tmp.textlength(c, font=f) for c in s) + spacing * max(0, len(s) - 1)
                   for s, _ in parts) + spacing * (len(parts) - 1) + pad * 2
    if total(size) > maxw:
        size = int(size * maxw / total(size))
    f = F(kind, size)
    w = int(total(size))
    asc, desc = f.getmetrics()
    h = asc + desc + pad * 2

    def draw(d, im, k):
        fk = F(kind, size * k)
        x = pad * k
        for s, col in parts:
            for ch in s:
                d.text((x, pad * k), ch, font=fk, fill=col)
                x += d.textlength(ch, font=fk) + spacing * k
    return ss(draw, w, h)


def rrect_sprite(w, h, r, fill, outline=None, ow=0, glow=None):
    def draw(d, im, k):
        d.rounded_rectangle([0, 0, w * k - 1, h * k - 1], radius=r * k, fill=fill,
                            outline=outline, width=ow * k if outline else 0)
    sp = ss(draw, w, h)
    if glow:
        g = Image.new("RGBA", (w + 80, h + 80), (0, 0, 0, 0))
        ImageDraw.Draw(g).rounded_rectangle([40, 40, w + 39, h + 39], radius=r, fill=glow)
        g = g.filter(ImageFilter.GaussianBlur(18))
        g.alpha_composite(sp, (40, 40))
        return g
    return sp


def logo_pill(width=300):
    lg = Image.open(LOGO).convert("RGBA")
    lg = lg.crop(lg.getchannel("A").getbbox())
    lg = lg.resize((width, int(lg.height * width / lg.width)), Image.LANCZOS)
    pill = rrect_sprite(width + 64, lg.height + 40, (lg.height + 40) // 2, FOREST2 + (255,), MINT + (110,), 2)
    pill.alpha_composite(lg, (32, 20))
    return pill


# ------------------------------------------------------------------ íconos
def sun_icon(size, rot):
    def draw(d, im, k):
        c, r = size * k / 2, size * k * 0.2
        for i in range(8):
            a = rot + i * math.pi / 4
            x0, y0 = c + math.cos(a) * r * 1.5, c + math.sin(a) * r * 1.5
            x1, y1 = c + math.cos(a) * r * 2.25, c + math.sin(a) * r * 2.25
            d.line([(x0, y0), (x1, y1)], fill=MINT, width=int(5 * k))
        d.ellipse([c - r, c - r, c + r, c + r], fill=MINT)
    return ss(draw, size, size)


def panel_icon(w, color=MINT, fill_alpha=60):
    h = int(w * 0.72)
    def draw(d, im, k):
        pts = [(0.14 * w * k, 0.04 * h * k), (0.86 * w * k, 0.04 * h * k), (w * k - 2, 0.82 * h * k), (2, 0.82 * h * k)]
        d.polygon(pts, fill=color + (fill_alpha,), outline=color)
        d.line(pts + [pts[0]], fill=color, width=int(4 * k), joint="curve")
        for i in range(1, 4):
            u = i / 4
            top = (pts[0][0] + (pts[1][0] - pts[0][0]) * u, pts[0][1])
            bot = (pts[3][0] + (pts[2][0] - pts[3][0]) * u, pts[3][1])
            d.line([top, bot], fill=color, width=int(3 * k))
        for j in (1, 2):
            v = j / 3
            y = pts[0][1] + (pts[3][1] - pts[0][1]) * v
            xl = pts[0][0] + (pts[3][0] - pts[0][0]) * v
            xr = pts[1][0] + (pts[2][0] - pts[1][0]) * v
            d.line([(xl, y), (xr, y)], fill=color, width=int(3 * k))
        d.rectangle([w * k * 0.46, 0.82 * h * k, w * k * 0.54, h * k], fill=color)
    return ss(draw, w, h)


def arrow_icon(size, color=MINT):
    def draw(d, im, k):
        c = size * k / 2
        d.line([(c, 4 * k), (c, size * k - 16 * k)], fill=color, width=int(7 * k))
        d.polygon([(c - 22 * k, size * k - 34 * k), (c + 22 * k, size * k - 34 * k), (c, size * k - 2)], fill=color)
    return ss(draw, size, size)


def warn_icon(size):
    def draw(d, im, k):
        s = size * k
        d.polygon([(s / 2, 2), (s - 2, s - 2), (2, s - 2)], outline=WARN, width=int(5 * k))
        d.line([(s / 2, s * 0.36), (s / 2, s * 0.66)], fill=WARN, width=int(6 * k))
        d.ellipse([s / 2 - 4 * k, s * 0.76, s / 2 + 4 * k, s * 0.76 + 8 * k], fill=WARN)
    return ss(draw, size, size)


def check_icon(size, color=MINT):
    def draw(d, im, k):
        s = size * k
        d.ellipse([3 * k, 3 * k, s - 3 * k, s - 3 * k], outline=color, width=int(5 * k))
        d.line([(s * 0.28, s * 0.52), (s * 0.44, s * 0.68), (s * 0.73, s * 0.36)], fill=color, width=int(6 * k),
               joint="curve")
    return ss(draw, size, size)


# ------------------------------------------------------------------ fondo
def make_background():
    bg = Image.new("RGBA", (W, H), FOREST + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-300, 200, W + 300, 1500], fill=FOREST2 + (255,))
    bg.alpha_composite(glow.filter(ImageFilter.GaussianBlur(220)))
    return bg


def lines_layer():
    lay = Image.new("RGBA", (W + 120, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    for x in range(-H, W + 240, 60):
        d.line([(x, H), (x + H, 0)], fill=MINT + (13,), width=2)
    return lay


def band(w, h, color):
    sp = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(sp).rounded_rectangle([0, 0, w - 1, h - 1], radius=h // 2, fill=color)
    return sp.rotate(32, expand=True, resample=Image.BICUBIC)


# ------------------------------------------------------------------ escenas
class Scene:
    def __init__(self, t0, t1):
        self.t0, self.t1 = t0, t1

    def vis(self, t, fade=0.35):
        """Visibilidad de salida de la escena (1 → 0 al final)."""
        return 1 - ease_io(prog(t, self.t1 - fade, fade))


def build_sprites():
    S = {}
    S["logo"] = logo_pill(300)
    S["logo_big"] = logo_pill(520)
    g = GUION
    S["hook_t"] = [text_sprite([(s, c)], 120, maxw=980) for s, c in g["hook"]["titulo"]]
    S["hook_sub"] = text_sprite([(g["hook"]["sub"][0], SOFT)], 44, "Medium")
    a = g["hook"]["alerta"]
    al = text_sprite([(a[0] + " ", WHITE), (a[1], WARN)], 50, "Bold")
    card = rrect_sprite(al.width + 150, 120, 28, (70, 32, 26, 235), WARN + (200,), 3)
    card.alpha_composite(warn_icon(52), (40, 34))
    card.alpha_composite(al, (110, (120 - al.height) // 2))
    S["hook_alerta"] = card
    S["hook_nota"] = text_sprite([(g["hook"]["nota"][0], MINT)], 40, "SemiBold")
    S["arrow"] = arrow_icon(70)
    for k in ("paso1", "paso2", "paso3"):
        lab = text_sprite([(g[k]["paso"], FOREST)], 30, "SemiBold", spacing=4)
        chip = rrect_sprite(lab.width + 48, 56, 28, MINT + (255,))
        chip.alpha_composite(lab, (24, (56 - lab.height) // 2))
        S[k + "_chip"] = chip
    S["p1_t"] = text_sprite([(g["paso1"]["titulo"], WHITE)], 84, maxw=940)
    S["rows"] = []
    for name, val, _ in g["paso1"]["filas"]:
        row = rrect_sprite(920, 104, 26, CARD + (255,))
        tn = text_sprite([(name, WHITE)], 44, "SemiBold")
        tv = text_sprite([(f"{val:.1f} kWh".replace(".", ","), MINT)], 44, "Bold")
        row.alpha_composite(tn, (36, (104 - tn.height) // 2))
        row.alpha_composite(tv, (920 - 36 - tv.width, (104 - tv.height) // 2))
        S["rows"].append(row)
    S["total_lab"] = text_sprite([(g["paso1"]["total"][2], SOFT)], 34, "SemiBold", spacing=5)
    S["p2_t"] = text_sprite([(g["paso2"]["titulo"], WHITE)], 84, maxw=940)
    so = g["paso2"]["sol"]
    sc = rrect_sprite(920, 190, 32, CARD + (255,))
    sc.alpha_composite(text_sprite([(so[0], MINT)], 74, "ExtraBold"), (200, 22))
    sc.alpha_composite(text_sprite([(so[1], SOFT)], 38, "Medium"), (204, 116))
    S["sol_card"] = sc
    pa = g["paso2"]["panel"]
    pc = rrect_sprite(920, 190, 32, CARD + (255,))
    pc.alpha_composite(panel_icon(130), (40, 48))
    pc.alpha_composite(text_sprite([(pa[0], WHITE)], 62, "Bold"), (200, 24))
    pc.alpha_composite(text_sprite([(pa[1], SOFT)], 34, "Medium"), (204, 116))
    S["panel_card"] = pc
    S["p3_t"] = None
    eq = g["paso3"]["ecuacion"][0]
    S["eq"] = [text_sprite([(tok.replace(".", ","), MINT if tok in "÷=" else WHITE)], 128) for tok in eq]
    mn = g["paso3"]["minimo"][0]
    mc = rrect_sprite(920, 230, 34, CARD + (255,))
    mc.alpha_composite(text_sprite([("MÍNIMO", SOFT)], 34, "SemiBold", spacing=5), (48, 34))
    mc.alpha_composite(text_sprite([(f"{mn} PANELES", WHITE)], 84, "ExtraBold"), (44, 82))
    S["min_card"] = mc
    idl = g["paso3"]["ideal"]
    ic = rrect_sprite(920, 250, 34, (24, 82, 52, 255), MINT + (255,), 4, glow=MINT + (90,))
    ic.alpha_composite(check_icon(80), (40 + 40, 40 + 46))
    ic.alpha_composite(text_sprite([(f"IDEAL: {idl[0]}", MINT)], 110, "ExtraBold"), (40 + 140, 40 + 14))
    ic.alpha_composite(text_sprite([(idl[1], WHITE)], 36, "SemiBold"), (40 + 48, 40 + 170))
    S["ideal_card"] = ic
    S["pan_w"] = panel_icon(170)
    S["pan_m"] = panel_icon(170, MINT, 120)
    S["pan_dim"] = panel_icon(170, (120, 160, 135), 25)
    ct = g["cta"]["titulo"]
    S["cta_t"] = [text_sprite([(ct[0][0], ct[0][1])], 104, maxw=940), text_sprite([(ct[1][0], ct[1][1]), (ct[1][2], ct[1][3])], 104, maxw=940)]
    c1, c2, _ = g["cta"]["card"]
    cc = rrect_sprite(920, 220, 36, MINT + (255,), glow=MINT + (70,))
    t1 = text_sprite([(c1, FOREST)], 56, "Bold")
    t2 = text_sprite([(c2, FOREST)], 40, "Medium")
    cc.alpha_composite(t1, ((cc.width - t1.width) // 2, 40 + 40))
    cc.alpha_composite(t2, ((cc.width - t2.width) // 2, 40 + 128))
    S["cta_card"] = cc
    S["sigue"] = text_sprite([(g["cta"]["sigue"][0], MINT)], 38, "SemiBold", spacing=6)
    return S


def num_text(v, unit, size, unit_size, color=WHITE, prefix=""):
    s = prefix + f"{v:.1f}".replace(".", ",")
    return text_sprite([(s, color)], size), text_sprite([(" " + unit, MINT)], unit_size, "Bold")


def draw_number(frame, v, unit, cx, cy, size, unit_size, a, color=WHITE, prefix=""):
    n, u = num_text(v, unit, size, unit_size, color, prefix)
    w = n.width + u.width
    put(frame, n, cx - w / 2, cy, a, anchor="l")
    put(frame, u, cx - w / 2 + n.width, cy + size * 0.22, a, anchor="l")


def render(t, S, BG, LINES, BANDS):
    fr = BG.copy()
    # líneas diagonales en deriva lenta
    off = int((t * 18) % 60)
    fr.alpha_composite(LINES.crop((off, 0, off + W, H)))
    g = GUION

    # ---- HOOK
    sc = Scene(*g["hook"]["t"])
    if t < sc.t1:
        v = sc.vis(t)
        put(fr, S["logo"], W / 2, 250, ease_out(prog(t, 0.0, 0.5)) * v, 0.9 + 0.1 * ease_out(prog(t, 0, 0.5)))
        for i, sp in enumerate(S["hook_t"]):
            p = prog(t, 0.15 + i * 0.22, 0.55)
            put(fr, sp, W / 2, 560 + i * 140 + 50 * (1 - ease_out(p)), ease_out(p) * v)
        p = prog(t, g["hook"]["sub"][1], 0.5)
        put(fr, S["hook_sub"], W / 2, 990 + 20 * (1 - ease_out(p)), ease_out(p) * v)
        p = prog(t, g["hook"]["alerta"][2], 0.55)
        if p > 0:
            shake = math.sin((t - g["hook"]["alerta"][2]) * 40) * 10 * (1 - p) if p < 1 else 0
            put(fr, S["hook_alerta"], W / 2 + shake, 1150, ease_out(p) * v, back_out(p) * 0.9 + 0.1)
        p = prog(t, g["hook"]["nota"][1], 0.5)
        put(fr, S["hook_nota"], W / 2, 1300, ease_out(p) * v)
        if p > 0:
            bob = 12 * math.sin((t - g["hook"]["nota"][1]) * 6)
            put(fr, S["arrow"], W / 2, 1400 + bob, ease_out(p) * v)

    # ---- PASO 1
    sc = Scene(*g["paso1"]["t"])
    if sc.t0 - 0.1 < t < sc.t1:
        v, t0 = sc.vis(t), sc.t0
        put(fr, S["logo"], W / 2, 250, v)
        p = prog(t, t0 + 0.2, 0.45)
        put(fr, S["paso1_chip"], W / 2, 360, ease_out(p) * v, back_out(p) * 0.6 + 0.4)
        p = prog(t, t0 + 0.35, 0.55)
        put(fr, S["p1_t"], W / 2, 470 + 40 * (1 - ease_out(p)), ease_out(p) * v)
        for i, (row, (_, _, tr)) in enumerate(zip(S["rows"], g["paso1"]["filas"])):
            p = prog(t, tr - 0.1, 0.5)
            put(fr, row, W / 2 + 160 * (1 - ease_out(p)), 620 + i * 122, ease_out(p) * v)
        tot, tt, _ = g["paso1"]["total"]
        p = prog(t, tt, 0.4)
        if p > 0:
            lw = 920 * ease_out(p)
            d = ImageDraw.Draw(fr)
            d.rounded_rectangle([W / 2 - lw / 2, 1240, W / 2 + lw / 2, 1246], radius=3, fill=MINT + (int(255 * v),))
            put(fr, S["total_lab"], W / 2, 1300, ease_out(p) * v)
            c = ease_out(prog(t, tt + 0.2, 1.6))
            pop = 1 + 0.08 * math.sin(math.pi * prog(t, tt + 1.8, 0.35))
            draw_number(fr, tot * c, "kWh", W / 2, 1420, int(190 * pop), 64, ease_out(p) * v)

    # ---- PASO 2
    sc = Scene(*g["paso2"]["t"])
    if sc.t0 - 0.1 < t < sc.t1:
        v, t0 = sc.vis(t), sc.t0
        put(fr, S["logo"], W / 2, 250, v)
        p = prog(t, t0 + 0.2, 0.45)
        put(fr, S["paso2_chip"], W / 2, 360, ease_out(p) * v, back_out(p) * 0.6 + 0.4)
        p = prog(t, t0 + 0.35, 0.55)
        put(fr, S["p2_t"], W / 2, 470 + 40 * (1 - ease_out(p)), ease_out(p) * v)
        ts = g["paso2"]["sol"][2]
        p = prog(t, ts, 0.55)
        if p > 0:
            card = S["sol_card"].copy()
            card.alpha_composite(sun_icon(130, (t - ts) * 0.8), (40, 30))
            put(fr, card, W / 2 - 140 * (1 - ease_out(p)), 680, ease_out(p) * v)
        tp = g["paso2"]["panel"][2]
        p = prog(t, tp, 0.55)
        put(fr, S["panel_card"], W / 2 + 140 * (1 - ease_out(p)), 900, ease_out(p) * v)
        val, unit, tr = g["paso2"]["resultado"]
        p = prog(t, tr, 0.45)
        if p > 0:
            put(fr, S["arrow"], W / 2, 1070 + 10 * math.sin((t - tr) * 6), ease_out(p) * v)
            c = ease_out(prog(t, tr + 0.2, 1.4))
            draw_number(fr, val * c, unit, W / 2, 1230, 170, 58, ease_out(p) * v, MINT, prefix="≈ ")

    # ---- PASO 3
    sc = Scene(*g["paso3"]["t"])
    if sc.t0 - 0.1 < t < sc.t1:
        v, t0 = sc.vis(t), sc.t0
        put(fr, S["logo"], W / 2, 250, v)
        p = prog(t, t0 + 0.1, 0.45)
        put(fr, S["paso3_chip"], W / 2, 360, ease_out(p) * v, back_out(p) * 0.6 + 0.4)
        toks, te = g["paso3"]["ecuacion"]
        gap = 26
        widths = [sp.width + gap for sp in S["eq"]]
        x = W / 2 - sum(widths) / 2
        for i, sp in enumerate(S["eq"]):
            p = prog(t, te + i * 0.28 + (0.6 if i == 4 else 0), 0.45)
            col = sp
            put(fr, col, x + widths[i] / 2, 520 - 60 * (1 - ease_out(p)), ease_out(p) * v, back_out(p) * 0.5 + 0.5)
            x += widths[i]
        mn, tm = g["paso3"]["minimo"]
        p = prog(t, tm, 0.5)
        put(fr, S["min_card"], W / 2, 760 + 60 * (1 - ease_out(p)), ease_out(p) * v)
        # paneles: 2 mínimos + 1 ideal
        ideal_n, _, ti = g["paso3"]["ideal"]
        xs = [W / 2 - 230, W / 2, W / 2 + 230]
        for i in range(3):
            if i < mn:
                p = prog(t, tm + 0.35 + i * 0.2, 0.45)
                put(fr, S["pan_w"], xs[i], 980, ease_out(p) * v, back_out(p) * 0.7 + 0.3)
            else:
                p0 = prog(t, tm + 0.8, 0.4)
                put(fr, S["pan_dim"], xs[i], 980, 0.6 * ease_out(p0) * v * (1 - prog(t, ti, 0.3)))
                p = prog(t, ti, 0.5)
                put(fr, S["pan_m"], xs[i], 980, ease_out(p) * v, back_out(p, 2.4) * 0.7 + 0.3)
        p = prog(t, ti + 0.2, 0.55)
        put(fr, S["ideal_card"], W / 2, 1230 + 70 * (1 - ease_out(p)), ease_out(p) * v, 0.92 + 0.08 * back_out(p))

    # ---- CTA
    sc = Scene(*g["cta"]["t"])
    if t > sc.t0 - 0.1:
        t0 = sc.t0
        for i, sp in enumerate(S["cta_t"]):
            p = prog(t, t0 + 0.2 + i * 0.2, 0.55)
            put(fr, sp, W / 2, 470 + i * 125 + 40 * (1 - ease_out(p)), ease_out(p))
        tc = g["cta"]["card"][2]
        p = prog(t, tc, 0.55)
        pulse = 1 + 0.02 * math.sin(max(0, t - tc - 0.6) * 4) if p >= 1 else back_out(p) * 0.3 + 0.7
        put(fr, S["cta_card"], W / 2, 830, ease_out(p), pulse)
        if p > 0:
            put(fr, S["arrow"], W / 2, 1040 + 12 * math.sin((t - tc) * 6), ease_out(prog(t, tc + 0.4, 0.4)))
        tsg = g["cta"]["sigue"][1]
        p = prog(t, tsg, 0.6)
        put(fr, S["logo_big"], W / 2, 1230, ease_out(p), back_out(p) * 0.4 + 0.6)
        put(fr, S["sigue"], W / 2, 1360, ease_out(prog(t, tsg + 0.3, 0.5)))

    # ---- barridos diagonales de marca entre escenas
    for tb in (g["paso1"]["t"][0], g["paso2"]["t"][0], g["paso3"]["t"][0], g["cta"]["t"][0]):
        p = prog(t, tb - 0.45, 0.9)
        if 0 < p < 1:
            e = ease_io(p)
            for sp, dx, dy in BANDS:
                x = -1600 + e * (W + 3200) + dx
                fr.alpha_composite(sp, (int(x - sp.width / 2), int(H / 2 - sp.height / 2 + dy)))
    return fr


def main():
    preview = "--preview" in sys.argv
    out_dir = P("salida")
    os.makedirs(out_dir, exist_ok=True)
    S = build_sprites()
    BG, LINES = make_background(), lines_layer()
    BANDS = [(band(2600, 520, GREEN + (255,)), 0, 0), (band(2600, 40, MINT + (255,)), -420, 0),
             (band(2600, 22, MINT + (255,)), 420, 0)]
    if preview:
        pd = os.path.join(out_dir, "preview")
        os.makedirs(pd, exist_ok=True)
        for tt in [0.4, 2.5, 6.5, 9.0, 10.2, 13.0, 19.5, 21.0, 26.5, 31.0, 33.5, 36.5, 41.0, 44.5, 49.0]:
            render(tt, S, BG, LINES, BANDS).convert("RGB").save(os.path.join(pd, f"t{tt:05.1f}.jpg"), quality=88)
        print("preview listo:", pd)
        return
    out = os.path.join(out_dir, "VolTech_CuantosPaneles_9x16.mp4")
    n = int(round(DUR * FPS))
    pr = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
                           "-t", f"{DUR}", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-maxrate", "12M",
                           "-bufsize", "20M", "-pix_fmt", "yuv420p", "-profile:v", "high", "-c:a", "aac",
                           "-b:a", "128k", "-shortest", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
    for i in range(n):
        pr.stdin.write(render(i / FPS, S, BG, LINES, BANDS).convert("RGB").tobytes())
        if i % 150 == 0:
            print(f"  {i/FPS:5.1f}s / {DUR}s", flush=True)
    pr.stdin.close()
    if pr.wait():
        sys.exit("FALLÓ ffmpeg")
    print("Listo:", out)


if __name__ == "__main__":
    main()
