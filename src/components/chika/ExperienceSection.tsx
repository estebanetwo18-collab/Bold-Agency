import type { Experience } from "@/lib/chika/experiences";
import { Collapsible } from "./Collapsible";
import { Offer } from "./Offer";
import { Pending, PendingNotes } from "./Pending";
import { Photo } from "./Photo";

/**
 * Composición editorial única: la foto va a sangre hacia el borde de la página
 * y el panel de contenido se superpone a ella (desktop: invade ~1 columna;
 * móvil: sube sobre el borde inferior). Título, beneficio, precio y CTA quedan
 * dentro del mismo bloque, conectado a la imagen.
 */
export function ExperienceSection({ exp }: { exp: Experience }) {
  const hId = `${exp.id}-h`;
  const includesTitle = exp.steps ? "Qué incluye · Ruta del programa" : `Qué incluye · ${exp.includesLabel}`;

  return (
    <section id={exp.id} className={`ck-exp ck-tone-${exp.tone}${exp.flip ? " ck-exp--flip" : ""}`} aria-labelledby={hId}>
      <div className="ck-exp__media">
        <Photo photo={exp.photo} sizes="(min-width: 900px) 58vw, 100vw" />
        <span className="ck-exp__tag" aria-hidden="true">
          {exp.number} · {exp.name.replace("Chika ", "")}
        </span>
      </div>

      <div className="ck-exp__panel">
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

        <div className="ck-exp__ideal">
          <h3 className="ck-exp__ideal-h">Ideal para</h3>
          <p>{exp.idealFor}</p>
        </div>

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

        <Offer exp={exp} />
        <PendingNotes items={exp.pending} />
      </div>
    </section>
  );
}
