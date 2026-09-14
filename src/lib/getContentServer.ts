import { getLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";

/** Copy del sitio para el idioma activo, para Server Components. */
export async function getServerContent() {
  const locale = (await getLocale()) as AppLocale;
  return getContent(locale);
}
