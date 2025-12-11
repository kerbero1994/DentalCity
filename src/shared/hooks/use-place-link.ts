"use client";

import { useMemo, useCallback } from "react";

// Regular expression to detect URLs in text
const URL_RE = /https?:\/\/[^\s]+/gi;

export interface PlaceLink {
  label: string;
  url: string;
}

/**
 * Parses a place string to extract URL and generate map links
 * If the string contains a URL, it extracts it
 * Otherwise, creates a Google Maps search link
 */
export function parsePlaceLink(raw?: string | null): PlaceLink | null {
  if (!raw) return null;

  // Check if there's an explicit URL in the text
  const match = raw.match(URL_RE);
  const explicitUrl = match?.[0] ?? null;

  // Remove URL from label if found
  const label = raw.replace(URL_RE, "").trim();
  const safeLabel = label || explicitUrl || raw;

  // Detect if user is on mobile
  const isMobile =
    typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Build the URL: use explicit URL if found, otherwise create maps link
  let builtUrl = explicitUrl;

  if (!builtUrl) {
    if (isMobile) {
      // For mobile devices, use deep links that will open the native app
      if (isIOS) {
        // iOS: Try to open Apple Maps app
        builtUrl = `maps://maps.apple.com/?q=${encodeURIComponent(safeLabel)}`;
      } else {
        // Android: Try to open Google Maps app
        builtUrl = `geo:0,0?q=${encodeURIComponent(safeLabel)}`;
      }
    } else {
      // For desktop, always use Google Maps web
      builtUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeLabel)}`;
    }
  }

  return { label: safeLabel, url: builtUrl };
}

/**
 * Hook to parse place links and provide an open function
 */
export function usePlaceLink(raw?: string | null): {
  data: PlaceLink | null;
  open: () => void;
  hasLink: boolean;
} {
  const data = useMemo(() => parsePlaceLink(raw), [raw]);

  const open = useCallback(() => {
    if (!data?.url) return;

    // Check if it's a deep link for mobile apps
    if (data.url.startsWith("maps://") || data.url.startsWith("geo:")) {
      // Try to open the deep link
      window.location.href = data.url;

      // Fallback to web version after a delay if app doesn't open
      setTimeout(() => {
        const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.label)}`;
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }, 2000);
    } else {
      // Regular URL, open in new tab
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  }, [data?.url, data?.label]);

  return {
    data,
    open,
    hasLink: !!data,
  };
}
