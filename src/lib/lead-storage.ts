import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadRecord } from "@/lib/lead-record";

const LOCAL_LOG_DIR = path.join(process.cwd(), ".data");
const LOCAL_LOG_FILE = path.join(LOCAL_LOG_DIR, "leads.local.jsonl");

/**
 * Respaldo local en modo de prueba (sin webhook configurado) o como
 * bitácora adicional. En hosting serverless de solo lectura (ej. Vercel)
 * esta escritura puede fallar — se captura el error y se hace fallback a
 * consola, para nunca romper la respuesta al usuario por esto.
 */
export async function persistLeadLocally(lead: LeadRecord): Promise<boolean> {
  try {
    await mkdir(LOCAL_LOG_DIR, { recursive: true });
    await appendFile(LOCAL_LOG_FILE, `${JSON.stringify(lead)}\n`, "utf8");
    return true;
  } catch (error) {
    console.warn(
      "[lead-storage] No se pudo escribir el respaldo local. Lead capturado solo en logs:",
      JSON.stringify(lead),
      error,
    );
    return false;
  }
}
