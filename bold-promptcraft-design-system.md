# BOLD × PromptCraft — Sistema de diseño

Fuente: *BOLD Guía Visual*. Implementación: `src/app/[locale]/promptcraft/promptcraft.css` (tokens `--pc-*` y clases `.pc-*`) y `src/components/promptcraft/`. **Todo componente futuro reutiliza este sistema.**

## Colores
| Token | Hex | Uso |
|---|---|---|
| Ink | `#111111` | Fondo principal, texto sobre Paper |
| Paper | `#FFFFFF` | Fondo de lectura, texto sobre Ink |
| Volt | `#F2E64D` | Acento, chevron, estado activo, CTA primario sobre Ink |
| Gris dato | `#8A8A86` | Datos/metadatos y texto grande sobre Ink |
| Gris cuerpo (`--pc-grey-body`) | `#5F5F5B` | Único ajuste: Gris dato oscurecido para texto pequeño sobre Paper (AA 4.5:1) |

Sin degradados de color, sin tonos fuera de paleta. Volt sobre Paper nunca como texto.

## Tipografías y pesos
- **Display Black 900** — títulos (`.pc-display`). Reemplazo: Archivo (Creato Display es comercial; cambiar en `promptcraft/layout.tsx` al tener los .woff2).
- **Display Bold 700** — etiquetas y subtítulos (`.pc-label`).
- **Display Light 300** — cuerpo (`.pc-body`).
- **UI Monospace** (JetBrains Mono 500) — números, datos, estados, metadatos (`.pc-data`).

## Tracking
- BOLD / títulos: `-0.045em` (−45). Interlineado `0.92`.
- AGENCY (`.pc-agency`): `+0.42em` (+420).
- Etiquetas: `0.3em`, mayúsculas. Datos mono: `0.14em`, mayúsculas.

## Escalas
- Títulos: hero `clamp(2.75rem, 9.5vw, 5.25rem)`; sección `clamp(2.25rem, 6vw, 4.5rem)`; pregunta/resultado `3xl→6xl`; ítems `2xl→4xl`.
- Datos: 12px mono (`.pc-data`); números grandes de método/selector `text-4xl/5xl` mono bold.
- Cuerpo: 16–20px, peso 300. Campos de texto: mínimo 16px (evita zoom iOS).

## Márgenes y retícula
- Contenedor `.pc-wrap`: máx 80rem, gutter `clamp(1.25rem, 5vw, 3.5rem)`.
- Hero: 12 columnas (contenido 7–8, anatomía 4). Método: `número | título | texto`. Taller: `0.8fr | 1.4fr`.
- Secciones alternan Ink / Paper / Ink / Paper con corte diagonal (`.pc-cut-top`).

## Divisores
- Divisor Volt **56 × 2 px** (`.pc-rule`) sobre cada título de bloque.
- Líneas rectas: 2px Ink/Volt para encabezados; 1px al 20–30% para filas.

## Chevron
`<Chevron />` (polígono `0,0 38,0 100,30 38,60 0,60 62,30`), Volt sobre Ink. **Es navegación y dirección, no decoración**: nav superior (activo = Volt lleno), franjas "Siguiente" entre secciones (`direction="down"`), progreso del taller, botones de avance/retroceso, estado de cada destino.

## Diagonales y triángulos
- `.pc-diagonals` / `.pc-diagonals-soft`: diagonales blancas a −58° sobre Ink; en bordes, con máscara. No saturar: máx. una banda por sección.
- `<Triangle />`: acento blanco sobre Ink, un solo uso por composición.

## Tarjetas
Solo cuando hacen falta. Fondo translúcido, **radio 0**, borde 1px (`.pc-card` sobre Ink, `.pc-card-paper` sobre Paper). Sin sombras.

## Estados interactivos
- Foco visible: outline 3px Volt + anillo Ink (en Paper: Ink + anillo Volt). Nunca se elimina.
- Selección/activo: fondo Volt + texto Ink (selector), chevron relleno.
- Hover: `paper/10` sobre Ink; subrayado en enlaces de texto.
- Deshabilitado: opacidad 60%. Error: bloque Ink con etiqueta Volt, `role="alert"`. Carga: barra diagonal Volt/Ink (`.pc-loading-bar`), estática con `prefers-reduced-motion`.
- Tamaño táctil mínimo 44–48px. Los mensajes del modo demo son siempre visibles.

## Responsive
- Sin scroll horizontal desde 320px. Breakpoints Tailwind: sm 640, lg 1024.
- < lg: el chevron grande se sustituye por franja de chevrons; anatomía en 2 columnas; nav muestra solo `01–04`.
- Botones a ancho completo en móvil; acciones siempre bajo el campo (no tapadas por el teclado); el prompt final usa `pre-wrap` + `break-words`.

## Prohibido
Radios (salvo 0), blobs, burbujas, ilustraciones infantiles, degradados, morados/azules u otros colores fuera de paleta, sombras de interfaz genéricas, tipografías redondeadas o geométricas excesivas, tres tarjetas redondeadas idénticas, tarjetas gigantes vacías, frases vacías de marketing ("desbloquea tu potencial", "la herramienta definitiva"), simular una conexión de IA sin declararla.

## Experiencia conversacional (rediseño v2)
PromptCraft es **una sola pantalla de trabajo**, no una landing con secciones. Reglas para cualquier cambio futuro:
- Un solo espacio central (`max-w-3xl`) que cambia de momento: idea → una pregunta a la vez (máx. 3) → prompt listo. Nada de páginas ni pasos separados.
- Primera pantalla: nombre, «¿Qué quieres lograr?», apoyo de una línea, campo grande, destino opcional (5 chips, por defecto «No estoy seguro») y un botón. Sin listas de funciones ni métricas.
- Ayuda mínima: tres ejemplos clicables bajo el compositor y «Cómo funciona» como franja Volt plegable en la barra superior.
- Las preguntas son humanas y nunca bloquean: «No estoy seguro», «Prefiero que tú lo decidas» y «Omitir» avanzan siempre; Enter envía la respuesta.
- Tono: cercano, claro y tranquilo. Prohibido: «Input requerido», «Configuración avanzada», «Parámetros», «Estructura del prompt», «Completa todos los campos».
- Chevron y diagonales son orientación sutil (eyebrow, botones, esquina superior), nunca protagonistas. Sin tarjetas: solo línea Volt lateral, bordes rectos de 2px y el bloque Ink del prompt.
- Modo demo siempre visible de forma discreta en el pie («Modo demo · sin IA»).
