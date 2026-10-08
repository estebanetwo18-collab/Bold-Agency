import { whatsappHref, isExternalWhatsapp } from "@/lib/chika/config";

const Arrow = () => (
  <svg className="ck-btn__arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

/** Botón de reserva por WhatsApp (o ancla interna si el número no está confirmado). */
export function WhatsAppCta({
  label,
  message,
  variant = "solid",
  className = "",
}: {
  label: string;
  message: string;
  variant?: "solid" | "line";
  className?: string;
}) {
  const external = isExternalWhatsapp();
  return (
    <a
      className={`ck-btn ck-btn--${variant} ${className}`}
      href={whatsappHref(message)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{label}</span>
      <Arrow />
      {external && <span className="ck-visually-hidden"> (abre WhatsApp)</span>}
    </a>
  );
}

export function LinkCta({ href, label, variant = "line" }: { href: string; label: string; variant?: "solid" | "line" }) {
  return (
    <a className={`ck-btn ck-btn--${variant}`} href={href}>
      <span>{label}</span>
      <Arrow />
    </a>
  );
}
