"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chevron } from "./Chevron";
import { copyText } from "./copy";
import { fetchMode, fetchPrompt, fetchQuestions, ServiceError } from "@/lib/promptcraft/service";
import { renderPrompt } from "@/lib/promptcraft/render";
import { TOOLS, getTool } from "@/lib/promptcraft/tools";
import {
  ANSWER_MAX,
  IDEA_MAX,
  IDEA_MIN,
  type Answer,
  type EngineMode,
  type PromptResult,
  type Question,
  type ToolId,
} from "@/lib/promptcraft/types";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "promptcraft:session:v2";
const EXAMPLES = ["Quiero crear una página web", "Necesito revisar mi código", "Quiero diseñar una presentación"];

type Stage = "idle" | "analyzing" | "asking" | "building" | "result" | "error";

type Saved = {
  idea: string;
  tool: ToolId;
  stage: "idle" | "asking" | "result";
  questions: Question[];
  answers: Record<string, Answer>;
  index: number;
  result: PromptResult | null;
  mode: EngineMode | null;
};

const btnBase = "pc-label inline-flex min-h-14 items-center justify-center gap-3 px-6 text-sm tracking-[0.2em]";

export function PromptCraftApp() {
  const [idea, setIdea] = useState("");
  const [tool, setTool] = useState<ToolId>("auto");
  const [stage, setStage] = useState<Stage>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [mode, setMode] = useState<EngineMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState<"questions" | "build">("questions");
  const [hint, setHint] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [help, setHelp] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const runId = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const userMoved = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        if (s && typeof s.idea === "string") {
          /* eslint-disable react-hooks/set-state-in-effect */
          setIdea(s.idea);
          setTool(s.tool);
          setStage(s.stage);
          setQuestions(s.questions);
          setAnswers(s.answers);
          setIndex(s.index);
          setResult(s.result);
          setMode(s.mode);
          setRestored(s.stage !== "idle");
          /* eslint-enable react-hooks/set-state-in-effect */
        }
      }
    } catch {
      /* sin localStorage: todo sigue funcionando. */
    }
    setHydrated(true);
    fetchMode().then((m) => setMode((prev) => prev ?? m.mode)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const persist = stage === "asking" || stage === "result" ? stage : "idle";
    try {
      if (!idea.trim() && persist === "idle") localStorage.removeItem(STORAGE_KEY);
      else
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ idea, tool, stage: persist, questions, answers, index, result, mode } satisfies Saved),
        );
    } catch {
      /* cuota o modo privado */
    }
  }, [hydrated, idea, tool, stage, questions, answers, index, result, mode]);

  // Mueve el foco al nuevo momento de la conversación (solo tras una acción del usuario).
  useEffect(() => {
    if (!userMoved.current) return;
    if (stage === "asking") {
      answerRef.current?.focus({ preventScroll: true });
      answerRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    } else if (stage === "result" || stage === "error" || stage === "analyzing") {
      headingRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stage, index]);

  const build = useCallback(async (qs: Question[], ans: Record<string, Answer>, t: ToolId, text: string, id: number) => {
    setStage("building");
    setRetry("build");
    try {
      const res = await fetchPrompt(text, t, qs, qs.map((q) => ans[q.id] ?? { questionId: q.id, value: "", skipped: true }));
      if (id !== runId.current) return;
      setResult(res.result);
      setMode(res.mode);
      setStage("result");
    } catch (e) {
      if (id !== runId.current) return;
      setError(e instanceof ServiceError ? e.message : "Algo no salió como esperaba.");
      setStage("error");
    }
  }, []);

  const analyze = useCallback(async (text: string, t: ToolId, id: number) => {
    setStage("analyzing");
    setRetry("questions");
    try {
      const res = await fetchQuestions(text, t);
      if (id !== runId.current) return;
      setMode(res.mode);
      setQuestions(res.questions);
      setIndex(0);
      if (res.questions.length === 0) await build([], {}, t, text, id);
      else setStage("asking");
    } catch (e) {
      if (id !== runId.current) return;
      setError(e instanceof ServiceError ? e.message : "Algo no salió como esperaba.");
      setStage("error");
    }
  }, [build]);

  function submitIdea(e: React.FormEvent) {
    e.preventDefault();
    const text = idea.trim();
    if (!text) return setHint("Cuéntame qué quieres hacer, aunque sea en una frase.");
    if (text.length < IDEA_MIN) return setHint("Cuéntame un poquito más para poder ayudarte.");
    userMoved.current = true;
    setHint(null);
    setError(null);
    setRestored(false);
    setAnswers({});
    setResult(null);
    void analyze(text, tool, ++runId.current);
  }

  function finishOrNext(ans: Record<string, Answer>) {
    setHint(null);
    if (index + 1 >= questions.length) void build(questions, ans, tool, idea.trim(), ++runId.current);
    else setIndex(index + 1);
  }

  function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    const q = questions[index];
    if (!answers[q.id]?.value.trim()) {
      setHint("Escribe lo que se te ocurra, o elige «No estoy seguro» y seguimos.");
      answerRef.current?.focus();
      return;
    }
    finishOrNext(answers);
  }

  function skip() {
    const q = questions[index];
    const next = { ...answers, [q.id]: { questionId: q.id, value: "", skipped: true } };
    setAnswers(next);
    finishOrNext(next);
  }

  function back() {
    setHint(null);
    if (index === 0) editIdea();
    else setIndex(index - 1);
  }

  function editIdea() {
    runId.current++;
    setStage("idle");
    setRestored(false);
  }

  function editAnswers() {
    userMoved.current = true;
    setIndex(0);
    setHint(null);
    setStage("asking");
  }

  function reset() {
    userMoved.current = true;
    runId.current++;
    setIdea("");
    setHint(null);
    setStage("idle");
    setQuestions([]);
    setAnswers({});
    setIndex(0);
    setResult(null);
    setError(null);
    setRestored(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retryLast() {
    setError(null);
    const id = ++runId.current;
    if (retry === "questions") void analyze(idea.trim(), tool, id);
    else void build(questions, answers, tool, idea.trim(), id);
  }

  const text = result ? renderPrompt(result.sections) : "";
  async function copy() {
    const ok = await copyText(text);
    setCopied(ok ? "ok" : "fail");
    window.setTimeout(() => setCopied("idle"), 2500);
  }
  const copyLabel = copied === "ok" ? "Copiado ✓" : copied === "fail" ? "Selecciona y copia" : "Copiar prompt";

  const q = questions[index];
  const loading = stage === "analyzing" || stage === "building";

  return (
    <div className="pc-on-paper flex min-h-dvh flex-col bg-paper">
      <header className="bg-ink text-paper">
        <div className="pc-wrap flex h-14 items-center justify-between gap-4">
          <Link href="/promptcraft" onClick={() => stage !== "idle" && reset()} className="flex items-baseline gap-3" aria-label="PromptCraft, empezar de nuevo">
            <span className="pc-display text-xl">PromptCraft</span>
            <span className="pc-agency hidden whitespace-nowrap text-[0.5rem] min-[420px]:inline">BOLD Agency</span>
          </Link>
          <button
            type="button"
            onClick={() => setHelp((v) => !v)}
            aria-expanded={help}
            aria-controls="como-funciona"
            className="pc-data flex min-h-11 items-center gap-2 whitespace-nowrap text-paper/80 hover:text-volt"
          >
            <Chevron direction={help ? "down" : "right"} className="h-2.5 w-4" />
            Cómo funciona
          </button>
        </div>
        {help && (
          <div id="como-funciona" className="border-t border-paper/15 bg-volt text-ink">
            <div className="pc-wrap flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-8">
              <p className="pc-body text-base"><strong className="font-bold">1.</strong> Cuéntame tu idea.</p>
              <p className="pc-body text-base"><strong className="font-bold">2.</strong> Te pregunto solo lo que falte (3 preguntas como máximo).</p>
              <p className="pc-body text-base"><strong className="font-bold">3.</strong> Copias tu prompt y lo pegas en la IA.</p>
              <button type="button" onClick={() => setHelp(false)} className="pc-label min-h-11 underline underline-offset-4 sm:ml-auto">Entendido</button>
            </div>
          </div>
        )}
      </header>

      <main id="main" className="relative flex-1 overflow-hidden">
        <div aria-hidden="true" className="pc-diagonals pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-10 [mask-image:linear-gradient(225deg,black,transparent_70%)] sm:h-48 sm:w-48" style={{ backgroundImage: "repeating-linear-gradient(-58deg, #111 0 4px, transparent 4px 14px)" }} />

        <div className="relative mx-auto w-full max-w-3xl px-[var(--pc-gutter)] pb-16 pt-8 sm:pt-14">
          {restored && stage !== "idle" && (
            <p className="pc-data mb-6 flex flex-wrap items-center gap-x-4 bg-volt px-3 py-1 text-ink" role="status">
              Retomamos donde lo dejaste.
              <button type="button" onClick={reset} className="min-h-11 underline underline-offset-4">Empezar de nuevo</button>
            </p>
          )}

          {stage === "idle" && (
            <form onSubmit={submitIdea} noValidate>
              <p className="pc-label flex items-center gap-3">
                <Chevron className="h-3 w-5" color="var(--pc-ink)" /> No necesitas saber cómo escribir un prompt
              </p>
              <h1 ref={headingRef} tabIndex={-1} className="pc-display mt-5 text-[clamp(2.5rem,10vw,4.75rem)] outline-none">
                ¿Qué quieres lograr?
              </h1>
              <span className="pc-rule mt-5" />
              <p className="pc-body mt-4 max-w-lg text-base sm:mt-5 sm:text-xl" style={{ color: "var(--pc-grey-body)" }}>
                Escríbelo como se lo contarías a una persona. Yo te ayudo a convertirlo en un prompt claro.
              </p>

              <label htmlFor="idea" className="sr-only">Cuéntame qué quieres hacer</label>
              <textarea
                id="idea"
                value={idea}
                maxLength={IDEA_MAX}
                onChange={(e) => {
                  setIdea(e.target.value);
                  if (hint) setHint(null);
                }}
                aria-invalid={hint ? true : undefined}
                aria-describedby={hint ? "idea-hint" : undefined}
                placeholder="Cuéntame qué quieres hacer…"
                className="pc-field mt-6 min-h-32 border-2 border-ink bg-paper text-lg text-ink sm:min-h-36"
              />
              <p id="idea-hint" role="alert" hidden={!hint} className="pc-body mt-2 border-l-4 border-ink bg-volt px-3 py-2 text-base text-ink">
                {hint}
              </p>

              <fieldset className="mt-5">
                <legend className="pc-label">¿Dónde lo vas a usar? <span className="font-light normal-case tracking-normal" style={{ color: "var(--pc-grey-body)" }}>(opcional)</span></legend>
                <div role="radiogroup" aria-label="Destino del prompt" className="mt-3 flex flex-wrap gap-2">
                  {TOOLS.map((t, i) => {
                    const on = tool === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        onClick={() => setTool(t.id)}
                        onKeyDown={(e) => {
                          const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                          if (!step) return;
                          e.preventDefault();
                          const n = (i + step + TOOLS.length) % TOOLS.length;
                          setTool(TOOLS[n].id);
                          (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                        }}
                        className={cn(
                          "min-h-11 border-2 px-4 font-bold text-[0.95rem]",
                          on ? "border-ink bg-volt text-ink" : "border-ink/30 text-ink hover:border-ink",
                        )}
                        title={t.scope}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <button type="submit" className={cn(btnBase, "mt-6 w-full bg-ink text-paper sm:w-auto sm:px-10")}>
                Ayúdame a convertirlo <Chevron className="h-3.5 w-6" />
              </button>

              <div className="mt-10 border-t border-ink/20 pt-5">
                <p className="pc-data" style={{ color: "var(--pc-grey-body)" }}>¿Sin ideas? Prueba con</p>
                <ul className="mt-2 flex flex-col items-start">
                  {EXAMPLES.map((ex) => (
                    <li key={ex}>
                      <button
                        type="button"
                        onClick={() => {
                          setIdea(ex);
                          setHint(null);
                          document.getElementById("idea")?.focus();
                        }}
                        className="pc-body min-h-11 text-left text-lg underline decoration-volt decoration-2 underline-offset-4 hover:bg-volt"
                      >
                        {ex}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          )}

          {loading && (
            <div role="status" aria-live="polite" className="py-10">
              <h2 ref={headingRef} tabIndex={-1} className="pc-display text-[clamp(2.25rem,8vw,4rem)] outline-none">
                {stage === "analyzing" ? "Leyendo tu idea…" : "Armando tu prompt…"}
              </h2>
              <div className="pc-loading-bar mt-6 max-w-sm" aria-hidden="true" />
              <p className="pc-body mt-4" style={{ color: "var(--pc-grey-body)" }}>Solo un momento.</p>
            </div>
          )}

          {stage === "error" && (
            <div role="alert" className="py-6">
              <h2 ref={headingRef} tabIndex={-1} className="pc-display text-[clamp(2.25rem,8vw,4rem)] outline-none">Algo no salió bien.</h2>
              <p className="pc-body mt-4 text-lg">{error ?? "Inténtalo otra vez."}</p>
              <p className="pc-body mt-1" style={{ color: "var(--pc-grey-body)" }}>Tu idea y tus respuestas siguen aquí.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={retryLast} className={cn(btnBase, "bg-ink text-paper")}>Intentar de nuevo</button>
                <button type="button" onClick={editIdea} className={cn(btnBase, "border-2 border-ink text-ink")}>Volver a mi idea</button>
              </div>
            </div>
          )}

          {stage === "asking" && q && (
            <form onSubmit={submitAnswer} noValidate>
              <div className="flex items-center justify-between gap-4">
                <p className="pc-label flex items-center gap-3">
                  <Chevron className="h-3 w-5" color="var(--pc-ink)" /> Vamos a aclararlo juntos
                </p>
                <p className="pc-data whitespace-nowrap" aria-live="polite">{index + 1} de {questions.length}</p>
              </div>

              <p className="pc-body mt-6 line-clamp-2 border-l-4 border-volt pl-4 text-base" style={{ color: "var(--pc-grey-body)" }}>
                {idea}{" "}
                <button type="button" onClick={editIdea} className="pc-data inline min-h-0 text-ink underline underline-offset-4">Cambiar</button>
              </p>

              <h2 ref={headingRef} tabIndex={-1} className="pc-display mt-8 text-[clamp(2rem,7.5vw,3.75rem)] outline-none">
                <label htmlFor="answer">{q.question}</label>
              </h2>
              <p id="answer-hint" className="pc-body mt-3 text-base" style={{ color: "var(--pc-grey-body)" }}>
                {q.hint ?? "Solo necesito un poco más de contexto."}
              </p>

              <textarea
                key={q.id}
                id="answer"
                ref={answerRef}
                value={answers[q.id]?.value ?? ""}
                maxLength={ANSWER_MAX}
                onChange={(e) => {
                  setHint(null);
                  setAnswers((a) => ({ ...a, [q.id]: { questionId: q.id, value: e.target.value, skipped: false } }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                aria-describedby={`answer-hint${hint ? " answer-error" : ""}`}
                aria-invalid={hint ? true : undefined}
                placeholder="Escribe aquí…"
                className="pc-field mt-6 min-h-32 border-2 border-ink bg-paper text-lg text-ink"
              />
              <p id="answer-error" role="alert" hidden={!hint} className="pc-body mt-2 border-l-4 border-ink bg-volt px-3 py-2 text-base text-ink">{hint}</p>

              <button type="submit" className={cn(btnBase, "mt-6 w-full bg-ink text-paper sm:w-auto sm:px-10")}>
                {index + 1 === questions.length ? "Crear mi prompt" : "Continuar"} <Chevron className="h-3.5 w-6" />
              </button>

              <div className="mt-4 flex flex-wrap items-center gap-x-2">
                {["No estoy seguro", "Prefiero que tú lo decidas", "Omitir"].map((l) => (
                  <button key={l} type="button" onClick={skip} className="pc-body min-h-11 px-2 text-base underline underline-offset-4 hover:bg-volt">{l}</button>
                ))}
                <button type="button" onClick={back} className="pc-body ml-auto flex min-h-11 items-center gap-2 px-2 text-base hover:bg-volt">
                  <Chevron direction="left" className="h-2.5 w-4" color="var(--pc-ink)" /> Atrás
                </button>
              </div>
            </form>
          )}

          {stage === "result" && result && (
            <div>
              <p className="pc-data inline-block bg-volt px-3 py-1">Listo, ya puedes copiarlo</p>
              <h2 ref={headingRef} tabIndex={-1} className="pc-display mt-5 text-[clamp(2.25rem,8vw,4rem)] outline-none">
                Listo. Convertí tu idea en un prompt más claro.
              </h2>
              <p className="pc-data mt-4" style={{ color: "var(--pc-grey-body)" }}>Para · {getTool(tool).id === "auto" ? "cualquier IA" : getTool(tool).name}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={copy} className={cn(btnBase, "bg-ink text-paper sm:px-10")}>
                  {copyLabel} <Chevron className="h-3.5 w-6" />
                </button>
                <button type="button" onClick={reset} className={cn(btnBase, "border-2 border-ink text-ink")}>Mejorar otra idea</button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">{copied === "ok" ? "Prompt copiado" : ""}</p>
              <button type="button" onClick={questions.length ? editAnswers : editIdea} className="pc-body mt-3 min-h-11 text-base underline underline-offset-4 hover:bg-volt">
                {questions.length ? "Editar respuestas" : "Editar mi idea"}
              </button>

              <pre
                tabIndex={0}
                aria-label="Tu prompt"
                className="mt-6 whitespace-pre-wrap break-words border-l-4 border-volt bg-ink p-5 text-paper sm:p-8"
                style={{ fontFamily: "var(--pc-font-mono)", fontSize: "1rem", lineHeight: 1.7 }}
              >
                {text}
              </pre>

              <button type="button" onClick={copy} className={cn(btnBase, "mt-5 w-full bg-volt text-ink sm:w-auto sm:px-10")}>{copyLabel}</button>

              {result.supuestos.length > 0 && (
                <details className="mt-8 border-t border-ink/20 pt-4">
                  <summary className="pc-label min-h-11 cursor-pointer py-2">Lo que decidí por ti ({result.supuestos.length})</summary>
                  <ul className="mt-2 space-y-2">
                    {result.supuestos.map((s, i) => (
                      <li key={i} className="pc-body break-words text-base">{s}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-ink text-paper">
        <div className="pc-wrap flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="pc-body text-sm text-paper/80">PromptCraft hace las preguntas necesarias para que la IA entienda exactamente lo que quieres.</p>
          <p className="pc-data flex items-center gap-2 text-paper/70" title={mode === "demo" ? "Sin API de IA configurada: el prompt se arma con reglas locales." : undefined}>
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-volt" />
            {mode === "live" ? "IA activa" : mode === "demo" ? "Modo demo · sin IA" : " "}
          </p>
        </div>
      </footer>
    </div>
  );
}
