/**
 * Configuración del negocio y banderas de desarrollo de la landing Chika.
 * Todo dato de contacto sin confirmar vive aquí (y solo aquí).
 */

/** Marca los datos pendientes en magenta mientras se desarrolla. En producción
 *  se muestran en tono neutro; fuerza el valor con NEXT_PUBLIC_CHIKA_SHOW_PENDING. */
export const SHOW_PENDING =
  process.env.NEXT_PUBLIC_CHIKA_SHOW_PENDING
    ? process.env.NEXT_PUBLIC_CHIKA_SHOW_PENDING === "true"
    : process.env.NODE_ENV !== "production";

export const site = {
  name: "Chika Beauty Center & Spa",
  url: process.env.NEXT_PUBLIC_CHIKA_SITE_URL ?? "https://www.example.com/chika",
  title: "Chika · Colección de experiencias capilares",
  description:
    "Valoración capilar con capilógrafo digital y experiencias según lo que tu cabello necesita. Cotizá o agendá tu valoración en Chika por WhatsApp.",
};

/** Contacto. `null` = pendiente de confirmar (se renderiza el placeholder). */
export const contact = {
  /** Solo dígitos con código de país, p. ej. "506XXXXXXXX". Env: NEXT_PUBLIC_CHIKA_WHATSAPP */
  whatsapp: process.env.NEXT_PUBLIC_CHIKA_WHATSAPP?.replace(/\D/g, "") || null,
  instagram: process.env.NEXT_PUBLIC_CHIKA_INSTAGRAM || null, // URL completa
  address: null as string | null,
  hours: null as string | null,
  /** Si existe public/chika/chika-whatsapp-qr.png se usa automáticamente. */
  qrFile: "chika-whatsapp-qr.png",
};

export const placeholders = {
  whatsapp: "[NÚMERO DE WHATSAPP PENDIENTE DE CONFIRMAR]",
  instagram: "[INSTAGRAM]",
  address: "[DIRECCIÓN]",
  hours: "[HORARIO]",
  qr: "[QR]",
} as const;

/**
 * Enlace a WhatsApp con mensaje prellenado. Con número confirmado abre el chat
 * de Chika; sin número abre WhatsApp con el mensaje listo para elegir contacto
 * (el botón nunca queda sin acción). Configurar NEXT_PUBLIC_CHIKA_WHATSAPP.
 */
export function whatsappHref(message: string): string {
  const text = encodeURIComponent(message);
  return contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const hasWhatsappNumber = () => Boolean(contact.whatsapp);

/** JSON-LD de negocio local: solo se emite con datos suficientes (nombre, dirección y teléfono). */
export function localBusinessJsonLd() {
  if (!contact.address || !contact.whatsapp) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: site.name,
    url: site.url,
    telephone: `+${contact.whatsapp}`,
    address: { "@type": "PostalAddress", streetAddress: contact.address },
    ...(contact.hours ? { openingHours: contact.hours } : {}),
    ...(contact.instagram ? { sameAs: [contact.instagram] } : {}),
  };
}
