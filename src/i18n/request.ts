import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

// No usamos catálogos de mensajes de next-intl (i18n de UI/textos vive en
// src/lib/content/, con el mismo patrón de centralización que ya tenía el
// sitio) — este archivo solo habilita getLocale()/useLocale() en toda la
// app vía el provider de next-intl.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
