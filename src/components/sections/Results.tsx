import { results, clients } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Results() {
  return (
    <section id="casos" className="relative bg-ink py-28 text-paper lg:py-36">
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
              className="rounded-2xl border border-paper/10 bg-surface p-7"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight">{stat.num}</p>
              <p className="mt-1.5 font-semibold">{stat.label}</p>
              <p className="mt-0.5 text-sm text-grey-light">{stat.src}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-20">
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-volt">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {clients.eyebrow}
          </span>
          <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">
            {clients.headline}
          </h3>
          <p className="mt-3 max-w-2xl text-grey-light">{clients.intro}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.names.map((name, i) => (
            <Reveal
              key={name}
              delay={i * 0.03}
              className="rounded-xl border border-paper/10 bg-surface px-4 py-6 text-center font-display text-sm font-bold tracking-tight"
            >
              {name}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <MagneticButton href="#diagnostico" variant="volt">
            Quiero ser el próximo caso
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
