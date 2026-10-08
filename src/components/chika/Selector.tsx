"use client";

import { useMemo, useState } from "react";
import { selector } from "@/lib/chika/content";
import { experienceById, formatColones } from "@/lib/chika/experiences";
import { whatsappHref, isExternalWhatsapp } from "@/lib/chika/config";
import { Pending } from "./Pending";

export function Selector() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const results = useMemo(
    () => selector.questions.filter((q) => picked.includes(q.id)).map((q) => experienceById(q.result)),
    [picked],
  );
  const rec = results.length === 0 ? null : results.length === 1 ? results[0] : experienceById("chika-kit");
  const external = isExternalWhatsapp();

  return (
    <section id="selector" className="ck-selector ck-tone-ivory" aria-labelledby="ck-sel-h">
      <div className="ck-wrap ck-selector__grid">
        <div className="ck-selector__head">
          <h2 id="ck-sel-h" className="ck-h2">{selector.title}</h2>
          <p className="ck-lede">{selector.subtitle}</p>
        </div>

        <fieldset className="ck-selector__qs">
          <legend className="ck-visually-hidden">Preguntas sobre tu cabello</legend>
          {selector.questions.map((q, i) => {
            const on = picked.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                className="ck-q"
                aria-pressed={on}
                onClick={() => toggle(q.id)}
              >
                <span className="ck-q__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="ck-q__t">{q.text}</span>
                <span className="ck-q__state" aria-hidden="true">{on ? "Sí" : ""}</span>
              </button>
            );
          })}
        </fieldset>

        <div className="ck-result" role="status" aria-live="polite" aria-atomic="true">
          {!rec ? (
            <p className="ck-result__empty">{selector.empty}</p>
          ) : (
            <>
              <p className="ck-label">{results.length > 1 ? "Empezá por" : "Tu experiencia"}</p>
              <p className="ck-result__name">{rec.name}</p>
              <p className={results.length > 1 ? "ck-result__tag" : "ck-result__tag ck-result__tag--single"}>{results.length > 1 ? selector.multiple : rec.tagline}</p>
              {results.length > 1 && <p className="ck-result__sub">{selector.multipleSub}</p>}
              <p className="ck-result__price">
                {rec.price.amount === null ? (
                  <Pending>Precio por confirmar</Pending>
                ) : (
                  <>
                    {rec.price.from && <span>desde </span>}
                    {formatColones(rec.price.amount)}
                  </>
                )}
              </p>
              <div className="ck-result__actions">
                <a
                  className="ck-btn ck-btn--solid"
                  href={whatsappHref(`Hola, quiero agendar ${rec.name}.`)}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {rec.cta}
                </a>
                <a className="ck-result__more" href={`#${rec.id}`}>Ver detalle</a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
