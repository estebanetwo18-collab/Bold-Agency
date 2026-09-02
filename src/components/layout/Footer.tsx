import Link from "next/link";
import { footer } from "@/lib/content";
import { Monogram } from "@/components/ui/Monogram";
import { LogoLockup } from "@/components/ui/LogoLockup";

export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-28 pt-20 text-paper lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-paper/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="BOLD Agency, inicio">
              <Monogram size={30} state="inverted" />
              <LogoLockup />
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

            <ul className="mt-7 flex items-center gap-3">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/15 text-paper transition-colors hover:border-volt hover:bg-volt hover:text-ink"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
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

        <div className="pt-8 text-xs text-grey">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 8.5h2V5.2c-.35-.05-1.53-.15-2.92-.15-2.9 0-4.88 1.77-4.88 5.02v2.68H6.3v3.7h2.9V21h3.8v-4.55h2.78l.44-3.7h-3.22V10.4c0-1.07.29-1.9 1.9-1.9Z"
            fill="currentColor"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 10.5V17M8 7.6v.01M12 17v-3.8c0-1.2.8-2 1.9-2 1 0 1.6.7 1.6 2V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17v-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
