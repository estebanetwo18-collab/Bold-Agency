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

          <div className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl bg-ink p-6 text-center text-paper">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt text-ink">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6 4.5v11l9-5.5-9-5.5Z" fill="currentColor" />
              </svg>
            </span>
            <p className="font-display text-sm font-bold leading-snug">
              Reel de marca
            </p>
            <p className="text-xs text-grey-light">Video próximamente</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
