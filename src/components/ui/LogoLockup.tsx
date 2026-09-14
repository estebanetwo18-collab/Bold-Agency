import { cn } from "@/lib/cn";

/** Wordmark real: "BOLD" grande + "AGENCY" pequeño y tracked, apilados. Igual en los 3 idiomas. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col gap-[2px] leading-[0.82]", className)}>
      <span className="font-display text-xl font-black tracking-tight">BOLD</span>
      <span className="font-display text-[0.55rem] font-bold tracking-[0.3em]">AGENCY</span>
    </span>
  );
}
