import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.volttechcr.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoltTech Soluciones — Energía solar y eléctrica en la Zona Sur",
    template: "%s — VoltTech Soluciones",
  },
  description:
    "Instalación de paneles solares, sistemas híbridos y off-grid, servicios eléctricos y bombeo solar en Pérez Zeledón, Quepos, Dominical y la Zona Sur de Costa Rica.",
  keywords: [
    "energía solar Costa Rica",
    "paneles solares Pérez Zeledón",
    "instalación eléctrica Zona Sur",
    "VoltTech Soluciones",
    "bombeo solar Costa Rica",
  ],
  openGraph: {
    title: "VoltTech Soluciones — Energía solar y eléctrica en la Zona Sur",
    description:
      "Independencia energética y respaldo ante cortes, con procesos y garantías transparentes.",
    url: siteUrl,
    siteName: "VoltTech Soluciones",
    locale: "es_CR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main" className="pt-[var(--nav-height)]">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
