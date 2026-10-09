"use client";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Envía un evento a Google Tag Manager (dataLayer), GA4 (gtag) y Meta Pixel (fbq)
 * si están instalados. Sin ninguno, no hace nada (y en desarrollo lo muestra en consola).
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  window.gtag?.("event", event, params);
  if (event === "whatsapp_click") window.fbq?.("track", "Contact", params);
  if (process.env.NODE_ENV !== "production") console.info("[chika:track]", event, params);
}
