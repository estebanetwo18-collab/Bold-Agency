import { COVERAGE_AREAS, STATS } from "@/lib/content";

export function Stats() {
  return (
    <section className="border-y border-gold/15 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-4xl font-black text-gold sm:text-5xl">
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-xs font-medium leading-snug text-cream/65 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold/80">Cobertura</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {COVERAGE_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-cream/15 px-3.5 py-1.5 text-xs font-medium text-cream/75"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
