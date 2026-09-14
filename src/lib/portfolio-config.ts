// Fuente única de verdad para el carrusel "Piezas reales" del home (§3d)
// y el grid filtrable de /portafolio (§5.4c). No hardcodear el número de
// casos en ningún componente: siempre iterar este arreglo.

export type PortfolioCategory = "Estrategia" | "Diseño" | "Audiovisual";

export type PortfolioMediaItem = {
  type: "image" | "video" | "youtube";
  /** Para "youtube": el video ID (ej. "dQw4w9WgXcQ"), no la URL completa. */
  src: string;
  alt: string;
  /** Frame propio del video para el poster. Si falta, la vista de detalle usa el cover de la marca. */
  poster?: string;
};

export type PortfolioItem = {
  slug: string;
  marca: string;
  categorias: PortfolioCategory[];
  descripcion: string;
  rol: string;
  cover: PortfolioMediaItem;
  /**
   * Foto de portada para la tarjeta del grid de /portafolio, con el
   * nombre de la marca ya integrado al diseño (overlay oscuro + texto
   * blanco). Si falta, la tarjeta cae de vuelta al bloque negro/Volt.
   */
  cardBanner?: string;
  /** Caso todavía no cerrado al 100% — muestra una nota discreta en la tarjeta del grid. */
  inProgress?: boolean;
  /** Media adicional para el hover-cycle de la tarjeta y la vista de detalle. */
  gallery: PortfolioMediaItem[];
};

export const portfolioConfig: PortfolioItem[] = [
  {
    slug: "avon-costa-rica",
    marca: "Avon Costa Rica",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion: "Contenido de marca y especializado con el influencer AngelRafael.",
    rol: "Coordinación, fotografía, edición y producción de cada contenido.",
    cardBanner: "/portfolio/avon/banner.jpg",
    cover: {
      type: "image",
      src: "/portfolio/avon/cover.jpg",
      alt: "Frame de contenido de maquillaje para Avon Costa Rica",
    },
    gallery: [
      // Prueba piloto: shorts alojados en YouTube en vez de mp4 local
      // (subidos por el cliente). Si funciona bien, se replica al resto
      // de las marcas.
      { type: "youtube", src: "54i5u6646LA", alt: "Short de maquillaje Avon Costa Rica (1)" },
      { type: "youtube", src: "sks5nriOGwg", alt: "Short de maquillaje Avon Costa Rica (2)" },
      { type: "youtube", src: "Jcl-cq2Rhnw", alt: "Short de maquillaje Avon Costa Rica (3)" },
      { type: "youtube", src: "fUKV6vHbeVA", alt: "Short de maquillaje Avon Costa Rica (4)" },
      { type: "youtube", src: "3pklO6DdfhA", alt: "Short de maquillaje Avon Costa Rica (5)" },
      { type: "youtube", src: "fPKvFJ0eKQw", alt: "Short de maquillaje Avon Costa Rica (6)" },
      { type: "youtube", src: "fW-nVaOm27M", alt: "Short de maquillaje Avon Costa Rica (7)" },
      { type: "youtube", src: "eG66xhpKaMc", alt: "Short de maquillaje Avon Costa Rica (8)" },
      { type: "youtube", src: "iDV2JMwAkKY", alt: "Short de maquillaje Avon Costa Rica (9)" },
    ],
  },
  {
    slug: "euromobilia",
    marca: "Euromobilia",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion:
      "Conceptualización y ejecución estratégica de contenido y acciones de marketing. Crédito de diseño: Juan Rodríguez.",
    rol: "Conceptualización y ejecución estratégica de contenido y acciones de marketing. Crédito de diseño: Juan Rodríguez.",
    cardBanner: "/portfolio/euromobilia/banner.jpg",
    cover: {
      type: "image",
      src: "/portfolio/euromobilia/cover.jpg",
      alt: "Proyecto de cocina de diseño para Euromobilia",
    },
    gallery: [
      // Shorts alojados en YouTube (subidos por el cliente), mismo
      // patrón que Avon Costa Rica.
      { type: "youtube", src: "dPJwonxtAzY", alt: "Short de proyecto Euromobilia (1)" },
      { type: "youtube", src: "YBaM1d8NPi8", alt: "Short de proyecto Euromobilia (2)" },
      { type: "youtube", src: "pU3Kul1IZhs", alt: "Short de proyecto Euromobilia (3)" },
      { type: "youtube", src: "r1te_l5j8mI", alt: "Short de proyecto Euromobilia (4)" },
      { type: "youtube", src: "FeDOZyT7-EA", alt: "Short de proyecto Euromobilia (5)" },
      { type: "youtube", src: "umphCifytPw", alt: "Short de proyecto Euromobilia (6)" },
      { type: "youtube", src: "PAWavx27EbI", alt: "Short de proyecto Euromobilia (7)" },
      { type: "youtube", src: "EC9NJ-7wfFs", alt: "Short de proyecto Euromobilia (8)" },
      { type: "youtube", src: "b8EQdWsd4Ek", alt: "Short de proyecto Euromobilia (9)" },
      { type: "youtube", src: "pqmkOJ17rFs", alt: "Short de proyecto Euromobilia (10)" },
      { type: "youtube", src: "BXSWALpj1iQ", alt: "Short de proyecto Euromobilia (11)" },
      { type: "youtube", src: "CxI7G_0DFHo", alt: "Short de proyecto Euromobilia (12)" },
    ],
  },
  {
    slug: "daoro",
    marca: "DAORO",
    categorias: ["Estrategia", "Diseño"],
    descripcion: "Sesión y lanzamiento Showroom Omega en Daoro Costa Rica.",
    rol: "Conceptualización completa de la sesión y moodboard; coordinación con casa matriz para el visual merchandising de la marca y el plan de comunicación con medios e influencers.",
    cardBanner: "/portfolio/daoro/banner.jpg",
    inProgress: true,
    cover: {
      type: "image",
      src: "/portfolio/daoro/cover.jpg",
      alt: "Boutique Daoro con exhibición de relojes Omega",
    },
    gallery: [
      { type: "image", src: "/portfolio/daoro/01.jpg", alt: "Pieza de campaña Omega — colecciones especiales" },
      { type: "image", src: "/portfolio/daoro/02.jpg", alt: "Pieza de campaña Omega Seamaster — regalo con estilo" },
      { type: "image", src: "/portfolio/daoro/04.jpg", alt: "Pieza de campaña Omega Seamaster — regalo exquisito" },
      { type: "image", src: "/portfolio/daoro/05.jpg", alt: "Repost de cliente con producto Omega Daoro" },
      { type: "image", src: "/portfolio/daoro/06.jpg", alt: "Pieza de campaña Omega Seamaster Diver 300M" },
    ],
  },
  {
    slug: "toyota-purdy-go",
    marca: "Toyota (Purdy Go)",
    categorias: ["Estrategia"],
    descripcion: "Lanzamiento de la app Purdy Go y posicionamiento físico.",
    rol: "Conceptualización estratégica y coordinación con diseño y proveedores.",
    cardBanner: "/portfolio/purdy-go/banner.jpg",
    cover: {
      type: "image",
      src: "/portfolio/purdy-go/cover.jpg",
      alt: "Captura de la app Purdy Go de Toyota",
    },
    gallery: [
      { type: "image", src: "/portfolio/purdy-go/screenshot1.jpg", alt: "Captura de pantalla de la estrategia digital Purdy Go" },
      { type: "image", src: "/portfolio/purdy-go/screenshot2.jpg", alt: "Captura de pantalla de la landing page Purdy Go" },
      { type: "image", src: "/portfolio/purdy-go/screenshot3.jpg", alt: "Captura de pantalla del posicionamiento digital Purdy Go" },
    ],
  },
  {
    slug: "daniela-portillo-adora",
    marca: "Daniela Portillo + Adora",
    categorias: ["Estrategia", "Diseño", "Audiovisual"],
    descripcion:
      "Creación de contenido y manejo estratégico de marca personal y comercial junto al salón de belleza Adora.",
    rol: "Creación de contenido y manejo estratégico de marca personal y comercial junto al salón de belleza Adora.",
    cardBanner: "/portfolio/daniela-portillo-adora/banner.jpg",
    inProgress: true,
    cover: {
      type: "image",
      src: "/portfolio/daniela-portillo-adora/cover.jpg",
      alt: "Frame de contenido de marca personal para Daniela Portillo y Adora",
    },
    gallery: [
      {
        type: "video",
        src: "/portfolio/daniela-portillo-adora/reel.mp4",
        alt: "Reel de contenido para Daniela Portillo y Adora",
      },
    ],
  },
  {
    slug: "nouvell",
    marca: "Nouvell",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion:
      "Apertura de tienda en La Marina de Flamingo; conceptualización y ejecución estratégica de contenido y acciones de marketing, como estratega líder de la campaña de lanzamiento. Crédito de diseño: Juan Rodríguez y Pablo Aguilar.",
    rol: "Estratega líder de la campaña de lanzamiento: conceptualización y ejecución estratégica de contenido y acciones de marketing para la apertura de tienda en La Marina de Flamingo. Crédito de diseño: Juan Rodríguez y Pablo Aguilar.",
    cardBanner: "/portfolio/nouvell/banner.jpg",
    inProgress: true,
    cover: {
      type: "image",
      src: "/portfolio/nouvell/cover.jpg",
      alt: "Showroom de cocinas Nouvell en La Marina de Flamingo",
    },
    gallery: [
      { type: "video", src: "/videos/mosaic-reel.mp4", poster: "/portfolio/nouvell/mosaic-poster.jpg", alt: "Reel del showroom de cocinas Nouvell" },
      { type: "image", src: "/portfolio/nouvell/img1.jpg", alt: "Apertura de Nouvell Flamingo — velada de lanzamiento" },
      { type: "image", src: "/portfolio/nouvell/img2.jpg", alt: "Apertura de Nouvell Flamingo — velada de lanzamiento (2)" },
      { type: "image", src: "/portfolio/nouvell/img3.jpg", alt: "Apertura de Nouvell Flamingo — velada de lanzamiento (3)" },
      { type: "image", src: "/portfolio/nouvell/img4.jpg", alt: "Apertura de Nouvell Flamingo — velada de lanzamiento (4)" },
      { type: "image", src: "/portfolio/nouvell/img5.jpg", alt: "Apertura de Nouvell Flamingo — velada de lanzamiento (5)" },
      { type: "video", src: "/portfolio/nouvell/01.mp4", poster: "/portfolio/nouvell/01-poster.jpg", alt: "DesignLab by Nouvell — experiencia con arquitectos e interioristas" },
      { type: "video", src: "/portfolio/nouvell/02.mp4", poster: "/portfolio/nouvell/02-poster.jpg", alt: "Showroom Nouvell en Oficentro Habitat, Escazú" },
      { type: "video", src: "/portfolio/nouvell/03.mp4", poster: "/portfolio/nouvell/03-poster.jpg", alt: "Evelia, diseñadora Nouvell, sobre el proceso de diseño" },
      { type: "video", src: "/portfolio/nouvell/04.mp4", poster: "/portfolio/nouvell/04-poster.jpg", alt: "Nouvell Flamingo — simplicidad frente al mar" },
      { type: "video", src: "/portfolio/nouvell/05.mp4", poster: "/portfolio/nouvell/05-poster.jpg", alt: "Expansión de Nouvell a La Marina Flamingo" },
      { type: "video", src: "/portfolio/nouvell/06.mp4", poster: "/portfolio/nouvell/06-poster.jpg", alt: "Electrodomésticos de alta gama Nouvell" },
    ],
  },
  {
    slug: "volt-tech",
    marca: "Volt Tech",
    categorias: ["Estrategia", "Audiovisual", "Diseño"],
    descripcion: "Conceptualización, diseño y ejecución estratégica de contenido y acciones de marketing.",
    rol: "Conceptualización, diseño y ejecución estratégica de contenido y acciones de marketing.",
    cardBanner: "/portfolio/volt-tech/banner.jpg",
    inProgress: true,
    cover: {
      type: "image",
      src: "/portfolio/volt-tech/cover.jpg",
      alt: "Pieza gráfica de campaña para Volt Tech",
    },
    gallery: [
      { type: "image", src: "/portfolio/volt-tech/piece1.jpg", alt: "Pieza de contenido de campaña Volt Tech — agosto" },
      { type: "image", src: "/portfolio/volt-tech/piece2.jpg", alt: "Pieza gráfica de campaña Volt Tech — parrillas" },
      { type: "image", src: "/portfolio/volt-tech/piece3.jpg", alt: "Pieza gráfica de campaña Volt Tech — productos variados" },
    ],
  },
];

export const portfolioCategories: PortfolioCategory[] = Array.from(
  new Set(portfolioConfig.flatMap((item) => item.categorias)),
);

export const portfolioBrands: string[] = portfolioConfig.map((item) => item.marca);
