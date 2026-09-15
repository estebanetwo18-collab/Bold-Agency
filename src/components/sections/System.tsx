import { getServerContent } from "@/lib/getContentServer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PillarsCarousel } from "@/components/ui/PillarsCarousel";

export async function System() {
  const { system } = await getServerContent();

  return (
    <section id="sistema" className="relative overflow-hidden bg-ink py-28 text-paper lg:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={system.eyebrow}
          headline={system.headline}
          intro={system.intro}
          tone="paper"
        />
      </div>

      <Reveal>
        <PillarsCarousel
          pillars={system.pillars}
          prevAriaLabel={system.prevAriaLabel}
          nextAriaLabel={system.nextAriaLabel}
        />
      </Reveal>
    </section>
  );
}
