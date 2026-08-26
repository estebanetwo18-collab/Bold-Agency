"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

export type MonogramState = "outline" | "solid" | "inverted" | "active";

const FILLS: Record<MonogramState, string> = {
  outline: "var(--color-ink)",
  solid: "var(--color-ink)",
  inverted: "var(--color-paper)",
  active: "var(--color-volt)",
};

/**
 * Monograma "B": la letra real de la marca (Archivo Black), no un ícono
 * abstracto. Cuatro estados de color como recurso de navegación/interacción
 * — nunca dentro del logotipo/wordmark, que siempre queda en Ink o Paper.
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

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Monograma BOLD Agency"
    >
      <motion.text
        x="24"
        y="37"
        textAnchor="middle"
        fontFamily="var(--font-display), Arial, sans-serif"
        fontWeight={900}
        fontSize={42}
        animate={
          shouldCycle
            ? { fill: cycle.map((s) => FILLS[s]) }
            : { fill: FILLS[state] }
        }
        transition={
          shouldCycle
            ? { duration: 6, repeat: Infinity, ease: "linear", times: [0, 0.33, 0.66, 1] }
            : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
      >
        B
      </motion.text>
    </svg>
  );
}
