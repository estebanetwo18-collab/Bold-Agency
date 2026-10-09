import type { Experience } from "@/lib/chika/experiences";
import { WhatsAppCta } from "./Button";
import { Collapsible } from "./Collapsible";
import { Pending, PendingNotes } from "./Pending";
import { Photo } from "./Photo";
import { Price } from "./Price";
import { Reveal } from "./Reveal";

export function ExperienceSection({ exp }: { exp: Experience }) {
  const hId = `${exp.id}-h`;
  const includesTitle = exp.steps ? "Qué incluye · Ruta del programa" : `Qué incluye · ${exp.includesLabel}`;

  return (
    <section
      id={exp.id}
      className={`ck-exp ck-tone-${exp.tone}${exp.flip ? " ck-exp--flip" : ""}`}
      aria-labelledby={hId}
    >
      <div className="ck-exp__inner">
        <div className={`ck-exp__media ck-shape--${exp.shape}`}>
          <div className="ck-exp__frame">
            <div className="ck-exp__photo">
              <Photo photo={exp.photo} sizes="(min-width: 900px) 40vw, 88vw" />
            </div>
          </div>
          <div className="ck-exp__ideal">
            <h3 className="ck-exp__ideal-h">Ideal para</h3>
            <p>{exp.idealFor}</p>
          </div>
        </div>

        <Reveal className="ck-exp__body">
          <span className="ck-exp__ghost" aria-hidden="true">{exp.number}</span>
          <p className="ck-eyebrow">
            {exp.number} <span aria-hidden="true">·</span> {exp.stage}
          </p>
          <h2 id={hId} className="ck-exp__name">
            {exp.name}
          </h2>
          {exp.provisionalName && (
            <p className="ck-exp__provisional">
              <Pending label="Nombre">Nombre definitivo por confirmar</Pending>
            </p>
          )}
          <p className="ck-exp__tagline">{exp.tagline}</p>
          {exp.hook && <p className="ck-exp__hook">{exp.hook}</p>}

          <dl className="ck-facts">
            {exp.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>

          <Collapsible title={includesTitle}>
            {exp.steps ? (
              <ol className="ck-route">
                {exp.steps.items.map((s, i) => (
                  <li key={s.title}>
                    <span className="ck-route__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="ck-list">
                {exp.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
                {exp.pendingIncludes?.map((i) => (
                  <li key={i}>
                    <Pending>{i}</Pending>
                  </li>
                ))}
              </ul>
            )}
            {exp.visits && (
              <ol className="ck-visits" aria-label={`${exp.visits.count} visitas, una cada ${exp.visits.gap}`}>
                {Array.from({ length: exp.visits.count }).map((_, i) => (
                  <li key={i}>
                    <span className="ck-visits__dot" aria-hidden="true">{i + 1}</span>
                    {i < exp.visits!.count - 1 && <span className="ck-visits__gap">{exp.visits!.gap}</span>}
                  </li>
                ))}
              </ol>
            )}
            {exp.homeKit && !exp.steps && (
              <div className="ck-kit">
                <p className="ck-label">{exp.homeKit.label}</p>
                <ul className="ck-kit__items">
                  {exp.homeKit.items.map((i, n) => (
                    <li key={i}>
                      {exp.homeKit!.items.length > 1 && <span className="ck-kit__n" aria-hidden="true">{n + 1}</span>}
                      {i}
                    </li>
                  ))}
                </ul>
                {exp.homeKit.note && <p className="ck-note">{exp.homeKit.note}</p>}
              </div>
            )}
          </Collapsible>

          <div className="ck-exp__buy">
            <Price price={exp.price} />
            <WhatsAppCta label={exp.cta} message={`Hola, quiero agendar ${exp.name}.`} className="ck-exp__btn" />
          </div>
          <p className="ck-note ck-exp__note">{exp.availabilityNote}</p>

          <PendingNotes items={exp.pending} />
        </Reveal>
      </div>
    </section>
  );
}
