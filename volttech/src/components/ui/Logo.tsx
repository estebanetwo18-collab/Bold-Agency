import { cn } from "@/lib/cn";

/**
 * Isotipo VolTech: panel solar en perspectiva (cuatro celdas rotadas 45°)
 * con la V de "Volt" en el espacio negativo central. Recreado en SVG a
 * partir del Manual de Marca v1.0 (2026) — no se dispone del archivo
 * vectorial original (LOGOS_INDIVIDUALES.ai), así que esta es una
 * reconstrucción fiel a la geometría y paleta documentadas ahí.
 */
export function LogoMark({ className, tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  const light = tone === "light" ? "#ffffff" : "var(--verde-brote)";
  const lightSoft = tone === "light" ? "rgba(255,255,255,0.92)" : "var(--verde-menta)";
  const dark = tone === "light" ? "rgba(255,255,255,0.55)" : "var(--verde-bosque)";
  const darkAlt = tone === "light" ? "rgba(255,255,255,0.7)" : "var(--verde-hoja)";

  return (
    <svg viewBox="0 0 100 100" className={cn("h-8 w-8", className)} aria-hidden="true">
      <polygon points="50,10 64,26 50,42 36,26" fill={light} />
      <polygon points="14,50 30,36 46,50 30,64" fill={dark} />
      <polygon points="54,50 70,36 86,50 70,64" fill={darkAlt} />
      <polygon points="50,58 62,70 50,90 38,70" fill={lightSoft} />
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
        <span className={wordmarkVol}>Vol</span>
        <span className={wordmarkTech}>Tech</span>
      </span>
    </span>
  );
}
