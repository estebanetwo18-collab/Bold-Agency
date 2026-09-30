import type { PromptSections } from "./types";

const list = (items: string[]) => items.map((i, n) => `${n + 1}. ${i}`).join("\n");
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

/** Convierte las secciones en el texto final, listo para pegar. */
export function renderPrompt(s: PromptSections): string {
  const parts = [
    `# Rol\n${s.rol}`,
    `# Objetivo\n${s.objetivo}`,
    `# Contexto\n${s.contexto}`,
    `# Tareas\n${list(s.tareas)}`,
    `# Restricciones\n${bullets(s.restricciones)}`,
    `# Formato esperado\n${s.formato}`,
    `# Criterios de calidad\n${bullets(s.criterios)}`,
  ];
  if (s.pendientes.length) {
    parts.push(
      `# Preguntas pendientes\nAntes de empezar, confirma o resuelve con un supuesto explícito:\n${bullets(s.pendientes)}`,
    );
  }
  return parts.join("\n\n");
}
