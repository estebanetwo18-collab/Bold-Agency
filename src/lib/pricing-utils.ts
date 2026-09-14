import { pricingCatalog, pricingConfig, type PricingItem } from "@/lib/pricing-config";

export function formatCrc(amount: number) {
  return `₡${Math.round(amount).toLocaleString("es-CR")}`;
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
    vatAmount,
    total,
    totalIsEstimate: lines.some((line) => line.isEstimate),
  };
}
