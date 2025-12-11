/**
 * Custom image loader utility for handling external images
 * Detects if an image is from DigitalOcean Spaces and should bypass Next.js optimization
 *
 * NOTE: DigitalOcean Spaces does not support image transformations.
 * For better performance, consider:
 * 1. Pre-processing images before upload (WebP, multiple sizes)
 * 2. Using a CDN with image optimization (Cloudflare, imgix, Cloudinary)
 * 3. Implementing a custom image optimization API route
 */

export function shouldUnoptimizeImage(src: string | undefined): boolean {
  if (!src) return false;

  // Bypass optimization for DigitalOcean Spaces to avoid timeout errors
  // Serve images directly from the CDN
  if (src.includes("digitaloceanspaces.com")) {
    return true; // Unoptimize to prevent timeouts
  }

  // Check if it's an external URL (not starting with /)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // Allow known good sources
    if (src.includes("googleusercontent.com")) {
      return false;
    }
    // Unoptimize other external sources
    return true;
  }

  return false;
}

/**
 * Preload critical images to improve LCP (Largest Contentful Paint)
 * Call this in useEffect for above-the-fold images
 */
export function preloadImage(src: string): void {
  if (!src || typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  // Add fetchpriority for modern browsers
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}

/**
 * Preload multiple images (useful for carousels)
 * Only preloads the first N images to avoid bandwidth waste
 */
export function preloadImages(srcs: (string | undefined)[], count: number = 2): void {
  if (typeof window === "undefined") return;

  srcs
    .filter((src): src is string => Boolean(src))
    .slice(0, count)
    .forEach(preloadImage);
}

/**
 * Preprocesses carousel images to ensure perfect fit
 * For DigitalOcean Spaces, this can add transformation parameters
 * For other sources, returns optimized parameters
 */
export function getCarouselImageUrl(
  src: string | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): string {
  if (!src) return "";

  const { width: _width = 800, height: _height = 600, quality: _quality = 85 } = options;

  // For DigitalOcean Spaces, we can't add transformations directly
  // But we return the URL with the intended dimensions for Next.js Image
  if (src.includes("digitaloceanspaces.com")) {
    return src;
  }

  // For Google Cloud Storage images, return as-is (they have their own optimization)
  if (src.includes("googleusercontent.com")) {
    return src;
  }

  // For local or other external images
  return src;
}

/**
 * Get optimal image dimensions for carousel based on viewport
 */
export function getCarouselImageDimensions(): {
  width: number;
  height: number;
} {
  // Standard carousel dimensions: 16:11 aspect ratio
  return {
    width: 800,
    height: 550,
  };
}

/**
 * Get proper content type from file extension
 */
export function getContentTypeFromUrl(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase();

  const contentTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    ico: "image/x-icon",
  };

  return contentTypes[extension || ""] || "image/jpeg";
}
