import type { Experience } from "@/lib/chika/experiences";
import { WhatsAppCta } from "./Button";
import { Collapsible } from "./Collapsible";
import { Pending, PendingNotes } from "./Pending";
import { Photo } from "./Photo";
import { Price } from "./Price";
import { Reveal } from "./Reveal";

export function ExperienceSection({ exp }: { exp: Experience }) {
  const hId = `${exp.id}-h`;
  const stats = [
    exp.sessions && { k: "Sesiones", v: exp.sessions },
    exp.validity && { k: "Vigencia", v: exp.validity },
    exp.rhythm && { k: "Ritmo", v: exp.rhythm.replace(/^Recomendado: /, "").replace(/^Incluye /, "Incluye ") },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <section
      id={exp.id}
      className={`ck-exp ck-tone-${exp.tone}${exp.flip ? " ck-exp--flip" : ""}`}
      aria-labelledby={hId}
    >
      <div className="ck-exp__media">
        <div className="ck-exp__photo">
          <Photo photo={exp.photo} sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
        <div className="ck-exp__ideal">
          <h3 className="ck-label">Ideal para</h3>
          <p>{exp.idealFor}</p>
        </div>
      </div>

      <Reveal className="ck-exp__body">
        <p className="ck-eyebrow">
          <span className="ck-exp__num">{exp.number}</span>
          <span aria-hidden="true"> · </span>
          {exp.stage}
        </p>
        <h2 id={hId} className="ck-exp__name">
          {exp.provisionalName ? (
            <>
              {exp.name}
              <span className="ck-exp__provisional">
                <Pending label="Nombre">Nombre definitivo por confirmar</Pending>
              </span>
            </>
          ) : (
            exp.name
          )}
        </h2>
        <p className="ck-exp__tagline">{exp.tagline}</p>
        {exp.hook && <p className="ck-exp__hook">{exp.hook}</p>}

        <Collapsible title={`${exp.includesLabel === "El programa" || exp.includesLabel === "El plan" ? "Qué incluye" : "Qué incluye · " + exp.includesLabel}`}>
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
          {exp.homeKit && (
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

        {stats.length > 0 && (
          <dl className="ck-stats">
            {stats.map((s) => (
              <div key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="ck-exp__buy">
          <Price price={exp.price} />
          <WhatsAppCta
            label={exp.cta}
            message={`Hola, quiero agendar ${exp.name}.`}
            variant="solid"
            className="ck-exp__btn"
          />
          <p className="ck-note">{exp.availabilityNote}</p>
        </div>

        <PendingNotes items={exp.pending} />
      </Reveal>

      {exp.steps && (
        <Reveal className="ck-exp__extra">
          <h3 className="ck-label">{exp.steps.label}</h3>
          <ol className="ck-route">
            {exp.steps.items.map((s, i) => (
              <li key={s.title}>
                <span className="ck-route__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {exp.visits && (
        <Reveal className="ck-exp__extra">
          <h3 className="ck-label">{exp.visits.note}</h3>
          <ol className="ck-visits" aria-label={`${exp.visits.count} visitas, una cada ${exp.visits.gap}`}>
            {Array.from({ length: exp.visits.count }).map((_, i) => (
              <li key={i}>
                <span className="ck-visits__dot" aria-hidden="true">{i + 1}</span>
                <span className="ck-visits__t">Visita {i + 1}</span>
                {i < exp.visits!.count - 1 && <span className="ck-visits__gap">{exp.visits!.gap}</span>}
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </section>
  );
}
