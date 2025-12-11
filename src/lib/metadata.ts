/**
 * Metadata utilities for consistent SEO configuration
 */

/**
 * Get the site URL from environment variables
 * Falls back to localhost in development
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://sitimm.org";
}

/**
 * Get the metadata base URL object for Next.js metadata
 */
export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
