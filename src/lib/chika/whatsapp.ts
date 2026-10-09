/**
 * Mensajes prellenados de WhatsApp y nombres de eventos de analítica.
 * Cada CTA declara desde dónde se hace clic (`location`) y, si aplica, la
 * experiencia, para poder identificar el origen de cada conversación.
 */

export const WA = {
  general: "Hola, quiero que me ayuden a elegir la experiencia ideal para mi cabello.",
  hero: "Hola, quiero cotizar o agendar una valoración capilar en Chika.",
  compare: "Hola, estoy comparando las experiencias de Chika y quiero que me ayuden a elegir la indicada para mi cabello.",
  final: "Hola, quiero agendar mi valoración capilar en Chika y conocer qué experiencia necesita mi cabello.",
} as const;

/** Tipos de intención para segmentar los clics. */
export type CtaType = "valoracion" | "cotizacion" | "paquete" | "disponibilidad" | "general";

export const EVENTS = {
  whatsapp: "whatsapp_click", // todo clic que abre WhatsApp
  experience: "experience_cta_click", // CTA dentro de una experiencia
  curlLove: "curl_love_cta_click", // CTA de Chika Curl Love (seguimiento dedicado)
  selectorAnswer: "selector_answer", // marca o desmarca una pregunta
  selectorResult: "selector_recommendation", // recomendación mostrada
  scroll: "scroll_depth", // 25 / 50 / 75 / 90 %
  nav: "nav_click",
  faq: "faq_open",
} as const;
