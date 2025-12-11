/**
 * Review and AggregateRating JSON-LD structured data component
 * For displaying star ratings in search results
 */

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSchemaProps {
  itemName: string;
  itemType?: "Service" | "Product" | "Event" | "Organization";
  reviews: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  locale: string;
  itemUrl?: string;
}

export function ReviewSchema({
  itemName,
  itemType = "Service",
  reviews,
  aggregateRating,
  locale: _locale,
  itemUrl,
}: ReviewSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";
  const url = itemUrl || baseUrl;

  // Calculate aggregate rating from reviews if not provided
  const calculatedAggregateRating = aggregateRating || {
    ratingValue: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": itemType,
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: calculatedAggregateRating.ratingValue,
      reviewCount: calculatedAggregateRating.reviewCount,
      bestRating: calculatedAggregateRating.bestRating || 5,
      worstRating: calculatedAggregateRating.worstRating || 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    provider: {
      "@type": "Organization",
      name: "SITIMM",
      url: baseUrl,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Simple AggregateRating component for items without detailed reviews
 */
interface AggregateRatingSchemaProps {
  itemName: string;
  itemType?: "Service" | "Product" | "Event" | "Organization";
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
  locale: string;
  itemUrl?: string;
}

export function AggregateRatingSchema({
  itemName,
  itemType = "Service",
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  locale: _locale,
  itemUrl,
}: AggregateRatingSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";
  const url = itemUrl || baseUrl;

  const schema = {
    "@context": "https://schema.org",
    "@type": itemType,
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating,
      worstRating,
    },
    provider: {
      "@type": "Organization",
      name: "SITIMM",
      url: baseUrl,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
