import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Brands } from "@/components/sections/Brands";
import { Warranties } from "@/components/sections/Warranties";
import { Process } from "@/components/sections/Process";
import { Calculator } from "@/components/sections/Calculator";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Brands />
      <Warranties />
      <Process />
      <Calculator />
      <CaseStudy />
      <Testimonials />
      <Faq />
      <ContactSection />
      <FinalCta />
    </>
  );
}
