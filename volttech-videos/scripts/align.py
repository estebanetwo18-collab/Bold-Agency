"""Alinea el GUION OFICIAL con los tiempos de Whisper.
El texto oficial manda (ortografía y subtítulos); Whisper solo aporta start/end.
Uso: python3 scripts/align.py data/guion_01.txt data/raw_01.json data/vo_01_words.json
"""
import json, sys, re, unicodedata, difflib

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9ñ]", "", w)

guion = open(sys.argv[1], encoding="utf-8").read().split()
raw = json.load(open(sys.argv[2], encoding="utf-8"))
a = [norm(w) for w in guion]
b = [norm(w["word"]) for w in raw]
times = [None] * len(guion)
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == "equal":
        for k in range(i2 - i1):
            times[i1 + k] = (raw[j1 + k]["start"], raw[j1 + k]["end"])
    elif tag == "replace" and j2 > j1:
        # reparte el tramo de Whisper entre las palabras oficiales (ej. "Voltex" -> "VoltTech")
        s, e = raw[j1]["start"], raw[j2 - 1]["end"]
        n = i2 - i1
        for k in range(n):
            times[i1 + k] = (s + (e - s) * k / n, s + (e - s) * (k + 1) / n)
# palabras sin tiempo: interpolar entre vecinos
for i, t in enumerate(times):
    if t is None:
        prev = next((times[j][1] for j in range(i - 1, -1, -1) if times[j]), 0.0)
        nxt = next((times[j][0] for j in range(i + 1, len(times)) if times[j]), prev + 0.3)
        times[i] = (prev, max(prev + 0.05, nxt))
out = [{"word": w, "start": round(t[0], 3), "end": round(t[1], 3)} for w, t in zip(guion, times)]
json.dump(out, open(sys.argv[3], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
unmatched = [g for g, x in zip(guion, sm.get_opcodes()) if False]
print(f"{len(out)} palabras · coincidencia {sm.ratio():.2%}")
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag != "equal":
        print(" ", tag, guion[i1:i2], "<-", [raw[j]["word"] for j in range(j1, j2)])
