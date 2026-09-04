import type { ReactNode } from "react";

export function LegalPage({
  title,
  updatedNote,
  children,
}: {
  title: string;
  updatedNote: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-16 sm:px-8">
      <h1 className="text-4xl font-black tracking-tight text-forest sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-ink-soft/70">{updatedNote}</p>
      <div className="prose-legal mt-10 flex flex-col gap-5 leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
