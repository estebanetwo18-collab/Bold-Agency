"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { nav } from "@/lib/content";
import { Monogram } from "@/components/ui/Monogram";
import { LogoLockup } from "@/components/ui/LogoLockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-out",
        scrolled
          ? "bg-paper/90 py-3 shadow-[0_1px_0_0_var(--color-grey-light)] backdrop-blur"
          : "bg-transparent py-6",
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
        aria-label="Navegación principal"
      >
        <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="BOLD Agency, inicio">
          <Monogram size={30} state="solid" />
          <LogoLockup />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href={nav.cta.href} variant="ink" strength={10}>
            {nav.cta.label}
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <BurgerIcon open={open} />
        </button>
      </nav>

      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 flex flex-col gap-1 bg-ink px-6 pt-6 md:hidden"
        >
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-paper/10 py-5 font-display text-2xl font-bold text-paper"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8">
            <MagneticButton href={nav.cta.href} onClick={() => setOpen(false)} variant="volt">
              {nav.cta.label}
            </MagneticButton>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <motion.line
        x1="0" x2="18" y1="1" y2="1"
        stroke="currentColor" strokeWidth="1.6"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        style={{ originX: "9px", originY: "1px" }}
      />
      <motion.line
        x1="0" x2="18" y1="7" y2="7"
        stroke="currentColor" strokeWidth="1.6"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
      />
      <motion.line
        x1="0" x2="18" y1="13" y2="13"
        stroke="currentColor" strokeWidth="1.6"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        style={{ originX: "9px", originY: "13px" }}
      />
    </svg>
  );
}
