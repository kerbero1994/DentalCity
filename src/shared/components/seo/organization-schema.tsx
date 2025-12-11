/**
 * Enhanced Organization JSON-LD structured data component
 * Helps search engines understand the organization's complete information
 * Includes contact details, founding date, and organizational relationships
 */

export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LaborUnion",
    "@id": `${baseUrl}/#organization`,
    name: "SITIMM",
    legalName:
      "Sindicato de Trabajadores de la Industria Metálica, Mecánica, del Acero y Similares",
    alternateName: "SITIMM - CTM",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: "250",
      height: "60",
    },
    image: `${baseUrl}/opengraph-image`,
    description:
      "Sindicato de Trabajadores de la Industria Metálica, Mecánica, del Acero y Similares - Protegiendo los derechos de los trabajadores desde 1948",
    foundingDate: "1948",
    telephone: "+52-462-626-06-97",
    email: "sitimm.ctm@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "CEFORMA IRAPUATO MODERNA",
      addressLocality: "Irapuato",
      addressRegion: "Guanajuato",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.67739",
      longitude: "-101.3620912",
    },
    sameAs: [
      "https://www.facebook.com/YoSoySITIMM",
      "https://x.com/SITIMM_CTM",
      "https://www.youtube.com/@sitimm8775",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+52-462-626-06-97",
        email: "sitimm.ctm@gmail.com",
        availableLanguage: ["Spanish", "English"],
        areaServed: "MX",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
    memberOf: {
      "@type": "Organization",
      name: "CTM - Confederación de Trabajadores de México",
      url: "https://ctm.org.mx",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
