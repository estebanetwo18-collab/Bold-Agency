import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function PillBadge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "energy" | "neutral";
  className?: string;
}) {
  const tones = {
    accent: "border-accent/30 bg-accent/10 text-accent",
    energy: "border-energy/30 bg-energy/10 text-energy",
    neutral: "border-border-strong bg-white/[0.04] text-text-muted",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
