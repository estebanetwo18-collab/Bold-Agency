import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/sections/PortfolioHero";
import { AboutMe } from "@/components/sections/AboutMe";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { portfolioPage } from "@/lib/content";

export const metadata: Metadata = {
  title: portfolioPage.metaTitle,
  description: portfolioPage.metaDescription,
};

export default function PortafolioPage() {
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
