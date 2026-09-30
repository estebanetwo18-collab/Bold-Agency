// Fuente única de verdad para el carrusel de promos del home (§6).
// El contenido se renderiza como texto real (no imágenes con texto
// incrustado) para controlar el espaciado en cualquier viewport.
// No hardcodear la cantidad de slides en ningún componente: siempre
// iterar este arreglo.

export type HeroBanner = {
  id: string;
  eyebrow: string;
  headline: string[];
  subhead: string;
  oldPrice?: string;
  price: string;
  priceUnit?: string;
  ctaLabel: string;
  href: string;
};

export const heroBannersConfig: HeroBanner[] = [
  {
    id: "precios-web",
    eyebrow: "Diseño web",
    headline: ["Tu página web,", "lista en días."],
    subhead: "Diseño, desarrollo y hosting incluidos.",
    price: "₡135,000 / $300",
    ctaLabel: "Cotizar ahora →",
    href: "/cotizacion",
  },
  {
    id: "marketing-desde",
    eyebrow: "Manejo de redes y ads",
    headline: ["Marketing digital", "desde ₡85,000/mes."],
    subhead: "Contenido, pauta y estrategia para redes sociales. Tú te enfocás en tu negocio, nosotros en crecerlo.",
    price: "₡85,000 / $189",
    priceUnit: "/mes",
    ctaLabel: "Quiero crecer →",
    href: "#planes",
  },
];
