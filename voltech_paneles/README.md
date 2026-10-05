# VolTech · Animaciones educativas 9:16

Animaciones verticales 1080×1920 con la línea gráfica de VolTech (verde bosque, mint y blanco, tipografía Poppins).

| Video | Script | Duración |
|---|---|---|
| ¿Cuántos paneles solares necesitas? | `build.py` | 49,5 s |
| ¿Cuánto puedes ahorrar? (caso Atenas) | `temas.py ahorro` | 31 s |
| ¿Qué pasa cuando se va la luz? | `temas.py apagon` | 34 s |
| ¿Cuánto dura un panel solar? | `temas.py duracion` | 22 s |
| Soluciones eléctricas | `temas.py electricas` | 22 s |

```bash
python3 build.py                # video de paneles → salida/
python3 temas.py                # los 4 temas → salida/
python3 temas.py ahorro         # solo uno
python3 temas.py --preview      # fotogramas de control
```

- **Textos, números y tiempos:** `GUION` en `build.py` y `TEMAS` en `temas.py`.
- **Colores:** las constantes `FOREST`, `MINT`, `GREEN` y `WHITE` en `build.py`.
- **Audio:** `python3 audio.py` compone la música corporativa y los efectos por síntesis (sin derechos de terceros) y los mezcla en `salida/con_audio/` a -14 LUFS. Los efectos se sincronizan solos con los tiempos de cada escena.

Requiere `ffmpeg` y Python 3 con Pillow.
