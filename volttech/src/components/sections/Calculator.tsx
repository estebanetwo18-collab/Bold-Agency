"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { BUDGET_RANGE_OPTIONS, CLIENT_TYPE_OPTIONS, COVERAGE_AREAS, SITE, whatsappHref } from "@/lib/content";
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
  "on-grid": "Sin batería",
  hibrido: "Con batería (híbrido)",
  "off-grid": "Autónomo (off-grid)",
};

export function Calculator() {
  const [inputMode, setInputMode] = useState<InputMode>("factura");
  const [billInput, setBillInput] = useState("120000");
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [clientType, setClientType] = useState<(typeof CLIENT_TYPE_OPTIONS)[number]["value"]>("residencial");
  const [systemType, setSystemType] = useState<SystemType>("on-grid");
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const isAdminUrl = useSyncExternalStore(subscribeNoop, getIsAdminSnapshot, getIsAdminServerSnapshot);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminError, setAdminError] = useState(false);

  const isCommercial = clientType === "comercial";
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

  const budgetLabel = BUDGET_RANGE_OPTIONS.find((b) => b.value === budget)?.label;

  const whatsappSummary = [
    "Hola Volt Tech, hice un estimado en la calculadora del sitio:",
    inputMode === "factura"
      ? `Factura mensual aprox.: ₡${billColones.toLocaleString("es-CR")}`
      : `Equipos seleccionados: ${
          selectedAppliances.map((k) => APPLIANCE_CHECKLIST.find((a) => a.key === k)?.label).filter(Boolean).join(", ") ||
          "ninguno aún"
        }`,
    `Tipo de cliente: ${CLIENT_TYPE_OPTIONS.find((c) => c.value === clientType)?.label}`,
    location ? `Ubicación: ${location}` : null,
    `Sistema: ${SYSTEM_TYPE_LABELS[systemType]}`,
    budgetLabel ? `Presupuesto aproximado: ${budgetLabel}` : null,
    `Rango estimado: ${formatColones(quote.clientPrice.lowColones)} – ${formatColones(quote.clientPrice.highColones)} (estimado preliminar)`,
    "Adjunto mi factura eléctrica real para afinar la cotización.",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="calculadora" className="relative overflow-hidden bg-dark-bg py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 85% 0%, rgba(79,203,119,.16), transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Calculadora de cotización
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un estimado preliminar en minutos, no un compromiso
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-dark-text-muted">
            El resultado es siempre un <strong className="text-white">rango estimado preliminar, sujeto a
            confirmación con tu factura real</strong> — los bloques tarifarios y cargos fijos varían según tu
            proveedor (ICE, CNFL, Coopelesca, ESPH) y no se pueden derivar con precisión solo del monto que pagás.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-2 border-b border-border">
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
                    "px-4 py-4 text-sm font-semibold transition-colors",
                    inputMode === mode ? "bg-accent text-accent-ink" : "text-text-muted hover:bg-black/[0.03]",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-text">Tipo de cliente</p>
                  <div className="mt-2 flex gap-2">
                    {CLIENT_TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setClientType(opt.value)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                          clientType === opt.value
                            ? "border-accent bg-accent text-accent-ink"
                            : "border-border-strong text-text-muted hover:text-text",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {inputMode === "factura" ? (
                  <div>
                    <label htmlFor="bill" className="text-sm font-semibold text-text">
                      Monto mensual de tu factura eléctrica (₡)
                    </label>
                    <input
                      id="bill"
                      type="text"
                      inputMode="numeric"
                      value={billInput}
                      onChange={(e) => setBillInput(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-lg font-semibold text-text outline-none focus:border-accent"
                      placeholder="120000"
                    />
                    <p className="mt-2 text-xs text-text-faint">
                      Consumo estimado: ~{Math.round(consumption.monthlyKwh)} kWh/mes (estimado, no exacto).
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-text">Marcá los equipos que tenés o vas a tener</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {APPLIANCE_CHECKLIST.map((item) => (
                        <label
                          key={item.key}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                            selectedAppliances.includes(item.key)
                              ? "border-accent bg-accent/10 text-text"
                              : "border-border-strong text-text-muted",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={selectedAppliances.includes(item.key)}
                            onChange={() => toggleAppliance(item.key)}
                            className="h-4 w-4 accent-[#2e9e4f]"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-text-faint">
                      Consumo estimado: ~{Math.round(consumption.monthlyKwh)} kWh/mes (patrón de industria, no
                      cotización específica de CR).
                    </p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location" className="text-sm font-semibold text-text">
                      Ubicación
                    </label>
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border-strong bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
                    >
                      <option value="">Seleccioná tu zona</option>
                      {COVERAGE_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-sm font-semibold text-text">
                      Presupuesto aproximado
                    </label>
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border-strong bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
                    >
                      <option value="">Opcional</option>
                      {BUDGET_RANGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text">¿Necesitás batería de respaldo?</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Object.keys(SYSTEM_TYPE_LABELS) as SystemType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSystemType(type)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                          systemType === type
                            ? "border-energy bg-energy text-energy-ink"
                            : "border-border-strong text-text-muted hover:text-text",
                        )}
                      >
                        {SYSTEM_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated p-6">
                {!viability.isViable ? (
                  <div className="rounded-xl border border-warn/40 bg-warn/10 p-4">
                    <p className="text-sm font-semibold text-warn">Podría no ser rentable todavía</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{viability.reason}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">
                      Rango estimado preliminar
                    </p>
                    <p className="tabular-nums mt-2 text-2xl font-semibold leading-tight text-text sm:text-3xl">
                      {formatColones(quote.clientPrice.lowColones)}
                      <span className="mx-1 text-accent">–</span>
                      {formatColones(quote.clientPrice.highColones)}
                    </p>
                    <p className="mt-1 text-xs text-text-faint">
                      Sistema estimado: ~{quote.estimatedKw.toFixed(1)} kW · {SYSTEM_TYPE_LABELS[systemType]}
                    </p>

                    {savings && (
                      <div className="mt-5 border-t border-border pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">
                          Ahorro estimado a 5 años
                        </p>
                        <p className="tabular-nums mt-1.5 text-lg font-semibold text-energy">
                          {formatColones(savings.lowColones)} – {formatColones(savings.highColones)}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-text-faint">
                          Rango conservador, no una cifra única — las tarifas 2026 bajaron entre 4,9% y 16,4%
                          según distribuidora, así que el valor real de Volt Tech está en la independencia y el
                          respaldo, no solo en el ahorro mensual.
                        </p>
                      </div>
                    )}

                    <a
                      href={whatsappHref(whatsappSummary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center rounded-full bg-cta px-6 py-3.5 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-strong"
                    >
                      Enviar este estimado por WhatsApp
                    </a>
                    <p className="mt-2 text-center text-[11px] text-text-faint">
                      Próximo paso recomendado: adjuntá tu factura eléctrica real para confirmar el precio final.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-4 text-xs text-dark-text-muted">
          Umbrales de referencia: el solar suele activarse sobre {MIN_VIABLE_RESIDENTIAL_KWH_MONTH} kWh/mes en
          residencial y {MIN_VIABLE_COMMERCIAL_KWH_YEAR.toLocaleString("es-CR")} kWh/año en comercial.
        </p>

        {/* Vista interna/admin — sin seguridad robusta, solo para demos internas */}
        {isAdminUrl && (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-warn/40 bg-warn/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-warn">
              Vista interna (?admin=1) — no usar como control de acceso real
            </p>

            {!adminUnlocked ? (
              <div className="mt-3 flex max-w-sm flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Password de demo"
                  className="w-full rounded-xl border border-border-strong bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-ink"
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
                <AdminRow label={`Margen Volt Tech (${Math.round(MARGIN_RATE * 100)}% configurable)`} value={quote.marginAmount} />
                <div className="rounded-xl border border-warn/40 bg-warn/10 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text">Precio final al cliente</p>
                  <p className="mt-1 text-lg font-semibold text-text">
                    {formatColones(quote.clientPrice.lowColones)} – {formatColones(quote.clientPrice.highColones)}
                  </p>
                </div>
                <p className="text-xs text-text-faint sm:col-span-2">
                  Esto es lo que la calculadora captura automáticamente por cotización, comparado con armar
                  cada proforma a mano — el margen queda visible aquí solo para uso interno de Volt Tech, y en
                  la vista pública el cliente nunca ve este desglose.
                </p>
              </div>
            )}
            {adminError && <p className="mt-2 text-xs font-semibold text-red-400">Password incorrecto.</p>}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-dark-text-muted">
          ¿Preferís hablar directo? WhatsApp {SITE.whatsapp} · {SITE.email}
        </p>
      </div>
    </section>
  );
}

function AdminRow({ label, value }: { label: string; value: { lowColones: number; highColones: number } }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <p className="text-xs font-semibold text-text-faint">{label}</p>
      <p className="mt-1 font-semibold text-text">
        {formatColones(value.lowColones)} – {formatColones(value.highColones)}
      </p>
    </div>
  );
}
