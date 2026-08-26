import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Mosaic } from "@/components/sections/Mosaic";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { PhotoBanner } from "@/components/sections/PhotoBanner";
import { Differentiators } from "@/components/sections/Differentiators";
import { Founder } from "@/components/sections/Founder";
import { Process } from "@/components/sections/Process";
import { Plans } from "@/components/sections/Plans";
import { Results } from "@/components/sections/Results";
import { Faq } from "@/components/sections/Faq";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { midBanner, teamBanner, skylineBanner } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Mosaic />
        <Problem />
        <DiagonalDivider from="paper" to="ink" />
        <System />
        <DiagonalDivider from="ink" to="paper" flip />
        <PhotoBanner
          src="/images/mid-chevron.jpg"
          alt="Fachada arquitectónica en blanco y negro con líneas en chevron"
          caption={midBanner.caption}
          align="center"
        />
        <PhotoBanner
          src="/images/team-presentation-wide.jpg"
          alt="Equipo revisando resultados en una pantalla, blanco y negro"
          caption={teamBanner.caption}
          aspect="aspect-[5/2]"
          align="end"
        />
        <Differentiators />
        <Founder />
        <Process />
        <Plans />
        <DiagonalDivider from="paper" to="ink" />
        <Results />
        <DiagonalDivider from="ink" to="paper" flip />
        <Faq />
        <PhotoBanner
          src="/images/skyline.jpg"
          alt="Rascacielos en blanco y negro, vista desde abajo"
          caption={skylineBanner.caption}
          align="end"
        />
        <DiagnosticSection />
        <DiagonalDivider from="paper" to="volt" />
        <FinalCta />
        <DiagonalDivider from="volt" to="ink" flip />
      </main>
      <Footer />
    </>
  );
}
