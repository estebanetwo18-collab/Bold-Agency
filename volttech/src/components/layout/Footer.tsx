import { NAV_LINKS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg pt-16 text-text">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-xs font-bold text-accent-ink">
                VT
              </span>
              <span className="text-base font-semibold text-text">VoltTech</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              Energía solar y soluciones eléctricas en {SITE.location}. Instalación, diseño y
              mantenimiento con procesos y garantías transparentes.
            </p>
            <p className="mt-4 text-xs text-text-faint">
              {SITE.legalName} · Cédula {SITE.legalId}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-faint">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-faint">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              <li>WhatsApp: {SITE.whatsapp}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.schedule}</li>
              <li>{SITE.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-faint">Redes</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Instagram — {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Facebook — VoltTech Soluciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="transition-colors hover:text-accent">
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="transition-colors hover:text-accent">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 py-6 text-xs text-text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} VoltTech Soluciones. Todos los derechos reservados.</p>
          <p>Sitio construido para mostrar procesos, precios y garantías reales.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none pb-2 text-center leading-[0.8]">
        <span
          aria-hidden="true"
          className="block text-[18vw] font-semibold tracking-tighter text-white/[0.035] sm:text-[16vw]"
        >
          {SITE.wordmark}
        </span>
      </div>
    </footer>
  );
}
