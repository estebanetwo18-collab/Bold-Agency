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
    eyebrow: "Precio de lanzamiento",
    headline: ["Tu página web,", "lista en días."],
    subhead: "Diseño, desarrollo y hosting incluidos. Precio especial por tiempo limitado.",
    oldPrice: "₡85,000 / $189",
    price: "₡67,500 / $149.99",
    ctaLabel: "Cotizar ahora →",
    href: "/cotizacion",
  },
  {
    id: "marketing-desde",
    eyebrow: "Manejo de redes y ads",
    headline: ["Marketing digital", "desde ₡65,000/mes."],
    subhead: "Contenido, pauta y estrategia para redes sociales. Tú te enfocás en tu negocio, nosotros en crecerlo.",
    price: "₡65,000 / $144",
    priceUnit: "/mes",
    ctaLabel: "Quiero crecer →",
    href: "#planes",
  },
];
