import Image from "next/image";
import { HERO, SITE, STATS } from "@/lib/content";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[720px] items-end overflow-hidden sm:min-h-[800px]">
      {HERO.image.isPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--dark-bg)]">
          <PlaceholderImage label={HERO.image.alt} aspect="aspect-auto" className="h-full w-full" />
        </div>
      ) : (
        <Image
          src={HERO.image.src}
          alt={HERO.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Degradado para legibilidad del texto blanco sobre la foto — deja el
          tercio superior (donde flota el header) prácticamente sin tocar,
          ya que el cielo de la foto ya es claro ahí. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(6,20,12,.82) 0%, rgba(6,20,12,.6) 30%, rgba(6,20,12,.2) 55%, rgba(6,20,12,.02) 75%), linear-gradient(to top, rgba(6,20,12,.72) 0%, transparent 32%, transparent 68%, rgba(6,20,12,.1) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-[calc(var(--nav-height)+2rem)] sm:px-8 sm:pb-16">
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
              {HERO.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {HERO.headline}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {HERO.subheadline}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={HERO.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-ink transition-all hover:bg-cta-strong hover:shadow-[0_0_0_6px_rgba(255,203,71,0.3)]"
              >
                {HERO.primaryCta.label}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
              <a
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {HERO.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <p className="mt-7 text-xs text-white/70">
            WhatsApp directo: {SITE.whatsapp} · {SITE.schedule}
          </p>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex gap-10 border-t border-white/20 pt-6 sm:mt-14 sm:gap-16">
            <div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">{STATS[0].value} años</p>
              <p className="mt-1 max-w-[16ch] text-xs font-medium leading-snug text-white/70 sm:text-sm">
                de experiencia técnica
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                {STATS[1].value}
                {STATS[1].suffix}
              </p>
              <p className="mt-1 max-w-[16ch] text-xs font-medium leading-snug text-white/70 sm:text-sm">
                {STATS[1].label}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
