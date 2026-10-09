import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import "./chika.css";
import { site } from "@/lib/chika/config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"], // latin-ext incluye el signo ₡ (colón)
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Serif de alto contraste para titulares y nombres: es el mismo lenguaje del
// logotipo y de los nombres de experiencia del catálogo impreso.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/chika" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_CR",
    type: "website",
    images: [{ url: "/chika/chika-hero-cabello-ondas.jpg", width: 1080, height: 1350, alt: "Cabello castaño con reflejos dorados en ondas largas" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FBF5F4", width: "device-width", initialScale: 1 };

// Layout raíz propio: la landing Chika es independiente del sitio BOLD ([locale]).
export default function ChikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={`${montserrat.variable} ${bodoni.variable}`}>
      <body className="ck-body">{children}</body>
    </html>
  );
}
