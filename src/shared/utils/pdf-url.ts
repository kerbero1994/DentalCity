/**
 * Normalizes PDF URLs from the API to work with the browser viewer
 * Handles DigitalOcean Spaces URL format conversion
 *
 * Target format: https://sitimm-files.nyc3.digitaloceanspaces.com/FOLDER/file.pdf
 *
 * Input formats:
 * - https://sitimm-files.nyc3.digitaloceanspaces.com/FOLDER/file.pdf (already normalized)
 * - https://nyc3.digitaloceanspaces.com/sitimm-files/FOLDER/file.pdf (needs normalization)
 * - nyc3.digitaloceanspaces.com/sitimm-files/FOLDER/file.pdf (no protocol, wrong format)
 * - sitimm-files/FOLDER/file.pdf (no protocol)
 * - /sitimm-files/FOLDER/file.pdf (no protocol with leading slash)
 * - FOLDER/file.pdf (just path)
 * - /FOLDER/file.pdf (just path with leading slash)
 */
export function normalizePdfUrl(raw?: string): string {
  if (!raw) return "";

  let cleanPath = raw.trim();

  // Return empty string for whitespace-only input
  if (!cleanPath) return "";

  // Case 1: Already has https:// protocol
  if (/^https?:\/\//i.test(cleanPath)) {
    // Sub-case: Wrong format - https://nyc3.digitaloceanspaces.com/sitimm-files/...
    // Convert to: https://sitimm-files.nyc3.digitaloceanspaces.com/...
    if (
      cleanPath.includes("nyc3.digitaloceanspaces.com/sitimm-files") &&
      !cleanPath.includes("sitimm-files.nyc3.digitaloceanspaces.com")
    ) {
      return cleanPath.replace(
        "nyc3.digitaloceanspaces.com/sitimm-files/",
        "sitimm-files.nyc3.digitaloceanspaces.com/"
      );
    }
    // Already normalized
    return cleanPath;
  }

  // Case 2: No protocol - handle various malformed formats

  // Remove leading slash if exists
  if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.slice(1);
  }

  // Case 2a: Malformed without protocol - nyc3.digitaloceanspaces.com/sitimm-files/FOLDER/file.pdf
  // Extract just the FOLDER/file.pdf part
  if (cleanPath.includes("nyc3.digitaloceanspaces.com/sitimm-files/")) {
    cleanPath = cleanPath.replace(/^.*nyc3\.digitaloceanspaces\.com\/sitimm-files\//, "");
  }
  // Case 2b: Path starts with "sitimm-files/"
  // Convert: sitimm-files/FOLDER/file.pdf -> FOLDER/file.pdf
  else if (cleanPath.startsWith("sitimm-files/")) {
    cleanPath = cleanPath.replace("sitimm-files/", "");
  }

  // Build final URL with just the path
  return `https://sitimm-files.nyc3.digitaloceanspaces.com/${cleanPath}`;
}
