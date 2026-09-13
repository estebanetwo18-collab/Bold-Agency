import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function CircleIcon({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "energy" | "surface";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-accent-ink",
    energy: "bg-energy text-energy-ink",
    surface: "bg-surface text-accent border border-border-strong",
  } as const;

  return (
    <div
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
