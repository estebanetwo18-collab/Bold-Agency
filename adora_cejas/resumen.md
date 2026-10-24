# Adora · Reel Cejas Perfectas: resumen

**Resultado:** reel vertical 1080×1920, 30 fps, de 26,1 s, sin audio. El brief pedía 20 a 30 s y la duración exacta quedó como [CONFIRMAR].

## Pasos detectados (en el orden real de las tomas)
1. **Limpieza:** limpieza de la ceja con toallita (IMG_2380 a 2382).
2. **Laminado:** crema desde el tubo, peinado con cepillo (2384 a 2395, 2401 a 2403).
3. **Fijación:** film plástico sobre las cejas y segundo producto (2397 a 2412).
4. **Retiro:** retiro de producto con pad (2414 a 2416).
5. **Diseño:** contorno con pasta blanca, hisopo, palito y pinzas (2417 a 2435).
6. **Color:** tinte café con pincel y retiro (2436 a 2439).
7. **Resultado:** peinado final y reacción de la clienta (2445 a 2451).

En el reel el orden queda Limpieza, Laminado, Fijación, Diseño, Color y Resultado. El Retiro no tiene sección propia: el único plano de retiro (IMG_2415) quedó dentro de la Fijación, y los otros planos de retiro no se usaron para no pasarse de duración. No hay un paso de "Nutrición" en las tomas, así que no se incluyó.

⚠️ **[REVISAR]** El orden de Retiro y Diseño según el salón (laminado antes que diseño, o al revés) lo deducí por lo que se ve. Confirma con la técnica que el orden de las etapas es el correcto.

## Antes y después
- **ANTES:** IMG_2383, perfil de cerca con la ceja natural.
- **DESPUÉS:** IMG_2451, perfil de cerca sonriendo con las cejas terminadas. Es el mismo ángulo y se usa en la pantalla dividida.
- Respaldo del después: IMG_2450 (frontal, sonriendo).

## Clips usados (22 de 71, en 25 planos)
2380, 2381, 2383, 2385, 2388, 2390, 2397, 2398, 2401, 2405, 2408, 2415, 2421, 2422, 2435, 2436, 2438, 2439, 2446, 2448, 2450 y 2451 (se usa en el hook, en la pantalla dividida y en el cierre).

## Clips descartados
| Clip | Motivo |
|---|---|
| IMG_2396 | Desenfocado, el tubo tapa el plano |
| IMG_2404 | Demasiado corto (un solo fotograma útil) |
| IMG_2409 | La camilla tapa media imagen |
| IMG_2419 | 0,8 s y la cabeza de la técnica tapa el encuadre |
| IMG_2382, 2386, 2431 | Temblor o mano tapando la ceja (solo respaldo) |

El resto de los clips quedó como material de respaldo y no se usó por repetición. Todos se ven en `analisis_clips.csv`.

## Decisiones de edición
- **Ritmo:** 100 BPM, cortes cada 0,6 s o 0,3 s. Planos de 0,6 a 1,5 s; el cierre dura 3 s.
- **Hook:** Antes (1,5 s) → Después con barrido de línea crema (0,33 s) → pantalla dividida (1,2 s) → título "Cejas Perfectas". Se probaron dos variantes (`build.py --hooks`): barrido con línea crema y flash blanco con zoom. Gana el **barrido**: deja ver antes y después a la vez y se lee como comparación; el flash blanco borra el rostro unos 0,2 s y se siente más como un efecto.
- **Transiciones:** 17 de 25 son cortes limpios; las otras 8 son 1 slider, 3 disoluciones de 5 fotogramas, 1 zoom punch, 1 whip, 1 flash y 1 light leak cálido. Nunca hay dos fuertes seguidas.
- **Speed ramp** en la aplicación del tubo (2390), el peinado con cepillo (2401) y el tinte (2436): más rápido al entrar y al salir, más lento en el detalle.
- **Color:** exposición igualada entre tomas, calidez, rosa en las altas luces, negros mate, saturación al 94 % y grano fino.
- **Fuentes:** Playfair Display (redonda más itálica) en crema para los títulos, Poppins para las burbujas, Noto Color Emoji para los emojis.
- **Zona segura:** textos dentro del 10 % superior al 85 % inferior y con margen lateral de 80 px.
- **Logo y CTA:** por pedido del cliente, el reel cierra limpio: sin logo, sin CTA y sin firma, solo el resultado. El teléfono y el llamado a agendar quedan en `caption.txt`. El logo oficial recortado de `ARTE_FINAL_FRENTE_ADORA.ai` sigue en `assets/` por si se quiere volver a usar.
- **Audio:** sin música (no hay archivo con licencia). Se entrega `beats_sugeridos.txt`. Se descartó el audio original de los clips.

## Textos del reel [CONFIRMAR todo el copy]
- Hook: "Antes", "Después", "Cejas Perfectas", "Levantá tu mirada ✨"
- Pasos: "preparamos la piel 🤍", "peinamos hacia arriba", "fijamos la forma", "dibujamos tu forma", "color a tu medida"
- Humor: "Spoiler: te va a encantar 🩷" (se quitó "Me da miedo el cambio…" por pedido del cliente)
- Beneficios aprobados: "cejas definidas ✨", "resultados hasta 6 semanas"
- Cierre: sin texto.

## No pude hacer
- **Entrar a su Instagram.** Instagram bloqueó el acceso desde la sesión en la nube. Me guié por las capturas del perfil que me pasaste y por el arte del `.ai`. Si ves algo fuera de su estilo, avísame.
- **Detectar los beats de una canción**, porque no hay música. El ritmo es el sugerido en `beats_sugeridos.txt`.
