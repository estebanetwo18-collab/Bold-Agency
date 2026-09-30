import { cn } from "@/lib/cn";

/**
 * Chevron diagonal de BOLD (Volt sobre Ink). Es el recurso de dirección de
 * la pieza: nav, avance entre secciones, progreso y estados.
 */
export function Chevron({
  direction = "right",
  className,
  color = "var(--pc-volt)",
}: {
  direction?: "right" | "down" | "left";
  className?: string;
  color?: string;
}) {
  const rotate = { right: 0, down: 90, left: 180 }[direction];
  return (
    <svg
      viewBox="0 0 100 60"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <polygon points="0,0 38,0 100,30 38,60 0,60 62,30" fill={color} />
    </svg>
  );
}

/** Triángulo blanco de acento sobre Ink. */
export function Triangle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 86" aria-hidden="true" focusable="false" className={className}>
      <polygon points="50,0 100,86 0,86" fill="var(--pc-paper)" />
    </svg>
  );
}
