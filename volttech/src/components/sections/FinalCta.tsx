import { FINAL_CTA } from "@/lib/content";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PillBadge } from "@/components/ui/PillBadge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxGlow } from "@/components/ui/ParallaxGlow";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-bg-elevated py-20 sm:py-28">
      <ParallaxGlow tone="accent" className="left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2" strength={0.06} />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal className="flex justify-center">
          <PillBadge tone="energy">{FINAL_CTA.eyebrow}</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {FINAL_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{FINAL_CTA.body}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={FINAL_CTA.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-semibold text-cta-ink transition-all hover:bg-cta-strong hover:shadow-[0_0_0_6px_rgba(255,203,71,0.3)]"
            >
              {FINAL_CTA.cta.label}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
            <a
              href={FINAL_CTA.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-8 py-4 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            >
              {FINAL_CTA.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
