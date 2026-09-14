"use client";

import { useLocale } from "next-intl";
import { getContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";

/** Copy del sitio para el idioma activo, para Client Components. */
export function useContent() {
  const locale = useLocale() as AppLocale;
  return getContent(locale);
}
