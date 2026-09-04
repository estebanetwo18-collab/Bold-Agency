import { z } from "zod";
import { BILL_RANGE_OPTIONS, CONTACT_INTEREST_OPTIONS } from "@/lib/content";

const billRangeValues = BILL_RANGE_OPTIONS.map((b) => b.value) as [string, ...string[]];
const interestValues = CONTACT_INTEREST_OPTIONS.map((i) => i.value) as [string, ...string[]];

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(120, "El nombre es demasiado largo."),
  phone: z
    .string()
    .trim()
    .min(8, "Escribe un teléfono válido.")
    .max(30, "El teléfono es demasiado largo."),
  location: z.string().trim().min(2, "Escribe tu ubicación.").max(160, "La ubicación es demasiado larga."),
  billRange: z.enum(billRangeValues, { message: "Selecciona un rango de factura." }),
  interest: z.enum(interestValues, { message: "Selecciona qué te interesa." }),
  // Honeypot: debe llegar vacío. Si un bot lo llena, se descarta en silencio.
  website: z.string().max(0).optional().or(z.literal("")),
  // Anti-bot por tiempo: milisegundos desde que se montó el formulario.
  formRenderedAt: z.number().int().nonnegative(),
  submissionId: z.string().uuid(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadFormDefaultValues = {
  name: "",
  phone: "",
  location: "",
  billRange: "" as unknown as LeadFormValues["billRange"],
  interest: "" as unknown as LeadFormValues["interest"],
  website: "",
};
