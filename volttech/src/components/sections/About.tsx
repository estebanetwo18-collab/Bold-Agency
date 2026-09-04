import { ABOUT } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { CircleIcon } from "@/components/ui/CircleIcon";
import { CompassIcon, DocumentIcon, ShieldIcon } from "@/components/ui/icons";

const ICONS = [CompassIcon, ShieldIcon, DocumentIcon];

export function About() {
  return (
    <section id="nosotros" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <PillBadge tone="green">{ABOUT.eyebrow}</PillBadge>
          <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
            {ABOUT.title}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
            {ABOUT.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {ABOUT.points.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={point.title} className="rounded-3xl border border-green/15 bg-white p-7 shadow-sm">
                <CircleIcon tone="forest">
                  <Icon className="h-6 w-6" />
                </CircleIcon>
                <h3 className="mt-5 text-lg font-bold text-forest">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
