import { diagnosticForm } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";

export function DiagnosticSection() {
  return (
    <section id="diagnostico" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {diagnosticForm.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-balance mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {diagnosticForm.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md leading-relaxed text-grey">
              {diagnosticForm.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <DiagnosticForm />
        </Reveal>
      </div>
    </section>
  );
}
