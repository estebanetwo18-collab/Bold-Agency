import type { LeadFormValues } from "@/lib/lead-schema";

/**
 * Forma final de un lead ya lista para escribirse como fila (webhook / CRM
 * / respaldo local). Mantenerla plana facilita mapearla 1:1 a columnas.
 */
export type LeadRecord = {
  submissionId: string;
  receivedAtIso: string;
  name: string;
  phone: string;
  location: string;
  billRange: string;
  interest: string;
  status: "nuevo";
};

export function toLeadRecord(values: LeadFormValues): LeadRecord {
  return {
    submissionId: values.submissionId,
    receivedAtIso: new Date().toISOString(),
    name: values.name,
    phone: values.phone,
    location: values.location,
    billRange: values.billRange,
    interest: values.interest,
    status: "nuevo",
  };
}
