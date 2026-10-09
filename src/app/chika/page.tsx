import Image from "next/image";
import { Nav } from "@/components/chika/Nav";
import { Hero } from "@/components/chika/Hero";
import { Intro } from "@/components/chika/Intro";
import { ExperienceSection } from "@/components/chika/ExperienceSection";
import { Compare } from "@/components/chika/Compare";
import { Selector } from "@/components/chika/Selector";
import { FinalCta } from "@/components/chika/FinalCta";
import { Logo } from "@/components/chika/Logo";
import { Reveal } from "@/components/chika/Reveal";
import { Pending } from "@/components/chika/Pending";
import { experiences, formatColones } from "@/lib/chika/experiences";
import { experiencesIntro, marquee } from "@/lib/chika/content";
import { isExternalWhatsapp, localBusinessJsonLd, whatsappHref } from "@/lib/chika/config";

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="ck-marquee" aria-hidden="true">
      <div className="ck-marquee__track">
        {items.map((m, i) => (
          <span key={i}>
            {m}
            <svg viewBox="0 0 20 20" width="14" height="14"><path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ChikaPage() {
  const jsonLd = localBusinessJsonLd();
  return (
    <>
      <a href="#contenido" className="ck-skip">Saltar al contenido</a>
      <Nav reserveHref={whatsappHref("Hola, quiero agendar una cita en Chika.")} external={isExternalWhatsapp()} />
      <main id="contenido">
        <Hero />
        <Intro />
        <section id="experiencias" aria-labelledby="ck-exps-h" className="ck-exps-head ck-tone-white">
          <div className="ck-wrap ck-exps-head__grid">
            <Reveal className="ck-section-head">
              <p className="ck-eyebrow">{experiencesIntro.eyebrow}</p>
              <h2 id="ck-exps-h" className="ck-h2">{experiencesIntro.title}</h2>
              <p className="ck-lede">{experiencesIntro.text}</p>
            </Reveal>
            <nav aria-label="Índice de experiencias" className="ck-index">
              <ol>
                {experiences.map((e) => (
                  <li key={e.id}>
                    <a href={`#${e.id}`}>
                      <span className="ck-index__n">{e.number}</span>
                      <span className="ck-index__name">{e.name}</span>
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
        <Marquee />
        <Compare />
        <Selector />
        <FinalCta />
      </main>
      <footer className="ck-footer">
        <div className="ck-footer__inner">
          <Logo />
          <div className="ck-footer__partner">
            <span>Productos profesionales</span>
            <Image className="ck-footer__brand" src="/chika/davines-logo.png" alt="Davines" width={700} height={192} />
          </div>
          <p className="ck-footer__legal">
            © {new Date().getFullYear()} Chika Beauty Center &amp; Spa. Precios en colones costarricenses. Condiciones y vigencias según cada experiencia.
          </p>
        </div>
      </footer>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
