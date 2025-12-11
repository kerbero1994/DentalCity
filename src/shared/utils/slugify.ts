/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}
