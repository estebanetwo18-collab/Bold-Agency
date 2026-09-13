import type { LeadRecord } from "@/lib/lead-record";

/**
 * Reenvío del lead a un webhook configurable (Power Automate, Make, Zapier,
 * un endpoint propio hacia Google Sheets, etc.) vía variables de entorno.
 * Deliberadamente genérico: no se acopla a un solo proveedor, y las
 * credenciales nunca viajan al frontend.
 */

export type WebhookResult =
  | { attempted: false }
  | { attempted: true; ok: true }
  | { attempted: true; ok: false; status?: number; error: string };

export async function forwardLeadToWebhook(lead: LeadRecord): Promise<WebhookResult> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return { attempted: false };
  }

  const method = process.env.LEAD_WEBHOOK_METHOD?.toUpperCase() || "POST";
  const token = process.env.LEAD_WEBHOOK_TOKEN;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(webhookUrl, {
      method,
      headers,
      body: JSON.stringify(lead),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { attempted: true, ok: false, status: response.status, error: `El webhook respondió ${response.status}.` };
    }

    return { attempted: true, ok: true };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: error instanceof Error ? error.message : "Error de red desconocido.",
    };
  }
}
