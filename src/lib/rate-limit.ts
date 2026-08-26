/**
 * Rate limiting y deduplicación en memoria.
 *
 * Limitación conocida: esto vive en la memoria del proceso del servidor.
 * En un entorno serverless con múltiples instancias, cada instancia tiene
 * su propio conteo — es una primera barrera contra spam/doble clic, no un
 * reemplazo de un rate limiter distribuido (Upstash Redis, etc.) para
 * tráfico alto en producción. Documentado también en el README.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const SUBMISSION_TTL_MS = 10 * 60_000;

type Bucket = { count: number; windowStart: number };

const ipBuckets = new Map<string, Bucket>();
const seenSubmissions = new Map<string, number>();

function prune(map: Map<string, number | Bucket>, ttl: number) {
  const now = Date.now();
  for (const [key, value] of map.entries()) {
    const timestamp = typeof value === "number" ? value : value.windowStart;
    if (now - timestamp > ttl) {
      map.delete(key);
    }
  }
}

export function isRateLimited(ip: string): boolean {
  prune(ipBuckets, WINDOW_MS);
  const now = Date.now();
  const bucket = ipBuckets.get(ip);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    ipBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

export function isDuplicateSubmission(submissionId: string): boolean {
  prune(seenSubmissions, SUBMISSION_TTL_MS);
  if (seenSubmissions.has(submissionId)) {
    return true;
  }
  seenSubmissions.set(submissionId, Date.now());
  return false;
}
