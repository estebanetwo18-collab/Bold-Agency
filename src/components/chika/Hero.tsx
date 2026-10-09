import { hero, partner } from "@/lib/chika/content";
import { WA } from "@/lib/chika/whatsapp";
import { LinkCta, WhatsAppCta } from "./Button";
import { Photo } from "./Photo";

const heroPhoto = {
  file: "chika-hero-cabello-ondas.jpg",
  alt: hero.photoAlt,
  brief: "Retrato editorial de tres cuartos o perfil; el cabello en movimiento llena el encuadre. Fondo claro cálido.",
  position: "45% 35%",
};

export function Hero() {
  return (
    <section id="inicio" className="ck-hero" aria-labelledby="ck-h1">
      <div className="ck-hero__inner">
        <div className="ck-hero__copy">
          <p className="ck-eyebrow">{hero.eyebrow}</p>
          <h1 id="ck-h1" className="ck-hero__title">
            {hero.lead} <em>{hero.follow}</em>
          </h1>
          <p className="ck-hero__text">{hero.text}</p>
          <div className="ck-hero__actions">
            <WhatsAppCta label={hero.cta} message={WA.hero} location="hero" ctaType="general" />
            <LinkCta href="#selector" label={hero.secondary} variant="text" track="hero_selector" />
          </div>
          <p className="ck-hero__note">{hero.note}</p>
          <ul className="ck-hero__trust" aria-label="Por qué Chika">
            {hero.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="ck-hero__visual">
          <div className="ck-hero__disc" aria-hidden="true" />
          <div className="ck-hero__arch">
            <Photo photo={heroPhoto} sizes="(min-width: 900px) 42vw, 86vw" priority />
          </div>
          <svg className="ck-hero__seal" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <defs>
              <path id="ck-seal-path" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <circle cx="60" cy="60" r="58" />
            <text>
              <textPath href="#ck-seal-path">VALORACIÓN CAPILAR · CHIKA BEAUTY CENTER ·</textPath>
            </text>
            <path className="ck-hero__seal-star" d="M60 46 L63 57 L74 60 L63 63 L60 74 L57 63 L46 60 L57 57 Z" />
          </svg>
          <svg className="ck-hero__spark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
            <path d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z" />
          </svg>
        </div>
      </div>

      <div className="ck-partner">
        <p>{partner.label}</p>
        <span className="ck-partner__logo" role="img" aria-label="Davines" />
      </div>
    </section>
  );
}
