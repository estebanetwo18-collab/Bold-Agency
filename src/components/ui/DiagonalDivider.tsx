const TOKENS: Record<string, string> = {
  paper: "var(--color-paper)",
  ink: "var(--color-ink)",
  volt: "var(--color-volt)",
};

/**
 * Banda diagonal decorativa entre dos secciones de distinto color de
 * fondo. Sustituye el típico borde recto por un corte geométrico a
 * sangre, parte del lenguaje visual de BOLD (nunca un degradado).
 */
export function DiagonalDivider({
  from,
  to,
  flip = false,
}: {
  from: keyof typeof TOKENS;
  to: keyof typeof TOKENS;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative h-10 w-full sm:h-16"
      style={{ backgroundColor: TOKENS[from] }}
    >
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polygon
          points={flip ? "0,10 100,0 100,10" : "0,0 100,10 0,10"}
          fill={TOKENS[to]}
        />
      </svg>
    </div>
  );
}
