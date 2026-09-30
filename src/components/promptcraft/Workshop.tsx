"use client";

import { useEffect, useRef, useState } from "react";
import { Chevron } from "./Chevron";
import { copyText } from "./copy";
import { renderPrompt } from "@/lib/promptcraft/render";
import { getTool } from "@/lib/promptcraft/tools";
import { ANSWER_MAX, type Answer, type EngineMode, type PromptResult, type Question, type ToolId } from "@/lib/promptcraft/types";
import { cn } from "@/lib/cn";

export type Stage = "idle" | "analyzing" | "asking" | "building" | "result" | "error";

export type WorkshopProps = {
  stage: Stage;
  idea: string;
  runTool: ToolId;
  questions: Question[];
  answers: Record<string, Answer>;
  index: number;
  result: PromptResult | null;
  mode: EngineMode | null;
  error: string | null;
  restored: boolean;
  onAnswer: (q: Question, value: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  onRetry: () => void;
  onReset: () => void;
};

const STEPS: { stage: Stage[]; label: string }[] = [
  { stage: ["analyzing"], label: "Análisis" },
  { stage: ["asking"], label: "Preguntas" },
  { stage: ["building", "result"], label: "Prompt" },
];

function Rail({ stage }: { stage: Stage }) {
  const current = STEPS.findIndex((s) => s.stage.includes(stage));
  return (
    <ol className="flex items-center gap-1" aria-label="Avance del taller">
      {STEPS.map((s, i) => (
        <li key={s.label} className="flex items-center gap-1" aria-current={i === current ? "step" : undefined}>
          <Chevron className="h-3 w-5" color={i <= current ? "var(--pc-ink)" : "rgb(17 17 17 / 0.2)"} />
          <span className={cn("pc-data", i <= current ? "text-ink" : "text-grey-data")}>{s.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function Workshop(p: WorkshopProps) {
  const tool = getTool(p.runTool);

  return (
    <div className="pc-on-paper">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b-2 border-ink pb-4">
        <div className="flex items-center gap-4">
          <span className="pc-data text-ink">04 / Taller</span>
          {p.stage !== "idle" && <Rail stage={p.stage} />}
        </div>
        <ModeBadge mode={p.mode} />
      </div>

      {p.restored && p.stage !== "idle" && (
        <p className="pc-data mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 bg-volt px-3 py-2 text-ink" role="status">
          Recuperamos tu última sesión.
          <button type="button" onClick={p.onReset} className="min-h-11 underline underline-offset-4">
            Empezar de nuevo
          </button>
        </p>
      )}

      {p.stage === "idle" && <Empty />}
      {(p.stage === "analyzing" || p.stage === "building") && (
        <Loading text={p.stage === "analyzing" ? "Analizando qué falta en tu idea" : "Armando el prompt"} />
      )}
      {p.stage === "error" && <ErrorPanel message={p.error} onRetry={p.onRetry} onReset={p.onReset} />}
      {p.stage === "asking" && <Asking {...p} toolName={tool.name} />}
      {p.stage === "result" && p.result && <Result {...p} result={p.result} toolName={tool.name} toolScope={tool.scope} />}
    </div>
  );
}

function ModeBadge({ mode }: { mode: EngineMode | null }) {
  if (!mode) return null;
  const demo = mode === "demo";
  return (
    <p
      className={cn("pc-data inline-flex items-center gap-2 px-3 py-1.5", demo ? "bg-ink text-volt" : "bg-volt text-ink")}
      title={demo ? "Sin API de IA configurada: el prompt se arma con reglas locales." : "Conectado a un modelo de IA desde el servidor."}
    >
      <span aria-hidden="true" className={cn("inline-block h-2 w-2", demo ? "bg-volt" : "bg-ink")} />
      {demo ? "Modo demo · sin IA" : "IA activa"}
    </p>
  );
}

function Empty() {
  return (
    <div className="grid gap-8 py-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div aria-hidden="true" className="pc-diagonals h-24 bg-ink bg-clip-border sm:h-32" style={{ backgroundColor: "var(--pc-ink)", backgroundImage: "repeating-linear-gradient(-58deg, #fff 0 6px, transparent 6px 16px)" }} />
      <div>
        <span className="pc-rule" />
        <h3 className="pc-display mt-4 text-3xl sm:text-5xl">Todavía no hay una idea.</h3>
        <p className="pc-body mt-4 max-w-md" style={{ color: "var(--pc-grey-body)" }}>
          Aquí aparecerán las preguntas que faltan y, al final, tu prompt. Empieza escribiendo la idea, aunque esté a medias.
        </p>
        <a href="#idea-input" className="pc-label mt-6 inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-paper">
          Escribir mi idea <Chevron className="h-3 w-5" />
        </a>
      </div>
    </div>
  );
}

function Loading({ text }: { text: string }) {
  return (
    <div className="py-16" role="status" aria-live="polite">
      <p className="pc-display text-3xl sm:text-5xl">{text}…</p>
      <div className="pc-loading-bar mt-6 max-w-xl" aria-hidden="true" />
      <p className="pc-data mt-3 text-grey-data" style={{ color: "var(--pc-grey-body)" }}>Un momento</p>
    </div>
  );
}

function ErrorPanel({ message, onRetry, onReset }: { message: string | null; onRetry: () => void; onReset: () => void }) {
  return (
    <div className="mt-10 bg-ink p-6 text-paper sm:p-10" role="alert">
      <p className="pc-data text-volt">Error</p>
      <p className="pc-display mt-3 text-3xl sm:text-4xl">No pudimos completar este paso.</p>
      <p className="pc-body mt-3 max-w-xl text-paper/80">{message ?? "Inténtalo de nuevo."}</p>
      <p className="pc-body mt-2 text-paper/60">Tu idea y tus respuestas siguen guardadas.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onRetry} className="pc-label min-h-12 bg-volt px-6 text-ink">Reintentar</button>
        <button type="button" onClick={onReset} className="pc-label min-h-12 border border-paper/50 px-6 text-paper">Empezar de nuevo</button>
      </div>
    </div>
  );
}

function Asking(p: WorkshopProps & { toolName: string }) {
  const q = p.questions[p.index];
  const total = p.questions.length;
  const value = p.answers[q.id]?.value ?? "";
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      ref.current?.focus({ preventScroll: true });
      ref.current?.scrollIntoView({ block: "center" });
    }
  }, [p.index]);

  function next() {
    if (!q.skippable && !value.trim()) {
      setError("Esta respuesta es necesaria para armar un buen prompt.");
      ref.current?.focus();
      return;
    }
    setError(null);
    p.onNext();
  }

  return (
    <div className="grid gap-10 py-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
      <aside className="order-2 lg:order-1">
        <p className="pc-data text-grey-data" style={{ color: "var(--pc-grey-body)" }}>Tu idea</p>
        <p className="pc-body mt-2 max-h-40 overflow-auto break-words border-l-2 border-volt pl-4 text-lg">{p.idea}</p>
        <p className="pc-data mt-6 text-grey-data" style={{ color: "var(--pc-grey-body)" }}>Destino</p>
        <p className="pc-display mt-1 text-2xl">{p.toolName}</p>
      </aside>

      <form
        className="order-1 lg:order-2"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="pc-data whitespace-nowrap" aria-live="polite">
            Pregunta {String(p.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={p.index + 1} aria-label="Progreso de preguntas">
            {p.questions.map((_, i) => (
              <span key={i} className={cn("h-[6px] w-5 sm:w-14", i <= p.index ? "bg-ink" : "bg-ink/15")} />
            ))}
          </div>
        </div>

        <span className="pc-rule mt-8" />
        <p className="pc-label mt-4 text-ink/70">{q.label}</p>
        <label htmlFor="answer" className="pc-display mt-2 block text-3xl sm:text-5xl">
          {q.question}
        </label>
        {q.hint && (
          <p id="answer-hint" className="pc-body mt-3" style={{ color: "var(--pc-grey-body)" }}>
            {q.hint}
          </p>
        )}

        <textarea
          key={q.id}
          id="answer"
          ref={ref}
          value={value}
          maxLength={ANSWER_MAX}
          onChange={(e) => {
            setError(null);
            p.onAnswer(q, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              next();
            }
          }}
          aria-describedby={`answer-hint${error ? " answer-error" : ""}`}
          aria-invalid={error ? true : undefined}
          aria-required={!q.skippable}
          className="pc-field mt-6 border-2 border-ink bg-paper text-ink"
          placeholder="Escribe tu respuesta…"
        />
        <div className="mt-2 flex items-start justify-between gap-4">
          <p id="answer-error" role="alert" className="pc-data min-h-5 bg-ink px-2 py-1 text-volt" hidden={!error}>
            {error}
          </p>
          <p className="pc-data ml-auto text-grey-data" style={{ color: "var(--pc-grey-body)" }}>
            {value.length}/{ANSWER_MAX}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={p.onBack} className="pc-label inline-flex min-h-12 items-center justify-center gap-2 border-2 border-ink px-5 text-ink">
            <Chevron direction="left" className="h-3 w-5" color="var(--pc-ink)" />
            {p.index === 0 ? "Editar idea" : "Atrás"}
          </button>
          {q.skippable && (
            <button type="button" onClick={p.onSkip} className="pc-label min-h-12 px-5 text-ink underline underline-offset-4">
              Omitir
            </button>
          )}
          <button type="submit" className="pc-label inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 text-paper sm:ml-auto">
            {p.index + 1 === total ? "Generar prompt" : "Continuar"}
            <Chevron className="h-3 w-5" />
          </button>
        </div>
        <p className="pc-data mt-4 hidden text-grey-data sm:block" style={{ color: "var(--pc-grey-body)" }}>Ctrl / ⌘ + Enter para continuar</p>
      </form>
    </div>
  );
}

function Result(p: WorkshopProps & { result: PromptResult; toolName: string; toolScope: string }) {
  const text = renderPrompt(p.result.sections);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  async function copy() {
    const ok = await copyText(text);
    setCopied(ok ? "ok" : "fail");
    window.setTimeout(() => setCopied("idle"), 2500);
  }

  const copyLabel = copied === "ok" ? "Copiado ✓" : copied === "fail" ? "No se pudo copiar" : "Copiar prompt";

  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button type="button" onClick={copy} className="pc-label inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 text-paper">
        {copyLabel} <Chevron className="h-3 w-5" />
      </button>
      <button type="button" onClick={p.onReset} className="pc-label inline-flex min-h-12 items-center justify-center border-2 border-ink px-7 text-ink">
        Empezar de nuevo
      </button>
    </div>
  );

  return (
    <div className="py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <span className="pc-rule" />
          <h3 className="pc-display mt-4 text-4xl sm:text-6xl">Tu prompt está listo.</h3>
          <p className="pc-data mt-4 flex flex-wrap gap-x-3 gap-y-1">
            <span className="bg-ink px-2 py-1 text-volt">Destino · {p.toolName}</span>
            <span className="py-1" style={{ color: "var(--pc-grey-body)" }}>{p.toolScope}</span>
          </p>
        </div>
        {actions}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{copied === "ok" ? "Prompt copiado al portapapeles" : ""}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        <pre
          tabIndex={0}
          aria-label="Prompt final"
          className="whitespace-pre-wrap break-words border-l-4 border-volt bg-ink p-5 text-paper sm:p-8"
          style={{ fontFamily: "var(--pc-font-mono)", fontSize: "0.9375rem", lineHeight: 1.75 }}
        >
          {text}
        </pre>

        <div className="space-y-10">
          <Notes title="Supuestos utilizados" empty="No se usaron supuestos: respondiste todo lo necesario." items={p.result.supuestos} />
          <Notes title="Información que mejoraría el resultado" empty="No detectamos vacíos importantes." items={p.result.mejoras} />
        </div>
      </div>

      <div className="mt-8">{actions}</div>
    </div>
  );
}

function Notes({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <section>
      <span className="pc-rule" />
      <h4 className="pc-label mt-3">{title}</h4>
      {items.length ? (
        <ul className="mt-3 divide-y divide-ink/15 border-t border-ink/15">
          {items.map((it, i) => (
            <li key={i} className="flex gap-3 py-3">
              <span className="pc-data shrink-0 pt-0.5" style={{ color: "var(--pc-grey-body)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span className="pc-body break-words">{it}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pc-body mt-3" style={{ color: "var(--pc-grey-body)" }}>{empty}</p>
      )}
    </section>
  );
}
