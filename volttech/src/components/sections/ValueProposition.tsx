import Image from "next/image";
import { VALUE_PROP } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Reveal } from "@/components/ui/Reveal";
import { BoltIcon, ShieldIcon, CompassIcon, DocumentIcon } from "@/components/ui/icons";

export function ValueProposition() {
  return (
    <section id="propuesta" className="relative bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="accent">{VALUE_PROP.eyebrow}</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.6rem]">
            {VALUE_PROP.title}
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-faint">A quién le hablamos</span>
            {VALUE_PROP.audience.map((a) => (
              <span key={a} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-muted">
                {a}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-8">
              <BoltIcon className="h-7 w-7 text-text-faint" />
              <h3 className="mt-5 text-lg font-semibold text-text">{VALUE_PROP.problem.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{VALUE_PROP.problem.body}</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/[0.08] to-transparent p-8">
              <ShieldIcon className="h-7 w-7 text-accent" />
              <h3 className="mt-5 text-lg font-semibold text-text">{VALUE_PROP.solution.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{VALUE_PROP.solution.body}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-6 grid gap-0 overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-[1.6fr_1fr]">
            <div className="p-8 sm:p-10">
              <h3 className="text-lg font-semibold text-text sm:text-xl">{VALUE_PROP.credibility.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">
                {VALUE_PROP.credibility.body}
              </p>

              <div className="mt-9 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
                {VALUE_PROP.pillars.map((pillar, i) => {
                  const Icon = [CompassIcon, ShieldIcon, DocumentIcon][i % 3];
                  return (
                    <div key={pillar.title} className="flex items-start gap-3.5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-energy" />
                      <div>
                        <h4 className="text-sm font-semibold text-text">{pillar.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{pillar.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative min-h-[16rem] border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
              <Image
                src={VALUE_PROP.credibility.image.src}
                alt={VALUE_PROP.credibility.image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
