/**
 * Todo el copy visible del sitio vive aquí, separado de los componentes,
 * para que se pueda editar sin tocar JSX ni lógica de presentación.
 *
 * Nada aquí es un dato inventado: cifras, clientes o resultados que no
 * estaban confirmados en el material fuente se dejan como placeholders
 * explícitos (marcados con "// EDITABLE" o texto entre corchetes).
 */

export const nav = {
  logoLabel: "BOLD Agency",
  links: [
    { href: "/#enfoque", label: "Enfoque" },
    { href: "/#como-trabajamos", label: "Cómo trabajamos" },
    { href: "/#casos", label: "Casos" },
  ],
  cta: { href: "/#diagnostico", label: "Diagnóstico 360" },
};

export const hero = {
  eyebrow: "Dirección de crecimiento integrada",
  headline: ["Un solo equipo.", "Toda la dirección", "que tu negocio necesita."],
  subhead:
    "Estrategia, marca, contenido, medios y ventas trabajando como un solo sistema — no como cinco proveedores que no se hablan entre sí.",
  ctaPrimary: { href: "#diagnostico", label: "Agendar Diagnóstico 360" },
  ctaSecondary: { href: "#sistema", label: "Cómo trabajamos" },
  proofPoints: [
    "Para negocios con producto validado y más de dos años operando",
    "Un equipo, una sola dirección",
    "Sin contratos de canal aislado",
  ],
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
  eyebrow: "El sistema BOLD",
  headline: "Seis funciones. Un solo criterio.",
  intro:
    "No vendemos canales sueltos. Integramos las seis funciones que mueven el crecimiento de un negocio real, coordinadas por un mismo criterio estratégico.",
  pillars: [
    {
      index: "01",
      title: "Estrategia",
      body: "Un diagnóstico honesto del negocio y una dirección clara de hacia dónde crecer primero.",
    },
    {
      index: "02",
      title: "Marca",
      body: "Una identidad y un mensaje que reflejan lo que tu negocio realmente vale, no una plantilla genérica.",
    },
    {
      index: "03",
      title: "Contenido",
      body: "Presencia digital que comunica autoridad, no publicaciones sueltas sin hilo conductor.",
    },
    {
      index: "04",
      title: "Medios y PR",
      body: "Visibilidad pagada y ganada que amplifica el mensaje correcto frente a la audiencia correcta.",
    },
    {
      index: "05",
      title: "Ventas",
      body: "Procesos y materiales que convierten conversaciones de WhatsApp en decisiones de compra.",
    },
    {
      index: "06",
      title: "Ejecución",
      body: "Un equipo que se involucra en la operación, no que desaparece después de entregar un plan.",
    },
  ],
};

export const differentiators = {
  eyebrow: "Por qué BOLD",
  headline: "Cuatro razones por las que negocios como el tuyo eligen dirigirse con nosotros.",
  items: [
    {
      title: "Expertise y especialización",
      body: "Acceso a un equipo con experiencia en varias disciplinas de crecimiento, no a una sola persona haciendo de todo.",
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
  eyebrow: "Planes",
  headline: "Empaquetados por resultado, no por horas.",
  intro:
    "Cada plan se ajusta después del Diagnóstico 360, según el punto en el que está tu negocio hoy. Estas son las tres direcciones típicas de trabajo — el alcance exacto y la inversión se definen contigo, nunca antes de conocer tu negocio.",
  tiers: [
    {
      name: "Fundación", // EDITABLE: nombre y alcance final a confirmar
      description:
        "Para negocios que necesitan poner en orden marca, presencia digital y proceso comercial antes de escalar la inversión en crecimiento.",
      includes: [
        "Diagnóstico 360 completo",
        "Sistema de marca y mensaje central",
        "Presencia digital ordenada (sitio + perfiles clave)",
      ],
      priceNote: "Inversión definida tras el Diagnóstico 360", // EDITABLE
    },
    {
      name: "Crecimiento", // EDITABLE
      description:
        "Para negocios con base sólida que necesitan un motor constante de contenido, medios y ventas trabajando en conjunto.",
      includes: [
        "Todo lo de Fundación",
        "Contenido y medios en operación continua",
        "Proceso de ventas y seguimiento de leads",
      ],
      priceNote: "Inversión definida tras el Diagnóstico 360", // EDITABLE
      featured: true,
    },
    {
      name: "Dirección Integral", // EDITABLE
      description:
        "Para negocios que quieren un equipo de crecimiento completo, integrado a la operación como si fuera parte interna del negocio.",
      includes: [
        "Todo lo de Crecimiento",
        "Equipo dedicado multidisciplinario",
        "Revisión estratégica recurrente con el dueño",
      ],
      priceNote: "Inversión definida tras el Diagnóstico 360", // EDITABLE
    },
  ],
  disclaimer:
    "Los nombres, alcances e inversión de cada plan son una propuesta editable — se confirman con datos reales del negocio antes de publicarse como oferta final.",
};

export const caseStudies = {
  eyebrow: "Casos",
  headline: "Negocios que ya dirigimos.",
  intro:
    "Estos casos están preparados como estructura editorial lista para publicarse en cuanto se confirmen los datos reales del proyecto — evitamos publicar cifras o resultados sin verificar.",
  items: [
    {
      client: "VoltTech", // EDITABLE: confirmar nombre público y datos reales
      sector: "[Sector por confirmar]",
      challenge:
        "[Editable: describe aquí el reto real de VoltTech antes de publicar este caso.]",
      approach:
        "[Editable: resume el enfoque de BOLD para este proyecto.]",
      result:
        "[Editable: agrega solo resultados verificados — no publiques cifras sin confirmar.]",
      status: "En preparación",
    },
    {
      client: "FreshGo", // EDITABLE: confirmar nombre público y datos reales
      sector: "[Sector por confirmar]",
      challenge:
        "[Editable: describe aquí el reto real de FreshGo antes de publicar este caso.]",
      approach:
        "[Editable: resume el enfoque de BOLD para este proyecto.]",
      result:
        "[Editable: agrega solo resultados verificados — no publiques cifras sin confirmar.]",
      status: "En preparación",
    },
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
        "Depende del punto en el que está tu negocio y de lo que decidamos priorizar en el Diagnóstico 360. No vendemos paquetes cerrados sin conocer tu operación primero — por eso el primer paso siempre es sin costo.",
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
    "Dirección de crecimiento integrada para negocios reales, al precio de una PYME.",
  contact: {
    email: "hola@boldagency.com", // EDITABLE
    whatsapp: "+000 000 0000", // EDITABLE
    address: "[Ciudad, país] — EDITABLE",
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
    { href: "#", label: "Instagram" }, // EDITABLE
    { href: "#", label: "LinkedIn" }, // EDITABLE
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
