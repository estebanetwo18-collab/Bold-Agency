import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Muestra piezas reales de portafolio (anuncios ejecutados) sin recortarlas
 * — a diferencia de las fotos de marca, estas sí van a color porque son
 * trabajo terminado de cliente, no fotografía ambiental.
 */
export function Mosaic() {
  return (
    <section className="bg-paper pb-24 pt-0 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-grey-light/40 p-4">
            <div className="relative h-full w-full">
              <Image
                src="/images/mosaic-rentcars.jpg"
                alt="Pieza publicitaria de campaña para Rentcars"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-grey-light/40 p-4">
            <div className="relative h-full w-full">
              <Image
                src="/images/mosaic-herramientas.jpg"
                alt="Pieza publicitaria de campaña de masterclass"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-contain"
              />
            </div>
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
