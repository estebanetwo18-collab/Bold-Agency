"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-schema";
import { BILL_RANGE_OPTIONS, CONTACT_INTEREST_OPTIONS } from "@/lib/content";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const rawDefaults = {
  name: "",
  phone: "",
  location: "",
  billRange: "",
  interest: "",
  website: "",
};

type FieldErrors = Partial<Record<keyof typeof rawDefaults, string>>;

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ContactForm() {
  const [values, setValues] = useState(rawDefaults);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const renderedAt = useRef(0);
  const submissionId = useRef("");

  useEffect(() => {
    renderedAt.current = Date.now();
    submissionId.current = createSubmissionId();
  }, []);

  const inputClass =
    "w-full rounded-xl border border-green/25 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/50 transition-colors focus:border-gold focus:outline-none";

  function updateField<K extends keyof typeof rawDefaults>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const payload: LeadFormValues = {
      name: values.name,
      phone: values.phone,
      location: values.location,
      billRange: values.billRange as LeadFormValues["billRange"],
      interest: values.interest as LeadFormValues["interest"],
      website: values.website,
      formRenderedAt: renderedAt.current,
      submissionId: submissionId.current,
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

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-green/20 bg-white p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-cream">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-forest">Recibimos tu solicitud</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Te vamos a contactar por teléfono o WhatsApp para revisar tu caso — esto no es una cotización
          automática, es el primer paso para preparar una real.
        </p>
        <button type="button" onClick={handleReset} className="mt-6 text-sm font-bold text-green underline">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5 rounded-3xl border border-green/20 bg-white p-6 sm:p-8"
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" htmlFor="name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </Field>
        <Field label="Teléfono / WhatsApp" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Ubicación" htmlFor="location" error={errors.location} hint="Distrito o cantón — nos ayuda a estimar la irradiancia de tu zona.">
        <input
          id="location"
          type="text"
          className={inputClass}
          value={values.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Rango de tu factura mensual" htmlFor="billRange" error={errors.billRange}>
          <select
            id="billRange"
            className={inputClass}
            value={values.billRange}
            onChange={(e) => updateField("billRange", e.target.value)}
          >
            <option value="" disabled>
              Selecciona un rango
            </option>
            {BILL_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="¿Qué te interesa?" htmlFor="interest" error={errors.interest}>
          <select
            id="interest"
            className={inputClass}
            value={values.interest}
            onChange={(e) => updateField("interest", e.target.value)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {CONTACT_INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {serverError ?? "No pudimos enviar tu solicitud. Intenta de nuevo."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-1 inline-flex items-center justify-center rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-green disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {status === "submitting" ? "Enviando…" : "Solicitar contacto"}
      </button>
      <p className="text-center text-xs text-ink-soft/60">
        Esto no genera una cotización automática — es el primer paso para preparar una real, con tu
        factura eléctrica.
      </p>
    </form>
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
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-bold text-forest">
        {label}
      </label>
      {children}
      {hint && !error ? <span className="text-xs text-ink-soft/60">{hint}</span> : null}
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
    </div>
  );
}
