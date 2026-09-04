"use client";

import { useEffect, useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, HEADER_CTA, NAV_LINKS, SITE, whatsappHref } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,height] duration-300",
        scrolled ? "border-b border-border bg-bg/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
      style={{ height: scrolled ? "var(--nav-height-scrolled)" : "var(--nav-height)" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-xs font-bold text-accent-ink">
            VT
          </span>
          <span className="text-base font-semibold tracking-tight text-text">
            VoltTech
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={HEADER_CTA.href}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
          >
            {HEADER_CTA.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text lg:hidden"
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
        <div className="border-t border-border bg-bg px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-text-muted hover:bg-white/5 hover:text-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-ink"
            >
              Cotizar por WhatsApp — {SITE.whatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
