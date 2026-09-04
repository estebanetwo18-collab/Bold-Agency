import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Poppins única familia (Manual de Marca v1.0): 800 titulares, 600
// subtítulos, 400 cuerpo.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.volttechcr.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Volt Tech — Energía solar e ingeniería eléctrica en la Zona Sur",
    template: "%s — Volt Tech",
  },
  description:
    "Diseño e instalación de sistemas solares on-grid, híbridos y off-grid, servicios eléctricos y bombeo solar en Pérez Zeledón, Quepos, Dominical y la Zona Sur de Costa Rica. Calculadora de cotización, garantías por componente y proceso 100% transparente.",
  keywords: [
    "energía solar Costa Rica",
    "paneles solares Pérez Zeledón",
    "instalación eléctrica Zona Sur",
    "Volt Tech",
    "bombeo solar Costa Rica",
    "sistema híbrido solar",
  ],
  openGraph: {
    title: "Volt Tech — Energía solar e ingeniería eléctrica en la Zona Sur",
    description:
      "Independencia energética y respaldo ante cortes, con procesos y garantías transparentes.",
    url: siteUrl,
    siteName: "Volt Tech",
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
    <html lang="es" className={poppins.variable}>
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
