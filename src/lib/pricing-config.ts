// Fuente de datos de la calculadora — extraído literalmente de las hojas
// "Parámetros técnicos", "Reglas de negocio" y "Configuración" de
// Bold_Agency_Cotizador_Servicios.xlsx (compartido por el usuario). No
// reinterpretar montos: si el Excel cambia, este archivo se actualiza
// desde ahí.

export type PricingType = "fijo" | "rango" | "a_cotizar";
export type InputType = "radio" | "stepper" | "quote";

export type PricingItem = {
  id: string;
  category: string;
  label: string;
  pricingType: PricingType;
  inputType: InputType;
  /** Precio en colones. null para servicios "a cotizar". */
  priceMin: number | null;
  priceMax: number | null;
  /** Solo para inputType "radio": agrupa las opciones mutuamente excluyentes. */
  radioGroup?: string;
  devNote?: string;
};

// Hoja "Configuración" — todos los valores son editables ahí, no hardcodear
// en el frontend fuera de este único punto.
export const pricingConfig = {
  exchangeRateUsdToCrc: 450,
  vatRate: 0.13,
  comboDiscountRate: 0.1,
  comboDiscountMinLines: 2,
  roundToNearest: 1000,
};

export const pricingCatalog: PricingItem[] = [
  // Paquetes mensuales · Contenido — radio, mutuamente excluyentes
  {
    id: "pkg_bronce",
    category: "Paquetes mensuales",
    label: "Paquete Bronce",
    pricingType: "fijo",
    inputType: "radio",
    radioGroup: "paquete",
    priceMin: 75000,
    priceMax: 75000,
  },
  {
    id: "pkg_silver",
    category: "Paquetes mensuales",
    label: "Paquete Silver (más elegido)",
    pricingType: "fijo",
    inputType: "radio",
    radioGroup: "paquete",
    priceMin: 150000,
    priceMax: 150000,
  },
  {
    id: "pkg_bgold",
    category: "Paquetes mensuales",
    label: "Paquete B-Gold (Top Tier)",
    pricingType: "fijo",
    inputType: "radio",
    radioGroup: "paquete",
    priceMin: 220000,
    priceMax: 220000,
  },

  // Social & Contenido
  { id: "smm_mgmt", category: "Social & Contenido", label: "Social Media Management", pricingType: "fijo", inputType: "stepper", priceMin: 67500, priceMax: 67500 },
  { id: "copywriting", category: "Social & Contenido", label: "Copywriting & Contenido", pricingType: "fijo", inputType: "stepper", priceMin: 2250, priceMax: 2250 },
  { id: "diseno_grafico_pieza", category: "Social & Contenido", label: "Diseño Gráfico (pieza para redes)", pricingType: "fijo", inputType: "stepper", priceMin: 3600, priceMax: 3600 },
  { id: "fotografia_sesion", category: "Social & Contenido", label: "Fotografía de producto / corporativa", pricingType: "fijo", inputType: "stepper", priceMin: 35550, priceMax: 35550 },
  { id: "video_redes_mensual", category: "Social & Contenido", label: "Video corto para redes (paquete mensual)", pricingType: "fijo", inputType: "stepper", priceMin: 67050, priceMax: 67050 },
  { id: "video_corporativo", category: "Social & Contenido", label: "Video corporativo / publicitario (básico)", pricingType: "fijo", inputType: "stepper", priceMin: 89550, priceMax: 89550 },

  // Publicidad digital
  // Nota: "comision_grow_your_way" (comisión ajustable sobre pauta) es un
  // campo informativo del Excel, no un servicio con precio propio — no se
  // suma al subtotal, por eso no tiene fila aquí. Se muestra como nota en
  // la sección "Modalidades generales".
  { id: "paid_media_campana", category: "Publicidad digital", label: "Paid Media · Ads (gestión)", pricingType: "fijo", inputType: "stepper", priceMin: 27000, priceMax: 27000 },
  { id: "google_ads_gestion", category: "Publicidad digital", label: "Google Ads — gestión mensual", pricingType: "fijo", inputType: "stepper", priceMin: 35550, priceMax: 35550 },
  { id: "seo_basico", category: "Publicidad digital", label: "SEO básico / local", pricingType: "fijo", inputType: "stepper", priceMin: 35550, priceMax: 35550 },
  { id: "seo_avanzado", category: "Publicidad digital", label: "SEO avanzado (con GEO/IA)", pricingType: "fijo", inputType: "stepper", priceMin: 89550, priceMax: 89550 },

  // Estrategia de marketing
  { id: "estrategia_sesion", category: "Estrategia de marketing", label: "Estrategia de Marketing (sesión puntual)", pricingType: "fijo", inputType: "stepper", priceMin: 22500, priceMax: 22500 },
  { id: "plan_marketing", category: "Estrategia de marketing", label: "Plan de marketing integral", pricingType: "fijo", inputType: "stepper", priceMin: 67050, priceMax: 67050 },
  { id: "investigacion_mercado", category: "Estrategia de marketing", label: "Investigación de mercado / consumidor", pricingType: "fijo", inputType: "stepper", priceMin: 67050, priceMax: 67050 },

  // Diseño de marca
  { id: "diseno_logo", category: "Diseño de marca", label: "Diseño de logo", pricingType: "fijo", inputType: "stepper", priceMin: 22050, priceMax: 22050 },
  { id: "identidad_marca", category: "Diseño de marca", label: "Identidad de marca completa (manual de marca)", pricingType: "fijo", inputType: "stepper", priceMin: 44550, priceMax: 44550 },
  {
    id: "branding_rotulacion",
    category: "Diseño de marca",
    label: "Branding & Rotulación (integral)",
    pricingType: "a_cotizar",
    inputType: "quote",
    priceMin: null,
    priceMax: null,
    devNote: "Enviar a WhatsApp/email de Bold (+506 7244 5642 / esteban.munoz@boldagencycr.com)",
  },

  // Comercial / Ventas
  { id: "estrategia_comercial", category: "Comercial / Ventas", label: "Estrategia comercial / embudo de ventas", pricingType: "fijo", inputType: "stepper", priceMin: 67050, priceMax: 67050 },
  { id: "crm_setup", category: "Comercial / Ventas", label: "Implementación de CRM (configuración básica)", pricingType: "fijo", inputType: "stepper", priceMin: 44550, priceMax: 44550 },
  { id: "capacitacion_ventas", category: "Comercial / Ventas", label: "Capacitación de equipo de ventas", pricingType: "fijo", inputType: "stepper", priceMin: 44550, priceMax: 44550 },

  // Sitios web y desarrollo
  {
    id: "web_lanzamiento",
    category: "Sitios web y desarrollo",
    label: "Desarrollo de sitio web — precio de lanzamiento",
    pricingType: "rango",
    inputType: "stepper",
    priceMin: 67495.5,
    priceMax: 225000,
    devNote: "mostrar 'desde price_min_crc'",
  },
  { id: "web_mantenimiento", category: "Sitios web y desarrollo", label: "Mantenimiento web (mensual, no incluido en la promo)", pricingType: "fijo", inputType: "stepper", priceMin: 15000, priceMax: 15000 },

  // Rotulación & Experiencias
  {
    id: "rotulacion_granformato",
    category: "Rotulación & Experiencias",
    label: "Rotulación & gran formato",
    pricingType: "a_cotizar",
    inputType: "quote",
    priceMin: null,
    priceMax: null,
  },
  {
    id: "experiencias_360",
    category: "Rotulación & Experiencias",
    label: "Experiencias 360 (tienda + digital)",
    pricingType: "a_cotizar",
    inputType: "quote",
    priceMin: null,
    priceMax: null,
  },
  {
    id: "consultoria_360",
    category: "Rotulación & Experiencias",
    label: "Consultoría 360 (diagnóstico integral)",
    pricingType: "a_cotizar",
    inputType: "quote",
    priceMin: null,
    priceMax: null,
  },

  // Modalidades generales
  {
    id: "grow_your_way",
    category: "Modalidades generales",
    label: "Grow Your Way (estándar) — tarifa base",
    pricingType: "rango",
    inputType: "stepper",
    priceMin: 90000,
    priceMax: 90000,
    devNote: "mostrar 'desde price_min_crc'",
  },
  {
    id: "bold_way_implant",
    category: "Modalidades generales",
    label: "The Bold Way (implant)",
    pricingType: "a_cotizar",
    inputType: "quote",
    priceMin: null,
    priceMax: null,
  },
];

export const packageOptions = pricingCatalog.filter((item) => item.radioGroup === "paquete");

export const pointServiceCategories = Array.from(
  new Set(
    pricingCatalog.filter((item) => item.inputType !== "radio").map((item) => item.category),
  ),
);
