import { TESTIMONIALS } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const confirmed = TESTIMONIALS.filter((t) => t.confirmed);
  const pending = TESTIMONIALS.filter((t) => !t.confirmed);

  return (
    <section id="testimonios" className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="accent">Testimonios</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Lo que dicen quienes ya trabajaron con Volt Tech
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {confirmed.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-8 sm:p-10">
                <blockquote className="text-lg leading-relaxed text-text sm:text-xl">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text">{t.name}</span>
                    <span className="block text-xs text-text-faint">{t.source}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <div className="flex flex-col gap-5">
            {pending.map((t, i) => (
              <Reveal key={i} delay={(confirmed.length + i) * 80}>
                <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-border-strong p-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Próximamente</p>
                  <p className="mt-2 text-xs text-text-faint">Más testimonios en camino</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
