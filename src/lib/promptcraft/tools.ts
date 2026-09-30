import type { ToolId } from "./types";

export type ToolDef = {
  id: ToolId;
  /** Texto del selector. */
  label: string;
  name: string;
  scope: string;
  /** Rol base que asume el prompt generado. */
  role: string;
  /** Formato de entrega típico del destino. */
  format: string;
  /** Tareas de cierre propias del destino. */
  tasks: string[];
  quality: string[];
};

export const TOOLS: ToolDef[] = [
  {
    id: "code",
    label: "Claude Code",
        name: "Claude Code",
    scope: "Código, debugging, QA, automatización y desarrollo.",
    role: "Ingeniero de software senior que trabaja dentro de un repositorio real, con criterio de revisión de código.",
    format:
      "Plan breve de cambios, luego los cambios en el repositorio y un resumen final con archivos tocados, comandos ejecutados y su resultado.",
    tasks: [
      "Inspecciona primero el repositorio: stack, convenciones, scripts y pruebas existentes. No asumas la arquitectura.",
      "Propón un plan corto antes de modificar archivos y señala los riesgos.",
      "Implementa el cambio mínimo necesario respetando el estilo del código circundante.",
      "Ejecuta lint, tipos y pruebas relevantes; corrige lo que falle antes de dar el trabajo por terminado.",
    ],
    quality: [
      "Los comandos de verificación (build, lint, pruebas) pasan y se reporta su salida real.",
      "El diff es acotado: sin refactors ni dependencias que no se pidieron.",
      "Nada queda sin verificar: lo que no se pudo probar se declara.",
    ],
  },
  {
    id: "design",
    label: "Claude Design",
        name: "Claude Design",
    scope: "Interfaces, branding, presentaciones y dirección visual.",
    role: "Director de arte y diseñador de producto con criterio editorial y dominio de sistemas visuales.",
    format:
      "Propuesta visual descrita por secciones: composición, jerarquía tipográfica, paleta con códigos, recursos gráficos y estados de interacción.",
    tasks: [
      "Define la jerarquía visual y la retícula antes de decorar.",
      "Especifica paleta exacta, tipografías, pesos y escala.",
      "Describe los estados interactivos y cómo se comporta el diseño en móvil y escritorio.",
      "Señala qué recursos gráficos se usan y cuáles quedan fuera a propósito.",
    ],
    quality: [
      "El resultado se reconoce como de la marca y no como una plantilla genérica.",
      "Contraste legible y foco visible en todos los elementos interactivos.",
      "Cada decisión visual tiene una razón que se puede explicar en una frase.",
    ],
  },
  {
    id: "cowork",
    label: "Claude Cowork",
        name: "Claude Cowork",
    scope: "Documentos, archivos, análisis y flujos de trabajo.",
    role: "Analista y asistente operativo que trabaja sobre documentos y archivos del usuario, con rigor y trazabilidad.",
    format:
      "Entregable en el formato pedido (documento, tabla o resumen), más una nota con las fuentes usadas y los supuestos.",
    tasks: [
      "Lee todos los archivos indicados antes de responder y lista cuáles usaste.",
      "Extrae los datos relevantes y señala inconsistencias o vacíos.",
      "Produce el entregable en el formato solicitado, sin inventar datos que no estén en los archivos.",
      "Cierra con los siguientes pasos recomendados.",
    ],
    quality: [
      "Cada cifra o afirmación puede rastrearse a un archivo o fuente.",
      "Las inconsistencias se reportan, no se ocultan.",
      "El entregable se puede usar tal cual, sin reescritura.",
    ],
  },
  {
    id: "general",
    label: "Prompt general",
        name: "Prompt general",
    scope: "Redacción, análisis, planificación y creatividad.",
    role: "Consultor estratégico y redactor experto en el tema de la solicitud.",
    format:
      "Respuesta estructurada con títulos cortos, lenguaje directo y una recomendación clara al final.",
    tasks: [
      "Resume en una frase cómo entendiste la solicitud.",
      "Desarrolla la respuesta por partes, de lo más importante a lo accesorio.",
      "Da ejemplos concretos en lugar de generalidades.",
      "Cierra con una recomendación y el siguiente paso.",
    ],
    quality: [
      "Responde exactamente lo pedido, sin relleno.",
      "Ejemplos específicos y accionables.",
      "Tono y nivel de detalle acordes al público indicado.",
    ],
  },
  {
    id: "auto",
    label: "No estoy seguro",
        name: "Prompt general",
    scope: "Redacción, análisis, planificación y creatividad.",
    role: "Consultor estratégico y redactor experto en el tema de la solicitud.",
    format:
      "Respuesta estructurada con títulos cortos, lenguaje directo y una recomendación clara al final.",
    tasks: [
      "Resume en una frase cómo entendiste la solicitud.",
      "Desarrolla la respuesta por partes, de lo más importante a lo accesorio.",
      "Da ejemplos concretos en lugar de generalidades.",
      "Cierra con una recomendación y el siguiente paso.",
    ],
    quality: [
      "Responde exactamente lo pedido, sin relleno.",
      "Ejemplos específicos y accionables.",
      "Tono y nivel de detalle acordes al público indicado.",
    ],
  },
];

export const getTool = (id: ToolId): ToolDef =>
  TOOLS.find((t) => t.id === id) ?? TOOLS[3];
