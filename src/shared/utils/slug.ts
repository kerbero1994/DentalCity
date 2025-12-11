/**
 * Slug generation utilities
 * Shared logic for creating URL-friendly slugs
 */

/**
 * Generate a URL-friendly slug from text
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug
 *
 * @example
 * generateSlug("Hello World!") // "hello-world"
 * generateSlug("Programas Médicos") // "programas-medicos"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]/g, ""); // Remove non-word characters except hyphens
}

/**
 * Generate a slug with additional sanitization
 * @param text - The text to convert to a slug
 * @param maxLength - Maximum length of the slug (optional)
 * @returns URL-friendly slug
 */
export function generateSlugSafe(text: string, maxLength?: number): string {
  let slug = generateSlug(text);

  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  // Replace multiple consecutive hyphens with single hyphen
  slug = slug.replace(/-{2,}/g, "-");

  // Truncate if max length specified
  if (maxLength && slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-[^-]*$/, "");
  }

  return slug;
}
