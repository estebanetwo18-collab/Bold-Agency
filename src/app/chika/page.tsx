import Image from "next/image";
import { Nav } from "@/components/chika/Nav";
import { Hero } from "@/components/chika/Hero";
import { Intro } from "@/components/chika/Intro";
import { ExperienceSection } from "@/components/chika/ExperienceSection";
import { Compare } from "@/components/chika/Compare";
import { Selector } from "@/components/chika/Selector";
import { FinalCta } from "@/components/chika/FinalCta";
import { Reveal } from "@/components/chika/Reveal";
import { experiences } from "@/lib/chika/experiences";
import { experiencesIntro } from "@/lib/chika/content";
import { isExternalWhatsapp, localBusinessJsonLd, whatsappHref } from "@/lib/chika/config";

export default function ChikaPage() {
  const jsonLd = localBusinessJsonLd();
  return (
    <>
      <a href="#contenido" className="ck-skip">Saltar al contenido</a>
      <Nav reserveHref={whatsappHref("Hola, quiero agendar una cita en Chika.")} external={isExternalWhatsapp()} />
      <main id="contenido">
        <Hero />
        <Intro />
        <section id="experiencias" aria-labelledby="ck-exps-h" className="ck-exps-head ck-tone-graphite">
          <div className="ck-wrap">
            <Reveal>
              <h2 id="ck-exps-h" className="ck-h2">{experiencesIntro.title}</h2>
              <p className="ck-lede">{experiencesIntro.text}</p>
            </Reveal>
          </div>
        </section>
        {experiences.map((e) => (
          <ExperienceSection key={e.id} exp={e} />
        ))}
        <Compare />
        <Selector />
        <FinalCta />
      </main>
      <footer className="ck-footer">
        <Image className="ck-footer__brand" src="/chika/davines-logo.png" alt="Davines" width={700} height={192} />
        <p>© {new Date().getFullYear()} Chika Beauty Center &amp; Spa. Precios en colones; condiciones y vigencias según cada experiencia.</p>
      </footer>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
