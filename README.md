# BOLD Agency — Sitio principal

Landing de BOLD Agency construida en Next.js (App Router) + TypeScript +
Tailwind CSS v4, con captura de leads para el Diagnóstico 360 e integración
configurable con Excel Online (u otro CRM) vía webhook.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (tokens de marca definidos en `src/app/globals.css`)
- **Framer Motion** para la coreografía de movimiento
- **Zod** para validación de formularios (cliente y servidor)

## Instalación y ejecución

```bash
npm install
cp .env.example .env.local   # completa las variables que necesites
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
src/
  app/
    page.tsx              # ensambla las secciones de la landing
    layout.tsx             # fuentes, metadata, cursor personalizado
    api/lead/route.ts      # endpoint que recibe el formulario de Diagnóstico 360
    privacidad/, terminos/ # páginas legales (plantillas editables)
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    sections/               # las 11 secciones de la landing
    forms/DiagnosticForm.tsx # formulario de Diagnóstico 360
    layout/                 # Nav y Footer
    ui/                     # Monogram, MagneticButton, Reveal, etc.
  lib/
    content.ts              # todo el copy del sitio, en un solo lugar
    lead-schema.ts           # esquema Zod compartido (cliente + servidor)
    lead-record.ts, lead-storage.ts, lead-webhook.ts, rate-limit.ts
```

Todo el copy visible vive en `src/lib/content.ts`, separado de los
componentes — para editar textos no hace falta tocar JSX.

## Contenido pendiente de confirmar

Ningún dato de este sitio es inventado. Lo que no estaba confirmado en el
material fuente quedó como placeholder explícito, marcado con `// EDITABLE`
o texto entre corchetes en `src/lib/content.ts`:

- **Casos de estudio (VoltTech, FreshGo):** estructura editorial lista, sin
  cifras ni resultados — hay que completarlos con datos reales verificados
  antes de publicar.
- **Planes y precios:** nombres, alcances e "inversión definida tras el
  Diagnóstico 360" son una propuesta editable, no una oferta cerrada.
- **Datos de contacto del footer** (email, WhatsApp, dirección, redes
  sociales): valores de ejemplo, hay que reemplazarlos.
- **Páginas legales** (`/privacidad`, `/terminos`): plantillas con la
  estructura correcta, pendientes del texto legal definitivo.
- **Fotografía:** no se usó ningún banco de imágenes por defecto. El hero y
  las secciones usan geometría/tipografía en vez de fotos de stock sin
  criterio; si se quiere incorporar fotografía en blanco y negro del
  brandbook, el lugar natural es el bloque de `System`/`Differentiators`.

## Captura de leads: cómo funciona

El formulario de Diagnóstico 360 (`#diagnostico`) envía sus datos a
`POST /api/lead`, que:

1. Valida todo con el mismo esquema Zod del cliente (nunca confía solo en
   la validación del navegador).
2. Descarta silenciosamente bots: honeypot (`website`) y un límite mínimo
   de tiempo de llenado (1.5s).
3. Evita duplicados por `submissionId` (UUID generado en el cliente) y
   aplica un límite básico de solicitudes por IP.
4. Reenvía el lead al webhook configurado en `LEAD_WEBHOOK_URL` (ver
   siguiente sección).
5. Si el webhook no está configurado, guarda el lead en
   `.data/leads.local.jsonl` (modo de prueba local, no versionado) — el
   usuario nunca ve un mensaje de éxito que implique falsamente que su
   información ya está en Excel; el mensaje solo confirma que la solicitud
   se recibió, lo cual es cierto en ambos modos.
6. Si el webhook está configurado pero falla, el lead se respalda
   localmente igual y se le informa al usuario que intente de nuevo (sin
   perder lo que ya escribió).

**Limitación conocida:** la deduplicación y el límite de solicitudes viven
en memoria del proceso del servidor. Es una primera barrera contra doble
clic y spam básico, no un reemplazo de un rate limiter distribuido para
tráfico alto en producción con múltiples instancias serverless.

## Conectar con Excel Online

No se necesita ningún SDK ni credencial en el código: todo pasa por una
variable de entorno, `LEAD_WEBHOOK_URL`, a la que el servidor le hace un
`POST` con el lead en JSON. Elige la opción que prefieras:

### Opción A — Power Automate (recomendada, sin código)

1. En [Power Automate](https://make.powerautomate.com), crea un flujo con
   disparador **"Cuando se recibe una solicitud HTTP"**.
2. Agrega la acción **Excel Online (Business) → Agregar una fila a una
   tabla**, apuntando a tu archivo en OneDrive/SharePoint y a una tabla con
   columnas que calcen con los campos del lead (ver `LeadRecord` en
   `src/lib/lead-record.ts`: `submissionId`, `receivedAtIso`, `name`,
   `company`, `contact`, `businessType`, `challenge`, `budget`, `consent`,
   `sourceUrl`, `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`,
   `utmContent`, `referrer`, `timezone`, `submittedAtIso`, `status`).
3. Copia la URL del disparador HTTP y colócala en `LEAD_WEBHOOK_URL`.

### Opción B — Make (Integromat)

1. Crea un escenario con el módulo **Webhooks → Custom webhook** como
   disparador.
2. Agrega el módulo **Microsoft Excel Online → Add a Row** apuntando a tu
   archivo y tabla.
3. Copia la URL del webhook a `LEAD_WEBHOOK_URL`.

### Opción C — Zapier

1. Crea un Zap con trigger **Webhooks by Zapier → Catch Hook**.
2. Como acción, usa **Microsoft Excel → Add Row to Table**.
3. Copia la URL del webhook a `LEAD_WEBHOOK_URL`.

### Opción D — Endpoint propio / Microsoft Graph API

Si prefieres escribir directamente a Excel Online con
[Microsoft Graph API](https://learn.microsoft.com/graph/api/table-post-rows),
monta un endpoint intermedio propio (otra función serverless, un pequeño
servicio) que reciba el POST de este sitio y llame a Graph con tus propias
credenciales de aplicación (nunca las pongas en este repo ni en el
frontend). Ese endpoint intermedio es la URL que va en `LEAD_WEBHOOK_URL`.
Esto también es el punto natural para, más adelante, escribir a un CRM en
lugar de (o además de) Excel.

### Variables de entorno relevantes

```bash
LEAD_WEBHOOK_URL=            # URL del webhook (Power Automate/Make/Zapier/propio)
LEAD_WEBHOOK_METHOD=POST     # método HTTP, por defecto POST
LEAD_WEBHOOK_TOKEN=          # opcional, se envía como "Authorization: Bearer <token>"
```

Si `LEAD_WEBHOOK_URL` queda vacío, el sitio sigue funcionando normalmente
en modo de prueba local (ver sección anterior) — útil para desarrollar y
para QA sin depender de credenciales reales.

## Accesibilidad y rendimiento

- Toda la animación respeta `prefers-reduced-motion` (fallback estático
  real, no solo más lento).
- El cursor personalizado solo se activa en dispositivos con puntero fino
  (`pointer: fine`) y nunca reemplaza el cursor nativo en touch.
- Contraste de texto ajustado a WCAG AA: el gris secundario del brandbook
  (`#8A8A86`) no alcanza 4.5:1 sobre blanco para texto de cuerpo, así que
  el texto corrido usa un tono ligeramente más oscuro (`#6B6B66`); las
  superficies y bordes decorativos conservan el gris claro del brandbook
  sin cambios.
- Metadata, Open Graph, `sitemap.xml` y `robots.txt` están listos; ajusta
  `NEXT_PUBLIC_SITE_URL` en producción.
