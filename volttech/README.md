# VolTech — Sitio web

Sitio web de VolTech (German Vargas Corrales, cédula 114610102), empresa de
energía solar y servicios eléctricos en San Antonio de la Amistad, Pérez
Zeledón, Costa Rica. Nombre comercial largo: "VolTech Soluciones" — ver nota
de naming en `src/lib/content.ts`.

Construido en Next.js (App Router) + TypeScript + Tailwind CSS v4, con
calculadora de cotización propia (vista cliente + vista interna/admin) y
captura de leads vía formulario de contacto.

> Este proyecto vive en `volttech/`, dentro del repositorio de BOLD Agency,
> pero es una aplicación Next.js **completamente independiente** (su propio
> `package.json`, `node_modules`, etc.) — no comparte código ni build con
> el sitio de BOLD Agency que vive en la raíz del repo.

## Dirección visual

El sitio sigue el **Manual de Marca VolTech v1.0 (2026)** provisto por el
cliente (`src/components/ui/Logo.tsx` recrea el isotipo en SVG a partir de
ese manual — no había archivo vectorial exportado disponible).

- **Paleta**: Verde Bosque `#14532D` (primario/headings), Verde Señal
  `#2E9E4F` (interacción: links, iconos, tabs), Amarillo Sol `#FFCB47`
  — **reservado exclusivamente para llamados a la acción** por el manual de
  marca —, Verde Bruma `#F4F8F3` / Crema `#ECEAE4` de fondo, Carbón `#4A4636`
  de texto. Tokens completos en `src/app/globals.css`.
- **Tipografía**: Poppins única familia (800 titulares / 600 subtítulos / 400
  cuerpo), vía `next/font/google`.
- **Movimiento**: entrada progresiva al hacer scroll (`Reveal`), contadores
  animados (`AnimatedCounter`), parallax sutil en orbes decorativos
  (`ParallaxGlow`), línea de proceso animada — todo sin dependencias nuevas
  (IntersectionObserver + CSS) y respetando `prefers-reduced-motion`.
- **Estructura**: Hero → Propuesta de valor (absorbe la narrativa de "Nosotros")
  → Servicios (segmentado Residencial/Comercial) → Calculadora → Proceso →
  Resultados y confianza (métricas + garantías + marcas, antes 3 secciones
  separadas) → Casos de éxito → Testimonios → FAQ → Contacto → CTA final.
- **Fotografía**: todas las secciones usan fotos reales provistas por el
  cliente — no queda ningún placeholder de imagen en el sitio (ver
  "Contenido pendiente de confirmar" abajo para los detalles de cada foto).

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (paleta de marca definida en `src/app/globals.css`)
- **Zod** para validación de formularios (cliente y servidor)

## Instalación y ejecución

```bash
cd volttech
npm install
cp .env.example .env.local   # completa los valores reales
npm run dev                  # http://localhost:3000
```

Otros comandos:

```bash
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # eslint
```

## Estructura del proyecto

```
volttech/
  src/
    app/
      page.tsx              # ensambla las secciones del sitio
      layout.tsx             # header, footer, metadata
      api/lead/route.ts      # endpoint del formulario de contacto
      privacidad/, terminos/ # páginas legales (plantillas editables)
      sitemap.ts, robots.ts
    components/
      sections/               # Hero, ValueProposition, Services, Calculator,
                               # Process, Results (métricas+garantías+marcas),
                               # CaseStudy, Testimonials, Faq, ContactSection,
                               # FinalCta
      forms/ContactForm.tsx    # formulario de contacto
      layout/                 # Header y Footer
      ui/                     # PillBadge, CircleIcon, Accordion, Reveal,
                               # AnimatedCounter, ParallaxGlow,
                               # PlaceholderImage, WhatsAppButton, íconos
    lib/
      content.ts               # todo el copy del sitio, en un solo lugar
      pricing.ts                # motor de cálculo de la calculadora
      motion.ts                 # hook usePrefersReducedMotion
      lead-schema.ts, lead-record.ts, lead-storage.ts, lead-webhook.ts,
      rate-limit.ts
```

Todo el copy visible vive en `src/lib/content.ts` — para editar textos no
hace falta tocar JSX. Todo lo que no esté confirmado por el cliente lleva
la marca `// EDITABLE` o `[PENDIENTE: ...]` explícita en ese archivo.

## Calculadora de cotización

La lógica vive en `src/lib/pricing.ts` y el componente en
`src/components/sections/Calculator.tsx`.

- **Vista cliente** (pública, en `/#calculadora`): el visitante ingresa el
  monto de su factura eléctrica mensual (o marca un checklist de equipos si
  todavía no tiene electricidad), elige tipo de sistema (on-grid / híbrido /
  off-grid), y recibe un **rango** de precio ya con el margen de VoltTech
  incluido — nunca se ve el desglose de costo base vs. margen. Si el consumo
  estimado cae bajo los umbrales de viabilidad (200 kWh/mes residencial,
  3.000 kWh/año comercial), se muestra un aviso honesto en vez de forzar una
  cotización.
- **Vista interna/admin** (`/?admin=1#calculadora`): agrega un pequeño
  password de demo (`NEXT_PUBLIC_CALCULATOR_ADMIN_KEY` en `.env.local`,
  default `volttech-admin`) — **sin seguridad robusta**, solo para demos
  internas de Steve/German. Muestra el desglose completo: costo base (tabla
  verificada) → margen interno (30%, configurable) → precio final al
  cliente.

### Integridad de los datos de precio

Cada cifra de `src/lib/pricing.ts` lleva su etiqueta de confianza como
comentario junto al dato:

- **Verificado**: la tabla base de precios on-grid (3–30 kW), interpolada
  de la tabla pública de Sunshine Tech (research interno, agosto 2026).
- **Estimado**: costo de batería por kWh, kWh de batería por kW instalado,
  checklist de consumo de equipos.
- **Inferencia**: multiplicador de banco de batería y recargo de
  electrónica en sistemas off-grid, tarifa promedio usada para convertir
  factura → kWh, horas sol pico, relación de rendimiento del sistema.

El margen (`MARGIN_RATE`, 30% por defecto) es configurable en código y
**nunca se muestra en la vista pública**.

## Captura de leads (formulario de contacto)

El formulario de contacto (`#contacto`) envía sus datos a `POST /api/lead`,
que:

1. Valida todo con el mismo esquema Zod del cliente.
2. Descarta silenciosamente bots: honeypot (`website`) y un límite mínimo
   de tiempo de llenado (1.5s).
3. Evita duplicados por `submissionId` (UUID generado en el cliente) y
   aplica un límite básico de solicitudes por IP.
4. Si `LEAD_WEBHOOK_URL` está configurado, reenvía el lead ahí (Power
   Automate, Make, Zapier, o un endpoint propio hacia Google
   Sheets/Excel/CRM).
5. Si no está configurado, guarda el lead en `.data/leads.local.jsonl`
   (modo de prueba local, no versionado) — el usuario nunca ve un mensaje
   de éxito que implique falsamente que ya se guardó en un CRM; el mensaje
   solo confirma que la solicitud se recibió, lo cual es cierto en ambos
   modos.

**Limitación conocida:** el rate limiting y la deduplicación viven en
memoria del proceso — suficiente como primera barrera anti-spam, no un
reemplazo de un rate limiter distribuido para tráfico alto en producción.

## Contenido pendiente de confirmar

Ver `// EDITABLE` y `[PENDIENTE: ...]` en `src/lib/content.ts`. Los más
relevantes:

- **Fotografía**: el cliente proveyó 7 fotos reales (instalación en techo ×2,
  inversor Sol-Ark, calentador solar, tablero eléctrico, equipo en un
  proyecto solar) que ya están en `public/images/` y cubren todas las
  secciones — no queda ningún `PlaceholderImage` activo en el sitio. Por
  balance visual (menos fotos de perfil cerrado de German, más fotos de
  equipo/instalación), la sección de Servicios y el caso de éxito del
  supermercado reutilizan la misma foto de equipo técnico
  (`public/images/proyectos/supermercado/instalacion-comercial.jpg`); el
  calentador solar (`public/images/servicios/equipo-instalacion-paneles.jpg`)
  quedó sin usar en el sitio, disponible para una futura sección o galería.
  Salvedad ya existente: esa foto de equipo técnico es ilustrativa de
  instalación comercial, no confirmada como la foto específica del proyecto
  del caso de éxito — reemplazar si el cliente tiene una foto real de ese
  sitio puntual.
- **Naming "VolTech" vs "VoltTech Soluciones"**: el Manual de Marca fija el
  wordmark como "VolTech" (una t), aplicado en todo el sitio. Instagram y
  Facebook siguen usando el nombre anterior ("VoltTech Soluciones", dos t)
  — confirmar si también se renombran o si "Soluciones" se mantiene como
  nombre comercial largo junto al isotipo corto.
- **Copy "Bajá tu recibo hasta un 70%"**: el Manual de Marca lo lista como
  ejemplo de tono de voz aprobado, pero es una cifra de ahorro no verificada
  — choca con la regla de integridad de datos del proyecto original ("sin
  cifra única de ahorro, nunca un %"). Deliberadamente NO se usó en el sitio.
  Confirmar con el cliente cuál regla prevalece antes de usarla en cualquier
  pieza de marketing.
- **URL exacta de Facebook** de la página.
- **2 testimonios adicionales** (solo Edwin Méndez está confirmado).
- **Nombre del supermercado** del caso de éxito (30kW / 34kWp / 64kWh).
- **Logo vectorial**: se recreó el isotipo en SVG a partir del PDF del
  manual de marca (`src/components/ui/Logo.tsx`) porque el archivo `.ai`
  original no se pudo leer en este entorno — reemplazar por el vector
  exportado real cuando esté disponible (SVG/PNG desde Illustrator).

## Despliegue

Pensado para Vercel o Netlify:

```bash
npm run build
```

Configura las variables de entorno de `.env.example` en el panel del
proveedor (`NEXT_PUBLIC_SITE_URL`, `LEAD_WEBHOOK_URL` si aplica,
`NEXT_PUBLIC_CALCULATOR_ADMIN_KEY`).
