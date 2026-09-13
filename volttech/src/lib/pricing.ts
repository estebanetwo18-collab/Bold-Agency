/**
 * Motor de cálculo de la calculadora de cotización.
 *
 * REGLAS DE INTEGRIDAD DE DATOS (no negociables, ver AGENTS del proyecto):
 * - Cada cifra de la tabla de precios lleva su etiqueta de confianza
 *   (Verificado / Estimado / Inferencia) como comentario, junto al dato.
 * - El margen (MARGIN_RATE) nunca se expone en la vista pública/cliente.
 * - Todo resultado se muestra como RANGO, nunca como cifra única.
 */

export type SystemType = "on-grid" | "hibrido" | "off-grid";

export interface KwBreakpoint {
  kw: number;
  lowColones: number;
  highColones: number;
}

/**
 * Tabla base de costo (colones), sistema on-grid sin batería.
 * Fuente: tabla pública de Sunshine Tech, interpolada (research interno,
 * agosto 2026). Etiqueta de confianza: VERIFICADO para cada punto.
 */
export const ON_GRID_PRICE_TABLE: KwBreakpoint[] = [
  { kw: 3, lowColones: 2_100_000, highColones: 3_200_000 }, // Verificado
  { kw: 5, lowColones: 3_200_000, highColones: 4_800_000 }, // Verificado
  { kw: 8, lowColones: 5_250_000, highColones: 7_550_000 }, // Verificado
  { kw: 10, lowColones: 6_500_000, highColones: 9_500_000 }, // Verificado
  { kw: 15, lowColones: 9_300_000, highColones: 14_700_000 }, // Verificado
  { kw: 30, lowColones: 19_100_000, highColones: 29_100_000 }, // Verificado
];

/** Costo de batería por kWh de banco. Etiqueta: ESTIMADO. */
export const BATTERY_COST_PER_KWH_COLONES = 580_000; // Estimado

/** kWh de batería por cada kW instalado, en sistemas híbridos. Etiqueta: ESTIMADO. */
export const BATTERY_KWH_PER_INSTALLED_KW = 0.8; // Estimado

/**
 * Off-grid: el banco de batería se amplía respecto al híbrido (más autonomía,
 * sin respaldo de red), y la electrónica de control (cargador, controlador de
 * carga, etc.) suma un costo adicional sobre el total.
 * Etiqueta: INFERENCIA — patrón de industria, no cotización específica de CR.
 */
export const OFF_GRID_BATTERY_MULTIPLIER = 2.2; // Inferencia
export const OFF_GRID_CONTROL_ELECTRONICS_SURCHARGE = 0.08; // Inferencia

/**
 * Margen interno de Volt Tech aplicado sobre el costo base para llegar al
 * precio final del cliente. Configurable — NUNCA se muestra en la vista
 * pública/cliente, solo en la vista admin (?admin=1).
 */
export const MARGIN_RATE = 0.3; // margen configurable, no es cifra fija de negocio

/** Umbrales de viabilidad — por debajo de esto, el proyecto podría no ser rentable. */
export const MIN_VIABLE_RESIDENTIAL_KWH_MONTH = 200;
export const MIN_VIABLE_COMMERCIAL_KWH_YEAR = 3000;

/**
 * Estimación de tarifa eléctrica residencial promedio (colones/kWh), usada
 * SOLO para convertir "monto de factura" en un estimado preliminar de
 * consumo. No sustituye la factura real: bloques tarifarios, cargos fijos
 * y el proveedor (ICE, CNFL, Coopelesca, ESPH) cambian el resultado real.
 * Etiqueta: INFERENCIA — tarifa promedio de referencia, no una tarifa oficial.
 */
export const AVERAGE_RESIDENTIAL_RATE_COLONES_PER_KWH = 95; // Inferencia

/** Horas sol pico promedio, Zona Sur / costa (Pérez Zeledón y alrededores). Inferencia. */
export const PEAK_SUN_HOURS = 4.6; // Inferencia
/** Relación de rendimiento del sistema (pérdidas por cableado, inversor, suciedad, etc.). Inferencia. */
export const SYSTEM_PERFORMANCE_RATIO = 0.78; // Inferencia

export interface ApplianceOption {
  key: string;
  label: string;
  estimatedKwhPerMonth: number; // Inferencia — patrón de industria
}

/** Checklist de equipos para clientes sin electricidad / sin factura previa. */
export const APPLIANCE_CHECKLIST: ApplianceOption[] = [
  { key: "refrigeradora", label: "Refrigeradora", estimatedKwhPerMonth: 90 },
  { key: "congelador", label: "Congelador / freezer", estimatedKwhPerMonth: 60 },
  { key: "iluminacion", label: "Iluminación LED (casa completa)", estimatedKwhPerMonth: 15 },
  { key: "television", label: "Televisor(es)", estimatedKwhPerMonth: 20 },
  { key: "lavadora", label: "Lavadora de ropa", estimatedKwhPerMonth: 20 },
  { key: "aire", label: "Aire acondicionado (1 unidad)", estimatedKwhPerMonth: 150 },
  { key: "bomba", label: "Bomba de agua", estimatedKwhPerMonth: 40 },
  { key: "electronica", label: "Computadora, router y electrónica menor", estimatedKwhPerMonth: 20 },
];

function clampInterpolate(kw: number): { lowColones: number; highColones: number } {
  const table = ON_GRID_PRICE_TABLE;
  if (kw <= table[0].kw) return { lowColones: table[0].lowColones, highColones: table[0].highColones };
  const last = table[table.length - 1];
  if (kw >= last.kw) return { lowColones: last.lowColones, highColones: last.highColones };

  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (kw >= a.kw && kw <= b.kw) {
      const t = (kw - a.kw) / (b.kw - a.kw);
      return {
        lowColones: Math.round(a.lowColones + t * (b.lowColones - a.lowColones)),
        highColones: Math.round(a.highColones + t * (b.highColones - a.highColones)),
      };
    }
  }
  return { lowColones: last.lowColones, highColones: last.highColones };
}

export interface ConsumptionEstimate {
  monthlyKwh: number;
  annualKwh: number;
  source: "factura" | "checklist";
}

export function estimateConsumptionFromBill(billColones: number): ConsumptionEstimate {
  const monthlyKwh = billColones / AVERAGE_RESIDENTIAL_RATE_COLONES_PER_KWH;
  return { monthlyKwh, annualKwh: monthlyKwh * 12, source: "factura" };
}

export function estimateConsumptionFromChecklist(selectedKeys: string[]): ConsumptionEstimate {
  const monthlyKwh = APPLIANCE_CHECKLIST.filter((a) => selectedKeys.includes(a.key)).reduce(
    (sum, a) => sum + a.estimatedKwhPerMonth,
    0,
  );
  return { monthlyKwh, annualKwh: monthlyKwh * 12, source: "checklist" };
}

export function estimateSystemKw(monthlyKwh: number): number {
  const dailyKwh = monthlyKwh / 30;
  const kw = dailyKwh / (PEAK_SUN_HOURS * SYSTEM_PERFORMANCE_RATIO);
  return Math.max(kw, 1);
}

export interface ViabilityCheck {
  isViable: boolean;
  isCommercial: boolean;
  reason?: string;
}

export function checkViability(consumption: ConsumptionEstimate, isCommercial: boolean): ViabilityCheck {
  if (isCommercial) {
    if (consumption.annualKwh < MIN_VIABLE_COMMERCIAL_KWH_YEAR) {
      return {
        isViable: false,
        isCommercial,
        reason: `Con un consumo estimado de ${Math.round(consumption.annualKwh).toLocaleString(
          "es-CR",
        )} kWh/año, el proyecto podría no ser rentable — el punto donde el solar suele activarse en comercial ronda los ${MIN_VIABLE_COMMERCIAL_KWH_YEAR.toLocaleString(
          "es-CR",
        )} kWh/año.`,
      };
    }
  } else if (consumption.monthlyKwh < MIN_VIABLE_RESIDENTIAL_KWH_MONTH) {
    return {
      isViable: false,
      isCommercial,
      reason: `Con un consumo estimado de ${Math.round(
        consumption.monthlyKwh,
      )} kWh/mes, el proyecto podría no ser rentable — el punto donde el solar suele activarse en residencial ronda los ${MIN_VIABLE_RESIDENTIAL_KWH_MONTH} kWh/mes. Aun así, con gusto lo revisamos con tu factura real.`,
    };
  }
  return { isViable: true, isCommercial };
}

export interface PriceRange {
  lowColones: number;
  highColones: number;
}

export interface QuoteBreakdown {
  systemType: SystemType;
  estimatedKw: number;
  baseCost: PriceRange; // costo base según tabla — NUNCA mostrar tal cual en vista cliente
  batteryCost: PriceRange | null;
  subtotalBeforeMargin: PriceRange;
  marginAmount: PriceRange;
  clientPrice: PriceRange; // precio final — este es el único rango que ve el cliente
}

export function calculateQuote(estimatedKw: number, systemType: SystemType): QuoteBreakdown {
  const base = clampInterpolate(estimatedKw);
  const baseCost: PriceRange = { lowColones: base.lowColones, highColones: base.highColones };

  let batteryCost: PriceRange | null = null;
  let subtotal: PriceRange = { ...baseCost };

  if (systemType === "hibrido") {
    const batteryKwh = estimatedKw * BATTERY_KWH_PER_INSTALLED_KW;
    const batteryValue = Math.round(batteryKwh * BATTERY_COST_PER_KWH_COLONES);
    batteryCost = { lowColones: batteryValue, highColones: batteryValue };
    subtotal = {
      lowColones: baseCost.lowColones + batteryCost.lowColones,
      highColones: baseCost.highColones + batteryCost.highColones,
    };
  } else if (systemType === "off-grid") {
    const hybridBatteryKwh = estimatedKw * BATTERY_KWH_PER_INSTALLED_KW;
    const offGridBatteryKwh = hybridBatteryKwh * OFF_GRID_BATTERY_MULTIPLIER;
    const batteryValue = Math.round(offGridBatteryKwh * BATTERY_COST_PER_KWH_COLONES);
    batteryCost = { lowColones: batteryValue, highColones: batteryValue };
    const preSurcharge: PriceRange = {
      lowColones: baseCost.lowColones + batteryCost.lowColones,
      highColones: baseCost.highColones + batteryCost.highColones,
    };
    subtotal = {
      lowColones: Math.round(preSurcharge.lowColones * (1 + OFF_GRID_CONTROL_ELECTRONICS_SURCHARGE)),
      highColones: Math.round(preSurcharge.highColones * (1 + OFF_GRID_CONTROL_ELECTRONICS_SURCHARGE)),
    };
  }

  const marginAmount: PriceRange = {
    lowColones: Math.round(subtotal.lowColones * MARGIN_RATE),
    highColones: Math.round(subtotal.highColones * MARGIN_RATE),
  };

  const clientPrice: PriceRange = {
    lowColones: subtotal.lowColones + marginAmount.lowColones,
    highColones: subtotal.highColones + marginAmount.highColones,
  };

  return {
    systemType,
    estimatedKw,
    baseCost,
    batteryCost,
    subtotalBeforeMargin: subtotal,
    marginAmount,
    clientPrice,
  };
}

export function formatColones(value: number): string {
  return value.toLocaleString("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 });
}

/**
 * Proyección financiera simplificada, horizonte máximo 5 años (vista cliente).
 * El ahorro se calcula como rango, comparando la factura actual estimada
 * contra un rango de reducción — nunca como cifra única ni "ahorra 90%".
 * Con las tarifas 2026 a la baja (ARESEP, -4,9% a -16,4% según distribuidora),
 * el énfasis del copy debe ir en independencia/respaldo, no en ahorro puro.
 */
export function estimateFiveYearSavingsRange(monthlyBillColones: number): PriceRange {
  const lowMonthlyOffset = monthlyBillColones * 0.35; // Inferencia — rango conservador
  const highMonthlyOffset = monthlyBillColones * 0.65; // Inferencia — rango optimista
  const months = 5 * 12;
  return {
    lowColones: Math.round(lowMonthlyOffset * months),
    highColones: Math.round(highMonthlyOffset * months),
  };
}
