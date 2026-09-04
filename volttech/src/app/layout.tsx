import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.volttechcr.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoltTech Soluciones — Energía solar e ingeniería eléctrica en la Zona Sur",
    template: "%s — VoltTech Soluciones",
  },
  description:
    "Diseño e instalación de sistemas solares on-grid, híbridos y off-grid, servicios eléctricos y bombeo solar en Pérez Zeledón, Quepos, Dominical y la Zona Sur de Costa Rica. Calculadora de cotización, garantías por componente y proceso 100% transparente.",
  keywords: [
    "energía solar Costa Rica",
    "paneles solares Pérez Zeledón",
    "instalación eléctrica Zona Sur",
    "VoltTech Soluciones",
    "bombeo solar Costa Rica",
    "sistema híbrido solar",
  ],
  openGraph: {
    title: "VoltTech Soluciones — Energía solar e ingeniería eléctrica en la Zona Sur",
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
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
