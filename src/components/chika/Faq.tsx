import { faq } from "@/lib/chika/content";
import { EVENTS } from "@/lib/chika/whatsapp";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section id="preguntas" className="ck-faq ck-tone-white" aria-labelledby="ck-faq-h">
      <div className="ck-wrap ck-faq__grid">
        <Reveal className="ck-section-head">
          <p className="ck-eyebrow">{faq.eyebrow}</p>
          <h2 id="ck-faq-h" className="ck-h2">{faq.title}</h2>
        </Reveal>
        <div className="ck-faq__list">
          {faq.items.map((f, i) => (
            <details key={f.q} className="ck-faq__item" name="ck-faq">
              <summary data-track={EVENTS.faq} data-location={`faq_${i + 1}`}>
                <span>{f.q}</span>
                <span className="ck-collapse__icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
