import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { portfolioConfig } from "@/lib/portfolio-config";
import { portfolioPage } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return portfolioConfig.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioConfig.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: `${item.marca} — Portafolio`,
    description: item.descripcion,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioConfig.find((p) => p.slug === slug);
  if (!item) notFound();

  const gallery = item.gallery.length > 0 ? item.gallery : [item.cover];
  const hasImage = item.cover.src.length > 0;

  return (
    <>
      <Nav />
      <main id="main" className="relative bg-paper pb-28 pt-40 sm:pt-48">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            href="/portafolio"
            className="font-display text-sm font-bold text-grey transition-colors hover:text-ink"
          >
            {portfolioPage.backLabel}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {item.categorias.map((cat) => (
              <span
                key={cat}
                className="border border-grey-light px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-grey"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {item.marca}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-grey">{item.descripcion}</p>

          <div className="mt-6 border border-grey-light bg-grey-light/20 p-5">
            <span className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey-data">
              {portfolioPage.roleLabel}
            </span>
            <p className="mt-2 leading-relaxed text-ink">{item.rol}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hasImage ? (
              gallery.map((media, i) => (
                <div
                  key={media.src + i}
                  className="relative aspect-[4/3] overflow-hidden bg-surface sm:first:col-span-2"
                >
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      poster={item.cover.src}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-ink sm:col-span-2">
                <span className="font-display text-2xl font-black tracking-tight text-paper">
                  {item.marca}
                </span>
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-center">
            <MagneticButton href="/cotizacion" variant="volt">
              Agendar Diagnóstico 360
            </MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
