import { hero } from "@/lib/chika/content";
import { WhatsAppCta } from "./Button";
import { Photo } from "./Photo";

const heroPhoto = {
  file: "chika-hero-cabello-ondas.jpg",
  alt: hero.photoAlt,
  brief: "Retrato editorial de tres cuartos o perfil; el cabello en movimiento llena el encuadre. Fondo claro cálido.",
  position: "40% 40%",
};

export function Hero() {
  return (
    <section id="inicio" className="ck-hero" aria-labelledby="ck-h1">
      <div className="ck-hero__media">
        <Photo photo={heroPhoto} sizes="(min-width: 900px) 58vw, 100vw" priority />
      </div>

      {/* Hebra: guiño a la línea curva del catálogo impreso */}
      <svg className="ck-hero__curve" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 330 C 160 340, 300 270, 430 150 S 700 60, 800 130" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="ck-hero__panel">
        <p className="ck-eyebrow ck-eyebrow--light">{hero.eyebrow}</p>
        <h1 id="ck-h1" className="ck-hero__title">
          <span>{hero.lead}</span> <em>{hero.follow}</em>
        </h1>
        <div className="ck-hero__actions">
          <WhatsAppCta label={hero.cta} message="Hola, quiero agendar mi diagnóstico capilar en Chika." variant="solid" />
        </div>
        <p className="ck-hero__index" aria-label="Etapas del cuidado">
          {hero.index.map((i, n) => (
            <span key={i}>
              {i}
              {n < hero.index.length - 1 && <i aria-hidden="true"> · </i>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
