"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logger } from "@/shared/utils/logger";

/**
 * Hook to detect language changes via query parameter
 *
 * Checks for ?lang-changed=true in URL
 * - If present: Shows animation ONCE and removes param after animations complete
 * - If absent: No animation
 *
 * This ensures animation only shows on the page where language was changed
 */
export function useLanguageChange(): {
  hasLanguageChanged: boolean;
  onAnimationComplete: () => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const [hasLanguageChanged, setHasLanguageChanged] = useState(false);
  const hasProcessedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      return;
    }

    // Check for query parameter using window.location
    const urlParams = new URLSearchParams(window.location.search);
    const langChanged = urlParams.get("lang-changed");

    if (langChanged === "true" && !hasProcessedRef.current) {
      // Mark as processed to avoid double execution
      hasProcessedRef.current = true;

      // Language was changed, show animation
      setHasLanguageChanged(true);

      logger.log("[Language Change] Animation triggered via query param");

      return;
    }

    if (langChanged !== "true") {
      // No query param, no animation
      setHasLanguageChanged(false);
    }
  }, [pathname]); // Re-run when pathname changes

  const onAnimationComplete = useCallback(() => {
    logger.log("[Language Change] Animation complete, removing query param in 500ms...");

    // Small delay to ensure all animations are truly done
    timeoutRef.current = setTimeout(() => {
      // Check if we're in the browser
      if (typeof window === "undefined") {
        return;
      }

      // Remove the query parameter from URL (clean URL)
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete("lang-changed");

      // Build new URL without the parameter
      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}`
        : pathname;

      // Replace current URL without the param (no page reload)
      router.replace(newUrl, { scroll: false });

      logger.log("[Language Change] Query param removed after animation");
    }, 500);
  }, [pathname, router]);

  return {
    hasLanguageChanged,
    onAnimationComplete,
  };
}
