import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Muestra piezas reales de portafolio (anuncios ejecutados) — a diferencia
 * de las fotos de marca, estas sí van a color porque son trabajo terminado
 * de cliente, no fotografía ambiental. Las piezas cuyo encuadre original no
 * es 3:4 ya vienen pre-compuestas (public/images/mosaic-*.jpg) sobre un
 * fondo difuminado del mismo anuncio, para no dejar barras vacías ni
 * recortar el contenido.
 */
export function Mosaic() {
  return (
    <section className="bg-paper pb-24 pt-0 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/mosaic-rentcars.jpg"
              alt="Pieza publicitaria de campaña para Rentcars"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/mosaic-herramientas.jpg"
              alt="Pieza publicitaria de campaña de masterclass"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink">
            <video
              src="/videos/mosaic-reel.mp4"
              poster="/images/mosaic-reel-poster.jpg"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Reel de marca BOLD Agency"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
