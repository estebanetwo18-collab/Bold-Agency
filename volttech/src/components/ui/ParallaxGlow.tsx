"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Orbe decorativo con parallax moderado (solo elementos decorativos, nunca
 * contenido real). Se desactiva por completo con prefers-reduced-motion.
 */
export function ParallaxGlow({
  className,
  tone = "accent",
  strength = 0.12,
}: {
  className?: string;
  tone?: "accent" | "energy";
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = (rect.top - window.innerHeight / 2) * strength;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, strength]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl", tone === "accent" ? "glow-accent" : "glow-energy", className)}
    />
  );
}
