"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioHero } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/lib/motion";

export function PortfolioHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-40 sm:pt-48">
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
              className="inline-flex items-center gap-2 border border-ink/15 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              {portfolioHero.eyebrow}
            </motion.span>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl font-display text-[10vw] font-extrabold leading-[1.05] tracking-tight sm:text-[4.4vw] lg:text-[3.1rem]"
            >
              {portfolioHero.headlinePre}{" "}
              <em className="italic text-grey">{portfolioHero.headlineItalic}</em>{" "}
              {portfolioHero.headlinePost}
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-grey"
            >
              {portfolioHero.subhead}
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9"
            >
              <MagneticButton href={`#${portfolioHero.cta.targetId}`} variant="volt">
                {portfolioHero.cta.label}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden bg-surface"
          >
            <Image
              src={portfolioHero.photo}
              alt="Esteban Muñoz Malavé, founder de BOLD Agency"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
