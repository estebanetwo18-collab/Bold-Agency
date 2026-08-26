import { caseStudies } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CaseStudies() {
  return (
    <section id="casos" className="relative bg-ink py-28 text-paper lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={caseStudies.eyebrow}
          headline={caseStudies.headline}
          intro={caseStudies.intro}
          tone="paper"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {caseStudies.items.map((study, i) => (
            <Reveal
              key={study.client}
              delay={i * 0.1}
              className="flex flex-col rounded-[1.75rem] border border-paper/10 bg-surface p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-extrabold">{study.client}</h3>
                  <p className="mt-1 text-sm text-grey-light">{study.sector}</p>
                </div>
                <span className="shrink-0 rounded-full border border-volt/40 px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-volt">
                  {study.status}
                </span>
              </div>

              <dl className="mt-8 flex flex-col gap-5 text-sm">
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey">
                    Reto
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-grey-light">{study.challenge}</dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey">
                    Enfoque
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-grey-light">{study.approach}</dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey">
                    Resultado
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-grey-light">{study.result}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <MagneticButton href="#diagnostico" variant="volt">
            Quiero ser el próximo caso
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
