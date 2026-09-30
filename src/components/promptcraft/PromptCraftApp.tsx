"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chevron, Triangle } from "./Chevron";
import { Header, NextStrip } from "./Header";
import { Workshop, type Stage } from "./Workshop";
import { fetchMode, fetchPrompt, fetchQuestions, ServiceError } from "@/lib/promptcraft/service";
import { TOOLS } from "@/lib/promptcraft/tools";
import {
  IDEA_MAX,
  IDEA_MIN,
  type Answer,
  type EngineMode,
  type PromptResult,
  type Question,
  type ToolId,
} from "@/lib/promptcraft/types";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "promptcraft:session:v1";

type Saved = {
  idea: string;
  tool: ToolId;
  runTool: ToolId;
  stage: "idle" | "asking" | "result";
  questions: Question[];
  answers: Record<string, Answer>;
  index: number;
  result: PromptResult | null;
  mode: EngineMode | null;
};

const ANATOMY = ["Rol", "Objetivo", "Contexto", "Tareas", "Restricciones", "Formato esperado", "Criterios de calidad", "Preguntas pendientes"];

const STEPS = [
  { n: "01", title: "Escribe la idea.", body: "Tal como la tienes: a medias, desordenada, en una línea. No hace falta que suene a prompt." },
  { n: "02", title: "Responde lo que falta.", body: "PromptCraft detecta qué información no está y pregunta solo lo necesario: entre 3 y 5 preguntas, y puedes omitir casi todas." },
  { n: "03", title: "Obtén un prompt listo para usar.", body: "Rol, objetivo, contexto, tareas, restricciones, formato y criterios de calidad. Copia y pega en tu herramienta." },
];

export function PromptCraftApp() {
  const [idea, setIdea] = useState("");
  const [ideaError, setIdeaError] = useState<string | null>(null);
  const [tool, setTool] = useState<ToolId>("general");
  const [runTool, setRunTool] = useState<ToolId>("general");
  const [stage, setStage] = useState<Stage>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [mode, setMode] = useState<EngineMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState<"questions" | "build">("questions");
  const [restored, setRestored] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const runId = useRef(0);

  // Restaura la última sesión y consulta el modo del motor (demo / IA).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        if (s && typeof s.idea === "string") {
          /* eslint-disable react-hooks/set-state-in-effect */
          setIdea(s.idea);
          setTool(s.tool);
          setRunTool(s.runTool);
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
      /* localStorage bloqueado o corrupto: se ignora. */
    }
    setHydrated(true);
    fetchMode().then((m) => setMode((prev) => prev ?? m.mode)).catch(() => {});
  }, []);

  // Persistencia opcional: solo estados estables (nunca "cargando").
  useEffect(() => {
    if (!hydrated) return;
    const persistStage = stage === "asking" || stage === "result" ? stage : "idle";
    try {
      if (!idea.trim() && persistStage === "idle") {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const data: Saved = { idea, tool, runTool, stage: persistStage, questions, answers, index, result, mode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* cuota o modo privado: la app sigue funcionando sin persistencia. */
    }
  }, [hydrated, idea, tool, runTool, stage, questions, answers, index, result, mode]);

  const goToWorkshop = () => {
    window.setTimeout(() => document.getElementById("taller")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

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
      setError(e instanceof ServiceError ? e.message : "Algo salió mal. Inténtalo de nuevo.");
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
      setError(e instanceof ServiceError ? e.message : "Algo salió mal. Inténtalo de nuevo.");
      setStage("error");
    }
  }, [build]);

  function start(e: React.FormEvent) {
    e.preventDefault();
    const text = idea.trim();
    if (!text) return setIdeaError("Escribe tu idea para continuar.");
    if (text.length < IDEA_MIN) return setIdeaError(`Cuéntanos un poco más: mínimo ${IDEA_MIN} caracteres.`);
    setIdeaError(null);
    setError(null);
    setRestored(false);
    setAnswers({});
    setResult(null);
    setRunTool(tool);
    const id = ++runId.current;
    goToWorkshop();
    void analyze(text, tool, id);
  }

  function reset() {
    runId.current++;
    setIdea("");
    setIdeaError(null);
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
    document.getElementById("idea")?.scrollIntoView({ behavior: "smooth" });
  }

  function onNext() {
    if (index + 1 >= questions.length) void build(questions, answers, runTool, idea.trim(), ++runId.current);
    else setIndex(index + 1);
  }

  function onSkip() {
    const q = questions[index];
    const next = { ...answers, [q.id]: { questionId: q.id, value: "", skipped: true } };
    setAnswers(next);
    if (index + 1 >= questions.length) void build(questions, next, runTool, idea.trim(), ++runId.current);
    else setIndex(index + 1);
  }

  function onBack() {
    if (index === 0) {
      setStage("idle");
      document.getElementById("idea-input")?.focus();
      document.getElementById("idea")?.scrollIntoView({ behavior: "smooth" });
    } else setIndex(index - 1);
  }

  function onRetry() {
    setError(null);
    const id = ++runId.current;
    if (retry === "questions") void analyze(idea.trim(), runTool, id);
    else void build(questions, answers, runTool, idea.trim(), id);
  }

  const words = idea.trim() ? idea.trim().split(/\s+/).length : 0;
  const activeTool = TOOLS.find((t) => t.id === tool) ?? TOOLS[3];

  return (
    <>
      <Header />
      <main id="main">
        {/* 01 · HERO */}
        <section id="idea" className="relative scroll-mt-14 overflow-hidden bg-ink text-paper">
          <div aria-hidden="true" className="pc-diagonals-soft absolute inset-x-0 bottom-0 h-24 sm:h-32 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
          <Chevron className="pointer-events-none absolute -right-[12%] top-[5rem] hidden h-[26rem] w-[43rem] lg:block" />
          <Triangle className="absolute bottom-10 right-[var(--pc-gutter)] h-8 w-9 sm:h-12 sm:w-14 lg:bottom-16" />

          <div aria-hidden="true" className="flex h-10 items-center overflow-hidden lg:hidden">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Chevron key={i} className="-mr-3 h-10 w-16" color={i % 2 ? "var(--pc-volt)" : "var(--pc-paper)"} />
            ))}
          </div>
          <div className="pc-wrap relative grid gap-10 pb-28 pt-8 sm:pt-12 lg:grid-cols-12 lg:pb-32 lg:pt-20">
            <div className="lg:col-span-8 xl:col-span-7">
              <p className="pc-label flex items-center gap-3 text-volt">
                <Chevron className="h-3 w-5" /> BOLD AGENCY · PROMPTCRAFT
              </p>
              <h1 className="pc-display mt-6 text-[clamp(2.75rem,9.5vw,5.25rem)]">
                Tu idea merece <span className="text-volt">mejores instrucciones.</span>
              </h1>
              <p className="pc-body mt-6 max-w-xl text-lg text-paper/85 sm:text-xl">
                Convierte una solicitud incompleta en un prompt claro, estratégico y listo para usar.
              </p>

              <form onSubmit={start} noValidate className="pc-card mt-10 max-w-2xl p-4 sm:p-6">
                <label htmlFor="idea-input" className="pc-label block">Tu idea</label>
                <textarea
                  id="idea-input"
                  value={idea}
                  maxLength={IDEA_MAX}
                  onChange={(e) => {
                    setIdea(e.target.value);
                    if (ideaError) setIdeaError(null);
                  }}
                  aria-invalid={ideaError ? true : undefined}
                  aria-describedby={`idea-meta${ideaError ? " idea-error" : ""}`}
                  placeholder="Ej.: quiero una landing para mi estudio de arquitectura…"
                  className="pc-field mt-3 min-h-36 border-2 border-paper/60 bg-ink text-paper placeholder:text-paper/50"
                />
                <div id="idea-meta" className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <p className="pc-data text-paper/70">
                    Destino · <a href="#destino" className="text-volt underline underline-offset-4">{activeTool.name}</a>
                  </p>
                  <p className="pc-data text-paper/70">{words} palabras · {idea.length}/{IDEA_MAX}</p>
                </div>
                <p id="idea-error" role="alert" hidden={!ideaError} className="pc-data mt-3 bg-volt px-3 py-2 text-ink">
                  {ideaError}
                </p>
                <button
                  type="submit"
                  disabled={stage === "analyzing" || stage === "building"}
                  className="pc-label mt-5 flex min-h-14 w-full items-center justify-between gap-4 bg-volt px-5 text-sm tracking-[0.2em] text-ink sm:px-6 sm:text-base sm:tracking-[0.3em] disabled:opacity-60 sm:w-auto sm:justify-start sm:gap-8"
                >
                  Construir mi prompt <Chevron className="h-4 w-7" color="var(--pc-ink)" />
                </button>
              </form>
              <p className="pc-data mt-4 text-paper/60">
                {mode === "live" ? "IA activa · la idea se procesa en el servidor" : mode === "demo" ? "Modo demo · reglas locales, sin IA" : " "}
              </p>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9 xl:col-span-4 xl:col-start-9" aria-label="Anatomía del prompt">
              <div className="mt-2 lg:mt-[28rem]">
                <p className="pc-data text-paper/70">Anatomía del prompt · 08 bloques</p>
                <ol className="mt-3 grid grid-cols-2 gap-x-6 border-t border-paper/25 lg:grid-cols-1">
                  {ANATOMY.map((a, i) => (
                    <li key={a} className="flex gap-3 border-b border-paper/25 py-2 text-paper/90">
                      <span className="pc-data text-volt">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-normal">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </section>

        {/* 02 · CÓMO FUNCIONA */}
        <section id="metodo" className="pc-on-paper relative scroll-mt-14 bg-paper pb-20 pt-16 sm:pt-24">
          <div className="pc-wrap">
            <p className="pc-data">02 / Método</p>
            <h2 className="pc-display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)]">Tres pasos. Sin adivinar.</h2>
            <ol className="mt-12 border-t-2 border-ink">
              {STEPS.map((s, i) => (
                <li key={s.n} className="grid gap-x-10 gap-y-3 border-b border-ink/20 py-8 sm:grid-cols-[7rem_1fr] lg:grid-cols-[9rem_1.1fr_1fr] lg:items-baseline">
                  <span className={cn("pc-data text-4xl font-bold tracking-normal sm:text-5xl", i === 2 && "text-ink")}>
                    {s.n}
                  </span>
                  <div>
                    <span className="pc-rule" />
                    <h3 className="pc-display mt-3 text-3xl sm:text-4xl">{s.title}</h3>
                  </div>
                  <p className="pc-body max-w-md text-lg sm:col-start-2 lg:col-start-3" style={{ color: "var(--pc-grey-body)" }}>
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
            <NextStrip href="#destino" n="03" label="Destino" tone="paper" />
          </div>
        </section>

        {/* 03 · DESTINO */}
        <section id="destino" className="relative scroll-mt-14 bg-ink pb-20 pt-16 text-paper sm:pt-24">
          <div aria-hidden="true" className="pc-diagonals-soft absolute right-0 top-0 h-full w-10 sm:w-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="pc-wrap relative">
            <p className="pc-data text-paper/70">03 / Destino</p>
            <h2 id="destino-title" className="pc-display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)]">¿Dónde vas a usar el prompt?</h2>
            <p className="pc-body mt-4 max-w-xl text-lg text-paper/80">Cada destino cambia el rol, las tareas y el formato del resultado.</p>

            <div role="radiogroup" aria-labelledby="destino-title" className="mt-10 border-t border-paper/30">
              {TOOLS.map((t, i) => {
                const on = t.id === tool;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTool(t.id)}
                    onKeyDown={(e) => {
                      const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                      if (!step) return;
                      e.preventDefault();
                      const nextTool = TOOLS[(i + step + TOOLS.length) % TOOLS.length];
                      setTool(nextTool.id);
                      (e.currentTarget.parentElement?.children[TOOLS.indexOf(nextTool)] as HTMLElement | undefined)?.focus();
                    }}
                    className={cn(
                      "grid w-full grid-cols-[3rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-paper/30 px-3 py-5 text-left transition-colors sm:grid-cols-[5rem_1fr_1.2fr_auto] sm:px-5 sm:py-6",
                      on ? "bg-volt text-ink" : "hover:bg-paper/10",
                    )}
                  >
                    <span className="pc-data text-lg font-bold sm:text-2xl">{t.number}</span>
                    <span className="pc-display text-2xl sm:text-4xl">{t.name}</span>
                    <span className={cn("pc-body order-last col-span-3 col-start-1 mt-1 sm:order-none sm:col-span-1 sm:mt-0", on ? "text-ink" : "text-paper/80")}>
                      {t.scope}
                    </span>
                    <span className="pc-data flex items-center gap-2">
                      <span className="hidden sm:inline">{on ? "Seleccionado" : "Elegir"}</span>
                      <Chevron className="h-3.5 w-6" color={on ? "var(--pc-ink)" : "rgb(255 255 255 / 0.35)"} />
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="pc-data mt-4 text-paper/70" aria-live="polite">Destino activo · {activeTool.name}</p>
            <NextStrip href="#taller" n="04" label="Taller" tone="ink" />
          </div>
        </section>

        {/* 04 · TALLER */}
        <section id="taller" className="pc-cut-top relative -mt-px scroll-mt-14 bg-paper pb-24 pt-20 sm:pt-28" aria-live="off">
          <div className="pc-wrap">
            <Workshop
              stage={stage}
              idea={idea}
              runTool={runTool}
              questions={questions}
              answers={answers}
              index={index}
              result={result}
              mode={mode}
              error={error}
              restored={restored}
              onAnswer={(q, value) => setAnswers((a) => ({ ...a, [q.id]: { questionId: q.id, value, skipped: false } }))}
              onNext={onNext}
              onSkip={onSkip}
              onBack={onBack}
              onRetry={onRetry}
              onReset={reset}
            />
          </div>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <div className="pc-wrap flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="flex items-baseline gap-3">
            <span className="pc-display text-2xl">BOLD</span>
            <span className="pc-agency text-[0.6rem]">Agency</span>
          </p>
          <span className="pc-rule" aria-hidden="true" />
          <Link href="/" className="pc-data flex min-h-11 items-center gap-2 text-paper/80 hover:text-volt">
            boldagencycr.com <Chevron className="h-2.5 w-4" />
          </Link>
        </div>
      </footer>
    </>
  );
}
