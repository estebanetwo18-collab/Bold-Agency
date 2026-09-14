import { getServerContent } from "@/lib/getContentServer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

export async function Plans() {
  const { plans, launchPricing } = await getServerContent();

  return (
    <section id="planes" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={plans.eyebrow}
          headline={plans.headline}
          intro={plans.intro}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {plans.modalities.map((modality, i) => (
            <Reveal
              key={modality.name}
              delay={i * 0.08}
              className={cn(
                "flex flex-col border p-9",
                modality.featured
                  ? "border-ink bg-ink text-paper"
                  : "border-grey-light bg-paper text-ink",
              )}
            >
              {modality.badge ? (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-volt px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-ink">
                  {modality.badge}
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{modality.name}</h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  modality.featured ? "text-grey-light" : "text-grey",
                )}
              >
                {modality.description}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {modality.includes.map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-sm">
                    <CheckIcon featured={modality.featured} />
                    <span>
                      <span className="font-semibold">{item.label}</span>{" "}
                      <span className={modality.featured ? "text-grey-light" : "text-grey"}>
                        — {item.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p
                  className={cn(
                    "font-display text-sm font-semibold",
                    modality.featured ? "text-volt" : "text-grey",
                  )}
                >
                  {modality.price}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14} className="mt-14 overflow-hidden bg-ink p-8 text-paper sm:p-10">
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-volt">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {launchPricing.eyebrow}
          </span>
          <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">
            {launchPricing.headline}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-grey-light">
            {launchPricing.intro}
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {launchPricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col border p-6",
                  tier.featured
                    ? "border-volt/50 bg-gradient-to-b from-surface to-ink"
                    : "border-paper/10 bg-surface",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wide text-grey-light">
                    {tier.name}
                  </h4>
                  {tier.badge ? (
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wide",
                        tier.featured ? "bg-volt text-ink" : "bg-paper/10 text-paper",
                      )}
                    >
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 flex items-baseline gap-1.5 font-display text-3xl font-extrabold">
                  {tier.price}
                  <span className="font-display text-sm font-semibold text-grey-light">
                    {tier.unit}
                  </span>
                </p>
                <p className="mt-1 text-xs text-grey-light">{tier.priceNote}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-4 border-t border-paper/10 pt-5">
                  {tier.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                      <span>
                        <span className="font-display text-sm font-bold">{feature.label}</span>
                        <span className="block text-sm text-grey-light">{feature.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-volt px-6 py-4 text-center">
            <p className="text-sm font-semibold text-ink">{launchPricing.promo}</p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-start gap-6 bg-grey-light/40 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-grey">{plans.disclaimer}</p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/calculadora" variant="volt" strength={10}>
              {plans.calculatorCtaLabel}
            </MagneticButton>
            <MagneticButton href="#diagnostico" variant="ink" strength={10}>
              {plans.ctaLabel}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ featured }: { featured?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn("mt-0.5 shrink-0", featured ? "text-volt" : "text-ink")}
      aria-hidden="true"
    >
      <path
        d="M3.5 9.5L7 13L14.5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
