"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

import type { GoogleTranslateAPI } from "@/core/types/legacy/external";

declare global {
  interface Window {
    google?: GoogleTranslateAPI;
    googleTranslateElementInit?: () => void;
  }
}

interface GoogleTranslateWidgetProps {
  /**
   * Whether to show the widget or auto-translate
   */
  showWidget?: boolean;
}

/**
 * Google Translate Widget for translating long-form content
 * Used for blog posts and magazine content where full translation
 * would be too expensive to pre-generate
 */
export function GoogleTranslateWidget({ showWidget = false }: GoogleTranslateWidgetProps) {
  const locale = useLocale();

  useEffect(() => {
    // Only load for non-Spanish locales
    if (locale === "es") return;

    // Track interval for cleanup
    let checkIntervalId: ReturnType<typeof setInterval> | null = null;

    // Define the initialization function
    window.googleTranslateElementInit = function () {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,es",
          layout: showWidget
            ? window.google.translate.TranslateElement.InlineLayout.SIMPLE
            : window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: !showWidget,
        },
        showWidget ? "google_translate_element" : null
      );

      // Auto-translate if not showing widget
      if (!showWidget && locale === "en") {
        // Wait for the translate to be ready (max 10 seconds to prevent memory leak)
        let attempts = 0;
        const maxAttempts = 100; // 100 * 100ms = 10 seconds

        checkIntervalId = setInterval(() => {
          attempts++;
          const translateSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;

          if (translateSelect) {
            translateSelect.value = "en";
            translateSelect.dispatchEvent(new Event("change"));
            if (checkIntervalId) clearInterval(checkIntervalId);
            checkIntervalId = null;

            // Hide the Google Translate bar
            const translateBar = document.querySelector(".goog-te-banner-frame") as HTMLElement;
            if (translateBar) {
              translateBar.style.display = "none";
            }
          } else if (attempts >= maxAttempts) {
            // Give up after max attempts to prevent memory leak
            if (checkIntervalId) clearInterval(checkIntervalId);
            checkIntervalId = null;
          }
        }, 100);
      }
    };

    // Check if script is already loaded
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already loaded, just initialize
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }

    // Cleanup function
    return () => {
      // Clear any running interval to prevent memory leak
      if (checkIntervalId) {
        clearInterval(checkIntervalId);
        checkIntervalId = null;
      }

      // Remove Google Translate cookies to reset state
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Remove translate bar if exists
      const translateBar = document.querySelector(".goog-te-banner-frame") as HTMLElement;
      if (translateBar) {
        translateBar.style.display = "none";
      }
    };
  }, [locale, showWidget]);

  // Don't render anything for Spanish
  if (locale === "es") return null;

  // If showing widget, provide a container
  if (showWidget) {
    return (
      <div className="google-translate-container">
        <div id="google_translate_element"></div>
      </div>
    );
  }

  // For auto-translate, return null (styles are handled globally)
  return null;
}
