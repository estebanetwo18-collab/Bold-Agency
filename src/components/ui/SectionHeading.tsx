import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  headline,
  intro,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow: string;
  headline: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em]",
            tone === "paper" ? "text-volt" : "text-grey",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", tone === "paper" ? "bg-volt" : "bg-ink")} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "text-balance mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          {headline}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed",
              tone === "paper" ? "text-grey-light" : "text-grey",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
