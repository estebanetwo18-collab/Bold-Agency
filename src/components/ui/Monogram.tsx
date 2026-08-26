"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

export type MonogramState = "outline" | "solid" | "inverted" | "active";

const FILLS: Record<MonogramState, { fill: string; stroke: string; bg?: string }> = {
  outline: { fill: "none", stroke: "var(--color-ink)" },
  solid: { fill: "var(--color-ink)", stroke: "var(--color-ink)" },
  inverted: { fill: "var(--color-paper)", stroke: "var(--color-paper)" },
  active: { fill: "var(--color-volt)", stroke: "var(--color-volt)" },
};

/**
 * Monograma B/BA: dos chevrons geométricos que forman una "B" abstracta.
 * No es el logotipo (la palabra "BOLD Agency" nunca usa Volt); es el
 * recurso de navegación/interacción que sí puede tomar el acento Volt
 * en su estado "active".
 */
export function Monogram({
  state = "outline",
  size = 40,
  animateStates,
  className,
}: {
  state?: MonogramState;
  size?: number;
  /** Si se pasa, el monograma cicla automáticamente por sus 4 estados. */
  animateStates?: boolean;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const cycle: MonogramState[] = ["outline", "solid", "active", "inverted"];
  const shouldCycle = animateStates && !reducedMotion;

  const colors = FILLS[state];

  return (
    <motion.svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Monograma BOLD Agency"
      initial={false}
    >
      <motion.g
        animate={
          shouldCycle
            ? {
                fill: cycle.map((s) => FILLS[s].fill === "none" ? "rgba(0,0,0,0)" : FILLS[s].fill),
                stroke: cycle.map((s) => FILLS[s].stroke),
              }
            : { fill: colors.fill === "none" ? "rgba(0,0,0,0)" : colors.fill, stroke: colors.stroke }
        }
        transition={
          shouldCycle
            ? { duration: 6, repeat: Infinity, ease: "linear", times: [0, 0.33, 0.66, 1] }
            : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
        strokeWidth={3}
        strokeLinejoin="round"
      >
        <path d="M6 6 H24 a9 9 0 0 1 0 18 H6 Z" />
        <path d="M6 24 H27 a9 9 0 0 1 0 18 H6 Z" />
      </motion.g>
    </motion.svg>
  );
}
