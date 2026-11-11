"""Bloques de subtítulo (2–4 palabras) + SRT, desde el JSON de palabras alineado.
Uso: python3 scripts/subs.py 01  ->  data/vo_01_subs.json y out/VoltTech_V1_DeDondeSaleLaLuz.srt
"""
import json, sys

n = sys.argv[1]
names = {"01": "VoltTech_V1_DeDondeSaleLaLuz", "02": "VoltTech_V2_MitoApagon"}
words = json.load(open(f"data/vo_{n}_words.json", encoding="utf-8"))
WEAK = {"en", "un", "una", "la", "el", "de", "a", "tu", "tus", "por", "con", "que", "y", "o", "se", "sin", "te", "lo", "es"}
blocks, cur = [], []
for i, w in enumerate(words):
    cur.append(i)
    punct = w["word"][-1] in ".,:?…!"
    if punct and (len(cur) >= 2 or w["word"][-1] in ".?…!"):
        blocks.append(cur); cur = []
    elif len(cur) == 4:
        # no cortar el bloque en una palabra débil ("en", "la"...): pasa al siguiente
        if words[cur[-1]]["word"].lower() in WEAK:
            blocks.append(cur[:-1]); cur = cur[-1:]
        else:
            blocks.append(cur); cur = []
if cur:
    if len(cur) == 1 and blocks and len(blocks[-1]) < 4:
        blocks[-1] += cur
    else:
        blocks.append(cur)
for k in range(1, len(blocks)):
    if len(blocks[k]) == 1 and len(blocks[k - 1]) >= 3:
        blocks[k] = [blocks[k - 1].pop()] + blocks[k]
out = []
for k, b in enumerate(blocks):
    start = words[b[0]]["start"]
    end = words[blocks[k + 1][0]]["start"] if k + 1 < len(blocks) else words[b[-1]]["end"] + 0.4
    end = min(end, words[b[-1]]["end"] + 0.6)
    out.append({"start": round(start, 3), "end": round(end, 3), "words": b})
json.dump(out, open(f"data/vo_{n}_subs.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

def ts(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
with open(f"out/{names[n]}.srt", "w", encoding="utf-8") as f:
    for k, b in enumerate(out, 1):
        f.write(f"{k}\n{ts(b['start'])} --> {ts(b['end'])}\n{' '.join(words[i]['word'] for i in b['words'])}\n\n")
import subprocess
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                            f"public/audio/vo_{n}.wav"], capture_output=True, text=True).stdout)
json.dump({"audio_s": round(dur, 3)}, open(f"data/vo_{n}_meta.json", "w"))
print(n, round(dur, 2), "s;", len(out), "bloques;", max(len(b["words"]) for b in out), "palabras máx")
