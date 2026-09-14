import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { portfolioConfig } from "@/lib/portfolio-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.boldagencycr.com";

function localePath(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/portafolio", changeFrequency: "monthly", priority: 0.8 },
    { path: "/cotizacion", changeFrequency: "monthly", priority: 0.9 },
    { path: "/privacidad", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terminos", changeFrequency: "yearly", priority: 0.3 },
  ];

  const portfolioPaths = portfolioConfig.map((item) => ({
    path: `/portafolio/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPaths, ...portfolioPaths].flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: localePath(locale, entry.path),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
  );
}
