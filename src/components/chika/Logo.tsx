/**
 * Logotipo oficial de Chika (public/chika/chika-logo.svg, vectorial).
 * Se pinta con `currentColor` mediante máscara para adaptarse a fondos claros u oscuros.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "ck-logo ck-logo--compact" : "ck-logo"}>
      <span className="ck-logo__img" aria-hidden="true" />
      <span className="ck-visually-hidden">Chika Beauty Center &amp; Spa</span>
    </span>
  );
}
