"use client";

import { useEffect, useMemo, useState } from "react";
import { selector } from "@/lib/chika/content";
import { experienceById, formatColones } from "@/lib/chika/experiences";
import { whatsappHref } from "@/lib/chika/config";
import { EVENTS } from "@/lib/chika/whatsapp";
import { track } from "@/lib/chika/track";
import { Pending } from "./Pending";
import { WaIcon } from "./Button";

export function Selector() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string, text: string) => {
    setPicked((p) => {
      const on = !p.includes(id);
      track(EVENTS.selectorAnswer, { question: id, label: text, selected: on });
      return on ? [...p, id] : p.filter((x) => x !== id);
    });
  };

  const chosen = useMemo(() => selector.questions.filter((q) => picked.includes(q.id)), [picked]);
  const multi = chosen.length > 1;
  const rec = chosen.length === 0 ? null : multi ? experienceById("chika-kit") : experienceById(chosen[0].result);

  useEffect(() => {
    if (rec) track(EVENTS.selectorResult, { experience: rec.id, answers: chosen.map((q) => q.id).join(","), multiple: multi });
  }, [rec, chosen, multi]);

  // Mensaje contextual: recomendación + respuestas marcadas.
  const message = rec
    ? `Hola, respondí «¿Cuál es para vos?» en la página de Chika y me recomendó ${rec.name}. Me identifico con: ${chosen.map((q) => q.answer).join("; ")}. Quiero cotizar y agendar una valoración.`
    : "";

  return (
    <section id="selector" className="ck-selector ck-tone-petal" aria-labelledby="ck-sel-h">
      <div className="ck-wrap ck-selector__grid">
        <div className="ck-selector__head">
          <p className="ck-eyebrow">Recomendador</p>
          <h2 id="ck-sel-h" className="ck-h2">{selector.title}</h2>
          <p className="ck-lede">{selector.subtitle}</p>
        </div>

        <fieldset className="ck-selector__qs">
          <legend className="ck-visually-hidden">Preguntas sobre tu cabello</legend>
          {selector.questions.map((q, i) => {
            const on = picked.includes(q.id);
            return (
              <button key={q.id} type="button" className="ck-q" aria-pressed={on} onClick={() => toggle(q.id, q.text)}>
                <span className="ck-q__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="ck-q__t">{q.text}</span>
                <span className="ck-q__state" aria-hidden="true" />
              </button>
            );
          })}
        </fieldset>

        <div className="ck-result" role="status" aria-live="polite" aria-atomic="true">
          {!rec ? (
            <p className="ck-result__empty">{selector.empty}</p>
          ) : (
            <>
              <p className="ck-label">{multi ? "Empezá por" : "Tu experiencia"}</p>
              <p className="ck-result__name">{rec.name}</p>
              <p className={multi ? "ck-result__tag" : "ck-result__tag ck-result__tag--single"}>{multi ? selector.multiple : rec.tagline}</p>
              {multi && <p className="ck-result__sub">{selector.multipleSub}</p>}
              <p className="ck-result__price">
                {rec.price.amount === null ? (
                  <Pending>Precio por confirmar</Pending>
                ) : (
                  <>
                    <span>Referencia {rec.price.from ? "desde " : ""}</span>
                    {formatColones(rec.price.amount)}
                  </>
                )}
              </p>
              <div className="ck-result__actions">
                <a
                  className="ck-btn ck-btn--solid ck-btn--wa"
                  href={whatsappHref(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={EVENTS.whatsapp}
                  data-location="selector"
                  data-experience={rec.id}
                  data-cta-type="cotizacion"
                >
                  <WaIcon />
                  <span>Cotizá {rec.name.replace("Chika ", "")} por WhatsApp</span>
                  <span className="ck-visually-hidden"> (abre WhatsApp en una pestaña nueva)</span>
                </a>
                <a className="ck-result__more" href={`#${rec.id}`}>Ver qué incluye</a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
