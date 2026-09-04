import { cn } from "@/lib/cn";

/**
 * Marcador visual para fotografía pendiente de recibir. Se usa en vez de
 * un <img> roto cuando no hay foto real disponible para una sección —
 * el texto del label queda visible en el propio diseño, no solo en el alt.
 */
export function PlaceholderImage({
  label,
  className,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        aspect,
        "relative flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-gold/40 bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--color-forest)_92%,transparent)_0px,color-mix(in_srgb,var(--color-forest)_92%,transparent)_14px,color-mix(in_srgb,var(--color-charcoal)_92%,transparent)_14px,color-mix(in_srgb,var(--color-charcoal)_92%,transparent)_28px)] p-6 text-center",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-9 w-9 text-gold/70"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16.5 15.5 11 6 20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="max-w-[22ch] text-xs font-semibold uppercase tracking-wide text-cream/80">
          {label}
        </p>
      </div>
    </div>
  );
}
