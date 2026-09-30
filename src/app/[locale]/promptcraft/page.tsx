import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PromptCraftApp } from "@/components/promptcraft/PromptCraftApp";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "PromptCraft",
  description:
    "Convierte una solicitud incompleta en un prompt claro, estratégico y listo para usar en Claude Code, Claude Design, Claude Cowork o cualquier modelo.",
};

export default async function PromptCraftPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(hasLocale(routing.locales, locale) ? locale : routing.defaultLocale);
  return <PromptCraftApp />;
}
