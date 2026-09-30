import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { demoBuild, demoQuestions } from "@/lib/promptcraft/demo-engine";
import { isLiveConfigured, liveBuild, liveQuestions } from "@/lib/promptcraft/live-engine";
import { ANSWER_MAX, IDEA_MAX, IDEA_MIN } from "@/lib/promptcraft/types";

export const runtime = "nodejs";

const tool = z.enum(["code", "design", "cowork", "general", "auto"]);
const idea = z.string().trim().min(IDEA_MIN).max(IDEA_MAX);
const question = z.object({
  id: z.string().max(40),
  dimension: z.enum([
    "objetivo", "publico", "contexto", "resultado", "tono",
    "restricciones", "plataforma", "archivos", "formato", "criterios",
  ]),
  label: z.string().max(60),
  question: z.string().max(400),
  hint: z.string().max(400).optional(),
  skippable: z.boolean(),
});
const body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("questions"), idea, tool }),
  z.object({
    action: z.literal("build"),
    idea,
    tool,
    questions: z.array(question).max(3),
    answers: z
      .array(
        z.object({
          questionId: z.string().max(40),
          value: z.string().max(ANSWER_MAX),
          skipped: z.boolean(),
        }),
      )
      .max(3),
  }),
]);

// Límite simple en memoria (por proceso): primera barrera contra abuso del
// endpoint que consume créditos de IA. Ver nota en src/lib/rate-limit.ts.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

/** El cliente consulta el modo al cargar para mostrar la etiqueta correcta. */
export async function GET() {
  return NextResponse.json({ mode: isLiveConfigured() ? "live" : "demo" });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, message: "Demasiadas solicitudes. Espera un minuto e inténtalo de nuevo." }, { status: 429 });
  }

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Solicitud inválida. Revisa la idea y las respuestas." }, { status: 422 });
  }
  const data = parsed.data;
  const live = isLiveConfigured();

  try {
    if (data.action === "questions") {
      const questions = live ? await liveQuestions(data.idea, data.tool) : demoQuestions(data.idea, data.tool);
      return NextResponse.json({ mode: live ? "live" : "demo", questions });
    }
    const result = live
      ? await liveBuild(data.idea, data.tool, data.questions, data.answers)
      : demoBuild(data.idea, data.tool, data.questions, data.answers);
    return NextResponse.json({ mode: live ? "live" : "demo", result });
  } catch (error) {
    console.error("[promptcraft]", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, message: "El servicio de IA no respondió. Inténtalo de nuevo en unos segundos." },
      { status: 502 },
    );
  }
}
