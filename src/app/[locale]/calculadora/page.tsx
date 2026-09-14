import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Calculator } from "@/components/sections/Calculator";
import { routing } from "@/i18n/routing";
import { getContent } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { calculator } = getContent(activeLocale);
  return {
    title: `${calculator.headline} — BOLD Agency`,
    description: calculator.intro,
  };
}

export default async function CalculadoraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(activeLocale);

  return (
    <>
      <Nav />
      <main id="main">
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
