import { finalCta } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Monogram } from "@/components/ui/Monogram";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-volt py-28 text-ink lg:py-36">
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 opacity-20"
        aria-hidden="true"
      >
        <Monogram size={280} state="outline" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {finalCta.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-balance mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            {finalCta.body}
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex justify-center">
          <MagneticButton href={finalCta.cta.href} variant="ink">
            {finalCta.cta.label}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
