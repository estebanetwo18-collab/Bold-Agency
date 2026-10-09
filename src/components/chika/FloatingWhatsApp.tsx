"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/chika/config";
import { EVENTS, WA } from "@/lib/chika/whatsapp";
import { WaIcon } from "./Button";

/**
 * Botón flotante de WhatsApp. Aparece después del hero y se oculta donde ya
 * hay un CTA dominante (selector con su barra de resultado y cierre).
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const blockers = ["selector", "contacto"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const state = { pastHero: false, blocked: new Set<string>() };
    const update = () => setVisible(state.pastHero && state.blocked.size === 0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).id;
          if (id === "inicio") state.pastHero = !e.isIntersecting;
          else if (e.isIntersecting) state.blocked.add(id);
          else state.blocked.delete(id);
        });
        update();
      },
      { threshold: 0 },
    );
    if (hero) io.observe(hero);
    blockers.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <a
      className="ck-float"
      data-visible={visible}
      href={whatsappHref(WA.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-track={EVENTS.whatsapp}
      data-location="floating"
      data-cta-type="general"
    >
      <WaIcon size={24} />
      <span className="ck-float__label">Cotizá o agendá</span>
      <span className="ck-visually-hidden"> por WhatsApp (abre una pestaña nueva)</span>
    </a>
  );
}
