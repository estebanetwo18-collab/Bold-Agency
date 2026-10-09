"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/chika/content";
import { Logo } from "./Logo";

export function Nav({ reserveHref, external }: { reserveHref: string; external: boolean }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a,button");
        const all = [toggleRef.current!, ...Array.from(f)];
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="ck-nav" data-open={open}>
      <div className="ck-nav__bar">
        <a href="#inicio" className="ck-nav__logo" aria-label="Chika, ir al inicio" onClick={close}>
          <Logo compact />
        </a>

        <nav className="ck-nav__links" aria-label="Principal">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className="ck-btn ck-btn--solid ck-nav__cta"
          href={reserveHref}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {nav.cta}
        </a>

        <a
          className="ck-btn ck-btn--solid ck-nav__cta-m"
          href={reserveHref}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {nav.ctaShort}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="ck-nav__toggle"
          aria-expanded={open}
          aria-controls="ck-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="ck-visually-hidden">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="ck-nav__burger" aria-hidden="true" />
        </button>
      </div>

      <div id="ck-menu" ref={menuRef} className="ck-menu" hidden={!open}>
        <nav aria-label="Menú móvil">
          <ul>
            {nav.links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>
                  <span className="ck-menu__n" aria-hidden="true">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="ck-btn ck-btn--solid ck-menu__cta"
          href={reserveHref}
          onClick={close}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {nav.cta}
        </a>
      </div>
    </header>
  );
}
