import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function CircleIcon({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "cream" | "forest";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold text-forest",
    cream: "bg-cream text-forest",
    forest: "bg-forest text-gold border border-gold/30",
  } as const;

  return (
    <div
      className={cn(
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
