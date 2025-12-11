/**
 * Supported Locales Configuration
 *
 * SINGLE SOURCE OF TRUTH for all translation configuration
 *
 * Defines translation strategy for each locale
 *
 * STRATEGY: Zero-Budget Incremental Translation
 * - All translations are pre-generated (no runtime translation)
 * - Script detects and translates only NEW content
 * - Uses DeepL free tier: 500k characters/month
 * - Content updates 2-3 times/month = plenty of quota
 * - Manual translations are preserved
 */

export type TranslationStrategy = "pregenerated" | "dynamic" | "disabled";

// Primary locales array (for Next.js compatibility)
export const locales = ["es", "en", "fr", "de", "ja", "ko", "zh", "hi"] as const;
export const defaultLocale = "es" as const;
export type Locale = (typeof locales)[number];

export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  strategy: TranslationStrategy;
  flag?: string;
  enabled: boolean;
  priority?: number; // 1 = high priority, translate first
}

/**
 * Primary locales have pre-generated translations for SEO and performance
 * These locales have static JSON files (e.g., programs.en.json)
 *
 * Note: With zero-budget strategy, ALL enabled locales use pre-generated translations
 */
export const PRIMARY_LOCALES = ["es", "en", "fr", "de", "ja", "ko", "zh", "hi"] as const;

/**
 * All supported locales configuration
 *
 * Strategy types:
 * - pregenerated: Has static JSON files, best performance and SEO
 * - disabled: Not yet translated
 *
 * Priority levels:
 * - 1: Already translated and active
 * - 2: Next to translate (high demand markets)
 * - 3: Future translations (lower priority)
 *
 * ZERO-BUDGET STRATEGY:
 * - Enable only locales with completed translations
 * - Run script monthly to translate new content
 * - DeepL free tier: 500k chars/month (more than enough for 2-3 updates)
 */
export const SUPPORTED_LOCALES: LocaleConfig[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    strategy: "pregenerated",
    flag: "🇪🇸",
    enabled: true,
    priority: 1,
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    strategy: "pregenerated",
    flag: "🇺🇸",
    enabled: true,
    priority: 1,
  },
  // Priority 2: Active multi-language support
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    strategy: "pregenerated",
    flag: "🇫🇷",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    strategy: "pregenerated",
    flag: "🇩🇪",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    strategy: "pregenerated",
    flag: "🇯🇵",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    strategy: "pregenerated",
    flag: "🇰🇷",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  {
    code: "zh",
    name: "Chinese (Simplified)",
    nativeName: "中文",
    strategy: "pregenerated",
    flag: "🇨🇳",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    strategy: "pregenerated",
    flag: "🇮🇳",
    enabled: true, // ✅ Translated
    priority: 2,
  },
  // Priority 3: Future languages
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    strategy: "pregenerated",
    flag: "🇵🇹",
    enabled: false, // Available for future
    priority: 3,
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    strategy: "pregenerated",
    flag: "🇮🇹",
    enabled: false,
    priority: 3,
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    strategy: "pregenerated",
    flag: "🇷🇺",
    enabled: false,
    priority: 3,
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    strategy: "pregenerated",
    flag: "🇸🇦",
    enabled: false,
    priority: 3,
  },
];

/**
 * Get locale configuration by code
 */
export function getLocaleConfig(code: string): LocaleConfig | undefined {
  return SUPPORTED_LOCALES.find((locale) => locale.code === code);
}

/**
 * Check if locale uses pre-generated translations
 */
export function isPrimaryLocale(locale: string): boolean {
  return PRIMARY_LOCALES.includes(locale as (typeof PRIMARY_LOCALES)[number]);
}

/**
 * Check if locale uses dynamic translations
 */
export function isDynamicLocale(locale: string): boolean {
  const config = getLocaleConfig(locale);
  return config?.strategy === "dynamic" && config.enabled;
}

/**
 * Get all enabled locales
 */
export function getEnabledLocales(): LocaleConfig[] {
  return SUPPORTED_LOCALES.filter((locale) => locale.enabled);
}

/**
 * Get translation strategy for a locale
 */
export function getTranslationStrategy(locale: string): TranslationStrategy {
  const config = getLocaleConfig(locale);
  if (!config || !config.enabled) {
    return "disabled";
  }
  return config.strategy;
}

/**
 * Validate if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  const config = getLocaleConfig(locale);
  return config !== undefined && config.enabled;
}

/**
 * Locale names map (for compatibility)
 */
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  hi: "हिन्दी",
};

/**
 * Locale flags map (for compatibility)
 */
export const localeFlags: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  hi: "🇮🇳",
};

/**
 * Language configuration for dropdowns/selectors (for compatibility)
 * Generates config from SUPPORTED_LOCALES
 */
export const languageConfig = getEnabledLocales().map((locale) => ({
  code: locale.code,
  name: locale.name,
  flag: locale.flag || "",
  nativeName: locale.nativeName,
}));
