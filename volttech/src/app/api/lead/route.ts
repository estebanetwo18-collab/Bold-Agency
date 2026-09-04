import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/lead-schema";
import { toLeadRecord } from "@/lib/lead-record";
import { persistLeadLocally } from "@/lib/lead-storage";
import { forwardLeadToWebhook } from "@/lib/lead-webhook";
import { isDuplicateSubmission, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MIN_FILL_TIME_MS = 1500;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisa los campos del formulario.",
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 422 },
    );
  }

  const values = parsed.data;

  // Honeypot: un bot llenó un campo que ningún humano ve.
  if (values.website) {
    return NextResponse.json({ ok: true });
  }

  // Anti-bot por tiempo: un envío casi instantáneo casi nunca es humano.
  if (Date.now() - values.formRenderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  if (isDuplicateSubmission(values.submissionId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const lead = toLeadRecord(values);
  const webhookConfigured = Boolean(process.env.LEAD_WEBHOOK_URL);
  const webhookResult = await forwardLeadToWebhook(lead);

  if (!webhookConfigured) {
    console.warn(
      "[lead] LEAD_WEBHOOK_URL no está configurado — modo de prueba local. " +
        "El lead se guarda en .data/leads.local.jsonl y NO se envía a ningún CRM.",
    );
    await persistLeadLocally(lead);
    return NextResponse.json({ ok: true, mode: "test" });
  }

  if (webhookResult.attempted && !webhookResult.ok) {
    console.error("[lead] Falló el envío al webhook configurado:", webhookResult.error);
    await persistLeadLocally(lead);
    return NextResponse.json(
      {
        ok: false,
        message: "No pudimos registrar tu solicitud en este momento. Tus datos no se perdieron, por favor intenta de nuevo.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "live" });
}
