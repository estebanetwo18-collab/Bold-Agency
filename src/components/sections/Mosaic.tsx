import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Mosaic() {
  return (
    <section className="bg-paper pb-24 pt-0 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:col-start-1 sm:row-start-1">
            <Image
              src="/images/mosaic-grid-sq.jpg"
              alt="Detalle arquitectónico en blanco y negro"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:aspect-auto">
            <Image
              src="/images/mosaic-chevron-tall.jpg"
              alt="Fachada en chevron, blanco y negro"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:col-start-1 sm:row-start-2">
            <Image
              src="/images/mosaic-skyline-wide.jpg"
              alt="Rascacielos en blanco y negro"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
