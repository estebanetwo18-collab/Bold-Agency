import { problem } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section id="enfoque" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={problem.eyebrow}
          headline={problem.headline}
          intro={problem.intro}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-grey-light bg-grey-light sm:grid-cols-2">
          {problem.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08} className="bg-paper p-8 sm:p-10">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                {point.title}
              </h3>
              <p className="mt-3 leading-relaxed text-grey">{point.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 max-w-2xl border-l-4 border-volt pl-6 font-display text-2xl font-semibold leading-snug text-ink">
            {problem.resolution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
