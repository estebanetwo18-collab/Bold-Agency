import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function PillBadge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "cream" | "green";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold/15 text-gold border-gold/30",
    cream: "bg-cream/10 text-cream border-cream/20",
    green: "bg-green/15 text-green border-green/30",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
