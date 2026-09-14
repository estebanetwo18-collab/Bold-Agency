import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { Reveal } from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";
import { getContent } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { cotizacionPage } = getContent(activeLocale);
  return {
    title: cotizacionPage.metaTitle,
    description: cotizacionPage.metaDescription,
  };
}

export default async function CotizacionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(activeLocale);
  const { cotizacionPage } = getContent(activeLocale);

  return (
    <>
      <Nav />
      <main id="main" className="relative bg-paper pb-28 pt-40 sm:pt-48">
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                {cotizacionPage.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-balance mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                {cotizacionPage.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md leading-relaxed text-grey">
                {cotizacionPage.intro}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-9 flex flex-col gap-3 border-t border-ink/10 pt-8 text-sm text-grey">
                {cotizacionPage.trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1 w-4 rounded-full bg-ink/30" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <DiagnosticForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
