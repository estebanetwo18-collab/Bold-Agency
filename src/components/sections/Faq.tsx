"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/motion";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="preguntas" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={faq.eyebrow}
          headline={faq.headline}
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 flex flex-col divide-y divide-grey-light border-y border-grey-light">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.04}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <span className="font-display text-lg font-bold text-ink sm:text-xl">
                      {item.question}
                    </span>
                    <PlusIcon open={isOpen} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-grey">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15">
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute h-[1.5px] w-3.5 bg-ink"
      />
      <motion.span
        animate={{ rotate: open ? 45 : 90 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute h-[1.5px] w-3.5 bg-ink"
      />
    </span>
  );
}
