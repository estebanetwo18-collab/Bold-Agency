"""Transcribe la voz con timestamps por palabra (Whisper solo aporta tiempos)."""
import json, sys
from faster_whisper import WhisperModel
m = WhisperModel(sys.argv[3] if len(sys.argv) > 3 else "medium", device="cpu", compute_type="int8")
segs, _ = m.transcribe(sys.argv[1], language="es", word_timestamps=True, beam_size=5, vad_filter=False)
words = [{"word": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)} for s in segs for w in s.words]
json.dump(words, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
print(" ".join(w["word"] for w in words))
