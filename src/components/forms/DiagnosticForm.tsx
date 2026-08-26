"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BUDGET_RANGES,
  BUSINESS_TYPES,
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/lead-schema";
import { diagnosticForm } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type FieldErrors = Partial<Record<keyof typeof rawDefaults, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const rawDefaults = {
  name: "",
  company: "",
  contact: "",
  businessType: "",
  challenge: "",
  budget: "",
  consent: false,
  website: "",
};

function getUtmMeta() {
  if (typeof window === "undefined") {
    return {
      sourceUrl: "",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      referrer: null,
      timezone: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    sourceUrl: window.location.href,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
    referrer: document.referrer || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
  };
}

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function DiagnosticForm() {
  const [values, setValues] = useState(rawDefaults);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const renderedAt = useRef(0);
  const submissionId = useRef("");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    renderedAt.current = Date.now();
    submissionId.current = createSubmissionId();
  }, []);

  const inputClass =
    "w-full rounded-xl border border-grey-light bg-paper px-4 py-3.5 text-ink placeholder:text-grey/70 transition-colors focus:border-ink focus:outline-none";

  function updateField<K extends keyof typeof rawDefaults>(
    field: K,
    value: (typeof rawDefaults)[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const payload: LeadFormValues = {
      name: values.name,
      company: values.company,
      contact: values.contact,
      businessType: values.businessType as LeadFormValues["businessType"],
      challenge: values.challenge,
      budget: values.budget as LeadFormValues["budget"],
      consent: values.consent as true,
      website: values.website,
      formRenderedAt: renderedAt.current,
      submissionId: submissionId.current,
      meta: {
        ...getUtmMeta(),
        submittedAtIso: new Date().toISOString(),
      },
    };

    const parsed = leadFormSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "No se pudo enviar la solicitud.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  function handleReset() {
    setValues(rawDefaults);
    setErrors({});
    setServerError(null);
    setStatus("idle");
    renderedAt.current = Date.now();
    submissionId.current = createSubmissionId();
  }

  return (
    <div className="relative rounded-[2rem] border border-grey-light bg-paper p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-volt">
              <CheckMark />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-ink">
              {diagnosticForm.successTitle}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-grey">
              {diagnosticForm.successBody}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-8 font-display text-sm font-bold uppercase tracking-wide text-ink underline underline-offset-4"
            >
              Enviar otra solicitud
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Honeypot anti-spam: invisible para personas, visible para bots */}
            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">No completar este campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nombre completo" htmlFor="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>

              <Field label="Nombre del negocio" htmlFor="company" error={errors.company}>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={inputClass}
                  value={values.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  aria-invalid={Boolean(errors.company)}
                />
              </Field>
            </div>

            <Field
              label="WhatsApp o email"
              htmlFor="contact"
              error={errors.contact}
              hint="Con código de país si es WhatsApp."
            >
              <input
                id="contact"
                name="contact"
                type="text"
                autoComplete="tel"
                className={inputClass}
                value={values.contact}
                onChange={(e) => updateField("contact", e.target.value)}
                aria-invalid={Boolean(errors.contact)}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Tipo de negocio" htmlFor="businessType" error={errors.businessType}>
                <select
                  id="businessType"
                  name="businessType"
                  className={inputClass}
                  value={values.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                  aria-invalid={Boolean(errors.businessType)}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {BUSINESS_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Presupuesto mensual aproximado"
                htmlFor="budget"
                error={errors.budget}
              >
                <select
                  id="budget"
                  name="budget"
                  className={inputClass}
                  value={values.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  aria-invalid={Boolean(errors.budget)}
                >
                  <option value="" disabled>
                    Selecciona un rango
                  </option>
                  {BUDGET_RANGES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              label="¿Cuál es tu principal desafío hoy?"
              htmlFor="challenge"
              error={errors.challenge}
            >
              <textarea
                id="challenge"
                name="challenge"
                rows={4}
                className={cn(inputClass, "resize-none")}
                value={values.challenge}
                onChange={(e) => updateField("challenge", e.target.value)}
                aria-invalid={Boolean(errors.challenge)}
              />
            </Field>

            <label className="flex items-start gap-3 text-sm text-grey">
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-ink"
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                Autorizo a BOLD Agency a contactarme por WhatsApp o email para
                coordinar mi Diagnóstico 360.
              </span>
            </label>
            {errors.consent ? <ErrorText>{errors.consent}</ErrorText> : null}

            {status === "error" ? (
              <div className="rounded-xl border border-ink/15 bg-grey-light/30 p-4 text-sm">
                <p className="font-display font-bold text-ink">
                  {diagnosticForm.errorTitle}
                </p>
                <p className="mt-1 text-grey">
                  {serverError ?? diagnosticForm.errorBody}
                </p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-paper transition-colors duration-300 hover:bg-volt hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Enviando…" : "Solicitar Diagnóstico 360"}
            </button>
            <p className="text-center text-xs text-grey">
              No compartimos tu información. Solo la usamos para preparar tu diagnóstico.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-display text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <span className="text-xs text-grey">{hint}</span> : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold text-[#B3261E]">{children}</span>;
}

function CheckMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5L10 17.5L19 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
