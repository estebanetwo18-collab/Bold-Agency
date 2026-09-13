import { cn } from "@/lib/cn";

/**
 * Isotipo Volt Tech: 4 rombos de esquina redondeada agrupados en cruz, con
 * la "V" de "Volt" formada en el espacio negativo central. Geometría y
 * colores extraídos por muestreo de píxeles del isotipo oficial del
 * Manual de Marca v1.0 (2026) — no se dispone del archivo vectorial
 * original (LOGOS_INDIVIDUALES.ai). Mapeo de color verificado: arriba y
 * abajo en Verde Brote, izquierda y derecha en Verde Hoja.
 */
export function LogoMark({ className, tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  const brightGreen = tone === "light" ? "#ffffff" : "var(--verde-brote)";
  const darkGreen = tone === "light" ? "rgba(255,255,255,0.55)" : "var(--verde-hoja)";

  return (
    <svg viewBox="0 0 100 100" className={cn("h-8 w-8", className)} aria-hidden="true">
      <rect x="37.5" y="12.5" width="25" height="25" rx="5.5" fill={brightGreen} transform="rotate(45 50 25)" />
      <rect x="38.5" y="61.5" width="23" height="23" rx="5" fill={brightGreen} transform="rotate(45 50 73)" />
      <rect x="12.5" y="37.5" width="25" height="25" rx="5.5" fill={darkGreen} transform="rotate(45 25 50)" />
      <rect x="62.5" y="37.5" width="25" height="25" rx="5.5" fill={darkGreen} transform="rotate(45 75 50)" />
    </svg>
  );
}

export function Logo({ className, tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  const wordmarkVol = tone === "light" ? "text-white" : "text-[var(--verde-bosque)]";
  const wordmarkTech = tone === "light" ? "text-[var(--verde-brote)]" : "text-[var(--verde-senal)]";

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark tone={tone} className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="text-lg font-extrabold tracking-tight">
        <span className={wordmarkVol}>Volt</span> <span className={wordmarkTech}>Tech</span>
      </span>
    </span>
  );
}
