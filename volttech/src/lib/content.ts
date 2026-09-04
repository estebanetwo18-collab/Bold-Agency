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
  { href: "#propuesta", label: "Por qué VoltTech" },
  { href: "#servicios", label: "Servicios" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#resultados", label: "Resultados" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${SITE.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola VoltTech, quiero cotizar un sistema solar / servicio eléctrico.";

export const HEADER_CTA = { label: "Calcular mi sistema", href: "#calculadora" };

export const HERO = {
  eyebrow: "VoltTech Soluciones · Ingeniería solar en la Zona Sur",
  // Anclas de mensaje comercial ya calibradas y en uso activo — no reformular.
  hooks: [
    "¿Pagás más de ₡100.000 al mes de luz?",
    "¿Tu factura ronda los ₡200.000 al mes?",
    "¿Pagás ₡500.000 o más al mes en electricidad?",
  ],
  headline: "Tu factura no tiene que subir cada vez que sube la tarifa.",
  subheadline:
    "Diseñamos e instalamos sistemas solares y damos servicio eléctrico con respaldo real ante cortes — con un proceso técnico transparente, garantía por componente y un precio que revisás antes de firmar.",
  primaryCta: { label: "Cotizar por WhatsApp", href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE) },
  secondaryCta: { label: "Calcular mi sistema", href: "#calculadora" },
  // [PENDIENTE: confirmar con VoltTech] foto real de instalación en techo para el hero;
  // usar public/images/hero/placeholder-instalador-techo.jpg mientras tanto.
  image: {
    src: "/images/hero/placeholder-instalador-techo.svg",
    alt: "[PLACEHOLDER] Instalador de VoltTech en techo con paneles solares — reemplazar con foto real",
    isPlaceholder: true,
  },
} as const;

export const STATS = [
  { value: 13, suffix: "", label: "años de experiencia técnica de German Vargas" },
  { value: 7, suffix: "", label: "proyectos solares completados" },
  { value: 9, suffix: "+", label: "zonas de cobertura en el sur y costa del país" },
  { value: 3, suffix: "", label: "años de VoltTech como empresa formal" },
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

/**
 * "Propuesta de valor" — absorbe la narrativa que antes vivía en una
 * sección "Nosotros" separada: el problema real del cliente, cómo lo
 * resuelve VoltTech, y por qué confiar en German específicamente. Se
 * reorganiza en un solo bloque en vez de repetirse en dos secciones.
 */
export const VALUE_PROP = {
  eyebrow: "Por qué VoltTech",
  title: "El problema no es el sol. Es no saber en qué estás invirtiendo.",
  problem: {
    title: "Lo que enfrentás hoy",
    body: "Las tarifas eléctricas suben, los cortes en zonas costeras y rurales son reales, y cotizar un sistema solar suele sentirse como una caja negra — precios que varían sin explicación y adelantos que dan miedo soltar.",
  },
  solution: {
    title: "Cómo lo resuelve VoltTech",
    body: "Diseñamos tu sistema a partir de tu factura real, te mostramos el proceso completo antes de cobrar un adelanto, y cada componente lleva su propia garantía por escrito — no una promesa genérica de \"todo incluido\".",
  },
  credibility: {
    title: "German Vargas Corrales, 13 años de oficio",
    body: "German lleva 13 años trabajando en electricidad y energía solar. VoltTech, la empresa, tiene 3 años operando de forma formal en Pérez Zeledón — la experiencia técnica es real y de largo plazo; la marca es joven y la construimos con esa misma honestidad. El equipo lo forman el dueño (instalación y diseño de sistemas), dos instaladores y aliados técnicos para trámites e interconexión.",
  },
  pillars: [
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

export type ServiceSegment = "residencial" | "comercial";

export const SERVICE_SEGMENTS: Array<{ key: ServiceSegment; label: string; description: string }> = [
  {
    key: "residencial",
    label: "Residencial",
    description: "Casas y condominios que quieren dejar de depender solo de la red — con o sin batería de respaldo.",
  },
  {
    key: "comercial",
    label: "Comercial",
    description: "Negocios y comercios con consumo alto, donde el sistema se dimensiona junto a un diseño técnico previo. Referencia: proyecto de supermercado de 30 kW.",
  },
];

export const SERVICES: Array<{
  key: ServiceKey;
  title: string;
  description: string;
  segments: ServiceSegment[];
  highlight?: boolean;
  muted?: boolean;
}> = [
  {
    key: "paneles",
    title: "Instalación de paneles solares",
    description: "Sistemas on-grid, off-grid e híbridos, diseñados según tu consumo real y el techo disponible.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "diseno",
    title: "Diseño de sistemas fotovoltaicos",
    description: "Dimensionamiento técnico del sistema según sombra, orientación y consumo, antes de cotizar.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "electricas",
    title: "Instalaciones eléctricas",
    description: "Trabajo eléctrico residencial y comercial, desde cableado hasta tableros y ampliaciones.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "mantenimiento",
    title: "Mantenimiento y limpieza de paneles",
    description: "Revisión periódica y limpieza para que tu sistema mantenga el rendimiento esperado.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "calentadores",
    title: "Calentadores solares de agua",
    description: "Agua caliente sin depender de electricidad o gas, aprovechando la irradiancia de la Zona Sur.",
    segments: ["residencial"],
  },
  {
    key: "ev",
    title: "Cargadores para vehículos eléctricos",
    description: "Instalación de puntos de carga EV residenciales y comerciales.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "asesoria",
    title: "Asesoría energética",
    description: "Análisis de tu factura y hábitos de consumo para saber si el solar realmente te conviene.",
    segments: ["residencial", "comercial"],
  },
  {
    key: "bombeo",
    title: "Sistemas de bombeo solar",
    description:
      "Riego agrícola, bombeo de pozo a tanque y presión constante — un nicho técnico donde VoltTech no ha mapeado competencia directa en la zona.",
    segments: ["comercial", "residencial"],
    highlight: true,
  },
  {
    key: "tramites",
    title: "Trámites ante la empresa eléctrica",
    description: "Acompañamiento en el papeleo de interconexión — te lo resolvemos para que tengas que hacer lo mínimo posible.",
    segments: ["residencial", "comercial"],
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
  eyebrow: "Proyectos y casos de éxito",
  title: "Sistema solar para supermercado",
  description:
    "Proyecto comercial de 30 kW, con 34 kWp en paneles y 64 kWh de banco de baterías. [PENDIENTE: confirmar con el cliente si se puede publicar el nombre del supermercado].",
  clientType: "Comercial",
  location: "Zona Sur, Costa Rica", // EDITABLE: confirmar ubicación exacta publicable
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
    question: "¿Cuánto cuesta un sistema solar?",
    answer:
      "Depende del tamaño del sistema y si lleva batería. Usá la calculadora para un rango estimado preliminar según tu factura, siempre sujeto a confirmación con tu factura real.",
  },
  {
    question: "¿Cuánto tarda la instalación?",
    answer:
      "Varía según el tamaño del proyecto y la disponibilidad de equipo — te damos un tiempo estimado concreto en la proforma, después de la visita técnica cuando aplica, nunca antes.",
  },
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
    question: "¿Necesito batería?",
    answer:
      "Solo si querés respaldo cuando se corta la luz o vivís fuera de la red. Un sistema on-grid sin batería ya te da protección tarifaria; la batería suma independencia ante cortes, a un costo adicional que te mostramos por separado en la calculadora.",
  },
  {
    question: "¿Qué mantenimiento necesita?",
    answer:
      "Limpieza y revisión periódica de paneles, y monitoreo del inversor y las baterías si las tenés. Es un servicio que ofrecemos directamente — ver la sección de servicios.",
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
    question: "¿Qué permisos e interconexión necesito?",
    answer:
      "Todo sistema conectado a la red pasa por un trámite de interconexión con tu distribuidora (ICE, CNFL, Coopelesca, ESPH). Nosotros gestionamos ese papeleo — vos solo firmás lo que corresponde.",
  },
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
  {
    question: "¿Cuál es la vida útil real de un sistema solar?",
    answer:
      "Los paneles no tienen garantía formal de fábrica en Costa Rica, pero con instalación correcta se estima una vida útil de 30 años. Inversores y baterías tienen garantías más cortas y específicas — ver la sección de garantías.",
  },
  {
    question: "¿Hay diferencia entre un sistema residencial y uno comercial?",
    answer:
      "Sí — el comercial suele requerir mayor potencia, un diseño técnico más detallado y, en algunos casos, visita técnica adicional antes de cotizar. La lógica del proceso es la misma: factura real, análisis técnico, proforma y contrato antes de instalar.",
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

export const CLIENT_TYPE_OPTIONS = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
] as const;

export const BUDGET_RANGE_OPTIONS = [
  { value: "no-definido", label: "Aún no lo tengo definido" },
  { value: "bajo-3m", label: "Menos de ₡3.000.000" },
  { value: "3m-8m", label: "₡3.000.000 – ₡8.000.000" },
  { value: "8m-15m", label: "₡8.000.000 – ₡15.000.000" },
  { value: "mas-15m", label: "Más de ₡15.000.000" },
] as const;

export const FINAL_CTA = {
  eyebrow: "Siguiente paso",
  title: "¿Listo para dejar de depender solo de la red?",
  body: "Escribinos por WhatsApp con tu factura eléctrica y te respondemos con next steps reales, no una promesa vacía.",
  cta: { label: "Escribir por WhatsApp", href: whatsappHref(DEFAULT_WHATSAPP_MESSAGE) },
  secondaryCta: { label: "Calcular mi sistema", href: "#calculadora" },
} as const;
