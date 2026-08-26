"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Reveal editorial al entrar en viewport: desplazamiento vertical corto
 * + opacidad. Nada de rebotes: una sola curva de salida (ease-bold).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Comp = motion[as];

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
