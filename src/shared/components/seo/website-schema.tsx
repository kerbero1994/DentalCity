/**
 * WebSite JSON-LD structured data component
 * Enables search box in Google Search results
 */

interface WebSiteSchemaProps {
  locale: string;
}

export function WebSiteSchema({ locale }: WebSiteSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SITIMM",
    alternateName:
      "Sindicato de Trabajadores de la Industria Metálica, Mecánica, del Acero y Similares",
    url: `${baseUrl}/${locale}`,
    description:
      locale === "es"
        ? "Sindicato de Trabajadores de la Industria Metálica y Metalúrgica - Protección, representación y beneficios para los trabajadores"
        : "Metal and Metallurgical Industry Workers Union - Protection, representation and benefits for workers",
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "SITIMM",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
