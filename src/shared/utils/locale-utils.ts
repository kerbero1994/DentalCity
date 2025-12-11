/**
 * Utility functions for locale detection and regional configuration
 */

import type { Locale, CountryCode, IPGeolocationResponse } from "@/core/types";
import { logger } from "@/shared/utils/logger";

// List of Spanish-speaking countries (ISO 3166-1 alpha-2 codes)
export const spanishSpeakingCountries = [
  "AR", // Argentina
  "BO", // Bolivia
  "CL", // Chile
  "CO", // Colombia
  "CR", // Costa Rica
  "CU", // Cuba
  "DO", // Dominican Republic
  "EC", // Ecuador
  "SV", // El Salvador
  "GQ", // Equatorial Guinea
  "GT", // Guatemala
  "HN", // Honduras
  "MX", // Mexico
  "NI", // Nicaragua
  "PA", // Panama
  "PY", // Paraguay
  "PE", // Peru
  "PR", // Puerto Rico
  "ES", // Spain
  "UY", // Uruguay
  "VE", // Venezuela
];

// European countries for flag detection
export const europeanCountries = [
  "AD",
  "AL",
  "AT",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "RU",
  "SE",
  "SI",
  "SK",
  "SM",
  "UA",
  "UK",
  "VA",
];

// American countries (excluding Spanish-speaking for clarity)
export const americanCountries = [
  "US",
  "CA",
  "MX",
  "GT",
  "BZ",
  "SV",
  "HN",
  "NI",
  "CR",
  "PA",
  "CO",
  "VE",
  "GY",
  "SR",
  "GF",
  "BR",
  "PE",
  "EC",
  "BO",
  "PY",
  "CL",
  "AR",
  "UY",
  "CU",
  "DO",
  "HT",
  "JM",
  "BS",
  "BB",
  "TT",
];

/**
 * Detect user's country from various sources
 */
export async function detectUserCountry(): Promise<CountryCode | null> {
  // Try to get country from timezone
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Map common timezones to countries (simplified)
    if (timezone.includes("Mexico")) return "MX";
    if (
      timezone.includes("New_York") ||
      timezone.includes("Chicago") ||
      timezone.includes("Los_Angeles") ||
      timezone.includes("Denver")
    )
      return "US";
    if (timezone.includes("Madrid") || timezone.includes("Canary")) return "ES";
    if (timezone.includes("London")) return "GB";
  } catch (e) {
    logger.error("Error detecting timezone:", e);
  }

  // Try IP-based geolocation as fallback (client-side)
  if (typeof window !== "undefined") {
    try {
      const response = await fetch("https://ipapi.co/json/", {
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      if (response.ok) {
        const data = (await response.json()) as IPGeolocationResponse;
        return data.country_code || null;
      }
    } catch (e) {
      logger.error("Error detecting country from IP:", e);
    }
  }

  return null;
}

/**
 * Detect user's preferred language from browser
 */
export function detectBrowserLanguage(): Locale {
  if (typeof window === "undefined") return "en";

  // Check navigator.language and navigator.languages
  const languages = [navigator.language, ...(navigator.languages || [])].filter(Boolean);

  // Check if any of the preferred languages is Spanish
  for (const lang of languages) {
    if (lang.toLowerCase().startsWith("es")) {
      return "es";
    }
  }

  return "en";
}

/**
 * Determine default locale based on browser language and fallback to country
 */
export function getDefaultLocale(countryCode: CountryCode | null): Locale {
  // First priority: Browser language
  const browserLang = detectBrowserLanguage();
  if (browserLang === "es") return "es";

  // Fallback: Country-based detection
  if (countryCode && spanishSpeakingCountries.includes(countryCode.toUpperCase())) {
    return "es";
  }

  return "en";
}

/**
 * Get appropriate flag for language based on user's region
 */
export function getFlagForLanguage(language: Locale, countryCode: CountryCode | null): string {
  const country = countryCode?.toUpperCase();

  if (!country) {
    // Default flags when no location detected
    return language === "es" ? "🇲🇽" : "🇺🇸";
  }

  // Determine region
  const isInEurope = europeanCountries.includes(country);
  const isInAmericas = americanCountries.includes(country);

  if (language === "es") {
    if (isInEurope) return "🇪🇸"; // Spain flag for Europe
    if (isInAmericas) return "🇲🇽"; // Mexico flag for Americas
    return ""; // No flag for other regions
  } else {
    // English
    if (isInEurope) return "🇬🇧"; // UK flag for Europe
    if (isInAmericas) return "🇺🇸"; // US flag for Americas
    return ""; // No flag for other regions
  }
}

/**
 * Check if flags should be shown based on region
 */
export function shouldShowFlags(countryCode: CountryCode | null): boolean {
  if (!countryCode) return true; // Show flags by default

  const country = countryCode.toUpperCase();
  return europeanCountries.includes(country) || americanCountries.includes(country);
}
