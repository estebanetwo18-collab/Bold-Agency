import { SERVICES, type ServiceKey } from "@/lib/content";
import { PillBadge } from "@/components/ui/PillBadge";
import { CircleIcon } from "@/components/ui/CircleIcon";
import {
  BoltIcon,
  CarIcon,
  DocumentIcon,
  DropletIcon,
  CompassIcon,
  ChatIcon,
  SunIcon,
  WrenchIcon,
} from "@/components/ui/icons";

const ICONS: Record<ServiceKey, typeof SunIcon> = {
  paneles: SunIcon,
  calentadores: DropletIcon,
  electricas: BoltIcon,
  mantenimiento: WrenchIcon,
  ev: CarIcon,
  diseno: CompassIcon,
  asesoria: ChatIcon,
  bombeo: DropletIcon,
  tramites: DocumentIcon,
};

export function Services() {
  return (
    <section id="servicios" className="bg-forest py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <PillBadge tone="gold">Servicios</PillBadge>
        <h2 className="mt-5 max-w-xl text-balance text-3xl font-black tracking-tight sm:text-4xl">
          Todo lo eléctrico y solar, bajo un mismo equipo técnico
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.key];
            return (
              <div
                key={service.key}
                className={
                  service.highlight
                    ? "rounded-3xl border-2 border-gold bg-gold/10 p-6"
                    : service.muted
                      ? "rounded-3xl border border-cream/10 bg-cream/[0.03] p-6 opacity-80"
                      : "rounded-3xl border border-cream/12 bg-charcoal/60 p-6"
                }
              >
                {service.highlight && (
                  <span className="mb-3 inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-forest">
                    Nicho sin competencia mapeada
                  </span>
                )}
                <CircleIcon tone={service.highlight ? "gold" : "cream"}>
                  <Icon className="h-6 w-6" />
                </CircleIcon>
                <h3 className="mt-4 text-base font-bold text-cream">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
