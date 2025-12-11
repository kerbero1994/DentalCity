interface CollectionItem {
  title: string;
  description?: string;
  image?: string;
  url: string;
  datePublished?: string;
}

interface CollectionSchemaProps {
  name: string;
  description: string;
  items: CollectionItem[];
  locale: string;
}

export function CollectionSchema({ name, description, items, locale }: CollectionSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";
  const collectionUrl = `${baseUrl}/${locale}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: collectionUrl,
    inLanguage: locale === "es" ? "es-MX" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "SITIMM",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.title,
          description: item.description,
          image: item.image,
          url: item.url,
          datePublished: item.datePublished,
          publisher: {
            "@type": "Organization",
            name: "SITIMM",
            url: baseUrl,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
