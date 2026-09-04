import { FAQ_PRACTICAL, FAQ_TECHNICAL, SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <PillBadge tone="green">Preguntas frecuentes</PillBadge>
        <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
          Lo que más nos preguntan los clientes
        </h2>

        <div className="mt-10">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gold">Preguntas prácticas</h3>
          <Accordion items={FAQ_PRACTICAL} />
        </div>

        <div className="mt-10">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gold">
            Marco técnico y legal (generación distribuida)
          </h3>
          <Accordion items={FAQ_TECHNICAL} />
        </div>

        <p className="mt-6 text-sm text-ink-soft/70">
          ¿Tu caso es más específico? Usá la <a href="#calculadora" className="font-semibold text-green underline">calculadora</a> o
          escribinos por WhatsApp al {SITE.whatsapp} con tu factura real.
        </p>
      </div>
    </section>
  );
}
