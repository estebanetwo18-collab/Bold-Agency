"use client";

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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper pb-24 pt-40 sm:pt-48"
      aria-label="Presentación"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-volt/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.span
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {hero.eyebrow}
        </motion.span>

        <h1 className="mt-8 max-w-5xl font-display text-[13vw] font-extrabold leading-[0.95] tracking-tight sm:text-[7.5vw] lg:text-[6.2rem]">
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-lg leading-relaxed text-grey sm:text-xl"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <Monogram size={96} animateStates state="outline" />
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={hero.ctaPrimary.href} variant="volt">
            {hero.ctaPrimary.label}
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondary.href} variant="ghost">
            {hero.ctaSecondary.label}
          </MagneticButton>
        </motion.div>

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
