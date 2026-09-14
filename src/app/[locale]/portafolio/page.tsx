import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/sections/PortfolioHero";
import { AboutMe } from "@/components/sections/AboutMe";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { routing } from "@/i18n/routing";
import { getContent } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { portfolioPage } = getContent(activeLocale);
  return {
    title: portfolioPage.metaTitle,
    description: portfolioPage.metaDescription,
  };
}

export default async function PortafolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main">
        <PortfolioHero />
        <AboutMe />
        <PortfolioGrid />
        <DiagnosticSection />
        <DiagonalDivider from="paper" to="volt" />
        <FinalCta />
        <DiagonalDivider from="volt" to="ink" flip />
      </main>
      <Footer />
    </>
  );
}
