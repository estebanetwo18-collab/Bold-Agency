import { PROCESS } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";

export function Process() {
  return (
    <section className="bg-forest py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <PillBadge tone="gold">{PROCESS.eyebrow}</PillBadge>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-black tracking-tight sm:text-4xl">
          {PROCESS.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70">{PROCESS.intro}</p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.steps.map((step, i) => (
            <li key={step.title} className="rounded-3xl border border-cream/12 bg-charcoal/60 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-black text-forest">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <p className="text-sm leading-relaxed text-cream/85">{PROCESS.transparencyNote}</p>
        </div>
      </div>
    </section>
  );
}
