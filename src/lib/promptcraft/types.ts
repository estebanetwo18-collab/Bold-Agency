export type ToolId = "code" | "design" | "cowork" | "general";

export type Dimension =
  | "objetivo"
  | "publico"
  | "contexto"
  | "resultado"
  | "tono"
  | "restricciones"
  | "plataforma"
  | "archivos"
  | "formato"
  | "criterios";

export type Question = {
  id: string;
  dimension: Dimension;
  /** Etiqueta corta en mayúsculas para la UI. */
  label: string;
  question: string;
  hint?: string;
  /** false = obligatoria (sin ella el prompt no tiene sentido). */
  skippable: boolean;
};

export type Answer = { questionId: string; value: string; skipped: boolean };

export type PromptSections = {
  rol: string;
  objetivo: string;
  contexto: string;
  tareas: string[];
  restricciones: string[];
  formato: string;
  criterios: string[];
  pendientes: string[];
};

export type PromptResult = {
  sections: PromptSections;
  supuestos: string[];
  mejoras: string[];
};

/** "demo" = motor local por reglas; "live" = modelo de IA vía servidor. */
export type EngineMode = "demo" | "live";

export type QuestionsResponse = { mode: EngineMode; questions: Question[] };
export type BuildResponse = { mode: EngineMode; result: PromptResult };

export const IDEA_MIN = 15;
export const IDEA_MAX = 2000;
export const ANSWER_MAX = 600;
