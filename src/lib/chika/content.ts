/** Textos de la landing que no pertenecen a una experiencia concreta. */

export const nav = {
  links: [
    { href: "#experiencias", label: "Experiencias" },
    { href: "#comparar", label: "Comparar" },
    { href: "#chika-kit", label: "Diagnóstico" },
  ],
  cta: "Agendá tu cita",
  ctaShort: "Reservar",
};

export const partner = {
  label: "Trabajamos con productos profesionales",
};

export const marquee = ["Diagnóstico capilar", "Detox", "Cirugía capilar", "Mantenimiento", "Melena natural", "Curl Love", "Blow Club"];

export const hero = {
  eyebrow: "Colección de experiencias capilares",
  lead: "Tu cabello tiene una historia.",
  follow: "Empecemos por entenderla.",
  cta: "Agendá tu diagnóstico",
  secondary: "Ver experiencias",
  text: "Diagnóstico con capilógrafo digital y tratamientos según lo que tu cabello necesita hoy.",
  index: ["Diagnóstico", "Detox", "Reparación", "Mantenimiento"],
  photoAlt: "Cabello castaño con reflejos dorados en ondas largas, visto de espalda",
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
  nudge: "¿No sabés por dónde empezar? Empezá por el diagnóstico.",
};

export const experiencesIntro = {
  eyebrow: "Experiencias Chika",
  title: "Las experiencias",
  text: "Siete propuestas con lo que incluye cada una, su vigencia y su inversión.",
};

export const compare = {
  eyebrow: "Inversión",
  title: "Compará las experiencias",
  subtitle: "Lo que incluye cada propuesta, en una sola vista.",
  detailTitle: "Qué incluye cada una",
  columns: ["Experiencia", "Sesiones", "Vigencia", "Diagnóstico", "Corte", "Styling", "Kit para casa", "Inversión"],
  legend: [
    { sym: "●", label: "Incluye" },
    { sym: "—", label: "No aplica" },
    { sym: "○", label: "Por confirmar" },
  ],
  nudge: "¿Dudás entre dos? Te ayudamos a elegir en tu diagnóstico.",
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
  multipleSub: "En el diagnóstico confirmamos cuál es la indicada para vos.",
  questions: [
    { id: "q1", text: "¿No sabés qué necesita tu cabello?", result: "chika-kit" },
    { id: "q2", text: "¿Sentís acumulación o saturación?", result: "chika-detox" },
    { id: "q3", text: "¿Está muy procesado, decolorado o elástico?", result: "chika-cirugia-capilar" },
    { id: "q4", text: "¿Querés mantener los resultados de un químico?", result: "chika-wow" },
    { id: "q5", text: "¿Tu cabello es natural y luce opaco o con frizz?", result: "chika-melena" },
    { id: "q6", text: "¿Tenés ondas o rizos?", result: "chika-curl-love" },
    { id: "q7", text: "¿Querés mantener peinados o secados?", result: "chika-blow-club" },
  ],
};

export const finalCta = {
  title: "Agendá tu diagnóstico y descubramos qué necesita tu cabello.",
  text: "Nuestro equipo te ayuda a confirmar en salón cuál es la experiencia indicada para tu cabello.",
  button: "Reservar por WhatsApp",
  message: "Hola, quiero agendar mi diagnóstico capilar en Chika.",
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
