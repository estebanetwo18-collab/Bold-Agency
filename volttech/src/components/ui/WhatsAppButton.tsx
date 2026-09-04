import { DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/content";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a VoltTech por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.01 3C9.38 3 4 8.32 4 14.88c0 2.36.68 4.55 1.86 6.42L4 29l7.9-2.06a12.1 12.1 0 0 0 4.11.72c6.63 0 12.01-5.32 12.01-11.88C28.02 8.32 22.64 3 16.01 3Zm7.02 16.9c-.3.83-1.72 1.58-2.37 1.66-.6.08-1.36.11-2.2-.14-.5-.15-1.15-.37-1.98-.72-3.49-1.5-5.77-5.02-5.94-5.25-.17-.23-1.42-1.88-1.42-3.6 0-1.71.9-2.55 1.22-2.9.32-.34.7-.43.93-.43.23 0 .47 0 .67.01.21.01.5-.08.79.6.3.7 1.02 2.42 1.11 2.6.09.17.15.38.03.61-.12.23-.18.38-.36.58-.18.2-.38.45-.54.6-.18.17-.37.36-.16.7.21.34.94 1.54 2.01 2.5 1.38 1.23 2.55 1.61 2.9 1.79.35.17.55.15.76-.09.21-.24.9-1.04 1.14-1.4.24-.35.48-.29.79-.17.32.11 2.03.96 2.38 1.14.35.17.58.26.66.4.09.15.09.85-.21 1.68Z" />
      </svg>
    </a>
  );
}
