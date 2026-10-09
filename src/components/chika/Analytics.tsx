"use client";

import { useEffect } from "react";
import { EVENTS } from "@/lib/chika/whatsapp";
import { track } from "@/lib/chika/track";

/**
 * Seguimiento por delegación: cualquier enlace con `data-track` envía su evento.
 * Atributos: data-track (nombre), data-location, data-experience, data-cta-type.
 * También mide profundidad de scroll (25/50/75/90 %).
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const d = el.dataset;
      const params = { location: d.location, experience: d.experience, cta_type: d.ctaType, label: el.textContent?.trim().slice(0, 80) };
      track(d.track!, params);
      if (d.track === EVENTS.whatsapp && d.experience) track(EVENTS.experience, params);
      if (d.track === EVENTS.whatsapp && d.experience === "chika-curl-love") track(EVENTS.curlLove, params);
    };
    document.addEventListener("click", onClick);

    const marks = [25, 50, 75, 90];
    const sent = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement;
      const pct = ((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100;
      marks.forEach((m) => {
        if (pct >= m && !sent.has(m)) {
          sent.add(m);
          track(EVENTS.scroll, { percent: m });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
