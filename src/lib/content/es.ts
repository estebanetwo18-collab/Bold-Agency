/**
 * Todo el copy visible del sitio vive aquí, separado de los componentes,
 * para que se pueda editar sin tocar JSX ni lógica de presentación.
 *
 * El contenido de negocio (servicios, precios, resultados, clientes,
 * fundador) viene de "BOLD Agency — Presentación Comercial 2026". Lo que
 * no está confirmado ahí queda marcado explícitamente con // EDITABLE.
 */

export const nav = {
  logoWord: "BOLD",
  logoSub: "AGENCY",
  links: [
    { href: "/", label: "Inicio" },
    { href: "/#enfoque", label: "Enfoque" },
    { href: "/#sistema", label: "Servicios" },
    { href: "/#como-trabajamos", label: "Cómo trabajamos" },
    { href: "/#planes", label: "Planes" },
    { href: "/portafolio", label: "Portafolio" },
    { href: "/calculadora", label: "Calculadora" },
  ],
  cta: { href: "/cotizacion", label: "Diagnóstico 360" },
};

export const hero = {
  eyebrow: "Marketing 360, branding y rotulación",
  headline: ["THE BOLD WAY", "TO GROW"],
  tagline: "Una sola estrategia.",
  subhead:
    "No como piezas sueltas. Un mismo equipo piensa tu marca, tu presencia digital y tu presencia física — con base en Costa Rica y alcance en Brasil, Estados Unidos y España.",
  ctaPrimary: { href: "/cotizacion", label: "Agendar Diagnóstico 360" },
  ctaSecondary: { href: "#sistema", label: "Cómo trabajamos" },
  proofPoints: [
    "Costa Rica · Brasil · Estados Unidos · España",
    "+9 años de experiencia en marketing digital y estratégico",
    "+16 campañas exitosas para marcas como Toyota, Avon y Swarovski",
  ],
};

export const problem = {
  eyebrow: "El problema real",
  headline: "Contratar por partes no arregla un negocio completo.",
  intro:
    "Tenés un buen negocio. Llevás años operando, tu producto funciona y tus clientes te recomiendan. Pero también manejás cinco conversaciones de WhatsApp distintas con cinco proveedores distintos, y ninguno ve el negocio completo.",
  points: [
    {
      title: "El diseñador no vende",
      body: "Entrega piezas bonitas que no están conectadas a ninguna estrategia comercial.",
    },
    {
      title: "El community manager no dirige",
      body: "Publica contenido constante, pero nadie decide hacia dónde debería ir la marca.",
    },
    {
      title: "La agencia de pauta no conoce tu marca",
      body: "Optimiza clics y alcance sin entender qué hace diferente a tu negocio.",
    },
    {
      title: "Vos terminás coordinando todo",
      body: "El dueño se convierte en el único punto que conecta piezas que deberían estar conectadas desde el inicio.",
    },
  ],
  resolution:
    "El resultado no es falta de esfuerzo: es falta de dirección. BOLD existe para ser esa dirección.",
};

export const system = {
  eyebrow: "Nuestros servicios",
  headline: "Todo lo que una marca necesita, en un solo equipo.",
  intro: "Siete frentes, un mismo equipo detrás.",
  prevAriaLabel: "Servicio anterior",
  nextAriaLabel: "Siguiente servicio",
  pillars: [
    {
      index: "01",
      title: "Publicidad digital",
      body: "Google · Meta · TikTok. Pauta con enfoque en performance.",
    },
    {
      index: "02",
      title: "Estrategia de marca",
      body: "Posicionamiento, asesoría y arquitectura de marca.",
    },
    {
      index: "03",
      title: "Rotulación & gran formato",
      body: "Punto de venta, activaciones y presencia física.",
    },
    {
      index: "04",
      title: "Audiovisual & diseño",
      body: "Producción de contenido, fotografía y diseño gráfico.",
    },
    {
      index: "05",
      title: "Consultoría 360",
      body: "Diagnóstico integral y estrategia end-to-end.",
    },
    {
      index: "06",
      title: "Experiencias 360",
      body: "En tienda y virtual, conectando lo físico con lo digital.",
    },
    {
      index: "07",
      title: "Desarrollo de webs y apps",
      body: "Sitios, e-commerce y aplicaciones a medida — como este mismo sitio.",
    },
  ],
};

export const midBanner = {
  caption: "No trabajamos como agencia externa. Nos volvemos implant de tu equipo.",
};

export const teamBanner = {
  caption: "Un equipo que se sienta a revisar resultados contigo, no que desaparece después de entregar un plan.",
};

export const skylineBanner = {
  caption: "Dirigimos negocios reales, no campañas aisladas en el vacío.",
};

export const differentiators = {
  eyebrow: "Por qué BOLD",
  headline: "Cuatro razones por las que negocios como el tuyo eligen dirigirse con nosotros.",
  items: [
    {
      icon: "expertise",
      title: "Expertise y especialización",
      body: "+9 años de experiencia en marketing digital y estratégico, con operación en Costa Rica, Brasil, Estados Unidos y España.",
    },
    {
      icon: "perspective",
      title: "Perspectiva fresca",
      body: "Vemos tu negocio desde afuera, sin los puntos ciegos que se acumulan después de años operando dentro de él.",
    },
    {
      icon: "flexibility",
      title: "Flexibilidad y escalabilidad",
      body: "Empezamos donde estás hoy y ajustamos el alcance conforme el negocio crece, sin estructuras rígidas.",
    },
    {
      icon: "resources",
      title: "Optimización de recursos",
      body: "Aprovechás un equipo completo ya formado, en lugar de contratar y entrenar una estructura interna desde cero.",
    },
  ],
};

export const founder = {
  eyebrow: "Nuestro fundador",
  headline: "Quién dirige esto.",
  name: "Esteban Muñoz Malavé",
  role: "Marketing Strategist & Growth Leader · Trilingüe",
  bio: "Comunicador Social con mención en Mercadeo y Publicidad, con más de 9 años liderando crecimiento B2B y B2C para marcas en Venezuela, Costa Rica, Panamá, México, Argentina y Brasil. Experto en planificación estratégica, paid media, branding y liderazgo de equipos multidisciplinarios, con resultados medibles en los sectores automotriz, belleza, retail, mobiliario/diseño, tecnología y eventos/turismo.",
  experience: [
    {
      role: "Founder & Estratega de marca",
      company: "BOLD Agency",
      period: "2026 – Presente",
    },
    {
      role: "Senior Marketing Specialist",
      company: "Shift Latam Porter Novelli — Implant en CCCR",
      period: "2026",
    },
    {
      role: "Marketing Manager",
      company: "Euromobilia & Nouvell (Ara Group)",
      period: "2024 – 2026",
    },
    {
      role: "Digital Marketing Manager",
      company: "Avon Costa Rica",
      period: "2022 – 2023",
    },
  ],
  cards: [
    {
      tag: "Formación",
      value: "Comunicador Social",
      sub: "Mención Mercadeo y Publicidad",
    },
    {
      tag: "Certificación",
      value: "Executive Certificate, Digital Marketing",
      sub: "The George Washington University · 2023",
    },
    {
      tag: "Hoy",
      value: "Hacer crecer tu empresa",
      sub: "BOLD Agency",
    },
    {
      tag: "Idiomas",
      value: "Español C2 · Português C1 · English B2",
      sub: "Nativo · Avanzado · Intermedio",
    },
  ],
  linkedIn: "https://linkedin.com/in/estebanjm",
  experienceLabel: "Experiencia reciente",
  certificationLabel: "Certificación",
  certificate: {
    institution: "The George Washington University",
    school: "School of Business",
    program: "Specialization in Digital Marketing",
    honoree: "Esteban Jose Muñoz Malave",
    date: "Noviembre 2023",
  },
};

// Copy borrador del hero de /portafolio (§5.4a), tal cual la dio el
// usuario en el brief — pendiente de su revisión antes de publicar.
export const portfolioHero = {
  eyebrow: "MARKETING STRATEGY & GROWTH",
  headlinePre: "Estratega construyendo marcas con",
  headlineItalic: "dirección",
  headlinePost: "y resultados reales.",
  subhead:
    "Ayudo a negocios ambiciosos a crecer con estrategia clara y ejecución real. Con base en Costa Rica, alcance en LATAM, USA y Europa.",
  cta: { label: "Ver portafolio →", targetId: "grid" },
  photo: "/images/founder-about-me.jpg",
};

export const portfolioPage = {
  metaTitle: "Portafolio",
  metaDescription: "Portafolio y trayectoria de Esteban Muñoz Malavé — BOLD Agency.",
  aboutEyebrow: "Sobre mí",
  gridEyebrow: "Portafolio",
  gridHeadline: "Marcas con las que he construido, de cerca.",
  gridIntro: "Filtrá por marca o por tipo de trabajo. Cada caso muestra mi rol real en el proyecto.",
  filterAllLabel: "Todas",
  filterBrandLabel: "Marca",
  filterTypeLabel: "Tipo de trabajo",
  emptyLabel: "No hay casos con ese filtro todavía.",
  inProgressLabel: "En actualización",
  roleLabel: "Mi rol",
  backLabel: "← Volver al portafolio",
  clientsEyebrow: "Clientes y partners",
  clientsHeadline: "Marcas que eligieron ser bold.",
  detailCtaLabel: "Agendar Diagnóstico 360",
  behanceEyebrow: "Portafolio visual completo",
  behanceHeadline: "Cada pieza, con más detalle en Behance.",
  behanceCtaLabel: "Ver en Behance",
};

export const process = {
  eyebrow: "Cómo trabajamos",
  headline: "Un proceso, no una lista de entregables.",
  subhead: "Cada etapa se apoya en la anterior. No saltamos a ejecución sin diagnóstico, ni medimos sin haber ejecutado con intención.",
  steps: [
    {
      index: "01",
      title: "Diagnóstico 360",
      body: "Revisamos tu negocio completo — marca, presencia digital, proceso de ventas y competencia — para entender qué está frenando el crecimiento.",
    },
    {
      index: "02",
      title: "Prioridades",
      body: "Definimos juntos qué mover primero. No todo se resuelve al mismo tiempo, y decirlo con claridad es parte del trabajo.",
    },
    {
      index: "03",
      title: "Ejecución",
      body: "El equipo BOLD implementa el plan directamente, con la operación involucrada, no solo con recomendaciones en un documento.",
    },
    {
      index: "04",
      title: "Medición",
      body: "Revisamos qué está funcionando con datos reales del negocio, no con reportes de vanidad.",
    },
    {
      index: "05",
      title: "Aprendizaje",
      body: "Ajustamos la dirección con lo aprendido. El crecimiento real es un ciclo, no un proyecto con fecha de cierre.",
    },
  ],
};

export const plans = {
  eyebrow: "Cómo trabajar con BOLD",
  headline: "Dos caminos. Un mismo compromiso.",
  intro:
    "Cotización estándar con entregables claros, o modalidad implant si querés que seamos parte de tu equipo. El Diagnóstico 360 te ayuda a decidir cuál te conviene.",
  modalities: [
    {
      name: "Grow Your Way",
      description: "Cotización estándar o fee mensual. Servicios paquetizados con entregables claros.",
      includes: [
        { label: "Paquetes digitales", detail: "redes · ads · contenido" },
        { label: "Branding & asesoría", detail: "identidad + estrategia" },
        { label: "Rotulación", detail: "independiente o refuerzo" },
        { label: "Diseño & audiovisual", detail: "por proyecto o retainer" },
      ],
      price: "Desde $200 usd/mes + % comisión ajustable",
    },
    {
      name: "The Bold Way",
      badge: "★ Top Tier",
      featured: true,
      description:
        "No trabajamos como agencia externa: nos convertimos en implant de tu equipo. Vivimos tu marca, la analizamos por dentro y crecemos con vos.",
      includes: [
        { label: "Involucramiento total", detail: "pensamos como parte del equipo" },
        { label: "Presencia semanal", detail: "reuniones, estrategia, ejecución" },
        { label: "Análisis end-to-end", detail: "del brief a los resultados" },
        { label: "Estrategia 360 dedicada", detail: "branding + digital + físico" },
      ],
      price: "Fee base + performance share · a cotizar",
    },
  ],
  disclaimer: "Precios de referencia en colones (₡), sujetos a alcance y volumen. El Diagnóstico 360 no tiene costo — de ahí sale la cotización final. Todos los planes incluyen facturación electrónica.",
  ctaLabel: "Definir mi plan",
  calculatorCtaLabel: "Ver calculadora de precios",
};

export const launchPricing = {
  eyebrow: "Precios de lanzamiento · The Bold Way",
  headline: "Así arranca The Bold Way.",
  intro:
    "Tres paquetes, un mismo compromiso: el acompañamiento es igual en los tres — lo que cambia es cuánto contenido recibís y su balance estático–video.",
  countdownPrefix: "Termina en",
  countdownDayLabel: "d",
  countdownHourLabel: "h",
  countdownMinuteLabel: "m",
  countdownExpiredLabel: "Promoción finalizada",
  tiers: [
    {
      name: "Paquete Bronce",
      price: "Desde ₡65,000",
      oldPrice: "₡75,000",
      discountLabel: "-13%",
      // 15 días desde que se activó esta promo (18 sep 2026) — actualizar
      // a mano si se vuelve a extender.
      promoEndsAt: "2026-10-03T23:59:59-06:00",
      unit: "/mes",
      priceNote: "precio de lanzamiento",
      features: [
        { label: "5 artes al mes", detail: "Mix entre estático, reel y animado" },
        { label: "Involucramiento 100%", detail: "durante el mes de prueba" },
      ],
    },
    {
      name: "Paquete Silver",
      badge: "Más elegido",
      price: "Desde ₡150,000",
      unit: "/mes",
      priceNote: "precio de lanzamiento",
      features: [
        { label: "8 artes al mes", detail: "Mix entre estático, reel y animado" },
        { label: "Involucramiento 100%", detail: "durante el mes de prueba" },
      ],
    },
    {
      name: "Paquete B-Gold",
      badge: "★ Top Tier",
      featured: true,
      price: "Desde ₡220,000",
      unit: "/mes",
      priceNote: "precio de lanzamiento",
      features: [
        { label: "30 artes al mes", detail: "Mix entre estático, reel y animado" },
        { label: "Formato flexible", detail: "vos decidís el balance entre los tres formatos" },
        { label: "Involucramiento 100%", detail: "durante el mes de prueba" },
      ],
    },
  ],
  promo:
    "★ Precios de lanzamiento — Cotización personalizada para necesidades especiales · Social · Paid · Diseño · Estrategia",
};

export const results = {
  eyebrow: "Resultados",
  headline: "Los números hablan.",
  intro: "Resultados reales de campañas, no promesas.",
  stats: [
    { num: "+85%", label: "Leads calidad generados", src: "CCCR" },
    { num: "$300K", label: "Ventas mensuales", src: "CCCR" },
    { num: "+8K", label: "Usuarios en app", src: "Grupo Purdy" },
    { num: "+900K", label: "USD de ROI", src: "Euromobilia" },
    { num: "+70%", label: "Productividad", src: "Avon" },
    { num: "+16", label: "Campañas exitosas", src: "9+ años de trayectoria" },
  ],
  ctaLabel: "Ver portafolio completo",
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  headline: "Antes de que preguntes.",
  items: [
    {
      question: "Ya tengo un diseñador o community manager, ¿esto los reemplaza?",
      answer:
        "No necesariamente. Muchas veces integramos a las personas que ya te funcionan dentro de una dirección más clara. Lo que aportamos es el criterio estratégico que conecta su trabajo con el resto del negocio.",
    },
    {
      question: "¿Cuánto cuesta trabajar con BOLD?",
      answer:
        "Depende de la modalidad: paquetes desde $200 usd/mes en Grow Your Way, o fee base + performance share si trabajamos como implant de tu equipo (The Bold Way). El Diagnóstico 360 — el primer paso — no tiene costo.",
    },
    {
      question: "¿Trabajan fuera de Costa Rica?",
      answer:
        "Sí. Tenemos base en Costa Rica y operación en Brasil (Curitiba, São Paulo), Estados Unidos (Orlando, Philadelphia, Chicago) y España (Barcelona, Valencia, Madrid).",
    },
    {
      question: "Mi negocio es pequeño, ¿igual aplica?",
      answer:
        "Trabajamos con negocios que ya tienen un producto validado y entre 3 y 25 empleados. Si vendés principalmente por WhatsApp y sentís que tu presencia no refleja lo que realmente vale tu negocio, aplicás.",
    },
    {
      question: "¿Cómo es el proceso desde que agendo el diagnóstico?",
      answer:
        "Completas el formulario de Diagnóstico 360, te contactamos para agendar una conversación, revisamos tu negocio en conjunto y te presentamos prioridades concretas — con o sin compromiso de continuar.",
    },
    {
      question: "¿Qué pasa si no veo resultados de inmediato?",
      answer:
        "Cualquiera que te prometa resultados garantizados en semanas no está siendo honesto contigo. Lo que sí podés esperar es dirección clara desde el primer mes y una medición constante de qué está funcionando y qué no.",
    },
    {
      question: "Ya tuve una mala experiencia con otra agencia, ¿qué cambia con ustedes?",
      answer:
        "Que un mismo equipo ve el negocio completo, no un canal aislado. Eso significa menos jerga, menos reportes que nadie lee, y más conversación directa con quien realmente ejecuta el trabajo.",
    },
  ],
};

export const finalCta = {
  eyebrow: "El siguiente paso",
  headline: "Tu negocio no necesita más ruido. Necesita dirección.",
  body:
    "El Diagnóstico 360 no es una llamada de ventas. Es una revisión honesta de tu negocio, sin costo y sin compromiso, para que decidas con información real qué mover primero.",
  cta: { href: "#diagnostico", label: "Agendar mi Diagnóstico 360" },
};

export const footer = {
  description:
    "The bold way to grow. Agencia creativa y estratégica con base en Costa Rica y alcance en Brasil, Estados Unidos y España.",
  contact: {
    email: "esteban.munoz@boldagencycr.com",
    whatsapp: "+506 7244 5642",
    address: "Costa Rica → LATAM · USA · Europa",
  },
  columns: [
    {
      title: "Sitio",
      links: [
        { href: "/#enfoque", label: "Enfoque" },
        { href: "/#sistema", label: "Servicios" },
        { href: "/#diferenciales", label: "Por qué BOLD" },
        { href: "/#como-trabajamos", label: "Cómo trabajamos" },
        { href: "/#planes", label: "Planes" },
        { href: "/calculadora", label: "Calculadora" },
        { href: "/portafolio", label: "Portafolio" },
        { href: "/#preguntas", label: "FAQ" },
        { href: "/#diagnostico", label: "Diagnóstico 360" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacidad", label: "Política de privacidad" },
        { href: "/terminos", label: "Términos y condiciones" },
      ],
    },
  ],
  social: [
    { href: "https://www.facebook.com/profile.php?id=61594134985999", label: "Facebook", icon: "facebook" },
    { href: "https://www.instagram.com/boldagency.cr/", label: "Instagram", icon: "instagram" },
    { href: "https://www.linkedin.com/company/em-agency-latam", label: "LinkedIn", icon: "linkedin" },
  ],
  whatsappLink: "https://wa.me/50672445642",
  whatsappAriaLabel: "Escribir por WhatsApp",
  copyright: `© ${new Date().getFullYear()} BOLD Agency. Todos los derechos reservados.`,
};

export const diagnosticForm = {
  eyebrow: "Diagnóstico 360",
  headline: "Contanos de tu negocio.",
  body:
    "Toma menos de dos minutos. Con esta información preparamos una primera lectura de tu negocio antes de la conversación.",
  successTitle: "Recibimos tu solicitud.",
  successBody:
    "Nuestro equipo revisará la información y te contactará por WhatsApp o email en las próximas 24 horas hábiles para agendar tu Diagnóstico 360.",
  resendLabel: "Enviar otra solicitud",
  errorTitle: "No pudimos enviar tu solicitud.",
  errorBody:
    "Tu información no se perdió. Intenta de nuevo en unos segundos o escríbenos directamente por WhatsApp.",
  nameLabel: "Nombre completo",
  companyLabel: "Nombre del negocio",
  contactLabel: "WhatsApp o email",
  contactHint: "Con código de país si es WhatsApp.",
  businessTypeLabel: "Tipo de negocio",
  businessTypePlaceholder: "Selecciona una opción",
  budgetLabel: "Presupuesto mensual aproximado",
  budgetPlaceholder: "Selecciona un rango",
  challengeLabel: "¿Cuál es tu principal desafío hoy?",
  consentLabel: "Autorizo a BOLD Agency a contactarme por WhatsApp o email para coordinar mi Diagnóstico 360.",
  submitLabel: "Solicitar Diagnóstico 360",
  submittingLabel: "Enviando…",
  privacyNote: "No compartimos tu información. Solo la usamos para preparar tu diagnóstico.",
};

export const businessTypes = [
  { value: "comercio", label: "Comercio / retail" },
  { value: "servicios", label: "Servicios profesionales" },
  { value: "salud", label: "Salud y bienestar" },
  { value: "alimentos", label: "Alimentos y bebidas" },
  { value: "construccion", label: "Construcción e inmobiliaria" },
  { value: "manufactura", label: "Manufactura / industria" },
  { value: "educacion", label: "Educación y formación" },
  { value: "tecnologia", label: "Tecnología / software" },
  { value: "otro", label: "Otro" },
];

export const budgetRanges = [
  { value: "menos-1000", label: "Menos de USD 1,000/mes" },
  { value: "1000-3000", label: "USD 1,000 – 3,000/mes" },
  { value: "3000-6000", label: "USD 3,000 – 6,000/mes" },
  { value: "6000-mas", label: "Más de USD 6,000/mes" },
  { value: "no-seguro", label: "Aún no lo tengo claro" },
];

/**
 * Página independiente en /cotizacion — URL única y compartible para
 * campañas, bio de redes y WhatsApp, que lleva directo al formulario
 * sin depender de un ancla dentro del home.
 */
export const cotizacionPage = {
  metaTitle: "Cotización — Diagnóstico 360",
  metaDescription: "Solicita tu Diagnóstico 360 con BOLD Agency: contanos de tu negocio y te contactamos por WhatsApp o email con tu cotización, sin costo y sin compromiso.",
  eyebrow: "Cotización BOLD Agency",
  headline: "Contanos tu negocio y arrancamos tu cotización.",
  intro:
    "Menos de dos minutos. Con esta información preparamos tu Diagnóstico 360 y te contactamos por WhatsApp o email con los próximos pasos — sin costo y sin compromiso.",
  trustPoints: [
    "Respuesta en menos de 24 horas hábiles",
    "Diagnóstico 360 sin costo y sin compromiso",
    "+9 años de experiencia en marketing digital y estratégico",
  ],
};

// UI de la calculadora (§8). Los nombres de servicios y categorías del
// catálogo (pricing-config.ts) se mantienen en español en los 3 idiomas
// por ahora — vienen literal del Excel del cliente y traducirlos con
// precisión de negocio queda pendiente de una revisión aparte.
export const calculator = {
  eyebrow: "Calcula tu servicio o proyecto",
  headline: "¿Cuánto cuesta crecer a tu manera?",
  intro: "Precios reales, en colones. Elegí un paquete mensual o armá tu propia combinación de servicios puntuales.",
  exclusiveNote: "Un paquete o servicios puntuales — no se combinan en este cálculo. ¿Necesitás paquete + servicios adicionales? Esa es una cotización especializada.",
  specializedCtaLabel: "Solicitar cotización especializada",
  packageTitle: "Paquete mensual",
  packageSubtitle: "Selección única — no se combinan entre sí.",
  removePackageLabel: "Quitar paquete",
  pointTitle: "Servicios puntuales",
  pointSubtitle: "Sumá los que necesitás. Los marcados “a cotizar” abren un formulario aparte.",
  quoteLabel: "A cotizar",
  fromLabel: "desde",
  quoteButton: "Cotizar",
  quotedButton: "Solicitado ✓",
  growYourWayNote: "Grow Your Way incluye una comisión ajustable sobre el presupuesto de pauta, acordada según el proyecto — no está incluida en el total de esta calculadora.",
  summaryTitle: "Tu estimado",
  emptyState: "Elegí un paquete o un servicio puntual para ver el total.",
  subtotalLabel: "Subtotal",
  discountLabel: "Descuento por combinar",
  vatLabel: "IVA",
  totalLabel: "Total estimado",
  totalFromLabel: "Total estimado desde",
  totalUnit: "/mes, impuestos incluidos",
  quotedNote: "Incluye servicios a cotizar por separado — te contactamos con el monto exacto.",
  soloSurchargeNote: "Este servicio está pensado para combinarse con otros — elegido solo, el precio incluye un ajuste.",
  ctaLabel: "Agendar Diagnóstico 360",
  decreaseAria: "Restar",
  increaseAria: "Sumar",
};

export const quoteModal = {
  eyebrow: "Cotizar",
  intro: "Este servicio se cotiza a la medida. Dejanos tus datos y un breve alcance.",
  namePlaceholder: "Nombre completo",
  companyPlaceholder: "Nombre del negocio",
  contactPlaceholder: "WhatsApp o email",
  briefPlaceholder: "Contanos brevemente el alcance del proyecto",
  submitLabel: "Enviar solicitud",
  submittingLabel: "Enviando…",
  whatsappLabel: "o escribinos directo por WhatsApp",
  closeLabel: "Cerrar",
  successTitle: "¡Listo!",
  successBody: (service: string) => `Recibimos tu solicitud de cotización para ${service}. Te contactamos pronto.`,
  ariaLabel: (service: string) => `Cotizar ${service}`,
  genericError: "Revisa los campos.",
  submitError: "No se pudo enviar la solicitud.",
  unexpectedError: "Error inesperado.",
  whatsappMessage: (service: string) => `Hola BOLD, quiero cotizar: ${service}.`,
  challengePrefix: "Servicio de interés",
  noDetailNote: "sin detalle adicional",
};
