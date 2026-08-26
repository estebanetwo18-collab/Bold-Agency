import { PhotoPanel } from "@/components/ui/PhotoPanel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function PhotoBanner({
  src,
  alt,
  caption,
  aspect = "aspect-[21/8]",
  align = "center",
  id,
}: {
  src: string;
  alt: string;
  caption: string;
  aspect?: string;
  align?: "center" | "end";
  id?: string;
}) {
  return (
    <section id={id} className="bg-paper pb-24 pt-0 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <PhotoPanel
            src={src}
            alt={alt}
            overlay
            mark
            className={cn(aspect, "sm:aspect-[4/5] lg:aspect-[21/8]")}
          >
            <p
              className={cn(
                "absolute inset-x-6 z-10 max-w-xl font-display text-xl font-bold leading-snug text-paper sm:inset-x-9 sm:text-2xl",
                align === "end" ? "bottom-8" : "top-1/2 -translate-y-1/2",
              )}
            >
              {caption}
            </p>
          </PhotoPanel>
        </Reveal>
      </div>
    </section>
  );
}
