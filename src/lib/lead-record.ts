import type { LeadFormValues } from "@/lib/lead-schema";

/**
 * Forma final de un lead ya lista para escribirse como fila (Excel Online,
 * un CRM, o el respaldo local). Mantenerla plana facilita mapearla 1:1 a
 * columnas de una tabla.
 */
export type LeadRecord = {
  submissionId: string;
  receivedAtIso: string;
  name: string;
  company: string;
  contact: string;
  businessType: string;
  challenge: string;
  budget: string;
  consent: boolean;
  sourceUrl: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  timezone: string | null;
  submittedAtIso: string;
  status: "nuevo";
};

export function toLeadRecord(values: LeadFormValues): LeadRecord {
  return {
    submissionId: values.submissionId,
    receivedAtIso: new Date().toISOString(),
    name: values.name,
    company: values.company,
    contact: values.contact,
    businessType: values.businessType,
    challenge: values.challenge,
    budget: values.budget,
    consent: values.consent,
    sourceUrl: values.meta.sourceUrl,
    utmSource: values.meta.utmSource,
    utmMedium: values.meta.utmMedium,
    utmCampaign: values.meta.utmCampaign,
    utmTerm: values.meta.utmTerm,
    utmContent: values.meta.utmContent,
    referrer: values.meta.referrer,
    timezone: values.meta.timezone,
    submittedAtIso: values.meta.submittedAtIso,
    status: "nuevo",
  };
}
