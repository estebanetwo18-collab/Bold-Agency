import { CASE_STUDY } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function CaseStudy() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <PillBadge tone="green">{CASE_STUDY.eyebrow}</PillBadge>
            <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
              {CASE_STUDY.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{CASE_STUDY.description}</p>

            <div className="mt-7 grid grid-cols-3 gap-4">
              {CASE_STUDY.specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-green/20 bg-white p-4 text-center">
                  <p className="text-xl font-black text-forest">{spec.value}</p>
                  <p className="mt-1 text-xs text-ink-soft/70">{spec.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-ink-soft/60">{CASE_STUDY.note}</p>
          </div>

          <PlaceholderImage label={CASE_STUDY.image.alt} aspect="aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}
