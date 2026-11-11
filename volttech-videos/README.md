# VoltTech · videos animados con voice off

Dos videos animados en código con **Remotion** (React → MP4 cuadro por cuadro), sincronizados con la voz:

- **V1 · «¿De dónde sale la luz?»**: explainer editorial (bloques a sangre, serif grande, grano).
- **V2 · «Mito: con paneles no hay apagón»**: formato Mito/Dato con la misma estética.

Cada video sale en 9:16 (1080×1920) y en 4:5 (1080×1350) desde la misma composición.

## Volver a renderizar (un comando)

```bash
npm install                    # solo la primera vez
bash scripts/render.sh         # 4 MP4 + 2 SRT + QA en out/
```

### Reemplazar la voz

1. Reemplazá `audio/vo_01.mp3` y/o `audio/vo_02.mp3` (sirve .wav o .mp3).
2. Si cambió el texto, actualizá `data/guion_01.txt` / `data/guion_02.txt` (el guion oficial manda en subtítulos y ortografía).
3. Corré `bash scripts/render.sh --retime`.

El script transcribe con faster-whisper (`medium`, español, timestamps por palabra), alinea con el guion y regenera `data/vo_0X_words.json`. Los componentes no se tocan: cada escena arranca en su palabra clave (`data/cues_0X.json`), 4 cuadros antes, y llega a la pose principal sobre la palabra.

## Cambiar colores y tipografías

Todo vive en **`src/theme.ts`**: paleta, fuentes, grano, zonas seguras y anticipación.

- Las fuentes están en `public/fonts/` (woff2).
- Para cambiar una familia, reemplazá los archivos y los nombres en `FONTS`.

## Estructura

| Ruta | Contenido |
|---|---|
| `src/V1.tsx`, `src/V2.tsx` | Escenas de cada video |
| `src/House.tsx` | Casa con paneles compartida |
| `src/lib.tsx` | Layout adaptable, cues, subtítulos, grano, audio, logo |
| `data/` | Guion oficial, palabras con tiempos, cues, bloques de subtítulo |
| `scripts/` | transcribe → align → subs → render → qa; `sfx.py` genera los efectos |
| `out/` | MP4, SRT y `out/qa/` (fotogramas por escena, hojas de contactos, `reporte_qa.md`) |

## Audio

- Voz normalizada a **-16 LUFS** (loudnorm en dos pasadas).
- No hay música: si agregás `audio/music.mp3`, hay que sumarla en `AudioTrack` (`src/lib.tsx`) a -18 dB bajo la voz, con ducking.
- **Efectos**: `whoosh`, `pop`, `click`, `tick`, `drop`, `rise` y `flicker` se **generan por síntesis** en `scripts/sfx.py` (ruido filtrado y osciladores). No usan muestras de terceros ni requieren licencia.

## Licencias

- **Instrument Serif** e **Inter**: SIL Open Font License 1.1 (Google Fonts).
- **Logo VolTech**: propiedad del cliente (`public/logo_volttech.png`).
- **Remotion**: gratis para personas y empresas de hasta 3 empleados. Para empresas más grandes se requiere [licencia de empresa](https://www.remotion.dev/license). **[VALIDAR para Bold Agency]**
