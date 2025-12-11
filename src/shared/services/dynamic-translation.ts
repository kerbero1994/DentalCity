/**
 * Dynamic Translation Service
 * Handles on-demand translation using various translation APIs
 * with caching and fallback strategies
 */

import { translationCache } from "./translation-cache";

interface TranslationRequest {
  text: string;
  contentType: string;
  id: string;
  field: string;
}

interface TranslationResult {
  original: string;
  translated: string;
  contentType: string;
  id: string;
  field: string;
}

type TranslationProvider = "google" | "deepl" | "libretranslate";

interface TranslationConfig {
  provider: TranslationProvider;
  apiKey?: string;
  endpoint?: string;
}

class DynamicTranslationService {
  private config: TranslationConfig = {
    provider: "libretranslate",
    endpoint: "https://libretranslate.com/translate",
  };

  // Rate limiting
  private requestQueue: Array<() => Promise<void>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private minRequestInterval = 100; // ms between requests

  /**
   * Configure the translation service
   */
  configure(config: Partial<TranslationConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Translate a single text
   */
  async translate(
    text: string,
    targetLocale: string,
    sourceLocale: string = "es",
    contentType: string = "content",
    id: string = "unknown",
    field: string = "text"
  ): Promise<string> {
    if (!text || text.trim() === "") {
      return text;
    }

    // Check cache first
    const cached = await translationCache.get(targetLocale, contentType, id, field);
    if (cached) {
      return cached;
    }

    // Translate
    const translated = await this.translateWithProvider(text, targetLocale, sourceLocale);

    // Cache the result
    await translationCache.set(targetLocale, contentType, id, field, translated);

    return translated;
  }

  /**
   * Translate multiple texts in batch
   */
  async translateBatch(
    requests: TranslationRequest[],
    targetLocale: string,
    sourceLocale: string = "es"
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();

    if (requests.length === 0) {
      return results;
    }

    // Check cache for all requests
    const cacheRequests = requests.map((req) => ({
      contentType: req.contentType,
      id: req.id,
      field: req.field,
    }));

    const cachedResults = await translationCache.getBatch(targetLocale, cacheRequests);

    // Separate cached and non-cached requests
    const requestsToTranslate: TranslationRequest[] = [];
    const cacheKeys = new Map<string, string>();

    requests.forEach((req) => {
      const key = this.generateCacheKey(targetLocale, req.contentType, req.id, req.field);
      cacheKeys.set(key, `${req.contentType}:${req.id}:${req.field}`);

      if (cachedResults.has(key)) {
        results.set(key, cachedResults.get(key)!);
      } else {
        requestsToTranslate.push(req);
      }
    });

    if (requestsToTranslate.length === 0) {
      return results;
    }

    // Translate non-cached items
    const translationPromises = requestsToTranslate.map(async (req) => {
      const translated = await this.translateWithProvider(req.text, targetLocale, sourceLocale);
      const key = this.generateCacheKey(targetLocale, req.contentType, req.id, req.field);

      results.set(key, translated);

      // Cache the result
      await translationCache.set(targetLocale, req.contentType, req.id, req.field, translated);

      return { key, translated };
    });

    // Process translations with rate limiting
    await this.processWithRateLimit(translationPromises);

    return results;
  }

  /**
   * Translate using the configured provider
   */
  private async translateWithProvider(
    text: string,
    targetLocale: string,
    sourceLocale: string
  ): Promise<string> {
    try {
      switch (this.config.provider) {
        case "google":
          return await this.translateWithGoogle(text, targetLocale, sourceLocale);
        case "deepl":
          return await this.translateWithDeepL(text, targetLocale, sourceLocale);
        case "libretranslate":
        default:
          return await this.translateWithLibreTranslate(text, targetLocale, sourceLocale);
      }
    } catch (error) {
      console.error(`Translation error with ${this.config.provider}:`, error);
      // Fallback to LibreTranslate if main provider fails
      if (this.config.provider !== "libretranslate") {
        try {
          return await this.translateWithLibreTranslate(text, targetLocale, sourceLocale);
        } catch (fallbackError) {
          console.error("Fallback translation also failed:", fallbackError);
          return text; // Return original text if all fails
        }
      }
      return text;
    }
  }

  /**
   * Translate using Google Translate API
   */
  private async translateWithGoogle(
    text: string,
    targetLocale: string,
    sourceLocale: string
  ): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("Google Translate API key not configured");
    }

    const url = `https://translation.googleapis.com/language/translate/v2`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLocale,
        target: this.mapLocaleToGoogleCode(targetLocale),
        format: "text",
        key: this.config.apiKey,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
  }

  /**
   * Translate using DeepL API
   */
  private async translateWithDeepL(
    text: string,
    targetLocale: string,
    sourceLocale: string
  ): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("DeepL API key not configured");
    }

    const url = "https://api-free.deepl.com/v2/translate";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${this.config.apiKey}`,
      },
      body: new URLSearchParams({
        text: text,
        source_lang: sourceLocale.toUpperCase(),
        target_lang: this.mapLocaleToDeepLCode(targetLocale),
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  }

  /**
   * Translate using LibreTranslate (free, open-source)
   */
  private async translateWithLibreTranslate(
    text: string,
    targetLocale: string,
    sourceLocale: string
  ): Promise<string> {
    const endpoint = this.config.endpoint || "https://libretranslate.com/translate";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLocale,
        target: this.mapLocaleToLibreTranslateCode(targetLocale),
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`LibreTranslate API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translatedText || text;
  }

  /**
   * Process promises with rate limiting
   */
  private async processWithRateLimit(promises: Promise<unknown>[]): Promise<void> {
    for (const promise of promises) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minRequestInterval) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
        );
      }

      this.lastRequestTime = Date.now();
      await promise;
    }
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(locale: string, contentType: string, id: string, field: string): string {
    return `${locale}:${contentType}:${id}:${field}`;
  }

  /**
   * Map locale codes to Google Translate codes
   */
  private mapLocaleToGoogleCode(locale: string): string {
    const mapping: Record<string, string> = {
      en: "en",
      es: "es",
      fr: "fr",
      de: "de",
      pt: "pt",
      it: "it",
      ja: "ja",
      ko: "ko",
      zh: "zh-CN",
      ru: "ru",
      ar: "ar",
    };
    return mapping[locale] || locale;
  }

  /**
   * Map locale codes to DeepL codes
   */
  private mapLocaleToDeepLCode(locale: string): string {
    const mapping: Record<string, string> = {
      en: "EN",
      es: "ES",
      fr: "FR",
      de: "DE",
      pt: "PT-PT",
      it: "IT",
      ja: "JA",
      ko: "KO",
      zh: "ZH",
      ru: "RU",
    };
    return mapping[locale] || locale.toUpperCase();
  }

  /**
   * Map locale codes to LibreTranslate codes
   */
  private mapLocaleToLibreTranslateCode(locale: string): string {
    const mapping: Record<string, string> = {
      en: "en",
      es: "es",
      fr: "fr",
      de: "de",
      pt: "pt",
      it: "it",
      ja: "ja",
      ko: "ko",
      zh: "zh",
      ru: "ru",
      ar: "ar",
    };
    return mapping[locale] || locale;
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    return await translationCache.getStats();
  }

  /**
   * Clear cache for a specific locale
   */
  async clearCache(locale?: string) {
    if (locale) {
      await translationCache.clearLocale(locale);
    } else {
      await translationCache.clearAll();
    }
  }
}

// Export singleton instance
export const dynamicTranslation = new DynamicTranslationService();

// Export types
export type { TranslationRequest, TranslationResult, TranslationProvider, TranslationConfig };
