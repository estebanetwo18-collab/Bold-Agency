"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { PillBadge } from "@/components/ui/PillBadge";
import { cn } from "@/lib/cn";
import { SITE, whatsappHref } from "@/lib/content";
import {
  APPLIANCE_CHECKLIST,
  MARGIN_RATE,
  MIN_VIABLE_COMMERCIAL_KWH_YEAR,
  MIN_VIABLE_RESIDENTIAL_KWH_MONTH,
  calculateQuote,
  checkViability,
  estimateConsumptionFromBill,
  estimateConsumptionFromChecklist,
  estimateFiveYearSavingsRange,
  estimateSystemKw,
  formatColones,
  type SystemType,
} from "@/lib/pricing";

type InputMode = "factura" | "checklist";

function subscribeNoop() {
  return () => {};
}
function getIsAdminSnapshot() {
  return new URLSearchParams(window.location.search).get("admin") === "1";
}
function getIsAdminServerSnapshot() {
  return false;
}

const SYSTEM_TYPE_LABELS: Record<SystemType, string> = {
  "on-grid": "On-grid (sin batería)",
  hibrido: "Híbrido (con batería)",
  "off-grid": "Off-grid (autónomo)",
};

export function Calculator() {
  const [inputMode, setInputMode] = useState<InputMode>("factura");
  const [billInput, setBillInput] = useState("120000");
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [isCommercial, setIsCommercial] = useState(false);
  const [systemType, setSystemType] = useState<SystemType>("on-grid");

  // Lectura de ?admin=1 vía useSyncExternalStore: evita el mismatch de
  // hidratación que tendría un useState leído desde window en un effect.
  const isAdminUrl = useSyncExternalStore(subscribeNoop, getIsAdminSnapshot, getIsAdminServerSnapshot);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminError, setAdminError] = useState(false);

  const billColones = Number(billInput.replace(/[^\d]/g, "")) || 0;

  const consumption = useMemo(() => {
    if (inputMode === "factura") return estimateConsumptionFromBill(billColones);
    return estimateConsumptionFromChecklist(selectedAppliances);
  }, [inputMode, billColones, selectedAppliances]);

  const viability = useMemo(() => checkViability(consumption, isCommercial), [consumption, isCommercial]);
  const estimatedKw = useMemo(() => estimateSystemKw(consumption.monthlyKwh), [consumption]);
  const quote = useMemo(() => calculateQuote(estimatedKw, systemType), [estimatedKw, systemType]);
  const savings = useMemo(
    () => (inputMode === "factura" ? estimateFiveYearSavingsRange(billColones) : null),
    [inputMode, billColones],
  );

  function toggleAppliance(key: string) {
    setSelectedAppliances((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function unlockAdmin() {
    const expected = process.env.NEXT_PUBLIC_CALCULATOR_ADMIN_KEY || "volttech-admin";
    if (adminPasswordInput === expected) {
      setAdminUnlocked(true);
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  }

  const whatsappSummary = [
    "Hola VoltTech, hice un estimado en la calculadora del sitio:",
    inputMode === "factura"
      ? `Factura mensual aprox.: ₡${billColones.toLocaleString("es-CR")}`
      : `Equipos seleccionados: ${selectedAppliances
          .map((k) => APPLIANCE_CHECKLIST.find((a) => a.key === k)?.label)
          .filter(Boolean)
          .join(", ") || "ninguno aún"}`,
    `Tipo de sistema: ${SYSTEM_TYPE_LABELS[systemType]}`,
    `Rango estimado: ${formatColones(quote.clientPrice.lowColones)} – ${formatColones(quote.clientPrice.highColones)} (estimado preliminar)`,
    "Adjunto mi factura eléctrica real para afinar la cotización.",
  ].join("\n");

  return (
    <section id="calculadora" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <PillBadge tone="green">Calculadora de cotización</PillBadge>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-black tracking-tight text-forest sm:text-4xl">
          Un estimado preliminar en minutos, no un compromiso
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          El resultado es siempre un <strong>rango estimado preliminar, sujeto a confirmación con tu
          factura real</strong> — los bloques tarifarios y cargos fijos varían según tu proveedor (ICE,
          CNFL, Coopelesca, ESPH) y no se pueden derivar con precisión solo del monto que pagás.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-green/20 bg-white shadow-sm">
          {/* Selector de modo de entrada */}
          <div className="grid grid-cols-2 border-b border-green/15">
            {(
              [
                ["factura", "Tengo factura eléctrica"],
                ["checklist", "No tengo electricidad todavía"],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setInputMode(mode)}
                className={cn(
                  "px-4 py-4 text-sm font-bold transition-colors",
                  inputMode === mode ? "bg-forest text-cream" : "bg-white text-ink-soft hover:bg-cream",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
            {/* Inputs */}
            <div>
              {inputMode === "factura" ? (
                <div>
                  <label htmlFor="bill" className="text-sm font-bold text-forest">
                    Monto mensual de tu factura eléctrica (₡)
                  </label>
                  <input
                    id="bill"
                    type="text"
                    inputMode="numeric"
                    value={billInput}
                    onChange={(e) => setBillInput(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-green/25 px-4 py-3 text-lg font-bold text-forest outline-none focus:border-gold"
                    placeholder="120000"
                  />
                  <p className="mt-2 text-xs text-ink-soft/70">
                    Consumo estimado: ~{Math.round(consumption.monthlyKwh)} kWh/mes (estimado, no exacto).
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-forest">Marcá los equipos que tenés o vas a tener</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {APPLIANCE_CHECKLIST.map((item) => (
                      <label
                        key={item.key}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm",
                          selectedAppliances.includes(item.key)
                            ? "border-gold bg-gold/10 text-forest"
                            : "border-green/20 text-ink-soft",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAppliances.includes(item.key)}
                          onChange={() => toggleAppliance(item.key)}
                          className="h-4 w-4 accent-[#1E6B4F]"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-ink-soft/70">
                    Consumo estimado: ~{Math.round(consumption.monthlyKwh)} kWh/mes (patrón de industria, no
                    cotización específica de CR).
                  </p>
                </div>
              )}

              <label className="mt-5 flex items-center gap-2.5 text-sm font-semibold text-ink-soft">
                <input
                  type="checkbox"
                  checked={isCommercial}
                  onChange={(e) => setIsCommercial(e.target.checked)}
                  className="h-4 w-4 accent-[#1E6B4F]"
                />
                Es para un negocio / comercio
              </label>

              <div className="mt-6">
                <p className="text-sm font-bold text-forest">Tipo de sistema</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(Object.keys(SYSTEM_TYPE_LABELS) as SystemType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSystemType(type)}
                      className={cn(
                        "rounded-full border-2 px-4 py-2 text-xs font-bold transition-colors",
                        systemType === type
                          ? "border-forest bg-forest text-cream"
                          : "border-green/50 bg-white text-ink-soft hover:border-forest",
                      )}
                    >
                      {SYSTEM_TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div className="rounded-2xl bg-forest p-6 text-cream">
              {!viability.isViable ? (
                <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
                  <p className="text-sm font-bold text-gold">Podría no ser rentable todavía</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/80">{viability.reason}</p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold/80">
                    Rango estimado preliminar
                  </p>
                  <p className="mt-2 text-2xl font-black leading-tight text-cream sm:text-3xl">
                    {formatColones(quote.clientPrice.lowColones)}
                    <span className="mx-1 text-gold">–</span>
                    {formatColones(quote.clientPrice.highColones)}
                  </p>
                  <p className="mt-1 text-xs text-cream/60">
                    Sistema estimado: ~{quote.estimatedKw.toFixed(1)} kW · {SYSTEM_TYPE_LABELS[systemType]}
                  </p>

                  {savings && (
                    <div className="mt-5 border-t border-cream/15 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gold/80">
                        Ahorro estimado a 5 años
                      </p>
                      <p className="mt-1.5 text-lg font-bold text-cream">
                        {formatColones(savings.lowColones)} – {formatColones(savings.highColones)}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-cream/55">
                        Rango conservador, no una cifra única — las tarifas 2026 bajaron entre 4,9% y 16,4%
                        según distribuidora, así que el valor real de VoltTech está en la independencia y el
                        respaldo, no solo en el ahorro mensual.
                      </p>
                    </div>
                  )}

                  <a
                    href={whatsappHref(whatsappSummary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-forest transition-colors hover:bg-gold-bright"
                  >
                    Enviar este estimado por WhatsApp
                  </a>
                  <p className="mt-2 text-center text-[11px] text-cream/50">
                    Te vamos a pedir tu factura eléctrica real para confirmar el precio final.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-soft/60">
          Umbrales de referencia: el solar suele activarse sobre {MIN_VIABLE_RESIDENTIAL_KWH_MONTH} kWh/mes
          en residencial y {MIN_VIABLE_COMMERCIAL_KWH_YEAR.toLocaleString("es-CR")} kWh/año en comercial.
        </p>

        {/* Vista interna/admin — sin seguridad robusta, solo para demos internas */}
        {isAdminUrl && (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-gold/50 bg-forest/5 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-gold">
              Vista interna (?admin=1) — no usar como control de acceso real
            </p>

            {!adminUnlocked ? (
              <div className="mt-3 flex max-w-sm flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Password de demo"
                  className="w-full rounded-xl border border-green/25 px-3 py-2 text-sm outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="rounded-xl bg-forest px-4 py-2 text-sm font-bold text-cream"
                >
                  Ver desglose
                </button>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <AdminRow label="Costo base (tabla verificada)" value={quote.baseCost} />
                {quote.batteryCost && (
                  <AdminRow
                    label={systemType === "off-grid" ? "Batería (off-grid, banco ampliado)" : "Batería (híbrido)"}
                    value={quote.batteryCost}
                  />
                )}
                <AdminRow label="Subtotal antes de margen" value={quote.subtotalBeforeMargin} />
                <AdminRow label={`Margen VoltTech (${Math.round(MARGIN_RATE * 100)}% configurable)`} value={quote.marginAmount} />
                <div className="sm:col-span-2 rounded-xl border border-gold bg-gold/15 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest">Precio final al cliente</p>
                  <p className="mt-1 text-lg font-black text-forest">
                    {formatColones(quote.clientPrice.lowColones)} – {formatColones(quote.clientPrice.highColones)}
                  </p>
                </div>
                <p className="text-xs text-ink-soft/70 sm:col-span-2">
                  Esto es lo que la calculadora captura automáticamente por cotización, comparado con armar
                  cada proforma a mano — el margen queda visible aquí solo para uso interno de VoltTech, y en
                  la vista pública el cliente nunca ve este desglose.
                </p>
              </div>
            )}
            {adminError && <p className="mt-2 text-xs font-semibold text-red-600">Password incorrecto.</p>}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-ink-soft/50">
          ¿Preferís hablar directo? WhatsApp {SITE.whatsapp} · {SITE.email}
        </p>
      </div>
    </section>
  );
}

function AdminRow({ label, value }: { label: string; value: { lowColones: number; highColones: number } }) {
  return (
    <div className="rounded-xl border border-green/20 bg-white p-4">
      <p className="text-xs font-semibold text-ink-soft/70">{label}</p>
      <p className="mt-1 font-bold text-forest">
        {formatColones(value.lowColones)} – {formatColones(value.highColones)}
      </p>
    </div>
  );
}
