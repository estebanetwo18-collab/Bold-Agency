# VoltTech Soluciones — Sitio web

Sitio web de VoltTech Soluciones (German Vargas Corrales, cédula 114610102),
empresa de energía solar y servicios eléctricos en San Antonio de la
Amistad, Pérez Zeledón, Costa Rica.

Construido en Next.js (App Router) + TypeScript + Tailwind CSS v4, con
calculadora de cotización propia (vista cliente + vista interna/admin) y
captura de leads vía formulario de contacto.

> Este proyecto vive en `volttech/`, dentro del repositorio de BOLD Agency,
> pero es una aplicación Next.js **completamente independiente** (su propio
> `package.json`, `node_modules`, etc.) — no comparte código ni build con
> el sitio de BOLD Agency que vive en la raíz del repo.

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
      sections/               # Hero, Stats, About, Services, Brands,
                               # Warranties, Process, Calculator, CaseStudy,
                               # Testimonials, Faq, ContactSection, FinalCta
      forms/ContactForm.tsx    # formulario de contacto
      layout/                 # Header y Footer
      ui/                     # PillBadge, CircleIcon, Accordion,
                               # PlaceholderImage, WhatsAppButton, íconos
    lib/
      content.ts               # todo el copy del sitio, en un solo lugar
      pricing.ts                # motor de cálculo de la calculadora
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

- **Fotografía real**: no se pudo acceder al contenido de la carpeta de
  Google Drive compartida (el conector de Drive de esta sesión no devolvió
  archivos dentro de esa carpeta específica, aunque la carpeta en sí es
  accesible). Todas las fotos del sitio (hero, caso del supermercado,
  equipo/instalación) están como **placeholders etiquetados** —
  componente `PlaceholderImage` — hasta recibir las ~20 fotos reales.
  Cuando estén disponibles: colocarlas en
  `public/images/{hero,servicios,proyectos/supermercado,equipo}/` y
  actualizar las rutas `image.src` + `image.isPlaceholder = false` en
  `src/lib/content.ts`.
- **URL exacta de Facebook** de la página "VoltTech Soluciones".
- **2 testimonios adicionales** (solo Edwin Méndez está confirmado).
- **Nombre del supermercado** del caso de éxito (30kW / 34kWp / 64kWh).
- **Logo en alta resolución** — el header/footer usan un monograma "VT"
  como placeholder de marca.

## Despliegue

Pensado para Vercel o Netlify:

```bash
npm run build
```

Configura las variables de entorno de `.env.example` en el panel del
proveedor (`NEXT_PUBLIC_SITE_URL`, `LEAD_WEBHOOK_URL` si aplica,
`NEXT_PUBLIC_CALCULATOR_ADMIN_KEY`).
