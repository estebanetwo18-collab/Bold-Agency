import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Multilenguaje deshabilitado temporalmente a pedido del cliente — solo
  // español por ahora. El contenido EN/PT sigue completo en
  // src/lib/content/{en,pt}.ts, listo para reactivar: basta con volver a
  // poner ["es", "en", "pt"] acá.
  locales: ["es"],
  defaultLocale: "es",
  // Español sin prefijo (comportamiento actual, no rompe URLs existentes);
  // inglés y portugués con prefijo /en, /pt — como pide el punto 4.
  localePrefix: "as-needed",
  // Costa Rica es el mercado principal: "/" siempre entra en español,
  // nunca redirige según el Accept-Language del navegador (un visitante
  // tico con el sistema operativo en inglés no debería aterrizar en la
  // versión EN sin pedirlo). Cambiar de idioma queda solo en manos del
  // selector del header.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
