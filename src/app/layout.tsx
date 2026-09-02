import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BOLD Agency — The bold way to grow",
    template: "%s — BOLD Agency",
  },
  description:
    "Marketing 360, branding y rotulación como una sola estrategia. Agencia creativa con base en Costa Rica y alcance en Brasil, Estados Unidos y España. Agenda tu Diagnóstico 360.",
  keywords: [
    "marketing 360",
    "agencia de branding",
    "rotulación",
    "publicidad digital Costa Rica",
    "BOLD Agency",
  ],
  openGraph: {
    title: "BOLD Agency — The bold way to grow",
    description:
      "Marketing 360, branding y rotulación como una sola estrategia. Agenda tu Diagnóstico 360.",
    url: siteUrl,
    siteName: "BOLD Agency",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOLD Agency — The bold way to grow",
    description: "Marketing 360, branding y rotulación como una sola estrategia.",
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
