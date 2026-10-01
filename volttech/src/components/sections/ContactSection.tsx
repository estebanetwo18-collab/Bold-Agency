import { SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-bg py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <div>
            <PillBadge tone="accent">Contacto</PillBadge>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Contanos tu caso y te respondemos
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
              Este formulario no genera una cotización automática — es el primer contacto para que German
              revise tu caso con tu factura eléctrica real.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-text-muted">
              <li>
                <span className="font-semibold text-text">WhatsApp:</span> {SITE.whatsapp}
              </li>
              <li>
                <span className="font-semibold text-text">Correo:</span> {SITE.email}
              </li>
              <li>
                <span className="font-semibold text-text">Horario:</span> {SITE.schedule}
              </li>
              <li>
                <span className="font-semibold text-text">Zona:</span> {SITE.location}
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
