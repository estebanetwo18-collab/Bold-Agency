import { Archivo, JetBrains_Mono } from "next/font/google";
import "./promptcraft.css";

// Creato Display es comercial y no está en el repo: Archivo (300/700/900)
// es el reemplazo visual. Cuando haya .woff2 licenciados, cambiar aquí.
const display = Archivo({
  variable: "--font-pc-display",
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-pc-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export default function PromptCraftLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pc-root ${display.variable} ${mono.variable}`}>{children}</div>;
}
