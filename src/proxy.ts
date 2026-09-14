import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renombró "middleware" a "proxy" (mismo archivo/función, otro
// nombre) — ver node_modules/next/dist/docs/.../proxy.md.
export const proxy = createMiddleware(routing);

export const config = {
  // Excluye assets estáticos, API y archivos de metadata del negociado de
  // idioma; todo lo demás pasa por el proxy para resolver el locale.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
