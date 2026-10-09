import { howItWorks } from "@/lib/chika/content";
import { WA } from "@/lib/chika/whatsapp";
import { WhatsAppCta } from "./Button";
import { PendingNotes } from "./Pending";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section id="como-reservar" className="ck-how ck-tone-blush" aria-labelledby="ck-how-h">
      <div className="ck-wrap">
        <Reveal className="ck-section-head ck-section-head--center">
          <p className="ck-eyebrow">{howItWorks.eyebrow}</p>
          <h2 id="ck-how-h" className="ck-h2">{howItWorks.title}</h2>
        </Reveal>
        <ol className="ck-how__steps">
          {howItWorks.steps.map((s, i) => (
            <li key={s.title}>
              <span className="ck-how__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="ck-how__cta">
          <WhatsAppCta label={howItWorks.cta} message={WA.general} location="how_it_works" ctaType="general" />
        </div>
        <PendingNotes items={["Textos del proceso propuestos: confirmar con el equipo cómo se coordina la valoración"]} />
      </div>
    </section>
  );
}
