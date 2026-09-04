import { HERO, SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-forest text-cream">
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div>
          <PillBadge tone="gold">{HERO.eyebrow}</PillBadge>

          <div className="mt-6 space-y-2">
            {HERO.hooks.map((hook) => (
              <p key={hook} className="text-sm font-semibold text-gold-bright sm:text-base">
                {hook}
              </p>
            ))}
          </div>

          <h1 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            {HERO.headline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {HERO.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={HERO.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-forest transition-colors hover:bg-gold-bright"
            >
              {HERO.primaryCta.label}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {HERO.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 text-xs text-cream/50">
            WhatsApp directo: {SITE.whatsapp} · {SITE.schedule}
          </p>
        </div>

        <div className="relative">
          {HERO.image.isPlaceholder ? (
            <PlaceholderImage label={HERO.image.alt} aspect="aspect-[4/5] sm:aspect-[5/6]" />
          ) : null}
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-gold/30 bg-forest/95 px-5 py-4 shadow-xl sm:block">
            <p className="text-2xl font-black text-gold">13</p>
            <p className="text-xs font-semibold text-cream/70">años de experiencia técnica</p>
          </div>
        </div>
      </div>
    </section>
  );
}
