#!/usr/bin/env bash
# Render completo: tiempos de voz -> subtítulos/SRT -> 4 MP4 -> QA.
# Uso: bash scripts/render.sh            (usa data/vo_0X_words.json existentes)
#      bash scripts/render.sh --retime   (re-transcribe la voz nueva de audio/ y regenera los tiempos)
set -euo pipefail
cd "$(dirname "$0")/.."
BE="${REMOTION_BROWSER:-$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/ 2>/dev/null | head -1)chrome-headless-shell}"
mkdir -p out/qa public/audio
for n in 01 02; do
  src=$(ls audio/vo_$n.* | head -1)
  # voz normalizada a -16 LUFS (dos pasadas)
  J=$(ffmpeg -hide_banner -i "$src" -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  read -r I TP LRA TH OFF <<<"$(echo "$J" | python3 -c "import json,sys;d=json.load(sys.stdin);print(d['input_i'],d['input_tp'],d['input_lra'],d['input_thresh'],d['target_offset'])")"
  ffmpeg -v error -y -i "$src" -af "loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=$I:measured_TP=$TP:measured_LRA=$LRA:measured_thresh=$TH:offset=$OFF:linear=true,aresample=48000" -c:a pcm_s16le public/audio/vo_$n.wav
  if [[ "${1:-}" == "--retime" ]]; then
    python3 scripts/transcribe.py "$src" data/raw_$n.json medium
    python3 scripts/align.py data/guion_$n.txt data/raw_$n.json data/vo_${n}_words.json
  fi
  python3 scripts/subs.py $n
done
[[ -d public/sfx ]] || python3 scripts/sfx.py
render() { npx remotion render src/index.ts "$1" "out/$2" --browser-executable="$BE" --concurrency="$(nproc)" \
  --codec=h264 --crf="${CRF:-18}" --x264-preset="${X264_PRESET:-medium}" --audio-codec=aac --audio-bitrate="${AUDIO_BR:-192k}" --pixel-format=yuv420p --log=error; }
render V1-9x16 VoltTech_V1_DeDondeSaleLaLuz_9x16.mp4
render V1-4x5  VoltTech_V1_DeDondeSaleLaLuz_4x5.mp4
render V2-9x16 VoltTech_V2_MitoApagon_9x16.mp4
render V2-4x5  VoltTech_V2_MitoApagon_4x5.mp4
[[ "${SKIP_QA:-}" == 1 ]] || python3 scripts/qa.py
