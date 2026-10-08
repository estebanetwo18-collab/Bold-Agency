import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./chika.css";
import { site } from "@/lib/chika/config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"], // latin-ext incluye el signo ₡ (colón)
  weight: ["300", "400", "500", "600", "700", "800"],
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

export const viewport: Viewport = { themeColor: "#F7F4EF", width: "device-width", initialScale: 1 };

// Layout raíz propio: la landing Chika es independiente del sitio BOLD ([locale]).
export default function ChikaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={montserrat.variable}>
      <body className="ck-body">{children}</body>
    </html>
  );
}
