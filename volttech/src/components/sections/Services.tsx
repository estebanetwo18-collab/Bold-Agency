"use client";

import { useState } from "react";
import Image from "next/image";
import { SERVICES, SERVICES_IMAGE, SERVICE_SEGMENTS, type ServiceKey, type ServiceSegment } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { CircleIcon } from "@/components/ui/CircleIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import {
  BoltIcon,
  CarIcon,
  DocumentIcon,
  DropletIcon,
  CompassIcon,
  ChatIcon,
  SunIcon,
  WrenchIcon,
} from "@/components/ui/icons";

const ICONS: Record<ServiceKey, typeof SunIcon> = {
  paneles: SunIcon,
  calentadores: DropletIcon,
  electricas: BoltIcon,
  mantenimiento: WrenchIcon,
  ev: CarIcon,
  diseno: CompassIcon,
  asesoria: ChatIcon,
  bombeo: DropletIcon,
  tramites: DocumentIcon,
};

export function Services() {
  const [segment, setSegment] = useState<ServiceSegment>("residencial");
  const visibleServices = SERVICES.filter((s) => s.segments.includes(segment));
  const activeSegment = SERVICE_SEGMENTS.find((s) => s.key === segment)!;

  return (
    <section id="servicios" className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal>
              <PillBadge tone="accent">Servicios</PillBadge>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Todo lo eléctrico y solar, bajo un mismo equipo técnico
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-9 inline-flex rounded-full border border-border bg-surface p-1">
                {SERVICE_SEGMENTS.map((seg) => (
                  <button
                    key={seg.key}
                    type="button"
                    onClick={() => setSegment(seg.key)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                      segment === seg.key ? "bg-accent text-accent-ink" : "text-text-muted hover:text-text",
                    )}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 max-w-2xl text-sm text-text-muted">{activeSegment.description}</p>
            </Reveal>
          </div>

          <Reveal delay={140} className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border-strong">
            <Image
              src={SERVICES_IMAGE.src}
              alt={SERVICES_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service, i) => {
            const Icon = ICONS[service.key];
            return (
              <Reveal key={service.key} delay={i * 40}>
                <div
                  className={cn(
                    "group h-full rounded-3xl border p-6 transition-colors",
                    service.highlight
                      ? "border-energy/30 bg-energy/[0.06] hover:border-energy/50"
                      : service.muted
                        ? "border-border bg-black/[0.015] opacity-80"
                        : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
                  )}
                >
                  <CircleIcon tone={service.highlight ? "energy" : "surface"}>
                    <Icon className="h-5 w-5" />
                  </CircleIcon>
                  <h3 className="mt-4 text-base font-semibold text-text">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
