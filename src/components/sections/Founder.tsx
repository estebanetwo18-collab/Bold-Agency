import Image from "next/image";
import { founder } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Founder() {
  return (
    <section className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow={founder.eyebrow} headline={founder.headline} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[1.5rem]">
            <Image
              src="/images/founder-photo.jpg"
              alt={`${founder.name}, founder de BOLD Agency`}
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl font-extrabold text-ink">{founder.name}</h3>
            <p className="mt-2 font-display text-sm font-bold text-grey">{founder.role}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-grey">{founder.bio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {founder.cards.map((card) => (
                <div key={card.tag} className="rounded-2xl border border-grey-light p-5">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey">
                    {card.tag}
                  </span>
                  <p className="mt-2 font-display text-sm font-bold leading-snug text-ink">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-grey">{card.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
