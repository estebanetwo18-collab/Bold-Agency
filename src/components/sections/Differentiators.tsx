import { differentiators } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Differentiators() {
  return (
    <section className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={differentiators.eyebrow}
          headline={differentiators.headline}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {differentiators.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-volt">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-grey">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
