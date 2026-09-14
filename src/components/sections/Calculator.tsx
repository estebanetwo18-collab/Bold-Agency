"use client";

import { useMemo, useState } from "react";
import {
  packageOptions,
  pointServiceCategories,
  pricingCatalog,
  pricingConfig,
} from "@/lib/pricing-config";
import { calculateTotal, formatCrc, type CalculatorState } from "@/lib/pricing-utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { QuoteRequestModal } from "@/components/ui/QuoteRequestModal";
import { useContent } from "@/lib/useContent";
import { cn } from "@/lib/cn";

export function Calculator() {
  const { calculator: c } = useContent();
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [quoteModalFor, setQuoteModalFor] = useState<string | null>(null);
  const [requestedQuotes, setRequestedQuotes] = useState<Set<string>>(new Set());

  const state: CalculatorState = { selectedPackageId, quantities };
  const result = useMemo(() => calculateTotal(state), [selectedPackageId, quantities]);

  function setQty(id: string, qty: number) {
    if (selectedPackageId) return;
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  }

  function selectPackage(id: string | null) {
    setSelectedPackageId(id);
    if (id) setQuantities({});
  }

  const quoteModalItem = quoteModalFor
    ? pricingCatalog.find((item) => item.id === quoteModalFor)
    : null;

  return (
    <section id="calculadora" className="relative bg-paper pb-28 pt-40 sm:pt-48 lg:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={c.eyebrow}
          headline={c.headline}
          intro={c.intro}
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-grey-light bg-surface px-5 py-4">
          <p className="max-w-2xl text-sm leading-relaxed text-grey">{c.exclusiveNote}</p>
          <MagneticButton href="/cotizacion" variant="ink" strength={8}>
            {c.specializedCtaLabel}
          </MagneticButton>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="border border-grey-light bg-paper p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{c.packageTitle}</h3>
                  <p className="mt-1 text-sm text-grey">{c.packageSubtitle}</p>
                </div>
                {selectedPackageId ? (
                  <button
                    type="button"
                    onClick={() => selectPackage(null)}
                    className="font-display text-xs font-bold uppercase tracking-wide text-grey underline underline-offset-4 hover:text-ink"
                  >
                    {c.removePackageLabel}
                  </button>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {packageOptions.map((pkg) => {
                  const active = selectedPackageId === pkg.id;
                  return (
                    <label
                      key={pkg.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-4 border p-4 transition-colors",
                        active ? "border-ink bg-ink text-paper" : "border-grey-light hover:border-ink",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paquete"
                          checked={active}
                          onChange={() => selectPackage(pkg.id)}
                          className="h-4 w-4 accent-volt"
                        />
                        <span className="font-display text-sm font-bold">{pkg.label}</span>
                      </span>
                      <span className="font-data text-sm font-bold">{formatCrc(pkg.priceMin ?? 0)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div
              className={cn(
                "border border-grey-light bg-paper p-6 transition-opacity sm:p-8",
                selectedPackageId ? "pointer-events-none opacity-40" : "opacity-100",
              )}
              aria-disabled={Boolean(selectedPackageId)}
            >
              <h3 className="font-display text-lg font-bold text-ink">{c.pointTitle}</h3>
              <p className="mt-1 text-sm text-grey">{c.pointSubtitle}</p>

              <div className="mt-6 flex flex-col gap-8">
                {pointServiceCategories.map((category) => (
                  <div key={category}>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-grey-data">
                      {category}
                    </p>
                    <div className="mt-3 flex flex-col divide-y divide-grey-light border-y border-grey-light">
                      {pricingCatalog
                        .filter((item) => item.category === category && item.inputType !== "radio")
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-4"
                          >
                            <div>
                              <p className="text-sm font-semibold text-ink">{item.label}</p>
                              {item.pricingType === "a_cotizar" ? (
                                <p className="font-data text-xs text-grey-data">{c.quoteLabel}</p>
                              ) : null}
                            </div>

                            {item.inputType === "quote" ? (
                              <button
                                type="button"
                                onClick={() => setQuoteModalFor(item.id)}
                                className={cn(
                                  "border px-4 py-2 font-display text-xs font-bold uppercase tracking-wide transition-colors",
                                  requestedQuotes.has(item.id)
                                    ? "border-volt bg-volt text-ink"
                                    : "border-ink/20 text-ink hover:border-ink",
                                )}
                              >
                                {requestedQuotes.has(item.id) ? c.quotedButton : c.quoteButton}
                              </button>
                            ) : (
                              <Stepper
                                value={quantities[item.id] ?? 0}
                                onChange={(qty) => setQty(item.id, qty)}
                                decreaseAria={c.decreaseAria}
                                increaseAria={c.increaseAria}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-grey">{c.growYourWayNote}</p>
            </div>
          </div>

          <div className="sticky top-28 border border-ink bg-ink p-6 text-paper sm:p-8">
            <h3 className="font-display text-lg font-bold">{c.summaryTitle}</h3>

            {result.lines.length === 0 ? (
              <p className="mt-6 text-sm text-paper/60">{c.emptyState}</p>
            ) : (
              <div className="mt-6 flex flex-col divide-y divide-paper/10 border-y border-paper/10">
                {result.lines.map((line) => (
                  <div key={line.item.id} className="py-3">
                    <span className="text-sm text-paper/85">
                      {line.item.label}
                      {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                      {line.isEstimate ? ` (${c.fromLabel})` : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-paper/70">
                <span>{c.subtotalLabel}</span>
                <span className="font-data">{formatCrc(result.subtotal)}</span>
              </div>
              {result.comboDiscountApplies ? (
                <div className="flex justify-between text-volt">
                  <span>{c.discountLabel} ({pricingConfig.comboDiscountRate * 100}%)</span>
                  <span className="font-data">−{formatCrc(result.discountAmount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-paper/70">
                <span>{c.vatLabel} ({pricingConfig.vatRate * 100}%)</span>
                <span className="font-data">{formatCrc(result.vatAmount)}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-paper/15 pt-5">
              <p className="text-xs uppercase tracking-[0.15em] text-paper/60">
                {result.totalIsEstimate ? c.totalFromLabel : c.totalLabel}
              </p>
              <p className="mt-1 font-data text-4xl font-extrabold text-volt">
                {formatCrc(result.total)}
              </p>
              <p className="mt-1 text-xs text-paper/50">{c.totalUnit}</p>
            </div>

            {requestedQuotes.size > 0 ? (
              <p className="mt-5 border border-volt/40 bg-volt/10 p-3 text-xs leading-relaxed text-volt">
                {c.quotedNote}
              </p>
            ) : null}

            {result.soloSurchargeApplies ? (
              <p className="mt-5 border border-paper/15 bg-paper/5 p-3 text-xs leading-relaxed text-paper/70">
                {c.soloSurchargeNote}
              </p>
            ) : null}

            <div className="mt-6">
              <MagneticButton href="/cotizacion" variant="volt" className="w-full justify-center">
                {c.ctaLabel}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {quoteModalItem ? (
        <QuoteRequestModal
          serviceLabel={quoteModalItem.label}
          onClose={() => {
            setRequestedQuotes((prev) => new Set(prev).add(quoteModalItem.id));
            setQuoteModalFor(null);
          }}
        />
      ) : null}
    </section>
  );
}

function Stepper({
  value,
  onChange,
  decreaseAria,
  increaseAria,
}: {
  value: number;
  onChange: (value: number) => void;
  decreaseAria: string;
  increaseAria: string;
}) {
  return (
    <div className="flex items-center border border-grey-light">
      <button
        type="button"
        aria-label={decreaseAria}
        onClick={() => onChange(value - 1)}
        disabled={value <= 0}
        className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-grey-light disabled:opacity-30"
      >
        −
      </button>
      <span className="font-data w-8 text-center text-sm font-semibold text-ink">{value}</span>
      <button
        type="button"
        aria-label={increaseAria}
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-grey-light"
      >
        +
      </button>
    </div>
  );
}
