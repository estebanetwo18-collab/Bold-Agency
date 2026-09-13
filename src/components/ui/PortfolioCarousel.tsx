"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { portfolioConfig } from "@/lib/portfolio-config";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SWIPE_THRESHOLD = 60;

export function PortfolioCarousel() {
  const items = portfolioConfig;
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const reducedMotion = usePrefersReducedMotion();

  const goTo = (next: number, dir: number) => {
    const wrapped = (next + items.length) % items.length;
    setIndex([wrapped, dir]);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      goTo(index + 1, 1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      goTo(index - 1, -1);
    }
  };

  const active = items[index];
  const hasImage = active.cover.src.length > 0;

  return (
    <div className="mt-8">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={active.slug}
            custom={direction}
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -48 : 48 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex cursor-grab flex-col justify-end active:cursor-grabbing"
          >
            {hasImage ? (
              <Image
                src={active.cover.src}
                alt={active.cover.alt}
                fill
                sizes="(min-width: 640px) 70vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-ink">
                <span className="font-display text-2xl font-black tracking-tight text-paper">
                  {active.marca}
                </span>
              </div>
            )}
            <div className="relative z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-16 sm:p-8 sm:pt-24">
              <p className="font-display text-xl font-bold text-paper sm:text-2xl">{active.marca}</p>
              <p className="mt-1.5 max-w-xl text-sm text-paper/80 sm:text-base">{active.descripcion}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Ver caso ${item.marca}`}
              aria-current={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={cn(
                "h-1.5 w-6 transition-colors duration-300",
                i === index ? "bg-volt" : "bg-grey-light hover:bg-grey",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Caso anterior"
            onClick={() => goTo(index - 1, -1)}
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Caso siguiente"
            onClick={() => goTo(index + 1, 1)}
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-ink"
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
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="M0 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
