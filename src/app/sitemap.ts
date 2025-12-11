import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentalcity.com";
  const currentDate = new Date();
  const locales = ["es", "en"];

  // Static pages for both locales
  const staticPages: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    });
  });

  return staticPages;
}
