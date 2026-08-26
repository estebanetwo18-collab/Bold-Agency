"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion, useHasFinePointer } from "@/lib/motion";

/**
 * Cursor personalizado, solo desktop con puntero fino (mouse) y sin
 * prefers-reduced-motion. Nunca sustituye al cursor nativo en touch:
 * ahí simplemente no se monta, así que la usabilidad móvil no cambia.
 */
export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const enabled = useHasFinePointer();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const active = enabled && !reducedMotion;
    document.documentElement.classList.toggle("cursor-none-custom", active);
    return () => document.documentElement.classList.remove("cursor-none-custom");
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, input, textarea, select")));
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, reducedMotion, x, y]);

  if (!enabled || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full bg-paper"
        animate={{ width: hovering ? 48 : 14, height: hovering ? 48 : 14 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
