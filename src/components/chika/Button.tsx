import { whatsappHref } from "@/lib/chika/config";
import { EVENTS, type CtaType } from "@/lib/chika/whatsapp";

const Arrow = () => (
  <svg className="ck-btn__arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

export const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg className="ck-wa-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.23 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"
    />
  </svg>
);

/** Botón que abre WhatsApp con un mensaje contextual y registra el clic. */
export function WhatsAppCta({
  label,
  message,
  location,
  experience,
  ctaType = "general",
  variant = "solid",
  className = "",
}: {
  label: string;
  message: string;
  location: string;
  experience?: string;
  ctaType?: CtaType;
  variant?: "solid" | "line" | "text";
  className?: string;
}) {
  return (
    <a
      className={`ck-btn ck-btn--${variant} ck-btn--wa ${className}`}
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track={EVENTS.whatsapp}
      data-location={location}
      data-experience={experience}
      data-cta-type={ctaType}
    >
      {variant !== "text" && <WaIcon />}
      <span>{label}</span>
      <span className="ck-visually-hidden"> (abre WhatsApp en una pestaña nueva)</span>
    </a>
  );
}

export function LinkCta({ href, label, variant = "line", track }: { href: string; label: string; variant?: "solid" | "line" | "text"; track?: string }) {
  return (
    <a className={`ck-btn ck-btn--${variant}`} href={href} data-track={track ? EVENTS.nav : undefined} data-location={track}>
      <span>{label}</span>
      <Arrow />
    </a>
  );
}
