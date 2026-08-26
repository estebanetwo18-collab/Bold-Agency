import { plans } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

export function Plans() {
  return (
    <section className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={plans.eyebrow}
          headline={plans.headline}
          intro={plans.intro}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={cn(
                "flex flex-col rounded-[1.75rem] border p-9",
                tier.featured
                  ? "border-ink bg-ink text-paper"
                  : "border-grey-light bg-paper text-ink",
              )}
            >
              {tier.featured ? (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-volt px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-ink">
                  Más elegido
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  tier.featured ? "text-grey-light" : "text-grey",
                )}
              >
                {tier.description}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckIcon featured={tier.featured} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p
                  className={cn(
                    "font-display text-sm font-semibold",
                    tier.featured ? "text-volt" : "text-grey",
                  )}
                >
                  {tier.priceNote}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 rounded-2xl bg-grey-light/40 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-grey">
            {plans.disclaimer}
          </p>
          <MagneticButton href="#diagnostico" variant="ink" strength={10}>
            Definir mi plan
          </MagneticButton>
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
