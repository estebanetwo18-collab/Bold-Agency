import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Services } from "@/components/sections/Services";
import { Calculator } from "@/components/sections/Calculator";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Services />
      <Calculator />
      <Process />
      <Results />
      <CaseStudy />
      <Testimonials />
      <Faq />
      <ContactSection />
      <FinalCta />
    </>
  );
}
