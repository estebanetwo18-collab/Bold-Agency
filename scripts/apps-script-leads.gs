// BOLD Agency — recibe leads del formulario de Diagnóstico 360, los agrega
// como fila nueva en la hoja y avisa por correo a NOTIFY_EMAIL.
//
// Cómo actualizarlo si ya tenés el script viejo desplegado:
//   1. Abrí la hoja → Extensiones → Apps Script.
//   2. Reemplazá todo el contenido de Code.gs por este archivo.
//   3. Deploy → Manage deployments → ✏️ (editar) → New version → Deploy.
//      (Reusar el mismo deployment mantiene la misma URL /exec, así que
//      NO hace falta tocar LEAD_WEBHOOK_URL en Vercel.)

const NOTIFY_EMAIL = "esteban.munoz@boldagencycr.com";

const COLUMNS = [
  "submissionId", "receivedAtIso", "name", "company", "contact",
  "businessType", "challenge", "budget", "consent", "sourceUrl",
  "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
  "referrer", "timezone", "submittedAtIso", "status",
];

// Etiquetas legibles para el correo — deben calzar 1:1 con los `value` de
// src/lib/content/es.ts → businessTypes/budgetRanges. Si esos arrays
// cambian, actualizar aquí también.
const BUSINESS_TYPE_LABELS = {
  comercio: "Comercio / retail",
  servicios: "Servicios profesionales",
  salud: "Salud y bienestar",
  alimentos: "Alimentos y bebidas",
  construccion: "Construcción e inmobiliaria",
  manufactura: "Manufactura / industria",
  educacion: "Educación y formación",
  tecnologia: "Tecnología / software",
  otro: "Otro",
};

const BUDGET_LABELS = {
  "menos-1000": "Menos de USD 1,000/mes",
  "1000-3000": "USD 1,000 – 3,000/mes",
  "3000-6000": "USD 3,000 – 6,000/mes",
  "6000-mas": "Más de USD 6,000/mes",
  "no-seguro": "Aún no lo tengo claro",
};

function doPost(e) {
  try {
    const lead = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Evita duplicados: si ya existe ese submissionId, no lo vuelve a agregar.
    const existingIds = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1).getValues().flat();
    if (existingIds.includes(lead.submissionId)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: true, duplicate: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const row = COLUMNS.map((key) => lead[key] ?? "");
    sheet.appendRow(row);

    notifyByEmail(lead);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function notifyByEmail(lead) {
  const businessType = BUSINESS_TYPE_LABELS[lead.businessType] || lead.businessType || "—";
  const budget = BUDGET_LABELS[lead.budget] || lead.budget || "—";

  const subject = "Nuevo lead — " + (lead.company || lead.name || "Diagnóstico 360");

  const body = [
    "Nuevo lead desde el formulario de Diagnóstico 360:",
    "",
    "Nombre: " + (lead.name || "—"),
    "Negocio: " + (lead.company || "—"),
    "Contacto: " + (lead.contact || "—"),
    "Tipo de negocio: " + businessType,
    "Presupuesto aproximado: " + budget,
    "Desafío principal: " + (lead.challenge || "—"),
    "",
    "Recibido: " + (lead.receivedAtIso || "—"),
    "Página de origen: " + (lead.sourceUrl || "—"),
    "",
    "Hoja completa: https://docs.google.com/spreadsheets/d/12FDeO18EmZxTp17NsdJmhmb5lLrV__hWKUQNKAIKhpI/edit",
  ].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
