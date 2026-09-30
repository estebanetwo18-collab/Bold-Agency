"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Chevron } from "./Chevron";
import { cn } from "@/lib/cn";

export const SECTIONS = [
  { id: "idea", n: "01", label: "Idea" },
  { id: "metodo", n: "02", label: "Método" },
  { id: "destino", n: "03", label: "Destino" },
  { id: "taller", n: "04", label: "Taller" },
] as const;

/** Nav de la pieza: los chevrons marcan dónde estás y hacia dónde sigue el flujo. */
export function Header() {
  const [active, setActive] = useState<string>("idea");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => Boolean(e),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-ink text-paper">
      <div className="pc-wrap flex h-14 items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-baseline gap-2" aria-label="BOLD Agency, sitio principal">
          <span className="pc-display text-xl">BOLD</span>
          <span className="pc-agency hidden text-[0.5rem] min-[380px]:inline">Agency</span>
        </Link>
        <nav aria-label="Secciones de PromptCraft">
          <ol className="flex items-center">
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "location" : undefined}
                    aria-label={`${s.n} ${s.label}`}
                    className={cn(
                      "pc-data flex min-h-11 items-center gap-1.5 px-2 sm:px-3",
                      on ? "text-volt" : "text-paper/70 hover:text-paper",
                    )}
                  >
                    <Chevron className={cn("h-2.5 w-4", on ? "opacity-100" : "opacity-30")} />
                    <span>{s.n}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}

/** Franja de avance al final de cada sección. */
export function NextStrip({ href, n, label, tone }: { href: string; n: string; label: string; tone: "ink" | "paper" }) {
  return (
    <a
      href={href}
      className={cn(
        "group mt-14 flex min-h-14 items-center justify-between gap-4 border-t-2 py-4",
        tone === "ink" ? "border-volt text-paper" : "border-ink text-ink",
      )}
    >
      <span className="pc-data">Siguiente · {n}</span>
      <span className="pc-display flex items-center gap-3 text-2xl sm:text-4xl">
        {label}
        <Chevron direction="down" className="h-5 w-8 transition-transform group-hover:translate-y-1 sm:h-7 sm:w-11" color={tone === "ink" ? "var(--pc-volt)" : "var(--pc-ink)"} />
      </span>
    </a>
  );
}
