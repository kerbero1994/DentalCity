/**
 * Common utility types used across the application
 */

/**
 * Supported locales in the application
 */
export type Locale = "es" | "en";

/**
 * View mode options for lists/grids
 */
export type ViewMode = "grid" | "list";

/**
 * Status types for various entities
 */
export type Status = "active" | "inactive" | "pending" | "archived";

/**
 * Event status types
 */
export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

/**
 * Country code (ISO 3166-1 alpha-2)
 */
export type CountryCode = string;

/**
 * Regional group types
 */
export type Region = "europe" | "americas" | "asia" | "africa" | "oceania" | "other";

/**
 * File object structure
 */
export interface FileObject {
  /** File URL */
  url: string;
  /** File name */
  name: string;
  /** File size in bytes (optional) */
  size?: number;
  /** MIME type (optional) */
  type?: string;
}

/**
 * Image object structure
 */
export interface ImageObject {
  /** Image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width in pixels (optional) */
  width?: number;
  /** Image height in pixels (optional) */
  height?: number;
  /** Blur data URL for placeholder (optional) */
  blurDataURL?: string;
}

/**
 * Date range filter
 */
export interface DateRange {
  /** Start date (ISO string) */
  from: string;
  /** End date (ISO string) */
  to: string;
}

/**
 * Search/Filter parameters
 */
export interface SearchParams {
  /** Search query */
  query?: string;
  /** Category filter */
  category?: string;
  /** Type filter */
  type?: string;
  /** Date range filter */
  dateRange?: DateRange;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: "asc" | "desc";
  /** Page number for pagination */
  page?: number;
  /** Items per page */
  pageSize?: number;
}

/**
 * Audience target
 */
export interface Audience {
  /** Audience ID */
  id: number;
  /** Audience title/name */
  title: string;
  /** Audience description (optional) */
  description?: string;
}

/**
 * Translation object for content
 */
export interface Translation {
  /** Original Spanish content */
  es: string;
  /** English translation */
  en?: string;
}

/**
 * Metadata for SEO and social sharing
 */
export interface PageMetadata {
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Keywords */
  keywords?: string[];
  /** Open Graph image */
  ogImage?: string;
  /** Twitter card type */
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  /** Canonical URL */
  canonicalUrl?: string;
  /** Language alternates */
  alternates?: Record<Locale, string>;
}

/**
 * Coordinates for geolocation
 */
export interface Coordinates {
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
}

/**
 * Place/Location information
 */
export interface PlaceInfo {
  /** Place name/label */
  label: string;
  /** Coordinates (optional) */
  coordinates?: Coordinates;
  /** Address (optional) */
  address?: string;
  /** Google Maps URL or similar (optional) */
  url?: string;
}

/**
 * Generic entity with timestamps
 */
export interface BaseEntity {
  /** Unique identifier (UUID) */
  uuid: string;
  /** Numeric ID (optional) */
  id?: number;
  /** Creation timestamp */
  createdAt?: string;
  /** Last update timestamp */
  updatedAt?: string;
  /** Soft delete timestamp */
  deletedAt?: string | null;
}

/**
 * Generic entity with enable/disable flag
 */
export interface ToggleableEntity extends BaseEntity {
  /** Whether the entity is enabled/active */
  enabled: boolean;
}

/**
 * Generic error type for component error boundaries
 */
export interface ComponentError extends Error {
  /** Error digest for identification */
  digest?: string;
  /** Additional error context */
  context?: Record<string, unknown>;
}
