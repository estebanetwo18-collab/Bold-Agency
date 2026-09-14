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

const dictionaries: Record<AppLocale, SiteContent> = { es, en, pt };

export function getContent(locale: AppLocale): SiteContent {
  return dictionaries[locale] ?? dictionaries.es;
}
