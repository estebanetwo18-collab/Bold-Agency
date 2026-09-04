import { SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <PillBadge tone="green">Contacto</PillBadge>
          <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
            Contanos tu caso y te respondemos
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Este formulario no genera una cotización automática — es el primer contacto para que German
            revise tu caso con tu factura eléctrica real.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink-soft">
            <li>
              <span className="font-bold text-forest">WhatsApp:</span> {SITE.whatsapp}
            </li>
            <li>
              <span className="font-bold text-forest">Correo:</span> {SITE.email}
            </li>
            <li>
              <span className="font-bold text-forest">Horario:</span> {SITE.schedule}
            </li>
            <li>
              <span className="font-bold text-forest">Zona:</span> {SITE.location}
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
