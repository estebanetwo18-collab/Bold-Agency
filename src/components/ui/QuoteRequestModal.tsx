"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-schema";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-grey-light bg-paper px-4 py-3 text-sm text-ink placeholder:text-grey/70 transition-colors focus:border-ink focus:outline-none";

export function QuoteRequestModal({
  serviceLabel,
  onClose,
}: {
  serviceLabel: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const renderedAt = useRef(0);
  const submissionId = useRef("");

  useEffect(() => {
    renderedAt.current = Date.now();
    submissionId.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const challenge = `Servicio de interés: ${serviceLabel}. ${brief}`.trim();

    const payload: LeadFormValues = {
      name,
      company,
      contact,
      businessType: "otro",
      challenge: challenge.length >= 10 ? challenge : `${challenge} (sin detalle adicional)`,
      budget: "no-seguro",
      consent: true,
      website: "",
      formRenderedAt: renderedAt.current,
      submissionId: submissionId.current,
      meta: {
        sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        utmSource: null,
        utmMedium: null,
        utmCampaign: null,
        utmTerm: null,
        utmContent: null,
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        submittedAtIso: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
      },
    };

    const parsed = leadFormSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los campos.");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("No se pudo enviar la solicitud.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  const whatsappHref = `https://wa.me/50672445642?text=${encodeURIComponent(
    `Hola BOLD, quiero cotizar: ${serviceLabel}. ${brief}`.trim(),
  )}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Cotizar ${serviceLabel}`}
      onClick={onClose}
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md border border-grey-light bg-paper p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-ink/60 hover:text-ink"
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 text-center"
            >
              <p className="font-display text-lg font-bold text-ink">¡Listo!</p>
              <p className="mt-2 text-sm text-grey">
                Recibimos tu solicitud de cotización para {serviceLabel}. Te contactamos pronto.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-ink underline underline-offset-4"
              >
                Cerrar
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
                Cotizar
              </p>
              <h3 className="font-display text-xl font-bold text-ink">{serviceLabel}</h3>
              <p className="text-sm text-grey">
                Este servicio se cotiza a la medida. Dejanos tus datos y un breve alcance.
              </p>

              <input
                required
                placeholder="Nombre completo"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                placeholder="Nombre del negocio"
                className={inputClass}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                required
                placeholder="WhatsApp o email"
                className={inputClass}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <textarea
                required
                rows={3}
                placeholder="Contanos brevemente el alcance del proyecto"
                className={cn(inputClass, "resize-none")}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
              />

              {error ? <p className="text-xs font-semibold text-[#B3261E]">{error}</p> : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-paper transition-colors duration-300 hover:bg-volt hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Enviando…" : "Enviar solicitud"}
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs font-semibold uppercase tracking-wide text-grey underline underline-offset-4 hover:text-ink"
              >
                o escribinos directo por WhatsApp
              </a>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
