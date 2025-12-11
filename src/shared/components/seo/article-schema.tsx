/**
 * BlogPosting JSON-LD structured data component
 * Helps search engines understand blog post information with enhanced metadata
 */

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
  inLanguage?: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "SITIMM",
  url,
  keywords,
  wordCount,
  inLanguage = "es-MX",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://sitimm.org",
    },
    publisher: {
      "@type": "Organization",
      name: "SITIMM",
      url: "https://sitimm.org",
      logo: {
        "@type": "ImageObject",
        url: "https://sitimm.org/logo.png",
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: keywords ? keywords.join(", ") : undefined,
    wordCount: wordCount || undefined,
    inLanguage,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
