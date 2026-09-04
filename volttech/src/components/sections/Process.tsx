"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Process() {
  const containerRef = useRef<HTMLOListElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="accent">{PROCESS.eyebrow}</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {PROCESS.title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{PROCESS.intro}</p>
        </Reveal>

        <ol ref={containerRef} className="relative mt-16 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* línea vertical (móvil) */}
          <div
            className={cn(
              "process-line-vertical absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-border-strong sm:hidden",
              lineVisible && "is-visible",
            )}
            aria-hidden="true"
          />
          {/* línea horizontal (desktop) */}
          <div
            className={cn(
              "process-line absolute left-[8.3%] right-[8.3%] top-[15px] hidden h-px bg-border-strong lg:block",
              lineVisible && "is-visible",
            )}
            aria-hidden="true"
          />

          {PROCESS.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative pl-10 sm:pl-0">
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-ink sm:relative sm:mb-4">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/[0.06] p-6">
            <p className="text-sm leading-relaxed text-text-muted">{PROCESS.transparencyNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
