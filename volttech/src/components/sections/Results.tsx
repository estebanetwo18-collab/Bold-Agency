import { BRANDS, COVERAGE_AREAS, STATS, WARRANTIES } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ShieldIcon } from "@/components/ui/icons";

export function Results() {
  const brandNames = BRANDS.groups.flatMap((g) => g.names);
  const marqueeNames = [...brandNames, ...brandNames];

  return (
    <section id="resultados" className="bg-bg-elevated py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="energy">Resultados y confianza</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Cifras verificables, no promesas de marketing
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 border-y border-border py-10 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60} className="text-center sm:text-left">
              <p className="tabular-nums text-4xl font-semibold text-energy sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium leading-snug text-text-muted sm:text-sm">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Cobertura</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {COVERAGE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-text-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="min-w-0">
            <div>
              <h3 className="text-lg font-semibold text-text">{WARRANTIES.title}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">{WARRANTIES.intro}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {WARRANTIES.items.map((item) => (
                  <div key={item.component} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                    <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-energy" />
                    <div>
                      <h4 className="text-sm font-semibold text-text">{item.component}</h4>
                      <p className="mt-1 text-sm font-medium text-accent">{item.warranty}</p>
                      <p className="mt-1 text-xs text-text-faint">{item.confidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="min-w-0">
            <div className="flex h-full min-w-0 flex-col justify-between rounded-2xl border border-border bg-surface p-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-faint">{BRANDS.eyebrow}</h3>
                <div className="mt-4 space-y-3">
                  {BRANDS.groups.map((group) => (
                    <div key={group.category} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-xs font-semibold text-accent">{group.category}</span>
                      <span className="text-sm text-text-muted">{group.names.join(" · ")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 min-w-0 overflow-hidden border-t border-border pt-5">
                <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
                  {marqueeNames.map((name, i) => (
                    <span key={`${name}-${i}`} className="text-sm font-medium text-text-faint">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
