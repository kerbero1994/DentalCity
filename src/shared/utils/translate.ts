/**
 * Translation utility using LibreTranslate (free and open source)
 * API: https://libretranslate.com (no API key required for public instance)
 */

const LIBRETRANSLATE_API = "https://libretranslate.com/translate";
// Delay between translations to avoid rate limit (0 in test environment)
const TRANSLATION_DELAY_MS = process.env.NODE_ENV === "test" ? 0 : 150;

// In-memory cache for translations (persists during server runtime)
const translationCache = new Map<string, string>();

function getCacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text.substring(0, 100)}`;
}

/**
 * Clear translation cache (for testing purposes)
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Translate text from Spanish to target language
 * Only runs in production builds, returns original text in development
 */
export async function translateText(text: string, targetLang: string = "en"): Promise<string> {
  // Skip translation in development
  if (process.env.NODE_ENV !== "production") {
    return text;
  }

  // If target is Spanish, return as is
  if (targetLang === "es" || !text) {
    return text;
  }

  // Check cache first
  const cacheKey = getCacheKey(text, targetLang);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Add delay to avoid rate limiting
    await delay(TRANSLATION_DELAY_MS);

    const response = await fetch(LIBRETRANSLATE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "es",
        target: targetLang,
        format: "text",
      }),
      // Cache for 24 hours
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      console.warn(`Translation failed: ${response.statusText}`);
      return text; // Fallback to original text
    }

    const data = await response.json();
    const translatedText = data.translatedText || text;

    // Cache the translation
    translationCache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
}

/**
 * Translate an object with text properties
 */
export async function translateObject<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
  targetLang: string = "en"
): Promise<T> {
  // Skip translation in development
  if (process.env.NODE_ENV !== "production" || targetLang === "es") {
    return obj;
  }

  const translated = { ...obj };

  for (const field of fields) {
    const value = obj[field];
    if (typeof value === "string" && value) {
      translated[field] = (await translateText(value, targetLang)) as T[keyof T];
    }
  }

  return translated;
}

/**
 * Translate an array of objects
 */
export async function translateArray<T extends Record<string, unknown>>(
  array: T[],
  fields: (keyof T)[],
  targetLang: string = "en"
): Promise<T[]> {
  // Skip translation in development
  if (process.env.NODE_ENV !== "production" || targetLang === "es") {
    return array;
  }

  return Promise.all(array.map((item) => translateObject(item, fields, targetLang)));
}
