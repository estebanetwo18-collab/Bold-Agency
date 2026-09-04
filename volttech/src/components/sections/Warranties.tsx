import { WARRANTIES } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { ShieldIcon } from "@/components/ui/icons";

export function Warranties() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <PillBadge tone="green">{WARRANTIES.eyebrow}</PillBadge>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
          {WARRANTIES.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{WARRANTIES.intro}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {WARRANTIES.items.map((item) => (
            <div
              key={item.component}
              className="flex items-start gap-4 rounded-2xl border border-green/15 bg-white p-6"
            >
              <ShieldIcon className="mt-1 h-6 w-6 shrink-0 text-green" />
              <div>
                <h3 className="font-bold text-forest">{item.component}</h3>
                <p className="mt-1 text-sm font-semibold text-gold">{item.warranty}</p>
                <p className="mt-1 text-xs text-ink-soft/70">{item.confidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
