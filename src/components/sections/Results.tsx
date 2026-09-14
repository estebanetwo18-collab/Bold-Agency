import { results } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Results() {
  return (
    <section id="resultados" className="relative bg-ink py-28 text-paper lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={results.eyebrow}
          headline={results.headline}
          intro={results.intro}
          tone="paper"
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="border border-paper/10 bg-surface p-7"
            >
              <p className="font-data text-4xl font-extrabold tracking-tight">{stat.num}</p>
              <p className="mt-1.5 font-semibold">{stat.label}</p>
              <p className="mt-0.5 text-sm text-grey-data">{stat.src}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <MagneticButton href="/portafolio" variant="volt">
            Ver portafolio completo
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
