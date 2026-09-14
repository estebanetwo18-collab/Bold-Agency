"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { portfolioConfig, portfolioBrands } from "@/lib/portfolio-config";
import { useContent } from "@/lib/useContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ClientsMarquee } from "@/components/ui/ClientsMarquee";
import { cn } from "@/lib/cn";

const ALL = "__all__";

export function PortfolioGrid() {
  const { portfolioPage } = useContent();
  const [brandFilter, setBrandFilter] = useState<string>(ALL);

  const filtered = useMemo(() => {
    return portfolioConfig.filter((item) => brandFilter === ALL || item.marca === brandFilter);
  }, [brandFilter]);

  return (
    <section id="grid" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={portfolioPage.gridEyebrow}
          headline={portfolioPage.gridHeadline}
          intro={portfolioPage.gridIntro}
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <FilterGroup
            label={portfolioPage.filterBrandLabel}
            allLabel={portfolioPage.filterAllLabel}
            value={brandFilter}
            onChange={setBrandFilter}
            options={portfolioBrands}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <PortfolioCard slug={item.slug} inProgressLabel={portfolioPage.inProgressLabel} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-grey">{portfolioPage.emptyLabel}</p>
        ) : null}

        <div className="mt-24">
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
            <span className="h-1.5 w-1.5 bg-ink" />
            {portfolioPage.clientsEyebrow}
          </span>
          <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight text-ink sm:text-[1.7rem]">
            {portfolioPage.clientsHeadline}
          </h3>
          <ClientsMarqueeLight />
        </div>
      </div>
    </section>
  );
}

function ClientsMarqueeLight() {
  // ClientsMarquee está pensado para fondo Ink (Resultados); acá el fondo
  // es Paper, así que se envuelve en una franja Ink propia para conservar
  // el mismo contraste sin duplicar el componente.
  return (
    <div className="mt-6 bg-ink py-10">
      <ClientsMarquee />
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  allLabel,
  value,
  onChange,
  options,
}: {
  label: string;
  allLabel: string;
  value: T | typeof ALL;
  onChange: (value: T | typeof ALL) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-display text-xs font-bold uppercase tracking-[0.15em] text-grey-data">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(ALL)}
        className={cn(
          "border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors",
          value === ALL ? "border-ink bg-ink text-paper" : "border-grey-light text-ink hover:border-ink",
        )}
      >
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors",
            value === opt ? "border-ink bg-ink text-paper" : "border-grey-light text-ink hover:border-ink",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function PortfolioCard({ slug, inProgressLabel }: { slug: string; inProgressLabel: string }) {
  const item = portfolioConfig.find((p) => p.slug === slug);
  if (!item) return null;

  return (
    <Link
      href={`/portafolio/${item.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden border border-transparent transition-colors duration-300 hover:border-volt"
    >
      {item.inProgress ? (
        <span className="absolute right-3 top-3 z-10 bg-volt px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink">
          {inProgressLabel}
        </span>
      ) : null}

      {item.cardBanner ? (
        <>
          <Image
            src={item.cardBanner}
            alt={item.marca}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent pb-4 pt-10 transition-opacity duration-300 group-hover:opacity-90">
            <p className="flex items-center gap-2 px-4 font-display text-xs font-bold uppercase tracking-[0.15em] text-paper/80">
              <span className="h-1.5 w-1.5 shrink-0 bg-volt transition-transform duration-300 group-hover:scale-125" />
              {item.categorias.join(" · ")}
            </p>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink px-6 text-center">
          <p className="font-display text-lg font-black uppercase tracking-wide text-volt sm:text-xl">
            {item.marca}
          </p>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-paper/50">
            {item.categorias.join(" · ")}
          </p>
        </div>
      )}
    </Link>
  );
}
