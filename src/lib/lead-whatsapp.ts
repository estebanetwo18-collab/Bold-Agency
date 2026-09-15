import type { LeadRecord } from "@/lib/lead-record";
import { businessTypes, budgetRanges } from "@/lib/content/es";

/**
 * Aviso de leads por WhatsApp vía CallMeBot: servicio gratuito y no
 * oficial que solo puede enviar mensajes al número que se registró con
 * él — exactamente lo que hace falta acá (avisar al dueño del negocio,
 * no mensajería con clientes). No requiere cuenta de WhatsApp Business
 * ni credenciales de Meta. Ver README.md → "Aviso de leads por WhatsApp".
 *
 * Se ejecuta en paralelo al webhook de Sheets/Excel, no en cadena con
 * él: si CALLMEBOT_PHONE/CALLMEBOT_APIKEY están configuradas, el aviso
 * de WhatsApp sale directo desde acá sin depender de que ese otro canal
 * esté bien armado.
 */
export async function notifyLeadByWhatsApp(lead: LeadRecord): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const businessType =
    businessTypes.find((b) => b.value === lead.businessType)?.label || lead.businessType || "—";
  const budget = budgetRanges.find((b) => b.value === lead.budget)?.label || lead.budget || "—";

  const text = [
    "🔔 Nuevo lead — " + (lead.company || lead.name || "Diagnóstico 360"),
    "",
    "Nombre: " + (lead.name || "—"),
    "Negocio: " + (lead.company || "—"),
    "Contacto: " + (lead.contact || "—"),
    "Tipo de negocio: " + businessType,
    "Presupuesto: " + budget,
    "Desafío: " + (lead.challenge || "—"),
  ].join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php" +
    `?phone=${encodeURIComponent(phone)}` +
    `&apikey=${encodeURIComponent(apikey)}` +
    `&text=${encodeURIComponent(text)}`;

  try {
    await fetch(url, { signal: AbortSignal.timeout(8000) });
  } catch (error) {
    console.error("[lead] Falló el aviso por WhatsApp:", error);
    // No relanzar: un aviso de WhatsApp fallido no debe tumbar el envío
    // del lead — Sheets/Excel y el correo siguen su curso normal.
  }
}
