import { system } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function System() {
  return (
    <section id="sistema" className="relative bg-ink py-28 text-paper lg:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={system.eyebrow}
          headline={system.headline}
          intro={system.intro}
          tone="paper"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {system.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.06}
              className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-surface p-8 transition-colors duration-300 hover:border-volt/60"
            >
              <span className="font-display text-sm font-bold text-volt">
                {pillar.index}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-grey-light">{pillar.body}</p>
              <span
                className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-volt/0 transition-colors duration-300 group-hover:bg-volt/10"
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
