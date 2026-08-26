import Link from "next/link";
import { footer, nav } from "@/lib/content";
import { Monogram } from "@/components/ui/Monogram";

export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-20 text-paper lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-paper/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-display text-xl font-extrabold">
              <Monogram size={32} state="inverted" />
              {nav.logoLabel}
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-grey-light">
              {footer.description}
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm text-grey-light">
              <a href={`mailto:${footer.contact.email}`} className="w-fit transition-colors hover:text-volt">
                {footer.contact.email}
              </a>
              <span>{footer.contact.whatsapp}</span>
              <span>{footer.contact.address}</span>
            </div>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-grey">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-grey-light transition-colors hover:text-volt"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-grey sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <ul className="flex gap-6">
            {footer.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="transition-colors hover:text-volt">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
