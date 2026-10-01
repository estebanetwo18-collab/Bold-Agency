"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_WHATSAPP_MESSAGE, HEADER_CTA, NAV_LINKS, SITE, whatsappHref } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // El hero de portada es una foto full-bleed oscura: el header flota
  // transparente con texto blanco sobre ella hasta que se hace scroll.
  // En el resto de páginas (fondo claro desde el inicio) nunca es transparente.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,height] duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-surface/90 shadow-[0_1px_0_rgba(20,83,45,0.04)] backdrop-blur-xl",
      )}
      style={{ height: transparent ? "var(--nav-height)" : "var(--nav-height-scrolled)" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" onClick={() => setOpen(false)}>
          <Logo tone={transparent ? "light" : "color"} className={transparent ? "[text-shadow:0_1px_3px_rgba(0,0,0,0.35)]" : undefined} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                transparent
                  ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)] hover:bg-white/10 hover:text-white"
                  : "text-text-muted hover:bg-black/[0.03] hover:text-ink",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={HEADER_CTA.href}
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-strong"
          >
            {HEADER_CTA.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
            transparent ? "border-white/40 text-white" : "border-border-strong text-ink",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-text-muted hover:bg-black/[0.03] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-cta px-5 py-3 text-center text-sm font-semibold text-cta-ink"
            >
              Cotizar por WhatsApp — {SITE.whatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
