/**
 * LocalBusiness (LaborUnion) JSON-LD structured data component
 * Helps search engines understand physical union offices with opening hours and contact info
 * Essential for Google Maps, Local Pack, and local SEO
 */

interface LocalBusinessSchemaProps {
  locale: string;
}

export function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LaborUnion", // Specialized type of LocalBusiness
    "@id": `${baseUrl}/#organization`,
    name: "SITIMM",
    legalName:
      "Sindicato de Trabajadores de la Industria Metálica, Mecánica, del Acero y Similares",
    alternateName: "SITIMM - CTM",
    description:
      locale === "es"
        ? "Sindicato de Trabajadores de la Industria Metálica y Metalúrgica - Protección, representación y beneficios para los trabajadores desde 1948"
        : "Metal and Metallurgical Industry Workers Union - Protection, representation and benefits for workers since 1948",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: "250",
      height: "60",
    },
    image: `${baseUrl}/opengraph-image`,
    telephone: "+52-462-626-06-97",
    email: "sitimm.ctm@gmail.com",
    foundingDate: "1948",
    priceRange: "N/A",

    // Main office - Irapuato
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

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],

    // Branch offices
    subOrganization: [
      {
        "@type": "LaborUnion",
        name: "SITIMM SILAO",
        telephone: "+52-472-722-35",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Silao",
          addressRegion: "Guanajuato",
          addressCountry: "MX",
        },
      },
      {
        "@type": "LaborUnion",
        name: "SITIMM CELAYA",
        telephone: "+52-461-608-02-30",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Celaya",
          addressRegion: "Guanajuato",
          addressCountry: "MX",
        },
      },
      {
        "@type": "LaborUnion",
        name: "SITIMM VILLAGRÁN",
        telephone: "+52-411-165-31-49",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Villagrán",
          addressRegion: "Guanajuato",
          addressCountry: "MX",
        },
      },
      {
        "@type": "LaborUnion",
        name: "SITIMM SAN JOSÉ ITURBIDE",
        telephone: "+52-419-198-25-51",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San José Iturbide",
          addressRegion: "Guanajuato",
          addressCountry: "MX",
        },
      },
    ],

    // Social Media
    sameAs: [
      "https://www.facebook.com/YoSoySITIMM",
      "https://x.com/SITIMM_CTM",
      "https://www.youtube.com/@sitimm8775",
    ],

    // Contact Point
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

    // Area Served
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },

    // Member of
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
