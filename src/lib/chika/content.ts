/** Textos de la landing que no pertenecen a una experiencia concreta. */

export const nav = {
  links: [
    { href: "#experiencias", label: "Experiencias" },
    { href: "#selector", label: "¿Cuál es para vos?" },
    { href: "#comparar", label: "Comparar" },
    { href: "#preguntas", label: "Preguntas" },
  ],
  cta: "Cotizá o agendá",
  ctaShort: "WhatsApp",
  menuCta: "Cotizá o agendá por WhatsApp",
};

export const partner = {
  label: "Trabajamos con productos profesionales",
};

export const hero = {
  eyebrow: "Colección de experiencias capilares",
  lead: "Tu cabello tiene una historia.",
  follow: "Empecemos por entenderla.",
  text: "Valoración con capilógrafo digital y un plan de cuidado según lo que tu cabello necesita hoy.",
  cta: "Cotizá o agendá por WhatsApp",
  secondary: "Ayudame a elegir",
  note: "Escribinos, contanos sobre tu cabello y coordinamos tu valoración.",
  trust: ["Valoración con capilógrafo digital", "Productos profesionales Davines", "Rutina para casa en experiencias seleccionadas", "Asesoría personalizada"],
  photoAlt: "Cabello castaño con reflejos dorados en ondas largas, visto de espalda",
};

/** Comunicación de inversión: precio de referencia + valoración + beneficio (sin cifras no confirmadas). */
export const pricing = {
  label: "Inversión de referencia",
  fromLabel: "Inversión de referencia desde",
  note: "El valor final se confirma después de tu valoración. Consultá por el beneficio vigente al elegir un paquete.",
  headline: "Agendá tu valoración y consultá por el beneficio disponible al adquirir un paquete.",
  tbc: "Precio por confirmar",
};

export const intro = {
  title: "¿Qué necesita tu cabello hoy?",
  subtitle: "Cuatro momentos de cuidado. Una experiencia para cada uno.",
  moments: [
    {
      n: "01",
      title: "Diagnosticar",
      text: "Conocer el estado real de la hebra y el cuero cabelludo.",
      links: ["chika-kit"],
      photo: { file: "chika-diagnostico-capilografo.jpg", alt: "Diagnóstico capilar con capilógrafo", brief: "Macro de hebra", position: "60% 45%" },
    },
    {
      n: "02",
      title: "Detoxificar",
      text: "Liberar el cabello de residuos para que los tratamientos puedan penetrar.",
      links: ["chika-detox"],
      photo: { file: "chika-detox-lavado.jpg", alt: "Lavado capilar con espuma", brief: "Espuma de lavado", position: "40% 45%" },
    },
    {
      n: "03",
      title: "Reparar",
      text: "Reconstruir y nutrir cabellos altamente procesados.",
      links: ["chika-cirugia-capilar"],
      photo: { file: "chika-intro-puntas-brillo.jpg", alt: "Cabello largo con brillo a contraluz", brief: "Puntas con brillo", position: "50% 40%" },
    },
    {
      n: "04",
      title: "Mantener",
      text: "Sostener color, hidratación, brillo y peinado.",
      links: ["chika-wow", "chika-blow-club"],
      photo: { file: "chika-intro-color-movimiento.jpg", alt: "Cabello cobrizo con ondas definidas en el salón", brief: "Color en movimiento", position: "60% 40%" },
    },
  ],
  textureLabel: "Cuidado según tu textura",
  textures: [
    { id: "chika-melena", label: "Natural o virgen" },
    { id: "chika-curl-love", label: "Ondas y rizos" },
  ],
  nudge: "¿No sabés por dónde empezar?",
  nudgeLink: "Respondé el selector en 10 segundos",
};

export const experiencesIntro = {
  eyebrow: "Experiencias Chika",
  title: "Las experiencias",
  text: "Siete propuestas con lo que incluye cada una, su vigencia y su inversión de referencia.",
};

export const compare = {
  eyebrow: "Comparativa",
  title: "Compará las experiencias",
  subtitle: "Lo que incluye cada propuesta, en una sola vista.",

  columns: ["Experiencia", "Sesiones", "Vigencia", "Diagnóstico", "Corte", "Styling", "Kit para casa", "Inversión"],
  legend: [
    { sym: "●", label: "Incluye" },
    { sym: "—", label: "No aplica" },
    { sym: "○", label: "Por confirmar" },
  ],
  nudge: "¿Dudás entre dos? Te ayudamos a elegir en tu valoración.",
  cta: "Hablemos por WhatsApp",
};

export type Mark = "yes" | "na" | "tbc";

/** Filas de la comparación (catálogo, lámina 10). */
export const compareRows: {
  id: string;
  sessions: string;
  validity: string | null;
  diagnosis: Mark;
  cut: Mark;
  styling: Mark;
  kit: Mark;
}[] = [
  { id: "chika-kit", sessions: "1", validity: null, diagnosis: "yes", cut: "yes", styling: "yes", kit: "tbc" },
  { id: "chika-detox", sessions: "1", validity: null, diagnosis: "yes", cut: "tbc", styling: "yes", kit: "tbc" },
  { id: "chika-cirugia-capilar", sessions: "3", validity: "22 días", diagnosis: "yes", cut: "yes", styling: "yes", kit: "yes" },
  { id: "chika-wow", sessions: "4", validity: "3 meses", diagnosis: "tbc", cut: "tbc", styling: "yes", kit: "tbc" },
  { id: "chika-melena", sessions: "2 tratamientos", validity: "6 semanas", diagnosis: "yes", cut: "yes", styling: "yes", kit: "yes" },
  { id: "chika-curl-love", sessions: "1", validity: null, diagnosis: "yes", cut: "tbc", styling: "yes", kit: "yes" },
  { id: "chika-blow-club", sessions: "4", validity: "2 meses", diagnosis: "tbc", cut: "tbc", styling: "yes", kit: "tbc" },
];

export const selector = {
  title: "¿Cuál es para vos?",
  subtitle: "Marcá lo que te identifica y te sugerimos por dónde empezar.",
  empty: "Marcá una o más opciones para ver tu recomendación.",
  multiple: "Te identificás con más de una. Empezá por Chika Kit.",
  multipleSub: "En tu valoración confirmamos cuál es la indicada para vos.",
  questions: [
    { id: "q1", text: "¿No sabés qué necesita tu cabello?", answer: "no sé qué necesita mi cabello", result: "chika-kit" },
    { id: "q2", text: "¿Sentís acumulación o saturación?", answer: "siento acumulación o saturación", result: "chika-detox" },
    { id: "q3", text: "¿Está muy procesado, decolorado o elástico?", answer: "mi cabello está muy procesado, decolorado o elástico", result: "chika-cirugia-capilar" },
    { id: "q4", text: "¿Querés mantener los resultados de un químico?", answer: "quiero mantener los resultados de un químico", result: "chika-wow" },
    { id: "q5", text: "¿Tu cabello es natural y luce opaco o con frizz?", answer: "mi cabello es natural y luce opaco o con frizz", result: "chika-melena" },
    { id: "q6", text: "¿Tenés ondas o rizos?", answer: "tengo ondas o rizos", result: "chika-curl-love" },
    { id: "q7", text: "¿Querés mantener peinados o secados?", answer: "quiero mantener peinados o secados", result: "chika-blow-club" },
  ],
};

export const howItWorks = {
  eyebrow: "Cómo reservar",
  title: "Así empieza tu experiencia",
  steps: [
    { title: "Escribinos por WhatsApp", text: "Contanos cómo está tu cabello y qué te gustaría lograr." },
    { title: "Hacemos tu valoración", text: "Con capilógrafo digital revisamos hebra y cuero cabelludo para recomendarte la experiencia indicada." },
    { title: "Elegís tu experiencia", text: "Confirmamos el valor final, el horario y el beneficio vigente si elegís un paquete." },
  ],
  cta: "Cotizá o agendá por WhatsApp",
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  title: "Antes de escribirnos",
  items: [
    {
      q: "¿Cómo sé qué experiencia necesito?",
      a: "Respondé el selector «¿Cuál es para vos?» o escribinos por WhatsApp. Si te identificás con varias, te recomendamos empezar por Chika Kit: la valoración con capilógrafo confirma qué necesita tu cabello.",
    },
    {
      q: "¿El precio publicado es el final?",
      a: "Es una inversión de referencia. El valor final se confirma después de tu valoración. Si elegís un paquete, consultá por el beneficio vigente.",
    },
    {
      q: "¿Hay una experiencia para mi tipo de cabello?",
      a: "Sí. Chika Melena es para cabello natural o virgen, Chika Curl Love para ondas y rizos, y Chika Cirugía Capilar para cabellos decolorados, muy procesados o elásticos.",
    },
    {
      q: "¿Qué pasa después de escribir por WhatsApp?",
      a: "Te ayudamos a elegir la experiencia, coordinamos tu valoración y te confirmamos el horario y el valor final. Las citas están sujetas a disponibilidad de horarios.",
    },
    {
      q: "¿Los planes tienen vigencia?",
      a: "Sí. Chika Cirugía Capilar tiene vigencia de 22 días, Chika Wow de 3 meses, Chika Melena de 6 semanas y Chika Blow Club de 2 meses. Consultá las condiciones al reservar.",
    },
    {
      q: "¿Qué productos usan?",
      a: "Trabajamos con líneas profesionales de Davines, como Essential Haircare y Natural Tec. En varias experiencias te llevás productos para continuar el cuidado en casa.",
    },
  ],
};

export const finalCta = {
  title: "Agendá tu valoración y descubramos qué necesita tu cabello.",
  text: "Escribinos y te ayudamos a elegir. Primero hacemos tu valoración; después confirmamos el valor final y el beneficio vigente si elegís un paquete.",
  button: "Cotizá o agendá por WhatsApp",
  contactLabel: "Contacto",
  notes: [
    "Citas sujetas a disponibilidad de horarios.",
    "Cada experiencia tiene condiciones y vigencia propias; consultalas al reservar.",
  ],
  photo: {
    file: "chika-salon-ambiente.jpg",
    alt: "Interior de un salón de belleza luminoso (foto provisional)",
    brief: "Interior del salón con luz cálida, o manos profesionales peinando. Tono sereno, sin modelo mirando a cámara.",
  },
};
