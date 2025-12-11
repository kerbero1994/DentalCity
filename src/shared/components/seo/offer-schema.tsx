/**
 * Offer JSON-LD structured data component
 * For displaying offers and benefits in search results
 */

interface OfferSchemaProps {
  name: string;
  description: string;
  price?: string | number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder" | "Available";
  validFrom?: string;
  validThrough?: string;
  url: string;
  seller?: {
    name: string;
    url?: string;
  };
  category?: string;
  eligibleRegion?: string;
  locale?: string;
}

export function OfferSchema({
  name,
  description,
  price = "0",
  priceCurrency = "MXN",
  availability = "Available",
  validFrom,
  validThrough,
  url,
  seller,
  category,
  eligibleRegion = "MX",
  locale = "es",
}: OfferSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    price: price.toString(),
    priceCurrency,
    availability: `https://schema.org/${availability}`,
    url,
    ...(validFrom && { validFrom }),
    ...(validThrough && { validThrough }),
    seller: {
      "@type": "Organization",
      name: seller?.name || "SITIMM",
      url: seller?.url || baseUrl,
    },
    ...(category && { category }),
    eligibleRegion: {
      "@type": "Country",
      name: eligibleRegion,
    },
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service with Offer component for union benefits
 */
interface ServiceOfferSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  offers: Array<{
    name: string;
    description?: string;
    price?: string | number;
    priceCurrency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder" | "Available";
    validFrom?: string;
    validThrough?: string;
  }>;
  url: string;
  locale?: string;
  provider?: {
    name: string;
    url?: string;
  };
  areaServed?: string;
}

export function ServiceOfferSchema({
  serviceName,
  serviceDescription,
  serviceType,
  offers,
  url,
  locale = "es",
  provider,
  areaServed = "Mexico",
}: ServiceOfferSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    serviceType,
    provider: {
      "@type": "Organization",
      name: provider?.name || "SITIMM",
      url: provider?.url || baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description || serviceDescription,
      price: (offer.price || "0").toString(),
      priceCurrency: offer.priceCurrency || "MXN",
      availability: `https://schema.org/${offer.availability || "Available"}`,
      ...(offer.validFrom && { validFrom: offer.validFrom }),
      ...(offer.validThrough && { validThrough: offer.validThrough }),
      url,
    })),
    url,
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ItemList of Offers for benefits page
 */
interface OfferListSchemaProps {
  name: string;
  description: string;
  offers: Array<{
    name: string;
    description: string;
    price?: string | number;
    url: string;
  }>;
  locale?: string;
}

export function OfferListSchema({
  name,
  description,
  offers,
  locale: _locale = "es",
}: OfferListSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: offers.length,
    itemListElement: offers.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        price: (offer.price || "0").toString(),
        priceCurrency: "MXN",
        availability: "https://schema.org/Available",
        seller: {
          "@type": "Organization",
          name: "SITIMM",
          url: baseUrl,
        },
        url: offer.url,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
