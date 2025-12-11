import type { Metadata } from "next";
import type { PageConfig } from "@/core/types/lib/page-builder";
import { SectionRenderer } from "./SectionRenderer";

interface DynamicPageProps {
  config: PageConfig;
}

export function DynamicPage({ config }: DynamicPageProps) {
  const { sections } = config;

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  // Filter visible sections
  const visibleSections = sortedSections.filter((section) => section.visible !== false);

  return (
    <>
      {visibleSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}

/**
 * Generate metadata from page config
 */
export function generateMetadataFromConfig(config: PageConfig): Metadata {
  const { metadata } = config;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [metadata.ogImage] : undefined,
    },
    alternates: {
      canonical: metadata.canonical,
    },
  };
}
