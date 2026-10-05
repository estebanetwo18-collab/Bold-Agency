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
- **Audio:** los videos salen sin locución ni música. Los tiempos de `build.py` siguen el guion de locución, así se puede grabar una voz encima.

Requiere `ffmpeg` y Python 3 con Pillow.
