"use client";

import { useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, NAV_LINKS, SITE, whatsappHref } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/10 bg-forest/95 backdrop-blur">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest">
            VT
          </span>
          <span className="text-lg font-bold tracking-tight text-cream">
            Volt<span className="text-gold">Tech</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-cream/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-forest transition-colors hover:bg-gold-bright"
          >
            Cotizar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-forest px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-cream/85 hover:bg-cream/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-forest"
            >
              Cotizar por WhatsApp — {SITE.whatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
