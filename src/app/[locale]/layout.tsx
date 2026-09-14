import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { routing, type AppLocale } from "@/i18n/routing";
import { getContent } from "@/lib/content";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.boldagencycr.com";

const OG_LOCALE: Record<AppLocale, string> = { es: "es_CR", en: "en_US", pt: "pt_BR" };

const SKIP_LINK_LABEL: Record<AppLocale, string> = {
  es: "Saltar al contenido principal",
  en: "Skip to main content",
  pt: "Pular para o conteúdo principal",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { hero, footer } = getContent(activeLocale);
  const title = `BOLD Agency — ${hero.headline.join(" ")}`;
  const description = footer.description;

  const localePath = (l: AppLocale) => (l === routing.defaultLocale ? "/" : `/${l}/`);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s — BOLD Agency",
    },
    description,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, new URL(localePath(l), siteUrl).toString()]),
      ),
    },
    openGraph: {
      title,
      description,
      url: new URL(localePath(activeLocale), siteUrl).toString(),
      siteName: "BOLD Agency",
      locale: OG_LOCALE[activeLocale],
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const activeLocale = locale as AppLocale;

  return (
    <html lang={activeLocale} className={`${archivo.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          {SKIP_LINK_LABEL[activeLocale]}
        </a>
        <NextIntlClientProvider locale={activeLocale}>
          <CustomCursor />
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
