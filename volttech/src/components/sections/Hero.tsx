import { HERO, SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxGlow } from "@/components/ui/ParallaxGlow";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-bg pb-16 pt-[calc(var(--nav-height)+2.5rem)] sm:pb-24 sm:pt-[calc(var(--nav-height)+4rem)]">
      <div className="grid-overlay pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <ParallaxGlow tone="accent" className="left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2" strength={0.08} />
      <ParallaxGlow tone="energy" className="bottom-[-15%] right-[-10%] h-[28rem] w-[28rem]" strength={0.14} />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <PillBadge tone="accent">{HERO.eyebrow}</PillBadge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
              {HERO.headline}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              {HERO.subheadline}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={HERO.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-all hover:bg-accent-strong hover:shadow-[0_0_0_6px_rgba(47,214,209,0.12)]"
              >
                {HERO.primaryCta.label}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
              <a
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              >
                {HERO.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap gap-2">
              {HERO.hooks.map((hook) => (
                <span
                  key={hook}
                  className="rounded-full border border-border bg-white/[0.03] px-4 py-2 text-xs font-medium text-text-muted sm:text-sm"
                >
                  {hook}
                </span>
              ))}
            </div>
          </Reveal>

          <p className="mt-7 text-xs text-text-faint">
            WhatsApp directo: {SITE.whatsapp} · {SITE.schedule}
          </p>
        </div>

        <Reveal delay={160} className="relative">
          {HERO.image.isPlaceholder ? (
            <PlaceholderImage label={HERO.image.alt} aspect="aspect-[4/5] sm:aspect-[5/6]" />
          ) : null}
          <div className="glass absolute -bottom-6 -left-6 hidden rounded-2xl border border-border-strong px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:block">
            <p className="text-2xl font-semibold text-energy">13 años</p>
            <p className="text-xs font-medium text-text-muted">de experiencia técnica</p>
          </div>
          <div className="glass absolute -right-4 -top-4 hidden rounded-2xl border border-border-strong px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:block">
            <p className="text-xs font-medium text-text-muted">Garantía por componente</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
