import { NAV_LINKS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal pt-16 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest">
                VT
              </span>
              <span className="text-lg font-bold text-cream">
                Volt<span className="text-gold">Tech</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Energía solar y soluciones eléctricas en {SITE.location}. Instalación, diseño y
              mantenimiento con procesos y garantías transparentes.
            </p>
            <p className="mt-4 text-xs text-cream/40">
              {SITE.legalName} · Cédula {SITE.legalId}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gold">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gold">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>WhatsApp: {SITE.whatsapp}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.schedule}</li>
              <li>{SITE.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gold">Redes</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Instagram — {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Facebook — VoltTech Soluciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="transition-colors hover:text-gold">
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="transition-colors hover:text-gold">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 py-6 text-xs text-cream/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} VoltTech Soluciones. Todos los derechos reservados.</p>
          <p>Sitio construido para mostrar procesos, precios y garantías reales.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none pb-2 text-center leading-[0.8]">
        <span
          aria-hidden="true"
          className="block text-[18vw] font-black tracking-tighter text-cream/[0.05] sm:text-[16vw]"
        >
          {SITE.wordmark}
        </span>
      </div>
    </footer>
  );
}
