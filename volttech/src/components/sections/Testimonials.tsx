import { TESTIMONIALS } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-forest py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <PillBadge tone="gold">Testimonios</PillBadge>
        <h2 className="mt-5 max-w-xl text-balance text-3xl font-black tracking-tight sm:text-4xl">
          Lo que dicen quienes ya trabajaron con VoltTech
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) =>
            t.confirmed ? (
              <figure key={i} className="rounded-3xl border border-gold/25 bg-charcoal/60 p-6">
                <blockquote className="text-sm leading-relaxed text-cream/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-gold">
                  {t.name} <span className="font-normal text-cream/50">· {t.source}</span>
                </figcaption>
              </figure>
            ) : (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cream/20 p-6 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">{t.name}</p>
                <p className="mt-2 text-xs text-cream/40">Espacio reservado para un testimonio adicional</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
