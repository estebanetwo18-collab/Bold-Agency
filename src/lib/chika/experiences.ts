/**
 * Fuente de verdad de las experiencias Chika (catálogo impreso, 2026).
 * Editá precios, sesiones, vigencias y textos SOLO aquí.
 * `pending` lista lo que sigue sin confirmar; se muestra en magenta solo en desarrollo.
 */

export type Photo = {
  /** Archivo dentro de public/chika/. Si no existe se muestra un espacio reservado. */
  file: string;
  alt: string;
  /** Indicación de fotografía tomada del catálogo (para el equipo de foto). */
  brief: string;
  /** object-position para conservar el foco principal. */
  position?: string;
};

export type Tone = "blush" | "white" | "petal";

export type Step = { title: string; text: string };

export type Experience = {
  id: string;
  number: string; // "01"
  stage: string; // "Entender"
  name: string;
  /** Nombre corto para CTAs ("Agendá tu Detox") */
  short: string;
  tagline: string;
  hook?: string;
  idealFor: string;
  includesLabel: string;
  includes: string[];
  /** Líneas del plan aún sin confirmar (se marcan como pendientes). */
  pendingIncludes?: string[];
  homeKit?: { label: string; items: string[]; note?: string };
  /** Datos clave visibles (sesiones, vigencia, frecuencia…). */
  facts: { k: string; v: string }[];
  /** Forma de la foto en la composición editorial. */
  shape: "arch" | "circle" | "tall";
  /** amount en colones; null = por confirmar */
  price: { amount: number | null; from?: boolean };
  /** Texto del botón (siempre abre WhatsApp). */
  cta: string;
  /** Mensaje prellenado de WhatsApp para esta experiencia. */
  waMessage: string;
  ctaType: "valoracion" | "cotizacion" | "paquete" | "disponibilidad";
  /** Nota de precio/descuento propia de la experiencia (reemplaza la nota general). */
  priceNote?: string;
  availabilityNote: string;
  photo: Photo;
  tone: Tone;
  flip: boolean;
  steps?: { label: string; items: Step[] };
  visits?: { count: number; gap: string; note: string };
  /** Datos pendientes de confirmar para esta experiencia. */
  pending: string[];
  /** Nombre / precio sin confirmar (Blow Club). */
  provisionalName?: boolean;
};

const AVAILABILITY = "Citas sujetas a disponibilidad de horarios.";

export const experiences: Experience[] = [
  {
    id: "chika-kit",
    number: "01",
    stage: "Entender",
    name: "Chika Kit",
    short: "diagnóstico",
    tagline: "Diagnóstico & Experiencia",
    hook: "Conocé lo que tu cabello realmente necesita antes de comenzar un tratamiento.",
    idealFor:
      "Quienes desean conocer el estado real de su hebra y cuero cabelludo antes de iniciar un cambio o tratamiento.",
    includesLabel: "En salón",
    includes: [
      "Diagnóstico capilar con capilógrafo digital",
      "Asesoría y receta capilar personalizada",
      "Demostración de tratamiento adaptado a tu tipo de cabello",
      "Corte y styling profesional",
    ],
    facts: [{ k: "Sesiones", v: "1 sesión" }],
    shape: "arch",
    price: { amount: 50000, from: true },
    cta: "Agendá tu valoración por WhatsApp",
    waMessage: "Hola, quiero agendar una valoración capilar con Chika Kit y conocer el descuento al adquirir un paquete.",
    ctaType: "valoracion",
    priceNote: "Incluye tu valoración con capilógrafo digital. Si después adquirís un paquete, obtenés un descuento.",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-diagnostico-capilografo.jpg",
      alt: "Profesional usando un capilógrafo digital en la coronilla de una clienta de cabello largo y oscuro",
      brief: "Manos profesionales usando el capilógrafo en la coronilla; recuadro con la vista real de la hebra.",
      position: "60% 55%",
    },
    tone: "white",
    flip: false,
    pending: [
      "Qué hace variar el «desde ₡50.000»",
      "Monto del descuento por paquete y a qué experiencias aplica",
      "¿Promoción con fecha de cierre?",
      "Detalle del kit para casa (la tabla lo marca por confirmar)",
    ],
  },
  {
    id: "chika-detox",
    number: "02",
    stage: "Preparar",
    name: "Chika Detox",
    short: "Detox",
    tagline: "Purificación y preparación capilar",
    hook: "Un cabello libre de residuos está listo para recibir lo que necesita.",
    idealFor:
      "Cabellos saturados de residuos cosméticos, cloro, impurezas o acumulación de metales pesados que pueden impedir que los tratamientos penetren correctamente.",
    includesLabel: "En salón",
    includes: [
      "Diagnóstico con capilógrafo: revisión de folículo y hebra",
      "Asesoría capilar personalizada",
      "Protocolo profundo de desintoxicación y purificación capilar",
      "Tratamiento hidratante según recomendación de la línea Essential Haircare",
      "Lavado tratante y styling profesional",
    ],
    facts: [{ k: "Sesiones", v: "1 sesión" }],
    shape: "circle",
    price: { amount: 70000 },
    cta: "Cotizá tu Detox por WhatsApp",
    waMessage: "Hola, quiero cotizar y agendar una valoración para Chika Detox y conocer el descuento por paquete.",
    ctaType: "cotizacion",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-detox-lavado.jpg",
      alt: "Manos profesionales lavando el cabello de una clienta en el lavacabezas, con espuma y agua",
      brief: "Lavado en el lavacabezas: manos, espuma y agua en movimiento. La luz más clara del catálogo.",
      position: "45% 50%",
    },
    tone: "petal",
    flip: true,
    pending: ["¿Incluye corte?", "¿Promoción con fecha de cierre?", "Kit para casa: por confirmar"],
  },
  {
    id: "chika-cirugia-capilar",
    number: "03",
    stage: "Reparar",
    name: "Chika Cirugía Capilar",
    short: "Cirugía Capilar",
    tagline: "Programa intensivo de rescate capilar",
    hook: "Tres sesiones para acompañar a un cabello que ha pasado por mucho.",
    idealFor:
      "Cabellos altamente procesados, decolorados o elásticos que necesitan un proceso intensivo de reconstrucción y nutrición profunda.",
    includesLabel: "El programa",
    includes: [
      "Diagnóstico, asesoría y corte de salud",
      "Sesiones Nourishing",
      "Sesión Replumping",
    ],
    homeKit: { label: "Para casa", items: ["Shampoo y acondicionador Natural Tec"] },
    facts: [
      { k: "Sesiones", v: "3 sesiones" },
      { k: "Vigencia", v: "22 días" },
      { k: "Frecuencia", v: "1 por semana" },
    ],
    shape: "tall",
    price: { amount: 193000 },
    cta: "Consultá tu paquete por WhatsApp",
    waMessage: "Hola, quiero cotizar el programa Chika Cirugía Capilar, agendar mi valoración y conocer el descuento por paquete.",
    ctaType: "paquete",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-cirugia-capilar-tratamiento.jpg",
      alt: "Manos aplicando tratamiento con brocha en medios y puntas decolorados",
      brief: "Manos aplicando tratamiento con brocha en medios y puntas decolorados. Brillo real, sin dramatizar el daño.",
      position: "50% 45%",
    },
    tone: "blush",
    flip: true,
    steps: {
      label: "Ruta del programa",
      items: [
        { title: "Diagnóstico", text: "Capilógrafo, asesoría y corte de salud" },
        { title: "Nourishing", text: "Reestructuración y nutrición interna" },
        { title: "Replumping", text: "Elasticidad, cuerpo y efecto relleno" },
        { title: "En casa", text: "Shampoo y acondicionador Natural Tec" },
      ],
    },
    pending: [
      "¿Diagnóstico y corte en la 1.ª sesión? (fija el orden de la ruta)",
      "Escritura oficial de «Natural Tec»",
      "Textos de la ruta: propuestos, pendientes de aprobar",
      "Vigencia: ¿desde la compra o desde la 1.ª cita?",
      "Foto provisional (stock)",
    ],
  },
  {
    id: "chika-wow",
    number: "04",
    stage: "Mantener",
    name: "Chika Wow",
    short: "plan Wow",
    tagline: "Plan de mantenimiento",
    hook: "El cuidado continúa después del color.",
    idealFor: "Mantener el color, la hidratación y el brillo del cabello después de un procedimiento químico.",
    includesLabel: "En salón",
    includes: [
      "Cuatro tratamientos capilares profundos de la línea Essential Haircare",
      "Lavado sensorial y styling profesional en cada visita",
    ],
    facts: [
      { k: "Tratamientos", v: "4 por el precio de 3" },
      { k: "Vigencia", v: "3 meses" },
      { k: "Frecuencia", v: "Cada 22 días" },
    ],
    shape: "arch",
    price: { amount: 80000 },
    cta: "Consultá tu plan Wow por WhatsApp",
    waMessage: "Hola, quiero cotizar el plan Chika Wow y agendar una valoración.",
    ctaType: "paquete",
    priceNote: "El plan ya incluye 4 tratamientos por el precio de 3. En tu valoración te confirmamos si aplica un descuento adicional.",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-wow-color-movimiento.jpg",
      alt: "Mujer con cabello castaño iluminado en ondas, con brillo",
      brief: "Cabello con color en movimiento, modelo de espalda o perfil. Luz lateral que muestre brillo real.",
      position: "50% 30%",
    },
    tone: "white",
    flip: false,
    visits: { count: 4, gap: "22 días", note: "4 tratamientos por el precio de 3" },
    pending: ["¿El descuento por paquete aplica además del 4×3?", "¿Incluye diagnóstico?", "¿Solo químicos hechos en Chika?", "Corte y kit para casa: por confirmar", "Foto provisional (stock)"],
  },
  {
    id: "chika-melena",
    number: "05",
    stage: "Según tu textura · Natural o virgen",
    name: "Chika Melena",
    short: "Melena",
    tagline: "Revitalización para cabello natural",
    hook: "Brillo y movimiento para tu cabello natural.",
    idealFor:
      "Cabellos naturales o vírgenes que lucen opacos, deshidratados o con frizz y buscan revitalizar su brillo y movimiento natural.",
    includesLabel: "En salón",
    includes: [
      "Diagnóstico con capilógrafo y asesoría personalizada",
      "Corte de estilo y styling",
      "Dos tratamientos Essential Haircare",
    ],
    homeKit: { label: "Para casa", items: ["Shampoo y acondicionador de mantenimiento profesional"] },
    facts: [
      { k: "Tratamientos", v: "2 Essential Haircare" },
      { k: "Vigencia", v: "6 semanas" },
    ],
    shape: "circle",
    price: { amount: 118000 },
    cta: "Cotizá tu Melena por WhatsApp",
    waMessage: "Hola, quiero cotizar y agendar una valoración para Chika Melena y conocer el descuento por paquete.",
    ctaType: "cotizacion",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-melena-cabello-natural.jpg",
      alt: "Mujer de cabello natural castaño junto a una ventana con luz suave",
      brief: "Cabello natural sin color, con movimiento suave y luz de ventana. Textura real, sin alisar en postproducción.",
      position: "50% 30%",
    },
    tone: "petal",
    flip: true,
    pending: ["¿2 tratamientos = 2 visitas?", "¿Qué kit para casa exactamente?", "Foto provisional (stock)"],
  },
  {
    id: "chika-curl-love",
    number: "06",
    stage: "Según tu textura · Ondas y rizos",
    name: "Chika Curl Love",
    short: "Curl Love",
    tagline: "Hidratación, definición y rutina curly",
    hook: "Tus rizos, entendidos en salón y cuidados en casa.",
    idealFor:
      "Melenas onduladas y rizadas que buscan hidratación profunda, definición duradera, control del frizz y rebote natural.",
    includesLabel: "En salón",
    includes: [
      "Diagnóstico capilar especializado con capilógrafo",
      "Asesoría y educación en cuidado curly",
      "Tratamiento de nutrición e hidratación profunda",
      "Definición profesional de rizos con secado en difusor",
    ],
    homeKit: {
      label: "Para casa · 3 pasos",
      items: ["Shampoo", "Acondicionador", "Mousse o gel*"],
      note: "*Según tu patrón de rizo.",
    },
    facts: [
      { k: "Sesiones", v: "1 sesión intensiva" },
      { k: "Para casa", v: "Rutina de 3 pasos" },
    ],
    shape: "arch",
    price: { amount: 138000 },
    cta: "Cotizá Curl Love por WhatsApp",
    waMessage: "Hola, quiero cotizar y agendar una valoración para Chika Curl Love y conocer el descuento por paquete.",
    ctaType: "cotizacion",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-curl-love-rizos.jpg",
      alt: "Mujer sonriente con rizos definidos y voluminosos",
      brief: "Rizos reales definidos; mano profesional con difusor. El patrón de rizo debe coincidir con las clientas de Chika.",
      position: "50% 25%",
    },
    tone: "blush",
    flip: false,
    pending: ["¿Incluye corte?", "Foto provisional (stock): reemplazar por rizos de clientas reales"],
  },
  {
    id: "chika-blow-club",
    number: "07",
    stage: "Club · Mantener",
    name: "Chika Blow Club",
    short: "Blow Club",
    tagline: "Un plan recurrente para llegar lista a tu semana",
    idealFor: "Quienes quieren mantener peinados o secados con un plan de visitas.",
    includesLabel: "El plan",
    includes: ["4 visitas en 2 meses", "Disponible de lunes a jueves"],
    pendingIncludes: ["Peinados / secados: por confirmar"],
    facts: [
      { k: "Visitas", v: "4 visitas" },
      { k: "Vigencia", v: "2 meses" },
      { k: "Días", v: "Lunes a jueves" },
    ],
    shape: "circle",
    price: { amount: null },
    cta: "Consultá disponibilidad por WhatsApp",
    waMessage: "Hola, quiero consultar disponibilidad y precio de Chika Blow Club.",
    ctaType: "disponibilidad",
    priceNote: "Te confirmamos el precio, el descuento por paquete y los horarios disponibles por WhatsApp.",
    availabilityNote: AVAILABILITY,
    photo: {
      file: "chika-blow-club-secado.jpg",
      alt: "Secado profesional con cepillo redondo y secadora",
      brief: "Secado con cepillo redondo y secadora, movimiento y brillo. O el resultado final de espalda.",
      position: "45% 50%",
    },
    tone: "white",
    flip: true,
    provisionalName: true,
    pending: [
      "Nombre definitivo de Blow Club",
      "Precio de Blow Club",
      "¿4 visitas, o 4 peinados + 4 secados?",
      "Confirmar si incluye peinados, secados o ambos",
      "Foto provisional (stock)",
    ],
  },
];

export const experienceById = (id: string) => experiences.find((e) => e.id === id)!;

/** ₡50.000 — separador de miles con punto, como en el catálogo. */
export const formatColones = (n: number) => `₡${n.toLocaleString("de-DE")}`;
