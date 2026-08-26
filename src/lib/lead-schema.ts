import { z } from "zod";

/**
 * Fuente única de verdad para el formulario de Diagnóstico 360.
 * Se usa tanto en el cliente (feedback inmediato) como en el servidor
 * (la validación real: nunca confiar solo en el cliente).
 */

export const BUSINESS_TYPES = [
  { value: "comercio", label: "Comercio / retail" },
  { value: "servicios", label: "Servicios profesionales" },
  { value: "salud", label: "Salud y bienestar" },
  { value: "alimentos", label: "Alimentos y bebidas" },
  { value: "construccion", label: "Construcción e inmobiliaria" },
  { value: "manufactura", label: "Manufactura / industria" },
  { value: "educacion", label: "Educación y formación" },
  { value: "tecnologia", label: "Tecnología / software" },
  { value: "otro", label: "Otro" },
] as const;

export const BUDGET_RANGES = [
  { value: "menos-1000", label: "Menos de USD 1,000/mes" },
  { value: "1000-3000", label: "USD 1,000 – 3,000/mes" },
  { value: "3000-6000", label: "USD 3,000 – 6,000/mes" },
  { value: "6000-mas", label: "Más de USD 6,000/mes" },
  { value: "no-seguro", label: "Aún no lo tengo claro" },
] as const;

const businessTypeValues = BUSINESS_TYPES.map((b) => b.value) as [
  string,
  ...string[],
];
const budgetValues = BUDGET_RANGES.map((b) => b.value) as [
  string,
  ...string[],
];

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre completo.")
    .max(120, "El nombre es demasiado largo."),
  company: z
    .string()
    .trim()
    .min(2, "Escribe el nombre de tu negocio.")
    .max(160, "El nombre del negocio es demasiado largo."),
  contact: z
    .string()
    .trim()
    .min(6, "Escribe un WhatsApp o email válido.")
    .max(160, "El contacto es demasiado largo.")
    .refine((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const digits = value.replace(/[^0-9]/g, "");
      const isPhone = digits.length >= 8;
      return isEmail || isPhone;
    }, "Escribe un WhatsApp (con código de país) o un email válido."),
  businessType: z.enum(businessTypeValues, {
    message: "Selecciona el tipo de negocio.",
  }),
  challenge: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más sobre el desafío (mínimo 10 caracteres).")
    .max(600, "Resúmelo en menos de 600 caracteres."),
  budget: z.enum(budgetValues, {
    message: "Selecciona un rango de presupuesto.",
  }),
  consent: z.literal(true, {
    message: "Necesitamos tu autorización para contactarte.",
  }),
  // Honeypot: debe llegar vacío. Si un bot lo llena, se descarta en silencio.
  website: z.string().max(0).optional().or(z.literal("")),
  // Anti-bot por tiempo: milisegundos desde que se montó el formulario.
  formRenderedAt: z.number().int().nonnegative(),
  // Idempotencia: mismo UUID -> mismo envío, se ignora si ya se procesó.
  submissionId: z.string().uuid(),
  meta: z.object({
    sourceUrl: z.string().max(2048),
    utmSource: z.string().max(200).nullable(),
    utmMedium: z.string().max(200).nullable(),
    utmCampaign: z.string().max(200).nullable(),
    utmTerm: z.string().max(200).nullable(),
    utmContent: z.string().max(200).nullable(),
    referrer: z.string().max(2048).nullable(),
    submittedAtIso: z.string().max(64),
    timezone: z.string().max(100).nullable(),
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadFormDefaultValues = {
  name: "",
  company: "",
  contact: "",
  businessType: "" as unknown as LeadFormValues["businessType"],
  challenge: "",
  budget: "" as unknown as LeadFormValues["budget"],
  consent: false as unknown as true,
  website: "",
};
