"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { heroBannersConfig } from "@/lib/hero-banners-config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Monogram } from "@/components/ui/Monogram";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const ROTATE_MS = 6500;
const SWIPE_THRESHOLD = 60;

export function HeroBannerCarousel() {
  const banners = heroBannersConfig;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex((next + banners.length) % banners.length),
    [banners.length],
  );

  useEffect(() => {
    if (paused || reducedMotion || banners.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, banners.length]);

  if (banners.length === 0) return null;

  const active = banners[index];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  };

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-label="Promociones destacadas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
      />
      <Monogram
        size={220}
        state="active"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-[0.08] sm:block lg:right-10"
      />

      <div className="relative min-h-[480px] w-full sm:min-h-[460px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active.id}
            drag={reducedMotion || banners.length < 2 ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex cursor-grab active:cursor-grabbing"
          >
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center gap-4 px-6 pb-16 pt-28 sm:gap-6 sm:px-10 sm:pb-14 sm:pt-28 lg:gap-7">
              <span className="inline-flex w-fit items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-volt">
                <span className="h-1.5 w-1.5 bg-volt" />
                {active.eyebrow}
              </span>

              <h2 className="max-w-lg font-display text-4xl font-black leading-[1.05] text-paper sm:text-5xl lg:text-[3.25rem]">
                {active.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <p className="max-w-md text-sm leading-relaxed text-paper/60 sm:text-base">
                {active.subhead}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-4 sm:gap-5">
                <div className="flex items-baseline gap-2">
                  {active.oldPrice ? (
                    <span className="font-data text-sm text-paper/40 line-through">
                      {active.oldPrice}
                    </span>
                  ) : null}
                  <span className="font-data text-2xl font-extrabold text-paper sm:text-3xl">
                    {active.price}
                  </span>
                  {active.priceUnit ? (
                    <span className="font-data text-sm text-paper/50">{active.priceUnit}</span>
                  ) : null}
                </div>
                <MagneticButton href={active.href} variant="volt">
                  {active.ctaLabel}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {banners.length > 1 ? (
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-4 sm:bottom-6">
          <button
            type="button"
            aria-label="Banner anterior"
            onClick={() => goTo(index - 1)}
            className="hidden h-8 w-8 items-center justify-center border border-paper/25 bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:border-paper sm:flex"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className="flex gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`Ir al banner ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 w-6 transition-colors duration-300",
                  i === index ? "bg-volt" : "bg-paper/40 hover:bg-paper/70",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Banner siguiente"
            onClick={() => goTo(index + 1)}
            className="hidden h-8 w-8 items-center justify-center border border-paper/25 bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:border-paper sm:flex"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      ) : null}
    </section>
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
