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
      { type: "image", src: "/portfolio/daoro/01.jpg", alt: "Pieza de campaña Omega — colecciones especiales" },
      { type: "image", src: "/portfolio/daoro/02.jpg", alt: "Pieza de campaña Omega Seamaster — regalo con estilo" },
      { type: "image", src: "/portfolio/daoro/04.jpg", alt: "Pieza de campaña Omega Seamaster — regalo exquisito" },
      { type: "image", src: "/portfolio/daoro/05.jpg", alt: "Repost de cliente con producto Omega Daoro" },
      { type: "image", src: "/portfolio/daoro/06.jpg", alt: "Pieza de campaña Omega Seamaster Diver 300M" },
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
      { type: "video", src: "/portfolio/ingo/reel.mp4", poster: "/portfolio/ingo/reel-poster.jpg", alt: "Tutorial en video de uso de Plastiwax" },
      { type: "image", src: "/portfolio/ingo/01.jpg", alt: "Pieza de campaña Plastiwax — amor propio" },
      { type: "image", src: "/portfolio/ingo/02.jpg", alt: "Pieza de campaña Plastigel — humor de marca" },
      { type: "image", src: "/portfolio/ingo/03.jpg", alt: "Pieza de campaña Plastiwax Verde" },
      { type: "image", src: "/portfolio/ingo/04.jpg", alt: "Pieza de campaña Plastiwax Azul" },
    ],
  },
  {
    slug: "avon-costa-rica",
    marca: "Avon Costa Rica",
    categorias: ["Estrategia", "Audiovisual"],
    descripcion: "Contenido de marca y especializado con el influencer AngelRafael.",
    rol: "Coordinación, fotografía, edición y producción de cada contenido.",
    cover: {
      type: "image",
      src: "/portfolio/avon/cover.jpg",
      alt: "Frame de contenido de maquillaje para Avon Costa Rica",
    },
    gallery: [
      { type: "image", src: "/portfolio/avon/cover.jpg", alt: "Frame de contenido de maquillaje para Avon Costa Rica" },
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
    cover: {
      type: "image",
      src: "/portfolio/daniela-portillo-adora/cover.jpg",
      alt: "Frame de contenido de marca personal para Daniela Portillo y Adora",
    },
    gallery: [
      {
        type: "image",
        src: "/portfolio/daniela-portillo-adora/cover.jpg",
        alt: "Frame de contenido de marca personal para Daniela Portillo y Adora",
      },
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
    cover: {
      type: "image",
      src: "/portfolio/nouvell/cover.jpg",
      alt: "Showroom de cocinas Nouvell en La Marina de Flamingo",
    },
    gallery: [
      { type: "image", src: "/portfolio/nouvell/cover.jpg", alt: "Showroom de cocinas Nouvell en La Marina de Flamingo" },
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
      { type: "video", src: "/portfolio/euromobilia/reel.mp4", poster: "/portfolio/euromobilia/reel-poster.jpg", alt: "Reel de proyecto de cocina para Euromobilia" },
      { type: "video", src: "/portfolio/euromobilia/01.mp4", poster: "/portfolio/euromobilia/01-poster.jpg", alt: "Open House New Collection — evento Euromobilia" },
      { type: "video", src: "/portfolio/euromobilia/02.mp4", poster: "/portfolio/euromobilia/02-poster.jpg", alt: "Future Design by Ara Group — evento exclusivo" },
      { type: "video", src: "/portfolio/euromobilia/03.mp4", poster: "/portfolio/euromobilia/03-poster.jpg", alt: "Arquitecta Angélica Castro sobre un proyecto de cocina" },
      { type: "video", src: "/portfolio/euromobilia/04.mp4", poster: "/portfolio/euromobilia/04-poster.jpg", alt: "Parrillas de sistema GravityFed Euromobilia" },
      { type: "video", src: "/portfolio/euromobilia/05.mp4", poster: "/portfolio/euromobilia/05-poster.jpg", alt: "Diseño de clósets a medida Euromobilia" },
      { type: "video", src: "/portfolio/euromobilia/06.mp4", poster: "/portfolio/euromobilia/06-poster.jpg", alt: "Euromobilia — mucho más que cocinas" },
      { type: "video", src: "/portfolio/euromobilia/07.mp4", poster: "/portfolio/euromobilia/07-poster.jpg", alt: "De texturas al espacio real — proyectos Euromobilia Hogar" },
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
