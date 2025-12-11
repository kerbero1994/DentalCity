/**
 * Text manipulation utilities
 * Shared logic for text processing, normalization, and search
 */

/**
 * Normalize text for search comparison
 * Removes accents, converts to lowercase, and normalizes whitespace
 *
 * @param text - The text to normalize
 * @returns Normalized text
 *
 * @example
 * normalizeText("Programas Médicos") // "programas medicos"
 * normalizeText("Hello   World!") // "hello world!"
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .replace(/[+\-:]/g, " ") // Replace +, -, : with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
}

/**
 * Normalize text for strict search (removes all punctuation)
 * @param text - The text to normalize
 * @returns Normalized text without punctuation
 */
export function normalizeTextStrict(text: string): string {
  return normalizeText(text).replace(/[^\w\s]/g, "");
}

/**
 * Check if text contains query (case-insensitive, accent-insensitive)
 * @param text - The text to search in
 * @param query - The query to search for
 * @returns True if text contains query
 */
export function textContains(text: string, query: string): boolean {
  return normalizeText(text).includes(normalizeText(query));
}

/**
 * Check if text starts with query (case-insensitive, accent-insensitive)
 * @param text - The text to check
 * @param query - The query to check for
 * @returns True if text starts with query
 */
export function textStartsWith(text: string, query: string): boolean {
  return normalizeText(text).startsWith(normalizeText(query));
}
