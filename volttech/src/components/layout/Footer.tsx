import { NAV_LINKS, SITE } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-bg pt-16 text-dark-text">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-dark-border pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-dark-text-muted">
              Energía solar y soluciones eléctricas en {SITE.location}. Instalación, diseño y
              mantenimiento con procesos y garantías transparentes.
            </p>
            <p className="mt-4 text-xs text-dark-text-muted/80">
              {SITE.legalName} · Cédula {SITE.legalId}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-dark-text-muted">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-dark-text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-dark-text-muted">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-dark-text-muted">
              <li>WhatsApp: {SITE.whatsapp}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.schedule}</li>
              <li>{SITE.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-dark-text-muted">Redes</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-dark-text-muted">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram — {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook — {SITE.brandNameLong}
                </a>
              </li>
              <li>
                <a href="/privacidad" className="transition-colors hover:text-white">
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="transition-colors hover:text-white">
                  Términos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 py-6 text-xs text-dark-text-muted/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.brandNameLong}. Todos los derechos reservados.</p>
          <p>Sitio construido para mostrar procesos, precios y garantías reales.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none pb-2 text-center leading-[0.8]">
        <span
          aria-hidden="true"
          className="block text-[18vw] font-extrabold tracking-tighter text-white/[0.06] sm:text-[16vw]"
        >
          {SITE.wordmark}
        </span>
      </div>
    </footer>
  );
}
