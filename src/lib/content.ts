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
    { href: "/#enfoque", label: "Enfoque" },
    { href: "/#como-trabajamos", label: "Cómo trabajamos" },
    { href: "/#casos", label: "Casos" },
  ],
  cta: { href: "/#diagnostico", label: "Diagnóstico 360" },
};

export const hero = {
  eyebrow: "The bold way to grow",
  headline: ["Marketing 360,", "branding y rotulación.", "Una sola estrategia."],
  subhead:
    "No como piezas sueltas. Un mismo equipo piensa tu marca, tu presencia digital y tu presencia física — con base en Costa Rica y alcance en Brasil, Estados Unidos y España.",
  ctaPrimary: { href: "#diagnostico", label: "Agendar Diagnóstico 360" },
  ctaSecondary: { href: "#sistema", label: "Cómo trabajamos" },
  proofPoints: [
    "Costa Rica · Brasil · Estados Unidos · España",
    "+9 años de experiencia en marketing digital y estratégico",
    "+16 campañas exitosas para marcas como Toyota, Avon y Swarovski",
  ],
  floatCard: {
    name: "Esteban Muñoz",
    role: "Founder · Estratega de marca",
  },
};

export const problem = {
  eyebrow: "El problema real",
  headline: "Contratar por partes no arregla un negocio completo.",
  intro:
    "Tienes un buen negocio. Llevas años operando, tu producto funciona y tus clientes te recomiendan. Pero también manejas cinco conversaciones de WhatsApp distintas con cinco proveedores distintos, y ninguno ve el negocio completo.",
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
      title: "Tú terminas coordinando todo",
      body: "El dueño se convierte en el único punto que conecta piezas que deberían estar conectadas desde el inicio.",
    },
  ],
  resolution:
    "El resultado no es falta de esfuerzo: es falta de dirección. BOLD existe para ser esa dirección.",
};

export const system = {
  eyebrow: "Nuestros servicios",
  headline: "Todo lo que una marca necesita, en un solo equipo.",
  intro: "Seis frentes, un mismo equipo detrás.",
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
      title: "Expertise y especialización",
      body: "+9 años de experiencia en marketing digital y estratégico, con operación en Costa Rica, Brasil, Estados Unidos y España.",
    },
    {
      title: "Perspectiva fresca",
      body: "Vemos tu negocio desde afuera, sin los puntos ciegos que se acumulan después de años operando dentro de él.",
    },
    {
      title: "Flexibilidad y escalabilidad",
      body: "Empezamos donde estás hoy y ajustamos el alcance conforme el negocio crece, sin estructuras rígidas.",
    },
    {
      title: "Optimización de recursos",
      body: "Aprovechas un equipo completo ya formado, en lugar de contratar y entrenar una estructura interna desde cero.",
    },
  ],
};

export const founder = {
  eyebrow: "Nuestro fundador",
  headline: "Quién dirige esto.",
  name: "Esteban Muñoz Malavé",
  role: "Founder · Estratega de marca · Trilingüe",
  bio: "+9 años de experiencia en marketing digital y estratégico, entre B2B y B2C, para marcas líderes en Costa Rica, LATAM, Brasil, España y Estados Unidos.",
  cards: [
    {
      tag: "Formación",
      value: "Comunicación Social + Marketing Digital",
      sub: "George Washington University",
    },
    {
      tag: "Hoy",
      value: "Implant · Paid Media",
      sub: "Centro de Convenciones · CCCR",
    },
    {
      tag: "Idiomas",
      value: "Español · English · Português",
      sub: "3 idiomas nativos-fluidos",
    },
  ],
};

export const process = {
  eyebrow: "Cómo trabajamos",
  headline: "Un proceso, no una lista de entregables.",
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
  disclaimer: "Precios de referencia en USD, sujetos a alcance y volumen. El Diagnóstico 360 no tiene costo — de ahí sale la cotización final.",
};

export const pointPricing = {
  eyebrow: "Servicios puntuales",
  headline: "Cuando no querés paquete: contratás por unidad o pieza.",
  items: [
    { tag: "Social Media Management", amount: "$150", unit: "/mes", desc: "Gestión integral de redes" },
    { tag: "Paid Media · Ads", amount: "$60", unit: "/campaña", desc: "Pauta Meta, Google, TikTok" },
    { tag: "Copywriting & Contenido", amount: "$5", unit: "/pieza", desc: "Textos publicitarios y editoriales" },
    { tag: "Diseño Gráfico", amount: "$8", unit: "/pieza", desc: "Piezas para redes y campañas" },
    { tag: "Estrategia de Marketing", amount: "$50", unit: "/sesión", desc: "Asesoría estratégica puntual" },
    { tag: "Branding & Rotulación", amount: "A cotizar", unit: "", desc: "Proyecto integral personalizado" },
  ],
  promo: "★ Promo de lanzamiento — 10% OFF en paquetes personalizados · Social · Paid · Diseño · Estrategia",
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
};

export const clients = {
  eyebrow: "Clientes y partners",
  headline: "Marcas que eligieron ser bold.",
  intro: "Portafolio de marcas con las que hemos trabajado en 9+ años. Logos originales disponibles bajo solicitud.",
  names: [
    "TOYOTA",
    "FORD",
    "LEXUS",
    "AVON",
    "SWAROVSKI",
    "GRUPO PURDY",
    "EUROMOBILIA",
    "NOUVELL",
    "RENTCARS",
    "CUSHMAN & WAKEFIELD",
  ],
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
        "Depende de la modalidad: paquetes desde $200 usd/mes en Grow Your Way, o fee base + performance share si trabajamos como implant de tu equipo (The Bold Way). El Diagnóstico 360 —el primer paso— no tiene costo.",
    },
    {
      question: "¿Trabajan fuera de Costa Rica?",
      answer:
        "Sí. Tenemos base en Costa Rica y operación en Brasil (Curitiba, São Paulo), Estados Unidos (Orlando, Philadelphia, Chicago) y España (Barcelona, Valencia, Madrid).",
    },
    {
      question: "Mi negocio es pequeño, ¿igual aplica?",
      answer:
        "Trabajamos con negocios que ya tienen un producto validado y entre 3 y 25 empleados. Si vendes principalmente por WhatsApp y sientes que tu presencia no refleja lo que realmente vale tu negocio, aplicas.",
    },
    {
      question: "¿Cómo es el proceso desde que agendo el diagnóstico?",
      answer:
        "Completas el formulario de Diagnóstico 360, te contactamos para agendar una conversación, revisamos tu negocio en conjunto y te presentamos prioridades concretas — con o sin compromiso de continuar.",
    },
    {
      question: "¿Qué pasa si no veo resultados de inmediato?",
      answer:
        "Cualquiera que te prometa resultados garantizados en semanas no está siendo honesto contigo. Lo que sí puedes esperar es dirección clara desde el primer mes y una medición constante de qué está funcionando y qué no.",
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
        { href: "/#como-trabajamos", label: "Cómo trabajamos" },
        { href: "/#casos", label: "Casos" },
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
    { href: "#", label: "Instagram" }, // EDITABLE: agregar URL real
    { href: "#", label: "LinkedIn" }, // EDITABLE: agregar URL real
  ],
  copyright: `© ${new Date().getFullYear()} BOLD Agency. Todos los derechos reservados.`,
};

export const diagnosticForm = {
  eyebrow: "Diagnóstico 360",
  headline: "Cuéntanos de tu negocio.",
  body:
    "Toma menos de dos minutos. Con esta información preparamos una primera lectura de tu negocio antes de la conversación.",
  successTitle: "Recibimos tu solicitud.",
  successBody:
    "Nuestro equipo revisará la información y te contactará por WhatsApp o email en las próximas 24 horas hábiles para agendar tu Diagnóstico 360.",
  errorTitle: "No pudimos enviar tu solicitud.",
  errorBody:
    "Tu información no se perdió. Intenta de nuevo en unos segundos o escríbenos directamente por WhatsApp.",
};
