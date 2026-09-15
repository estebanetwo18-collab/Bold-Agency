"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

type Pillar = {
  index: string;
  title: string;
  body: string;
};

export function PillarsCarousel({
  pillars,
  prevAriaLabel,
  nextAriaLabel,
}: {
  pillars: Pillar[];
  prevAriaLabel: string;
  nextAriaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollXProgress } = useScroll({ container: trackRef });

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-pillar-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({ left: direction * amount, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <div className="mt-10">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pl-6 pr-6 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-10"
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            data-pillar-card
            className="group relative w-[78vw] shrink-0 snap-start overflow-hidden border border-paper/10 bg-surface p-8 transition-colors duration-300 hover:border-volt/60 sm:w-[340px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-6 font-display text-[6rem] font-black leading-none text-paper/[0.04] transition-colors duration-300 group-hover:text-volt/[0.07]"
            >
              {pillar.index}
            </span>

            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-volt/15 text-volt">
              <PillarIcon index={pillar.index} />
            </span>

            <span className="relative mt-6 block font-display text-sm font-bold text-volt">
              {pillar.index}
            </span>
            <h3 className="relative mt-2 font-display text-2xl font-bold text-paper">
              {pillar.title}
            </h3>
            <p className="relative mt-3 max-w-xs leading-relaxed text-grey-light">{pillar.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-5 px-6 lg:px-10">
        <div className="h-[3px] flex-1 overflow-hidden bg-paper/10">
          <motion.div className="h-full origin-left bg-volt" style={{ scaleX: scrollXProgress }} />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={prevAriaLabel}
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-volt hover:text-volt"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label={nextAriaLabel}
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-volt hover:text-volt"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="M0 6h15M15 6L9.5 0.5M15 6 9.5 11.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PillarIcon({ index }: { index: string }) {
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

  switch (index) {
    case "01": // Publicidad digital
      return (
        <svg {...common}>
          <path d="M3 10v4a1 1 0 0 0 1 1h2l4.5 4V5L6 9H4a1 1 0 0 0-1 1Z" />
          <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" />
        </svg>
      );
    case "02": // Estrategia de marca
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "03": // Rotulación & gran formato
      return (
        <svg {...common}>
          <path d="M4 20V9.5L12 4l8 5.5V20" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "04": // Audiovisual & diseño
      return (
        <svg {...common}>
          <rect x="3" y="7" width="13" height="11" rx="1.5" />
          <path d="M16 10.5 21 8v9l-5-2.5" />
        </svg>
      );
    case "05": // Consultoría 360
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 3.5h6v2H9zM8.5 12.5l2.3 2.3L15.5 10" />
        </svg>
      );
    case "06": // Experiencias 360
      return (
        <svg {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "07": // Desarrollo de webs y apps
      return (
        <svg {...common}>
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    default:
      return null;
  }
}
