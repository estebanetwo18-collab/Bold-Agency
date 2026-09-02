import { differentiators } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const tints: Record<string, string> = {
  expertise: "bg-volt/15",
  perspective: "bg-grey-light/50",
  flexibility: "bg-volt/15",
  resources: "bg-grey-light/50",
};

function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "expertise":
      return (
        <svg {...common}>
          <path d="M12 2.5 3 6.5v5.2c0 4.6 3.2 8.6 9 9.8 5.8-1.2 9-5.2 9-9.8V6.5L12 2.5Z" />
          <path d="m8.5 12 2.4 2.4L16 9.3" />
        </svg>
      );
    case "perspective":
      return (
        <svg {...common}>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "flexibility":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66" />
          <path d="M17 3v4h-4M7 21v-4h4" />
        </svg>
      );
    case "resources":
      return (
        <svg {...common}>
          <path d="M4 19V10M10 19V5M16 19v-7M20 19H4" />
        </svg>
      );
    default:
      return null;
  }
}

export function Differentiators() {
  return (
    <section id="diferenciales" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={differentiators.eyebrow}
          headline={differentiators.headline}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="flex flex-col rounded-[1.5rem] border border-grey-light/70 p-7"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-ink ${tints[item.icon] ?? "bg-grey-light/50"}`}
              >
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-grey">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
