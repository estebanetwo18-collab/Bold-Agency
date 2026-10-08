import { SHOW_PENDING } from "@/lib/chika/config";

/** Dato pendiente de confirmar: magenta (con marca de texto, no solo color) en desarrollo; neutro en producción. */
export function Pending({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <span className={SHOW_PENDING ? "ck-pending ck-pending--dev" : "ck-pending"} data-pending="true">
      {SHOW_PENDING && <span className="ck-pending__tag">Pendiente</span>}
      {label ? <span className="ck-visually-hidden">{label}: </span> : null}
      {children}
    </span>
  );
}

/** Lista de datos pendientes de una sección (solo visible en desarrollo). */
export function PendingNotes({ items }: { items: string[] }) {
  if (!SHOW_PENDING || items.length === 0) return null;
  return (
    <aside className="ck-pending-notes" aria-label="Datos pendientes de confirmar (solo desarrollo)">
      <p className="ck-pending-notes__title">Pendiente de confirmar</p>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </aside>
  );
}
