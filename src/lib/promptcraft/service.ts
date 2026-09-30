/**
 * Capa de servicio del cliente. Toda la lógica de IA vive en el servidor
 * (/api/promptcraft): aquí nunca hay claves. Para conectar otro proveedor
 * basta con cambiar `live-engine.ts`.
 */
import type {
  Answer,
  BuildResponse,
  EngineMode,
  Question,
  QuestionsResponse,
  ToolId,
} from "./types";

export class ServiceError extends Error {}

async function call<T>(init: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch("/api/promptcraft", init);
  } catch {
    throw new ServiceError("No hay conexión con el servidor. Revisa tu red e inténtalo de nuevo.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new ServiceError(json?.message ?? "Algo salió mal. Inténtalo de nuevo.");
  return json as T;
}

const post = <T,>(payload: unknown) =>
  call<T>({
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

export const fetchMode = () => call<{ mode: EngineMode }>({ method: "GET" });

export const fetchQuestions = (idea: string, tool: ToolId) =>
  post<QuestionsResponse>({ action: "questions", idea, tool });

export const fetchPrompt = (idea: string, tool: ToolId, questions: Question[], answers: Answer[]) =>
  post<BuildResponse>({ action: "build", idea, tool, questions, answers });
