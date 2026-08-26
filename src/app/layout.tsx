import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.boldagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BOLD Agency — Dirección de crecimiento integrada",
    template: "%s — BOLD Agency",
  },
  description:
    "BOLD integra estrategia, marca, contenido, medios y ventas bajo un solo equipo de dirección de crecimiento para negocios reales. Agenda tu Diagnóstico 360.",
  keywords: [
    "dirección de crecimiento",
    "agencia de marketing integral",
    "diagnóstico de negocio",
    "estrategia de marca",
    "BOLD Agency",
  ],
  openGraph: {
    title: "BOLD Agency — Dirección de crecimiento integrada",
    description:
      "Estrategia, marca, contenido, medios y ventas trabajando como un solo sistema. Agenda tu Diagnóstico 360.",
    url: siteUrl,
    siteName: "BOLD Agency",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOLD Agency — Dirección de crecimiento integrada",
    description:
      "Estrategia, marca, contenido, medios y ventas trabajando como un solo sistema.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
