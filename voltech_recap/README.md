# VolTech · Recap de proyecto (Reels 9:16)

Video recap vertical 1080×1920 del proyecto solar en Atenas, con la línea gráfica de VolTech.

## Cómo generar el video

```bash
python3 build.py            # render final → salida/VolTech_Recap_Atenas_9x16.mp4 (+ .srt)
python3 build.py --preview  # render rápido a 540×960 para revisar
```

Requiere `ffmpeg` (con libass) y Python 3 con Pillow (`pip install pillow`).

## Material (no va en git)

Poné el material en `media/` con esta estructura:

- `media/fotos/`: fotos del proyecto (la selección de la carpeta "SELECCIONADAS" de Drive)
- `media/videos/`: videos del proyecto
- `media/audio/locucion.opus`: la locución

## Qué se cambia y dónde (todo en `config.json`)

| Quiero cambiar… | Dónde |
|---|---|
| Colores de marca, fuentes, logo | `marca` |
| Fotos o videos de cada plano | `planos[].src` |
| Duración u orden de un plano | `planos[].inicio` / `planos[].fin` (segundos del video final) |
| Desde qué segundo arranca un video | `planos[].entrada` |
| Movimiento de una foto | `planos[].movimiento`: `acercar`, `alejar`, `derecha`, `izquierda`, `subir`, `bajar` |
| Foto horizontal dentro de un marco de marca | `planos[].tipo: "foto_marco"` |
| Transición al entrar a un plano | `planos[].transicion` (tipos de xfade: `fade`, `smoothleft`, `smoothup`, …) |
| Tarjetas de datos (texto, tiempo, altura) | `tarjetas[]` (`label`, `valor`, `inicio`, `fin`, `y` opcional) |
| Intro o cierre con logo | `intro.activar` / `outro.activar` |
| Momento en que entra la locución | `audio.locucion_inicio` |
| Clips que conservan su audio original | `audio.clips_con_audio` |
| Correcciones de palabras en los subtítulos | `subtitulos.correcciones` |

Los subtítulos salen de `assets/transcripcion.json` (transcripción con faster-whisper de la locución y del clip de Germán).
Los planos ya renderizados se guardan en `.cache/`; al cambiar uno, solo ese se vuelve a generar.
