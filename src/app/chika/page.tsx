import Image from "next/image";
import { Nav } from "@/components/chika/Nav";
import { Hero } from "@/components/chika/Hero";
import { Intro } from "@/components/chika/Intro";
import { ExperienceSection } from "@/components/chika/ExperienceSection";
import { Compare } from "@/components/chika/Compare";
import { Selector } from "@/components/chika/Selector";
import { HowItWorks } from "@/components/chika/HowItWorks";
import { Faq } from "@/components/chika/Faq";
import { FinalCta } from "@/components/chika/FinalCta";
import { FloatingWhatsApp } from "@/components/chika/FloatingWhatsApp";
import { Analytics } from "@/components/chika/Analytics";
import { Logo } from "@/components/chika/Logo";
import { Reveal } from "@/components/chika/Reveal";
import { Pending } from "@/components/chika/Pending";
import { experiences, formatColones } from "@/lib/chika/experiences";
import { experiencesIntro, nav, pricing } from "@/lib/chika/content";
import { localBusinessJsonLd, whatsappHref } from "@/lib/chika/config";
import { WA } from "@/lib/chika/whatsapp";

/*
 * Orden de conversión:
 * 1. Hero (promesa + CTA WhatsApp + "Ayudame a elegir")
 * 2. Necesidades (4 momentos) → 3. Selector (recomendación con mensaje contextual)
 * 4. Experiencias (cada una cierra con valor + CTA) → 5. Comparativa (+ CTA)
 * 6. Cómo reservar (qué pasa al escribir) → 7. Preguntas → 8. Cierre con contacto
 */
export default function ChikaPage() {
  const jsonLd = localBusinessJsonLd();
  return (
    <>
      <a href="#contenido" className="ck-skip">Saltar al contenido</a>
      <Nav reserveHref={whatsappHref(WA.general)} />
      <main id="contenido">
        <Hero />
        <Intro />
        <Selector />
        <section id="experiencias" aria-labelledby="ck-exps-h" className="ck-exps-head ck-tone-white">
          <div className="ck-wrap ck-exps-head__grid">
            <Reveal className="ck-section-head">
              <p className="ck-eyebrow">{experiencesIntro.eyebrow}</p>
              <h2 id="ck-exps-h" className="ck-h2">{experiencesIntro.title}</h2>
              <p className="ck-lede">{experiencesIntro.text}</p>
              <p className="ck-exps-head__benefit">{pricing.headline}</p>
            </Reveal>
            <nav aria-label="Índice de experiencias" className="ck-index">
              <ol>
                {experiences.map((e) => (
                  <li key={e.id}>
                    <a href={`#${e.id}`}>
                      <span className="ck-index__n">{e.number}</span>
                      <span className="ck-index__name">
                        {e.name}
                        <small>{e.tagline}</small>
                      </span>
                      <span className="ck-index__price">
                        {e.price.amount === null ? (
                          <Pending>Por confirmar</Pending>
                        ) : (
                          <>
                            {e.price.from && <small>desde </small>}
                            {formatColones(e.price.amount)}
                          </>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>
        {experiences.map((e) => (
          <ExperienceSection key={e.id} exp={e} />
        ))}
        <Compare />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <footer className="ck-footer">
        <div className="ck-footer__inner">
          <Logo />
          <nav className="ck-footer__nav" aria-label="Pie de página">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <a href="#contacto">Contacto</a>
          </nav>
          <div className="ck-footer__partner">
            <span>Productos profesionales</span>
            <Image className="ck-footer__brand" src="/chika/davines-logo.png" alt="Davines" width={700} height={192} />
          </div>
          <p className="ck-footer__legal">
            © {new Date().getFullYear()} Chika Beauty Center &amp; Spa. Precios de referencia en colones costarricenses; el valor final se confirma después de la valoración. Condiciones y vigencias según cada experiencia.
          </p>
        </div>
      </footer>
      <FloatingWhatsApp />
      <Analytics />
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
