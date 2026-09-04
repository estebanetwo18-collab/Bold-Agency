import { BRANDS } from "@/lib/content";

export function Brands() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-green">{BRANDS.eyebrow}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {BRANDS.groups.map((group) => (
            <div key={group.category} className="rounded-2xl border border-green/15 bg-white p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-gold">{group.category}</p>
              <p className="mt-2 text-sm font-semibold text-forest">{group.names.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
