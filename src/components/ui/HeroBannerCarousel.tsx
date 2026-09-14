"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { heroBannersConfig } from "@/lib/hero-banners-config";
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

  const slide = (
    <div className="relative h-[50vh] max-h-[420px] min-h-[220px] w-full overflow-hidden bg-ink sm:h-auto sm:max-h-none sm:min-h-0 sm:aspect-[16/5]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={active.id}
          drag={reducedMotion || banners.length < 2 ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <section
      className="relative bg-ink"
      aria-label="Promociones destacadas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {active.href ? (
        <Link href={active.href} aria-label={active.alt} className="block">
          {slide}
        </Link>
      ) : (
        slide
      )}

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
