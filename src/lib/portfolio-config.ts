// Fuente única de verdad para el carrusel "Piezas reales" del home (§3d)
// y el grid filtrable de /portafolio (§5.4c). No hardcodear el número de
// casos en ningún componente: siempre iterar este arreglo.

export type PortfolioCategory = "Estrategia" | "Diseño" | "Audiovisual";

export type PortfolioMediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type PortfolioItem = {
  slug: string;
  marca: string;
  categorias: PortfolioCategory[];
  descripcion: string;
  rol: string;
  cover: PortfolioMediaItem;
  /** Media adicional para el hover-cycle de la tarjeta y la vista de detalle. */
  gallery: PortfolioMediaItem[];
};

export const portfolioConfig: PortfolioItem[] = [
  {
    slug: "daoro",
    marca: "DAORO",
    categorias: ["Estrategia", "Diseño"],
    descripcion: "Sesión y lanzamiento Showroom Omega en Daoro Costa Rica.",
    rol: "Conceptualización completa de la sesión y moodboard; coordinación con casa matriz para el visual merchandising de la marca y el plan de comunicación con medios e influencers.",
    cover: {
      type: "image",
      src: "/portfolio/daoro/cover.jpg",
      alt: "Boutique Daoro con exhibición de relojes Omega",
    },
    gallery: [
      { type: "image", src: "/portfolio/daoro/cover.jpg", alt: "Boutique Daoro con exhibición de relojes Omega" },
    ],
  },
  {
    slug: "ingo",
    marca: "INGO",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion: "Campañas Plastigel y Plastiwax.",
    rol: "Coordinación, fotografía, edición y producción de cada contenido.",
    cover: {
      type: "image",
      src: "/portfolio/ingo/cover.jpg",
      alt: "Pieza de campaña de redes sociales para Plastigel / Plastiwax",
    },
    gallery: [
      { type: "image", src: "/portfolio/ingo/cover.jpg", alt: "Pieza de campaña de redes sociales para Plastigel / Plastiwax" },
    ],
  },
  {
    slug: "avon-costa-rica",
    marca: "AVON Costa Rica",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion: "Contenido de marca y especializado con el influencer AngelRafael.",
    rol: "Coordinación, fotografía, edición y producción de cada contenido.",
    cover: {
      type: "image",
      src: "/portfolio/avon/cover.jpg",
      alt: "Frame de contenido de maquillaje para Avon Costa Rica",
    },
    gallery: [
      { type: "video", src: "/portfolio/avon/reel.mp4", alt: "Reel de maquillaje para Avon Costa Rica" },
    ],
  },
  {
    slug: "toyota-purdy-go",
    marca: "Toyota (Purdy Go)",
    categorias: ["Estrategia"],
    descripcion: "Lanzamiento de la app Purdy Go y posicionamiento físico.",
    rol: "Conceptualización estratégica y coordinación con diseño y proveedores.",
    cover: {
      type: "image",
      src: "/portfolio/purdy-go/cover.jpg",
      alt: "Captura de la app Purdy Go de Toyota",
    },
    gallery: [
      { type: "image", src: "/portfolio/purdy-go/cover.jpg", alt: "Captura de la app Purdy Go de Toyota" },
    ],
  },
  {
    slug: "daniela-portillo-adora",
    marca: "Daniela Portillo + Adora",
    categorias: ["Estrategia", "Diseño", "Audiovisual"],
    descripcion:
      "Creación de contenido y manejo estratégico de marca personal y comercial junto al salón de belleza Adora.",
    rol: "Creación de contenido y manejo estratégico de marca personal y comercial junto al salón de belleza Adora.",
    // REVISAR ASSET: la descarga de Drive falló dos veces en esta sesión
    // (sesión de Google Drive expirada). Placeholder de marca mientras se
    // reintenta — no se inventó ninguna imagen.
    cover: {
      type: "image",
      src: "",
      alt: "Daniela Portillo + Adora",
    },
    gallery: [],
  },
  {
    slug: "nouvell",
    marca: "Nouvell",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion:
      "Apertura de tienda en La Marina de Flamingo; conceptualización y ejecución estratégica de contenido y acciones de marketing, como estratega líder de la campaña de lanzamiento. Crédito de diseño: Juan Rodríguez y Pablo Aguilar.",
    rol: "Estratega líder de la campaña de lanzamiento: conceptualización y ejecución estratégica de contenido y acciones de marketing para la apertura de tienda en La Marina de Flamingo. Crédito de diseño: Juan Rodríguez y Pablo Aguilar.",
    cover: {
      type: "image",
      src: "/portfolio/nouvell/cover.jpg",
      alt: "Showroom de cocinas Nouvell en La Marina de Flamingo",
    },
    gallery: [
      { type: "image", src: "/portfolio/nouvell/cover.jpg", alt: "Showroom de cocinas Nouvell en La Marina de Flamingo" },
      { type: "video", src: "/videos/mosaic-reel.mp4", alt: "Reel del showroom de cocinas Nouvell" },
    ],
  },
  {
    slug: "euromobilia",
    marca: "Euromobilia",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion:
      "Conceptualización y ejecución estratégica de contenido y acciones de marketing. Crédito de diseño: Juan Rodríguez.",
    rol: "Conceptualización y ejecución estratégica de contenido y acciones de marketing. Crédito de diseño: Juan Rodríguez.",
    cover: {
      type: "image",
      src: "/portfolio/euromobilia/cover.jpg",
      alt: "Proyecto de cocina de diseño para Euromobilia",
    },
    gallery: [
      { type: "image", src: "/portfolio/euromobilia/cover.jpg", alt: "Proyecto de cocina de diseño para Euromobilia" },
      { type: "video", src: "/portfolio/euromobilia/reel.mp4", alt: "Reel de proyecto de cocina para Euromobilia" },
    ],
  },
  {
    slug: "volt-tech",
    marca: "Volt Tech",
    categorias: ["Estrategia", "Audiovisual", "Diseño"],
    descripcion: "Conceptualización, diseño y ejecución estratégica de contenido y acciones de marketing.",
    rol: "Conceptualización, diseño y ejecución estratégica de contenido y acciones de marketing.",
    cover: {
      type: "image",
      src: "/portfolio/volt-tech/cover.jpg",
      alt: "Pieza gráfica de campaña para Volt Tech",
    },
    gallery: [
      { type: "image", src: "/portfolio/volt-tech/cover.jpg", alt: "Pieza gráfica de campaña para Volt Tech" },
    ],
  },
];

export const portfolioCategories: PortfolioCategory[] = Array.from(
  new Set(portfolioConfig.flatMap((item) => item.categorias)),
);

export const portfolioBrands: string[] = portfolioConfig.map((item) => item.marca);
