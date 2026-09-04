/**
 * Copy real de VoltTech Soluciones, centralizado — para editar textos no
 * hace falta tocar JSX. Todo lo que no esté confirmado por el cliente
 * lleva la marca // EDITABLE o [PENDIENTE: ...] explícita.
 */

export const SITE = {
  legalName: "German Vargas Corrales",
  legalId: "114610102",
  brandName: "VoltTech Soluciones",
  wordmark: "VOLTTECH",
  tagline: "Energía solar y soluciones eléctricas — Zona Sur, Costa Rica",
  whatsapp: "+506 8559 3214",
  whatsappDigits: "50685593214",
  email: "volttechsoluciones@gmail.com",
  instagramHandle: "@volttech.cr",
  instagramUrl: "https://www.instagram.com/volttech.cr",
  facebookUrl: "https://www.facebook.com/VoltTechSoluciones", // EDITABLE: confirmar slug exacto de la página
  schedule: "Lun–Sáb, 7:00 a.m. – 5:00 p.m.",
  location: "San Antonio de la Amistad, Pérez Zeledón, Costa Rica",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${SITE.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola VoltTech, quiero cotizar un sistema solar / servicio eléctrico.";

export const HERO = {
  eyebrow: "VoltTech Soluciones · Zona Sur, Costa Rica",
  // Anclas de mensaje comercial ya calibradas y en uso activo — no reformular.
  hooks: [
    "¿Pagás más de ₡100.000 al mes de luz?",
    "¿Tu factura ronda los ₡200.000 al mes?",
    "¿Pagás ₡500.000 o más al mes en electricidad?",
  ],
  headline: "Independencia energética para tu casa o negocio en la Zona Sur",
  subheadline:
    "Instalamos sistemas solares y damos servicio eléctrico con protección real ante el aumento de tarifas y los cortes de luz — con procesos, garantías y precios que podés revisar antes de firmar nada.",
  primaryCta: { label: "Cotizar por WhatsApp", href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE) },
  secondaryCta: { label: "Usar la calculadora", href: "#calculadora" },
  // [PENDIENTE: confirmar con VoltTech] foto real de instalación en techo para el hero;
  // usar public/images/hero/placeholder-instalador-techo.jpg mientras tanto.
  image: {
    src: "/images/hero/placeholder-instalador-techo.svg",
    alt: "[PLACEHOLDER] Instalador de VoltTech en techo con paneles solares — reemplazar con foto real",
    isPlaceholder: true,
  },
} as const;

export const STATS = [
  { value: "13", suffix: "", label: "años de experiencia técnica de German Vargas" },
  { value: "7", suffix: "", label: "proyectos solares completados" },
  { value: "9+", suffix: "", label: "zonas de cobertura en el sur y costa del país" },
  { value: "3", suffix: "", label: "años de VoltTech como empresa formal" },
] as const;

export const COVERAGE_AREAS = [
  "Pérez Zeledón",
  "Quepos",
  "Dominical",
  "Dominicalito",
  "Neily",
  "Palmar Norte",
  "Palmar Sur",
  "Río Claro",
  "Guanacaste",
  "Zonas costeras del sur",
] as const;

export const ABOUT = {
  eyebrow: "Nosotros",
  title: "13 años de oficio técnico, 3 años como empresa formal",
  body: [
    "German Vargas Corrales lleva 13 años trabajando en electricidad y energía solar. VoltTech Soluciones, la empresa, tiene 3 años operando de forma formal en Pérez Zeledón — la experiencia técnica es real y de largo plazo; la marca es joven y la construimos con esa misma honestidad.",
    "El equipo lo forman el dueño (instalación y diseño de sistemas), dos instaladores y aliados técnicos para trámites e interconexión. Trabajamos con certificación técnica y componentes de marcas reconocidas internacionalmente.",
  ],
  points: [
    {
      title: "Especialista local de Zona Sur",
      description:
        "Conocemos la irradiancia, el clima costero y las condiciones de techo de Pérez Zeledón, Quepos, Dominical y alrededores — no es una zona secundaria en un mapa nacional.",
    },
    {
      title: "Transparencia radical",
      description:
        "Proceso visible paso a paso, garantías reales por componente y precios honestos — sin adelantos sin contrato ni proforma.",
    },
    {
      title: "Certificación técnica",
      description:
        "Instalación, diseño de sistemas fotovoltaicos y trámites de interconexión con respaldo técnico, no solo experiencia empírica.",
    },
  ],
} as const;

export type ServiceKey =
  | "paneles"
  | "calentadores"
  | "electricas"
  | "mantenimiento"
  | "ev"
  | "diseno"
  | "asesoria"
  | "bombeo"
  | "tramites";

export const SERVICES: Array<{
  key: ServiceKey;
  title: string;
  description: string;
  highlight?: boolean;
  muted?: boolean;
}> = [
  {
    key: "paneles",
    title: "Instalación de paneles solares",
    description: "Sistemas on-grid, off-grid e híbridos, diseñados según tu consumo real y el techo disponible.",
  },
  {
    key: "calentadores",
    title: "Calentadores solares de agua",
    description: "Agua caliente sin depender de electricidad o gas, aprovechando la irradiancia de la Zona Sur.",
  },
  {
    key: "electricas",
    title: "Instalaciones eléctricas",
    description: "Trabajo eléctrico residencial y comercial, desde cableado hasta tableros y ampliaciones.",
  },
  {
    key: "mantenimiento",
    title: "Mantenimiento y limpieza de paneles",
    description: "Revisión periódica y limpieza para que tu sistema mantenga el rendimiento esperado.",
  },
  {
    key: "ev",
    title: "Cargadores para vehículos eléctricos",
    description: "Instalación de puntos de carga EV residenciales y comerciales.",
  },
  {
    key: "diseno",
    title: "Diseño de sistemas fotovoltaicos",
    description: "Dimensionamiento técnico del sistema según sombra, orientación y consumo, antes de cotizar.",
  },
  {
    key: "asesoria",
    title: "Asesoría energética",
    description: "Análisis de tu factura y hábitos de consumo para saber si el solar realmente te conviene.",
  },
  {
    key: "bombeo",
    title: "Sistemas de bombeo solar",
    description:
      "Riego agrícola, bombeo de pozo a tanque y presión constante — un nicho técnico donde VoltTech no ha mapeado competencia directa en la zona.",
    highlight: true,
  },
  {
    key: "tramites",
    title: "Trámites ante la empresa eléctrica",
    description: "Acompañamiento en el papeleo de interconexión — te lo resolvemos para que tengas que hacer lo mínimo posible.",
    muted: true,
  },
];

export const BRANDS = {
  eyebrow: "Marcas con las que trabajamos",
  groups: [
    { category: "Paneles", names: ["Trina Solar", "Canadian Solar", "LONGi"] },
    { category: "Inversores", names: ["LuxPower", "SNA", "Sol-Ark"] },
    { category: "Baterías", names: ["Pytes", "Soluna"] },
  ],
} as const;

export const WARRANTIES = {
  eyebrow: "Garantías",
  title: "Garantía real, componente por componente",
  intro:
    "No generalizamos una sola garantía para todo el sistema — cada componente tiene la suya, y te la explicamos antes de instalar.",
  items: [
    {
      component: "Inversores",
      warranty: "2 a 5 años según modelo",
      confidence: "Verificado con proveedor",
    },
    {
      component: "Baterías",
      warranty: "10 años",
      confidence: "Verificado con proveedor",
    },
    {
      component: "Paneles solares",
      warranty:
        "Sin garantía formal del fabricante en CR — vida útil estimada de 30 años con instalación correcta",
      confidence: "Estimado, no es una garantía contractual",
    },
    {
      component: "Mano de obra VoltTech",
      warranty: "2 años en proyectos grandes / 1 año en proyectos pequeños",
      confidence: "Política VoltTech",
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: "Cómo trabajamos",
  title: "Sin adelantos a ciegas: así es el proceso real",
  intro:
    "El miedo más común es sentir que te van a cobrar un adelanto y desaparecer. Por eso el proceso siempre pasa por un contrato y una proforma antes de que muevas un colón.",
  steps: [
    {
      title: "Factura eléctrica",
      description: "Nos compartís tu factura actual — es el punto de partida real, no una estimación al aire.",
    },
    {
      title: "Análisis de ubicación, tarifa y consumo",
      description: "Revisamos tu distribuidora (ICE, CNFL, Coopelesca, ESPH), tu tarifa y tu patrón de consumo.",
    },
    {
      title: "Revisión de sombra y techo",
      description: "Evaluamos orientación, sombra y estado del techo o del espacio disponible.",
    },
    {
      title: "Proforma + contrato",
      description: "Recibís una proforma y firmamos contrato antes de cualquier adelanto — sin excepciones.",
    },
    {
      title: "Visita técnica",
      description: "Para proyectos grandes, hacemos una visita técnica adicional antes de instalar.",
    },
    {
      title: "Instalación",
      description: "Instalamos, probamos el sistema y te explicamos cómo monitorearlo.",
    },
  ],
  transparencyNote:
    "Ejemplo de transparencia de costos: el trámite de interconexión ante CNFL ronda los $975 de referencia — el monto varía según distribuidora, y te lo mostramos desde la proforma, no como sorpresa después.",
} as const;

export const CASE_STUDY = {
  eyebrow: "Caso de éxito",
  title: "Sistema solar para supermercado",
  description:
    "Proyecto comercial de 30 kW, con 34 kWp en paneles y 64 kWh de banco de baterías. [PENDIENTE: confirmar con el cliente si se puede publicar el nombre del supermercado].",
  specs: [
    { label: "Potencia del sistema", value: "30 kW" },
    { label: "Paneles instalados", value: "34 kWp" },
    { label: "Banco de baterías", value: "64 kWh" },
  ],
  note: "No se incluyen cifras de ahorro porque no están documentadas para este proyecto.",
  // [PENDIENTE: confirmar con VoltTech] fotos reales antes/durante/después del proyecto.
  image: {
    src: "/images/proyectos/supermercado/placeholder-supermercado.svg",
    alt: "[PLACEHOLDER] Instalación solar en supermercado — reemplazar con foto real del proyecto",
    isPlaceholder: true,
  },
} as const;

export const TESTIMONIALS = [
  {
    name: "Edwin Méndez",
    source: "Facebook",
    confirmed: true,
    quote:
      "He trabajado con él en varios proyectos y ha demostrado la calidad con la que se trabaja tanto en materiales como en calidad de servicio... lo recomiendo 100%.",
  },
  {
    name: "[PENDIENTE: confirmar con cliente]",
    source: "",
    confirmed: false,
    quote: "",
  },
  {
    name: "[PENDIENTE: confirmar con cliente]",
    source: "",
    confirmed: false,
    quote: "",
  },
] as const;

export const FAQ_PRACTICAL = [
  {
    question: "¿Cuántos paneles necesito?",
    answer:
      "Depende de tu consumo real, no de una fórmula genérica. Usá la calculadora con tu factura mensual para un estimado preliminar, o compartinos tu factura real por WhatsApp para algo más preciso.",
  },
  {
    question: "No sé cuánto consumo, ¿qué hago?",
    answer:
      "No necesitás saberlo de antemano. Si no tenés electricidad todavía, usamos un checklist de tus equipos; si ya tenés factura, la usamos directamente — así trabaja German en cada visita.",
  },
  {
    question: "¿Qué pasa si me mudo?",
    answer:
      "Un sistema solar bien instalado añade valor a la propiedad. Podés venderla con el sistema incluido o, en algunos casos, coordinar el traslado — hablalo con nosotros antes de decidir.",
  },
  {
    question: "¿VoltTech ofrece financiamiento?",
    answer: "No, actualmente no ofrecemos financiamiento como servicio.",
  },
] as const;

export const FAQ_TECHNICAL = [
  {
    question: "¿Qué es la generación distribuida?",
    answer:
      "Es la generación de electricidad (por ejemplo, solar) en el mismo lugar donde se consume, conectada a la red de tu distribuidora en lugar de depender solo de una planta central.",
  },
  {
    question: "¿Qué dice la Ley 10086 y el Decreto 43879?",
    answer:
      "Es el marco legal costarricense que regula la generación distribuida para autoconsumo, incluyendo cómo te podés conectar a la red con tu propio sistema solar.",
  },
  {
    question: "¿Qué son los trámites GD01–GD06 del ICE?",
    answer:
      "Son los formularios del proceso de interconexión de generación distribuida del ICE, desde la solicitud inicial hasta la aprobación final del sistema. Nosotros nos encargamos de este papeleo por vos.",
  },
] as const;

export const CONTACT_INTEREST_OPTIONS = [
  { value: "solar", label: "Energía solar" },
  { value: "electrico", label: "Servicio eléctrico" },
  { value: "bombeo", label: "Sistema de bombeo" },
] as const;

export const BILL_RANGE_OPTIONS = [
  { value: "menos-100k", label: "Menos de ₡100.000/mes" },
  { value: "100k-200k", label: "₡100.000 – ₡200.000/mes" },
  { value: "200k-500k", label: "₡200.000 – ₡500.000/mes" },
  { value: "mas-500k", label: "Más de ₡500.000/mes" },
  { value: "no-seguro", label: "No estoy seguro" },
] as const;

export const FINAL_CTA = {
  title: "¿Listo para dejar de depender solo de la red?",
  body: "Escribinos por WhatsApp con tu factura eléctrica y te respondemos con next steps reales, no una promesa vacía.",
  cta: { label: "Escribir por WhatsApp", href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE) },
} as const;
