import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

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
    <>
      <Nav />
      <main id="main" className="bg-paper pb-28 pt-40 sm:pt-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-grey">{updatedNote}</p>
          <div className="prose-legal mt-12 flex flex-col gap-6 leading-relaxed text-ink/90">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
