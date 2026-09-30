/**
 * Motor DEMO de PromptCraft: reglas locales, sin IA.
 *
 * No entiende la idea: detecta palabras clave para saber qué dimensiones
 * ya están cubiertas y ensambla el prompt con plantillas por destino. La
 * UI lo declara siempre como "modo demo". Con ANTHROPIC_API_KEY el
 * servidor usa `live-engine.ts` en su lugar.
 */
import { getTool } from "./tools";
import {
  MAX_QUESTIONS,
  type Answer,
  type Dimension,
  type PromptResult,
  type Question,
  type ToolId,
} from "./types";

const DETECT: Record<Dimension, RegExp> = {
  objetivo: /\b(quiero|necesito|objetivo|para (que|lograr|aumentar|reducir)|busco|meta)\b/i,
  publico: /\b(p[uú]blico|audiencia|clientes?|usuarios?|lectores?|equipo|gerentes?|estudiantes?|para (mi|los|las|un|una)\b)/i,
  contexto: /\b(actualmente|tengo|trabajo en|empresa|proyecto|negocio|marca|sitio|app|porque|contexto)\b/i,
  resultado: /\b(entregable|resultado|debe (incluir|tener|ser)|que incluya|reporte|informe|propuesta|prototipo)\b/i,
  tono: /\b(tono|estilo|formal|informal|cercano|profesional|minimalista|editorial|serio|divertido)\b/i,
  restricciones: /\b(sin |no (usar|quiero|debe)|m[aá]ximo|m[ií]nimo|l[ií]mite|presupuesto|plazo|debe evitar|restricci[oó]n)\b/i,
  plataforma: /\b(react|next|python|node|typescript|javascript|web|m[oó]vil|ios|android|figma|excel|sheets|notion|linkedin|instagram|wordpress)\b/i,
  archivos: /\b(archivo|adjunto|pdf|csv|xlsx|repositorio|repo|documento|base de datos|carpeta)\b/i,
  formato: /\b(formato|en tabla|lista|bullets|p[aá]rrafos?|json|markdown|diapositivas?|p[aá]ginas?|palabras)\b/i,
  criterios: /\b(criterio|[eé]xito|m[eé]trica|kpi|se considera|aceptaci[oó]n|medir)\b/i,
};

const BANK: Record<Dimension, Omit<Question, "id" | "dimension">> = {
  objetivo: {
    label: "OBJETIVO",
    question: "¿Qué te gustaría conseguir con esto?",
    hint: "Por ejemplo: que más gente me escriba, ahorrar tiempo, entender un tema.",
    skippable: true,
  },
  publico: {
    label: "PÚBLICO",
    question: "¿Para quién es esto?",
    hint: "Una persona o grupo: tus clientes, tu equipo, tú mismo…",
    skippable: true,
  },
  contexto: {
    label: "CONTEXTO",
    question: "¿Hay algo que debería saber para entender tu situación?",
    hint: "Lo que ya tienes, lo que ya intentaste.",
    skippable: true,
  },
  resultado: {
    label: "RESULTADO ESPERADO",
    question: "¿Qué resultado te gustaría obtener al final?",
    hint: "Un texto, una pantalla, un plan, un archivo…",
    skippable: true,
  },
  tono: {
    label: "TONO O ESTILO",
    question: "¿Cómo te gustaría que se sintiera?",
    hint: "Por ejemplo: cercano, serio, divertido, elegante.",
    skippable: true,
  },
  restricciones: {
    label: "RESTRICCIONES",
    question: "¿Hay algo que definitivamente debamos evitar?",
    hint: "Tiempos, tecnologías, estilos o temas que no quieres.",
    skippable: true,
  },
  plataforma: {
    label: "PLATAFORMA",
    question: "¿Dónde vas a usar esto?",
    hint: "Por ejemplo: Figma, Next.js, Excel, Instagram.",
    skippable: true,
  },
  archivos: {
    label: "ARCHIVOS DISPONIBLES",
    question: "¿Tienes archivos o materiales que sirvan de base?",
    hint: "Documentos, datos, un repositorio, imágenes de referencia. Puedes decir «ninguno».",
    skippable: true,
  },
  formato: {
    label: "FORMATO DE ENTREGA",
    question: "¿En qué formato lo quieres?",
    hint: "Lista, tabla, texto corrido, pasos numerados.",
    skippable: true,
  },
  criterios: {
    label: "CRITERIOS DE ÉXITO",
    question: "¿Cómo sabrás que quedó bien?",
    hint: "Una señal simple: «se entiende en 10 segundos», «pasa las pruebas».",
    skippable: true,
  },
};

/** Orden de prioridad por destino: lo primero es lo que más pesa. */
const PRIORITY: Record<ToolId, Dimension[]> = {
  code: ["objetivo", "plataforma", "archivos", "restricciones", "criterios", "contexto", "resultado", "formato", "publico", "tono"],
  design: ["objetivo", "publico", "tono", "plataforma", "restricciones", "resultado", "archivos", "criterios", "contexto", "formato"],
  cowork: ["objetivo", "archivos", "formato", "resultado", "criterios", "contexto", "restricciones", "publico", "tono", "plataforma"],
  auto: ["objetivo", "publico", "contexto", "formato", "tono", "restricciones", "criterios", "resultado", "plataforma", "archivos"],
  general: ["objetivo", "publico", "contexto", "formato", "tono", "restricciones", "criterios", "resultado", "plataforma", "archivos"],
};

export function demoQuestions(idea: string, tool: ToolId): Question[] {
  const words = idea.trim().split(/\s+/).length;
  const missing = PRIORITY[tool].filter((d) => !DETECT[d].test(idea));
  // Si la idea ya cubre casi todo, no se pregunta nada.
  if (missing.length <= 3 && words >= 40) return [];
  const limit = words >= 60 ? 2 : MAX_QUESTIONS;
  return missing.slice(0, limit).map((dimension) => ({
    id: dimension,
    dimension,
    ...BANK[dimension],
  }));
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const clean = (s: string) => s.trim().replace(/\s+/g, " ");

export function demoBuild(
  idea: string,
  tool: ToolId,
  questions: Question[],
  answers: Answer[],
): PromptResult {
  const def = getTool(tool);
  const byDim = new Map<Dimension, string>();
  const supuestos: string[] = [];
  const pendientes: string[] = [];

  for (const q of questions) {
    const a = answers.find((x) => x.questionId === q.id);
    if (a && !a.skipped && clean(a.value)) byDim.set(q.dimension, clean(a.value));
    else if (a?.skipped) {
      supuestos.push(`${cap(q.label.toLowerCase())}: no lo definiste, así que la IA elegirá una opción razonable y te dirá cuál.`);
      pendientes.push(q.question);
    }
  }

  // Dimensiones nunca preguntadas (ya estaban en la idea o quedaron fuera del tope).
  const asked = new Set(questions.map((q) => q.dimension));
  const mejoras = PRIORITY[tool]
    .filter((d) => !asked.has(d) && !DETECT[d].test(idea))
    .slice(0, 4)
    .map((d) => `${cap(BANK[d].label.toLowerCase())}: ${BANK[d].hint ?? BANK[d].question}`);

  const objetivo = byDim.get("objetivo") ?? clean(idea);
  const ctx: string[] = [`Solicitud original del usuario: «${clean(idea)}».`];
  const add = (d: Dimension, prefix: string) => {
    const v = byDim.get(d);
    if (v) ctx.push(`${prefix}: ${v}.`.replace(/\.\.$/, "."));
  };
  add("publico", "Público");
  add("contexto", "Contexto");
  add("plataforma", "Plataforma");
  add("archivos", "Archivos disponibles");
  add("tono", "Tono o estilo");

  const restricciones = [
    byDim.get("restricciones") ?? "No hay restricciones declaradas: no agregues dependencias, alcance ni supuestos que no se hayan pedido.",
    "Si falta información para decidir algo importante, pregunta antes de avanzar.",
  ];
  if (byDim.get("tono")) restricciones.push(`Mantén este tono en todo el resultado: ${byDim.get("tono")}.`);

  const formato = [byDim.get("formato"), byDim.get("resultado") && `Entregable: ${byDim.get("resultado")}`]
    .filter(Boolean)
    .join(" · ") || def.format;

  const criterios = [...(byDim.get("criterios") ? [byDim.get("criterios") as string] : []), ...def.quality];

  return {
    sections: {
      rol: def.role,
      objetivo,
      contexto: ctx.join("\n"),
      tareas: def.tasks,
      restricciones,
      formato,
      criterios,
      pendientes,
    },
    supuestos,
    mejoras,
  };
}
