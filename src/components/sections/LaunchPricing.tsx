import { launchPricing } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function LaunchPricing() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={launchPricing.eyebrow}
          headline={launchPricing.headline}
          intro={launchPricing.intro}
          tone="paper"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {launchPricing.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-8",
                tier.featured
                  ? "border-volt/50 bg-gradient-to-b from-surface to-ink shadow-[0_0_60px_-15px_rgba(242,230,77,.35)]"
                  : "border-paper/10 bg-surface",
              )}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-volt/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-volt">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 16L16 4M16 4H7M16 4V13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {tier.badge ? (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide",
                      tier.featured ? "bg-volt text-ink" : "bg-paper/10 text-paper",
                    )}
                  >
                    {tier.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide text-grey-light">
                {tier.name}
              </h3>

              <p className="mt-3 flex items-baseline gap-1.5 font-display text-4xl font-extrabold text-paper">
                {tier.price}
                <span className="font-display text-base font-semibold text-grey-light">
                  {tier.unit}
                </span>
              </p>
              <p className="mt-1 text-xs text-grey-light">{tier.priceNote}</p>

              <ul className="mt-8 flex flex-1 flex-col gap-5 border-t border-paper/10 pt-6">
                {tier.features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                    <span>
                      <span className="font-display text-sm font-bold text-paper">
                        {feature.label}
                      </span>
                      <span className="block text-sm text-grey-light">{feature.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6 rounded-2xl bg-volt px-6 py-4 text-center">
          <p className="text-sm font-semibold text-ink">{launchPricing.promo}</p>
        </Reveal>
      </div>
    </section>
  );
}
