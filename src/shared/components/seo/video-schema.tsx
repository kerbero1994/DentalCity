/**
 * VideoObject JSON-LD structured data component
 * Helps search engines understand video content for video rich results
 */

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT1M33S")
  locale?: string;
  publisher?: {
    name: string;
    logoUrl?: string;
  };
  interactionStatistic?: {
    interactionType: string;
    userInteractionCount: number;
  };
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  locale = "es",
  publisher,
  interactionStatistic,
}: VideoSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl],
    uploadDate,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
    ...(publisher && {
      publisher: {
        "@type": "Organization",
        name: publisher.name,
        ...(publisher.logoUrl && {
          logo: {
            "@type": "ImageObject",
            url: publisher.logoUrl,
          },
        }),
      },
    }),
    inLanguage: locale,
    ...(interactionStatistic && {
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: interactionStatistic.interactionType,
        userInteractionCount: interactionStatistic.userInteractionCount,
      },
    }),
    potentialAction: {
      "@type": "WatchAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: contentUrl || embedUrl || baseUrl,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
            "https://schema.org/IOSPlatform",
            "https://schema.org/AndroidPlatform",
          ],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Helper function to extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Helper function to create VideoSchema from YouTube URL
 */
export function createYouTubeVideoSchema(
  youtubeUrl: string,
  name: string,
  description: string,
  uploadDate: string,
  locale: string = "es"
) {
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId) {
    return null;
  }

  return (
    <VideoSchema
      name={name}
      description={description}
      thumbnailUrl={[
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      ]}
      uploadDate={uploadDate}
      contentUrl={`https://www.youtube.com/watch?v=${videoId}`}
      embedUrl={`https://www.youtube.com/embed/${videoId}`}
      locale={locale}
      publisher={{
        name: "SITIMM",
        logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org"}/logo.png`,
      }}
    />
  );
}
