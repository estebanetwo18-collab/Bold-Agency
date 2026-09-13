"use client";

import { useState } from "react";
import { FAQ_PRACTICAL, FAQ_TECHNICAL, SITE } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const TABS = [
  { key: "practical", label: "Precio, instalación y garantías", items: FAQ_PRACTICAL },
  { key: "technical", label: "Marco técnico y legal", items: FAQ_TECHNICAL },
] as const;

export function Faq() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("practical");
  const active = TABS.find((t) => t.key === tab)!;

  return (
    <section className="bg-bg-elevated py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <PillBadge tone="accent">Preguntas frecuentes</PillBadge>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Lo que más nos preguntan los clientes
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 inline-flex flex-wrap gap-2 rounded-full border border-border bg-surface p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  tab === t.key ? "bg-accent text-accent-ink" : "text-text-muted hover:text-text",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-6">
          <Accordion items={active.items} />
        </Reveal>

        <p className="mt-6 text-sm text-text-muted">
          ¿Tu caso es más específico? Usá la{" "}
          <a href="#calculadora" className="font-semibold text-accent underline underline-offset-4">
            calculadora
          </a>{" "}
          o escribinos por WhatsApp al {SITE.whatsapp}.
        </p>
      </div>
    </section>
  );
}
