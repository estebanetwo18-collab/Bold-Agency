import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Wordmark real: "BOLD" grande + "AGENCY" pequeño y tracked, apilados. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col gap-[2px] leading-[0.82]", className)}>
      <span className="font-display text-xl font-black tracking-tight">{nav.logoWord}</span>
      <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]">{nav.logoSub}</span>
    </span>
  );
}
