"""Efectos de sonido generados por síntesis (sin muestras de terceros, sin licencias).
Uso: python3 scripts/sfx.py  ->  public/sfx/*.wav
"""
import numpy as np, wave, os

SR = 48000
rng = np.random.default_rng(11)
os.makedirs("public/sfx", exist_ok=True)

def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d)

def lowpass(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same")

def save(name, x, peak=0.7):
    x = x / (np.abs(x).max() + 1e-9) * peak
    fade = min(len(x), 400)
    x[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(f"public/sfx/{name}.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

# whoosh: ruido filtrado con barrido de brillo y envolvente en campana
n = int(0.5 * SR); t = np.arange(n) / SR
noise = rng.normal(0, 1, n)
bright = lowpass(noise, 6) - lowpass(noise, 60)
dark = lowpass(noise, 60)
mix = np.sin(np.pi * t / t[-1])
save("whoosh", (dark * (1 - mix) + bright * mix) * np.sin(np.pi * t / t[-1]) ** 2, 0.55)
# pop: seno corto con caída de tono
n = int(0.18 * SR); t = np.arange(n) / SR
f = 520 * np.exp(-t * 18) + 180
save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.05), 0.6)
# click (interruptor): dos transitorios
n = int(0.12 * SR); x = np.zeros(n)
for o, a in ((0, 1.0), (int(0.035 * SR), 0.6)):
    k = int(0.006 * SR)
    x[o:o + k] += a * rng.normal(0, 1, k) * np.exp(-np.arange(k) / 60)
save("click", lowpass(x, 3), 0.5)
# tick: golpe brillante corto
n = int(0.08 * SR); t = np.arange(n) / SR
save("tick", np.sin(2 * np.pi * 1800 * t) * env(n, 0.001, 0.015), 0.35)
# drop: golpe grave suave (algo que cae y asienta)
n = int(0.35 * SR); t = np.arange(n) / SR
f = 140 * np.exp(-t * 9) + 55
save("drop", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.004, 0.09), 0.75)
# rise: acorde que sube (energía que se activa)
n = int(0.9 * SR); t = np.arange(n) / SR
x = sum(np.sin(2 * np.pi * fr * (1 + 0.25 * t) * t) / (i + 1) for i, fr in enumerate((330, 495, 660)))
save("rise", x * np.minimum(1, t / 0.6) * np.exp(-np.maximum(0, t - 0.6) / 0.1), 0.4)
# flicker: zumbido eléctrico entrecortado
n = int(0.6 * SR); t = np.arange(n) / SR
hum = np.sin(2 * np.pi * 120 * t) + 0.5 * np.sin(2 * np.pi * 240 * t) + 0.2 * rng.normal(0, 1, n)
gate = (np.sin(2 * np.pi * 9 * t + 3 * np.sin(2 * np.pi * 3 * t)) > 0).astype(float)
save("flicker", hum * lowpass(gate, 200) * np.exp(-t / 0.4), 0.4)
print(sorted(os.listdir("public/sfx")))
