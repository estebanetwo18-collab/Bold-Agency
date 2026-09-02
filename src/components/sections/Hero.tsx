"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Monogram } from "@/components/ui/Monogram";
import { usePrefersReducedMotion } from "@/lib/motion";

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 60]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper pb-16 pt-40 sm:pt-48"
      aria-label="Presentación"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.span
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              {hero.eyebrow}
            </motion.span>

            <h1 className="mt-7 max-w-xl font-display text-[13vw] font-extrabold leading-[0.98] tracking-tight sm:text-[5.6vw] lg:text-[3.6rem]">
              {hero.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    custom={i}
                    initial={reducedMotion ? false : "hidden"}
                    animate="visible"
                    variants={lineVariants}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl"
            >
              {hero.tagline}
            </motion.p>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-grey"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href={hero.ctaPrimary.href} variant="volt">
                {hero.ctaPrimary.label}
              </MagneticButton>
              <MagneticButton href={hero.ctaSecondary.href} variant="ghost">
                {hero.ctaSecondary.label}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-volt shadow-[0_10px_30px_rgba(17,17,17,.18)] sm:h-24 sm:w-24">
              <Monogram size={40} state="solid" />
            </div>

            <motion.div
              style={{ y: parallaxY }}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface"
            >
              <Image
                src="/images/hero-main.jpg"
                alt="Equipo de BOLD Agency revisando resultados de una campaña, blanco y negro"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <Monogram
                size={110}
                state="active"
                className="pointer-events-none absolute right-[6%] top-[8%] opacity-55"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.ul
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-16 flex flex-col gap-3 border-t border-ink/10 pt-8 text-sm text-grey sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3"
        >
          {hero.proofPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-ink/30" aria-hidden="true" />
              {point}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
