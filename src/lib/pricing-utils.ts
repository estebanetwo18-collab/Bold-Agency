import { pricingCatalog, pricingConfig, type PricingItem } from "@/lib/pricing-config";

// Servicios puntuales de precio bajo (< ₡10,000) están pensados para
// venderse en combo con otros — si alguien elige un único rubro y ese
// rubro es de precio bajo, se recarga 50% para reflejar que no hay
// combinación que lo justifique.
const SOLO_LOW_PRICE_THRESHOLD = 10000;
const SOLO_LOW_PRICE_SURCHARGE_RATE = 0.5;

export function formatCrc(amount: number) {
  // "en-US" grouping (comma) to match the comma-separated prices used
  // elsewhere on the site (Plans, banners) — "es-CR" renders a thin space
  // as the thousands separator, which reads inconsistently side by side.
  return `₡${Math.round(amount).toLocaleString("en-US")}`;
}

export function itemById(id: string): PricingItem | undefined {
  return pricingCatalog.find((item) => item.id === id);
}

export type CalculatorState = {
  selectedPackageId: string | null;
  quantities: Record<string, number>;
};

export type CalculatorLine = {
  item: PricingItem;
  quantity: number;
  /** Precio unitario usado para el cálculo (priceMin para ítems "rango"). */
  unitPrice: number;
  lineTotal: number;
  /** true si el precio es un piso ("desde"), no un monto exacto. */
  isEstimate: boolean;
};

export type CalculatorResult = {
  lines: CalculatorLine[];
  calculableLineCount: number;
  subtotal: number;
  comboDiscountApplies: boolean;
  discountAmount: number;
  /** true si el único rubro elegido es un servicio de precio bajo elegido solo. */
  soloSurchargeApplies: boolean;
  soloSurchargeAmount: number;
  vatAmount: number;
  /** Total ya redondeado al múltiplo configurado (₡1,000 por defecto). */
  total: number;
  /** true si alguna línea incluida es "desde" (rango) — el total es un piso, no un monto cerrado. */
  totalIsEstimate: boolean;
};

export function calculateTotal(state: CalculatorState): CalculatorResult {
  const lines: CalculatorLine[] = [];

  if (state.selectedPackageId) {
    const pkg = itemById(state.selectedPackageId);
    if (pkg && pkg.priceMin !== null) {
      lines.push({ item: pkg, quantity: 1, unitPrice: pkg.priceMin, lineTotal: pkg.priceMin, isEstimate: false });
    }
  }

  if (!state.selectedPackageId) {
    for (const item of pricingCatalog) {
      if (item.inputType !== "stepper") continue;
      const qty = state.quantities[item.id] ?? 0;
      if (qty <= 0 || item.priceMin === null) continue;
      lines.push({
        item,
        quantity: qty,
        unitPrice: item.priceMin,
        lineTotal: item.priceMin * qty,
        isEstimate: item.pricingType === "rango",
      });
    }
  }

  // Un solo rubro de servicios puntuales, y ese rubro es de precio bajo:
  // no hay combinación que justifique el precio pensado para combo, así
  // que se recarga la línea antes de sumar el subtotal.
  let soloSurchargeAmount = 0;
  const soloSurchargeApplies =
    !state.selectedPackageId && lines.length === 1 && lines[0].unitPrice < SOLO_LOW_PRICE_THRESHOLD;
  if (soloSurchargeApplies) {
    const line = lines[0];
    const surchargedUnitPrice = line.unitPrice * (1 + SOLO_LOW_PRICE_SURCHARGE_RATE);
    const surchargedLineTotal = surchargedUnitPrice * line.quantity;
    soloSurchargeAmount = surchargedLineTotal - line.lineTotal;
    lines[0] = { ...line, unitPrice: surchargedUnitPrice, lineTotal: surchargedLineTotal };
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const calculableLineCount = lines.length;
  const comboDiscountApplies = calculableLineCount >= pricingConfig.comboDiscountMinLines;
  const discountAmount = comboDiscountApplies ? subtotal * pricingConfig.comboDiscountRate : 0;
  const afterDiscount = subtotal - discountAmount;
  const vatAmount = afterDiscount * pricingConfig.vatRate;
  const rawTotal = afterDiscount + vatAmount;
  const total =
    Math.round(rawTotal / pricingConfig.roundToNearest) * pricingConfig.roundToNearest;

  return {
    lines,
    calculableLineCount,
    subtotal,
    comboDiscountApplies,
    discountAmount,
    soloSurchargeApplies,
    soloSurchargeAmount,
    vatAmount,
    total,
    totalIsEstimate: lines.some((line) => line.isEstimate),
  };
}
