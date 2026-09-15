import * as es from "./es";
import * as en from "./en";
import * as pt from "./pt";
import type { AppLocale } from "@/i18n/routing";

export type SiteContent = typeof es;

// Chequeo de forma en tiempo de compilación: si en.ts o pt.ts se
// desalinean de la forma de es.ts (la fuente de verdad), esto falla el
// build en vez de romper silenciosamente en producción.
const _typeCheckEn: SiteContent = en;
const _typeCheckPt: SiteContent = pt;
void _typeCheckEn;
void _typeCheckPt;

// "satisfies" en vez de anotar el tipo directo: con el multilenguaje
// deshabilitado (routing.locales = ["es"]), AppLocale es solo "es" y una
// anotación Record<AppLocale, SiteContent> marcaría en/pt como propiedades
// no permitidas. Este objeto sigue teniendo los tres para que reactivar
// el multilenguaje sea solo tocar routing.ts.
const dictionaries = { es, en, pt } satisfies Record<string, SiteContent>;

export function getContent(locale: AppLocale): SiteContent {
  return dictionaries[locale] ?? dictionaries.es;
}
