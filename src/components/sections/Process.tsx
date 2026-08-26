"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { process } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section id="como-trabajamos" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {process.eyebrow}
            </span>
            <h2 className="text-balance mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {process.headline}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-grey">
              Cada etapa se apoya en la anterior. No saltamos a ejecución sin
              diagnóstico, ni medimos sin haber ejecutado con intención.
            </p>

            <div className="relative mt-10 hidden h-48 w-1 overflow-hidden rounded-full bg-grey-light lg:block">
              <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 h-full rounded-full bg-volt"
              />
            </div>
          </div>

          <div ref={trackRef} className="flex flex-col gap-6">
            {process.steps.map((step, i) => (
              <Reveal
                key={step.index}
                delay={i * 0.05}
                className="relative flex gap-6 rounded-2xl border border-grey-light bg-paper p-8 shadow-[0_1px_0_0_rgba(17,17,17,0.04)]"
              >
                <span className="font-display text-3xl font-extrabold text-grey-light">
                  {step.index}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-grey">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
