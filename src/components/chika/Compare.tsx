import { compare, compareRows, type Mark } from "@/lib/chika/content";
import { experienceById, formatColones } from "@/lib/chika/experiences";
import { WA } from "@/lib/chika/whatsapp";
import { WhatsAppCta } from "./Button";
import { Pending } from "./Pending";
import { Reveal } from "./Reveal";

const SYM: Record<Mark, string> = { yes: "●", na: "—", tbc: "○" };
const TXT: Record<Mark, string> = { yes: "Incluye", na: "No aplica", tbc: "Por confirmar" };

function MarkCell({ m }: { m: Mark }) {
  return (
    <span className={`ck-mark ck-mark--${m}`}>
      <span aria-hidden="true">{SYM[m]}</span>
      <span className="ck-visually-hidden">{TXT[m]}</span>
    </span>
  );
}

function priceNode(id: string) {
  const { price } = experienceById(id);
  if (price.amount === null) return <Pending>Por confirmar</Pending>;
  return (
    <>
      {price.from && <span className="ck-cmp__from">desde </span>}
      {formatColones(price.amount)}
    </>
  );
}

const fields = [
  ["Diagnóstico", "diagnosis"],
  ["Corte", "cut"],
  ["Styling", "styling"],
  ["Kit para casa", "kit"],
] as const;

export function Compare() {
  return (
    <section id="comparar" className="ck-compare ck-tone-white" aria-labelledby="ck-cmp-h">
      <div className="ck-wrap">
        <Reveal className="ck-section-head ck-section-head--center">
          <p className="ck-eyebrow">{compare.eyebrow}</p>
          <h2 id="ck-cmp-h" className="ck-h2">{compare.title}</h2>
          <p className="ck-lede">{compare.subtitle}</p>
        </Reveal>

        <div className="ck-cmp__table" tabIndex={0} role="region" aria-label="Tabla comparativa de experiencias (desplazable)">
          <table>
            <caption className="ck-visually-hidden">Comparación de las experiencias Chika. Inversión de referencia en colones.</caption>
            <thead>
              <tr>
                {compare.columns.map((c) => (
                  <th key={c} scope="col">{c === "Inversión" ? "Inversión de referencia" : c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r) => {
                const e = experienceById(r.id);
                return (
                  <tr key={r.id}>
                    <th scope="row"><a href={`#${r.id}`}>{e.name}</a></th>
                    <td>{r.sessions}</td>
                    <td>{r.validity ?? <MarkCell m="na" />}</td>
                    <td><MarkCell m={r.diagnosis} /></td>
                    <td><MarkCell m={r.cut} /></td>
                    <td><MarkCell m={r.styling} /></td>
                    <td><MarkCell m={r.kit} /></td>
                    <td className="ck-cmp__price">{priceNode(r.id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="ck-cmp__list">
          {compareRows.map((r) => {
            const e = experienceById(r.id);
            return (
              <details key={r.id} className="ck-cmp__item" name="ck-compare">
                <summary>
                  <span className="ck-cmp__name">{e.name}</span>
                  <span className="ck-cmp__sum">{priceNode(r.id)}</span>
                  <span className="ck-collapse__icon" aria-hidden="true" />
                </summary>
                <dl>
                  <div><dt>Sesiones</dt><dd>{r.sessions}</dd></div>
                  <div><dt>Vigencia</dt><dd>{r.validity ?? <MarkCell m="na" />}</dd></div>
                  {fields.map(([label, key]) => (
                    <div key={key}><dt>{label}</dt><dd><MarkCell m={r[key]} /> <span className="ck-cmp__word" aria-hidden="true">{TXT[r[key]]}</span></dd></div>
                  ))}
                  <div className="ck-cmp__total"><dt>Inversión de referencia</dt><dd>{priceNode(r.id)}</dd></div>
                </dl>
                <a className="ck-cmp__more" href={`#${r.id}`}>Ver {e.name}</a>
              </details>
            );
          })}
        </div>

        <ul className="ck-legend" aria-label="Leyenda">
          {compare.legend.map((l) => (
            <li key={l.label}><span aria-hidden="true">{l.sym}</span> {l.label}</li>
          ))}
        </ul>
        <p className="ck-compare__fine">Precios de referencia en colones. El valor final se confirma después de tu valoración.</p>

        <div className="ck-compare__cta">
          <p className="ck-nudge">{compare.nudge}</p>
          <WhatsAppCta label={compare.cta} message={WA.compare} location="compare" ctaType="general" variant="line" />
        </div>
      </div>
    </section>
  );
}
