"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: ReadonlyArray<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-green/15 rounded-2xl border border-green/15 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-forest sm:text-base">{item.question}</span>
              <ChevronDownIcon
                className={cn("h-5 w-5 shrink-0 text-green transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
