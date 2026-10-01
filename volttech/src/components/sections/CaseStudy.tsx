import Image from "next/image";
import { CASE_STUDY } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudy() {
  return (
    <section className="bg-bg-elevated py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="accent">{CASE_STUDY.eyebrow}</PillBadge>
        </Reveal>

        <div className="mt-8 grid gap-10 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={60}>
            {CASE_STUDY.image.isPlaceholder ? (
              <PlaceholderImage label={CASE_STUDY.image.alt} aspect="aspect-[4/3]" />
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border-strong">
                <Image
                  src={CASE_STUDY.image.src}
                  alt={CASE_STUDY.image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-energy/30 bg-energy/10 px-3 py-1 text-xs font-semibold text-energy">
                  {CASE_STUDY.clientType}
                </span>
                <span className="text-xs text-text-faint">{CASE_STUDY.location}</span>
              </div>
              <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                {CASE_STUDY.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">{CASE_STUDY.description}</p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {CASE_STUDY.specs.map((spec) => (
                  <div key={spec.label} className="rounded-2xl border border-border bg-bg p-4 text-center">
                    <p className="tabular-nums text-xl font-semibold text-text">{spec.value}</p>
                    <p className="mt-1 text-xs text-text-faint">{spec.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-text-faint">{CASE_STUDY.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
