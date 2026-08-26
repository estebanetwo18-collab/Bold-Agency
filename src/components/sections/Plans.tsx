import { plans, pointPricing } from "@/lib/content";
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

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {plans.modalities.map((modality, i) => (
            <Reveal
              key={modality.name}
              delay={i * 0.08}
              className={cn(
                "flex flex-col rounded-[1.75rem] border p-9",
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

        <Reveal delay={0.16} className="mt-16">
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {pointPricing.eyebrow}
          </span>
          <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight text-ink sm:text-[1.7rem]">
            {pointPricing.headline}
          </h3>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pointPricing.items.map((item, i) => (
            <Reveal
              key={item.tag}
              delay={i * 0.05}
              className="rounded-2xl border border-grey-light p-6"
            >
              <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-grey">
                {item.tag}
              </span>
              <p className="mt-2.5 font-display text-xl font-extrabold text-ink">
                {item.amount}
                {item.unit ? (
                  <span className="ml-1 font-display text-sm font-semibold text-grey">
                    {item.unit}
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-grey">{item.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-5 rounded-2xl bg-ink px-6 py-4 text-center">
          <p className="text-sm text-paper">
            {pointPricing.promo.split("—").map((part, i) =>
              i === 0 ? (
                <span key={i} className="font-display font-bold text-volt">
                  {part}—
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col items-start gap-6 rounded-2xl bg-grey-light/40 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-grey">{plans.disclaimer}</p>
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
