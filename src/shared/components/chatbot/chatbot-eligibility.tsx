"use client";

import { useEffect, useState } from "react";

/**
 * Chatbot Eligibility Checker
 *
 * Determines if the chatbot should be displayed based on:
 * - User's country (Mexico only)
 * - Business hours (Monday-Friday, 9am-6pm Mexico City time)
 * - ConfigCat feature flags
 */

export interface EligibilityConfig {
  allowedCountries: string[];
  allowedLocales: string[]; // Only show chatbot for these locales (e.g., ["es", "en"])
  currentLocale?: string; // Current user locale
  businessHours: {
    timezone: string;
    days: number[]; // 0 = Sunday, 1 = Monday, etc.
    startHour: number;
    endHour: number;
  };
  enabled: boolean;
  demoMode?: boolean; // Bypass all restrictions if true
}

const DEFAULT_CONFIG: EligibilityConfig = {
  allowedCountries: ["MX", "Mexico", "México"],
  allowedLocales: ["es", "en"], // Chatbot only available in Spanish and English
  businessHours: {
    timezone: "America/Mexico_City",
    days: [1, 2, 3, 4, 5], // Monday to Friday
    startHour: 9,
    endHour: 18,
  },
  enabled: true,
};

/**
 * Get user's country using Geolocation API or IP-based detection
 */
async function getUserCountry(): Promise<string | null> {
  try {
    // Try to get country from browser's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Common Mexico timezones
    const mexicoTimezones = [
      "America/Mexico_City",
      "America/Cancun",
      "America/Chihuahua",
      "America/Hermosillo",
      "America/Matamoros",
      "America/Mazatlan",
      "America/Merida",
      "America/Monterrey",
      "America/Tijuana",
    ];

    if (mexicoTimezones.includes(timezone)) {
      return "MX";
    }

    // Try to get from cloudflare headers if available (Vercel provides this)
    const response = await fetch("/api/country");
    if (response.ok) {
      const data = await response.json();
      return data.country;
    }

    return null;
  } catch (error) {
    console.warn("Failed to detect user country:", error);
    return null;
  }
}

/**
 * Check if current time is within business hours
 */
function isWithinBusinessHours(config: EligibilityConfig["businessHours"]): boolean {
  try {
    const now = new Date();

    // Get current time in Mexico City timezone
    const mexicoTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: config.timezone,
      })
    );

    const currentDay = mexicoTime.getDay();
    const currentHour = mexicoTime.getHours();

    // Check if current day is a business day
    if (!config.days.includes(currentDay)) {
      return false;
    }

    // Check if current hour is within business hours
    return currentHour >= config.startHour && currentHour < config.endHour;
  } catch (error) {
    console.warn("Failed to check business hours:", error);
    // Default to true if we can't determine
    return true;
  }
}

export function useChatbotEligibility(config: EligibilityConfig = DEFAULT_CONFIG) {
  const [isEligible, setIsEligible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    async function checkEligibility() {
      setIsLoading(true);

      // Check if chatbot is explicitly disabled (e.g., for Lighthouse audits)
      // This check must come FIRST, even before development mode bypass
      if (!config.enabled) {
        setIsEligible(false);
        setReason("chatbot_disabled");
        setIsLoading(false);
        return;
      }

      // Demo mode: bypass all restrictions
      if (config.demoMode) {
        setIsEligible(true);
        setReason("demo_mode_enabled");
        setIsLoading(false);
        return;
      }

      // Development mode: bypass country/hours restrictions for testing
      // BUT still respect locale restrictions unless demo mode is active
      if (process.env.NODE_ENV === "development") {
        // Check locale even in development mode (unless demo mode is active)
        if (config.currentLocale && config.allowedLocales?.length > 0) {
          if (!config.allowedLocales.includes(config.currentLocale)) {
            setIsEligible(false);
            setReason("locale_not_allowed");
            setIsLoading(false);
            console.log(
              `🔧 Development mode: Chatbot disabled for locale "${config.currentLocale}" (only ${config.allowedLocales.join(", ")} supported)`
            );
            return;
          }
        }
        setIsEligible(true);
        setReason("development_mode");
        setIsLoading(false);
        console.log("🔧 Development mode: Chatbot restrictions bypassed for testing");
        return;
      }

      // Check locale - chatbot only available in specific languages
      if (config.currentLocale && config.allowedLocales?.length > 0) {
        if (!config.allowedLocales.includes(config.currentLocale)) {
          setIsEligible(false);
          setReason("locale_not_allowed");
          setIsLoading(false);
          return;
        }
      }

      // Check business hours
      const withinHours = isWithinBusinessHours(config.businessHours);
      if (!withinHours) {
        setIsEligible(false);
        setReason("outside_business_hours");
        setIsLoading(false);
        return;
      }

      // Check country
      const userCountry = await getUserCountry();
      if (userCountry && !config.allowedCountries.includes(userCountry)) {
        setIsEligible(false);
        setReason("country_not_allowed");
        setIsLoading(false);
        return;
      }

      // All checks passed
      setIsEligible(true);
      setReason("eligible");
      setIsLoading(false);
    }

    checkEligibility();
  }, [config]);

  return { isEligible, isLoading, reason };
}
