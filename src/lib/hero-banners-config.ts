// Fuente única de verdad para el carrusel full-bleed del home (§6).
// Imágenes fuente: carpeta "Banners Web" del Drive compartido, recortadas
// centradas a 16:5 (1920x600) sin deformar — el archivo original medía
// 4240x1200 (ratio 3.53:1), más ancho que 16:5, así que se recortó por
// los costados. No hardcodear la cantidad de slides en ningún componente:
// siempre iterar este arreglo.

export type HeroBanner = {
  id: string;
  src: string;
  alt: string;
  href?: string;
};

export const heroBannersConfig: HeroBanner[] = [
  {
    id: "precios-web",
    src: "/images/banners/banner-01-precios-web.jpg",
    alt: "Precio de lanzamiento: tu página web lista en días, desde ₡67,500",
    href: "/cotizacion",
  },
  {
    id: "marketing-desde",
    src: "/images/banners/banner-02-marketing-desde.jpg",
    alt: "Manejo de redes y ads: marketing digital desde ₡65,000 al mes",
    href: "#planes",
  },
  // REVISAR ASSET: "03-banner-generico.jpg" llegó con un placeholder de
  // editor sin rellenar ("Foto de marca / equipo — Browse files") en el
  // costado derecho — es un borrador, no una pieza terminada. Lo dejo
  // fuera del carrusel hasta que llegue la versión final con la foto
  // real puesta.
];
