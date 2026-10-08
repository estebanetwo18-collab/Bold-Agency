"use client";

import { useId, useState } from "react";

/** Acordeón accesible: colapsable en móvil, siempre abierto en escritorio (vía CSS). */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="ck-collapse" data-open={open}>
      <h3 className="ck-collapse__h">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{title}</span>
          <span className="ck-collapse__icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="ck-collapse__panel" role="region" aria-label={title}>
        <div className="ck-collapse__inner">{children}</div>
      </div>
    </div>
  );
}
