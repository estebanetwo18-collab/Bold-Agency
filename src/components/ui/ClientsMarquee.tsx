import { clientesConfig } from "@/lib/clientes-config";

/**
 * Loop infinito a velocidad constante (§3c). El arreglo se duplica una vez
 * y se anima con la keyframe `marquee` (globals.css) que traslada -50%,
 * así el segundo tramo retoma exactamente donde el primero termina.
 * Pausa en hover vía [animation-play-state] con Tailwind arbitrary variant.
 */
export function ClientsMarquee() {
  const track = [...clientesConfig, ...clientesConfig];

  return (
    <div
      className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      role="list"
      aria-label="Clientes y partners de BOLD Agency"
    >
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {track.map((cliente, i) => (
          <div
            key={`${cliente.nombre}-${i}`}
            role="listitem"
            className="flex h-20 w-48 shrink-0 items-center justify-center border border-grey-light bg-surface px-6 text-center"
          >
            <span className="font-display text-sm font-bold uppercase tracking-wide text-ink/80">
              {cliente.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
