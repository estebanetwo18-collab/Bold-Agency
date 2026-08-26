import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { Differentiators } from "@/components/sections/Differentiators";
import { Process } from "@/components/sections/Process";
import { Plans } from "@/components/sections/Plans";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Faq } from "@/components/sections/Faq";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <DiagonalDivider from="paper" to="ink" />
        <System />
        <DiagonalDivider from="ink" to="paper" flip />
        <Differentiators />
        <Process />
        <Plans />
        <DiagonalDivider from="paper" to="ink" />
        <CaseStudies />
        <DiagonalDivider from="ink" to="paper" flip />
        <Faq />
        <DiagnosticSection />
        <DiagonalDivider from="paper" to="volt" />
        <FinalCta />
        <DiagonalDivider from="volt" to="ink" flip />
      </main>
      <Footer />
    </>
  );
}
