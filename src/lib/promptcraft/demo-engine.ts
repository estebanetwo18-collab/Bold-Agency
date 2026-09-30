/**
 * Motor DEMO de PromptCraft: reglas locales, sin IA.
 *
 * No entiende la idea: detecta palabras clave para saber qué dimensiones
 * ya están cubiertas y ensambla el prompt con plantillas por destino. La
 * UI lo declara siempre como "modo demo". Con ANTHROPIC_API_KEY el
 * servidor usa `live-engine.ts` en su lugar.
 */
import { getTool } from "./tools";
import type {
  Answer,
  Dimension,
  PromptResult,
  Question,
  ToolId,
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
    question: "¿Qué quieres lograr exactamente, y para qué?",
    hint: "Una frase: la acción y la razón. Ej.: «reducir el tiempo de carga para subir conversiones».",
    skippable: false,
  },
  publico: {
    label: "PÚBLICO",
    question: "¿Quién va a usar o leer el resultado?",
    hint: "Perfil, nivel de conocimiento y qué espera esa persona.",
    skippable: true,
  },
  contexto: {
    label: "CONTEXTO",
    question: "¿Qué debería saber alguien que no conoce tu situación?",
    hint: "Estado actual, lo que ya intentaste, datos clave.",
    skippable: true,
  },
  resultado: {
    label: "RESULTADO ESPERADO",
    question: "¿Qué tiene que existir al terminar?",
    hint: "El entregable concreto: un archivo, una pantalla, un texto, un plan.",
    skippable: true,
  },
  tono: {
    label: "TONO O ESTILO",
    question: "¿Con qué tono o estilo debe sentirse?",
    hint: "Ej.: directo y profesional, editorial, cercano sin ser informal.",
    skippable: true,
  },
  restricciones: {
    label: "RESTRICCIONES",
    question: "¿Qué límites hay? Tiempo, tecnología, presupuesto o cosas que evitar.",
    hint: "Incluye lo que NO debe hacerse.",
    skippable: true,
  },
  plataforma: {
    label: "PLATAFORMA",
    question: "¿Dónde vivirá o se usará esto?",
    hint: "Tecnología, herramienta o canal: Next.js, Figma, Excel, LinkedIn…",
    skippable: true,
  },
  archivos: {
    label: "ARCHIVOS DISPONIBLES",
    question: "¿Qué archivos o materiales existen para trabajar?",
    hint: "Repositorio, documentos, datos, referencias visuales. Di «ninguno» si no hay.",
    skippable: true,
  },
  formato: {
    label: "FORMATO DE ENTREGA",
    question: "¿En qué formato quieres la respuesta?",
    hint: "Lista, tabla, documento, código, pasos numerados, longitud aproximada.",
    skippable: true,
  },
  criterios: {
    label: "CRITERIOS DE ÉXITO",
    question: "¿Cómo sabrás que el resultado está bien hecho?",
    hint: "Una señal verificable: una métrica, una prueba, una condición de aceptación.",
    skippable: true,
  },
};

/** Orden de prioridad por destino: lo primero es lo que más pesa. */
const PRIORITY: Record<ToolId, Dimension[]> = {
  code: ["objetivo", "plataforma", "archivos", "restricciones", "criterios", "contexto", "resultado", "formato", "publico", "tono"],
  design: ["objetivo", "publico", "tono", "plataforma", "restricciones", "resultado", "archivos", "criterios", "contexto", "formato"],
  cowork: ["objetivo", "archivos", "formato", "resultado", "criterios", "contexto", "restricciones", "publico", "tono", "plataforma"],
  general: ["objetivo", "publico", "contexto", "formato", "tono", "restricciones", "criterios", "resultado", "plataforma", "archivos"],
};

const MAX_QUESTIONS = 5;

export function demoQuestions(idea: string, tool: ToolId): Question[] {
  const words = idea.trim().split(/\s+/).length;
  const missing = PRIORITY[tool].filter((d) => !DETECT[d].test(idea));
  // Una idea larga ya cubre buena parte del contexto: pregunta menos.
  const limit = words >= 60 ? 3 : MAX_QUESTIONS;
  // El objetivo siempre se confirma si falta; si la idea es larguísima y
  // cubre todo, no se pregunta nada.
  const picked = missing.slice(0, words >= 120 && missing.length <= 2 ? 0 : limit);
  return picked.map((dimension) => ({
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
      supuestos.push(`${cap(q.label.toLowerCase())}: no se definió; el modelo debe elegir una opción razonable y declararla.`);
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
