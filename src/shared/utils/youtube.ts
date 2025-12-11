/**
 * YouTube utilities for extracting video IDs and generating embed URLs
 */

/**
 * Extract YouTube video ID from various URL formats
 *
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 *
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 *
 * @example
 * getYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
 * // => "dQw4w9WgXcQ"
 *
 * getYouTubeVideoId("https://youtu.be/dQw4w9WgXcQ")
 * // => "dQw4w9WgXcQ"
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

/**
 * Generate YouTube embed URL from video ID or full URL
 *
 * @param videoIdOrUrl - YouTube video ID or full URL
 * @param autoplay - Whether to autoplay the video (default: false)
 * @returns Embed URL or null if invalid
 *
 * @example
 * getYouTubeEmbedUrl("dQw4w9WgXcQ")
 * // => "https://www.youtube.com/embed/dQw4w9WgXcQ"
 *
 * getYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ", true)
 * // => "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
 */
export function getYouTubeEmbedUrl(videoIdOrUrl: string, autoplay = false): string | null {
  const videoId = videoIdOrUrl.includes('youtube.com') || videoIdOrUrl.includes('youtu.be')
    ? getYouTubeVideoId(videoIdOrUrl)
    : videoIdOrUrl;

  if (!videoId) return null;

  const params = autoplay ? '?autoplay=1&rel=0' : '?rel=0';
  return `https://www.youtube.com/embed/${videoId}${params}`;
}

/**
 * Check if a URL is a valid YouTube URL
 *
 * @param url - URL to check
 * @returns true if valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/.test(url);
}
