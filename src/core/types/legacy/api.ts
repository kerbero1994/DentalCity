/**
 * Generic API Response Types
 * These types provide a standardized structure for all API responses
 */

/**
 * Standard API response wrapper
 * @template T The type of data returned in the response
 */
export interface ApiResponse<T> {
  /** HTTP status code */
  status: number;
  /** Success or error message */
  message?: string;
  /** Response data payload */
  data?: T;
  /** Error details if request failed */
  error?: ApiError;
  /** Timestamp of the response */
  timestamp?: string;
}

/**
 * API Error structure
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
  /** Stack trace (only in development) */
  stack?: string;
}

/**
 * Paginated API response
 * @template T The type of items in the paginated list
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  items: T[];
  /** Total number of items across all pages */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there are more pages */
  hasMore: boolean;
}

/**
 * API Request configuration
 */
export interface ApiRequestConfig {
  /** Request method */
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body */
  body?: unknown;
  /** Query parameters */
  params?: Record<string, string | number | boolean>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials */
  credentials?: RequestCredentials;
  /** Custom cache strategy */
  cache?: RequestCache;
  /** Next.js revalidation time */
  revalidate?: number | false;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  /** Uploaded file URL */
  url: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  mimeType: string;
  /** Upload timestamp */
  uploadedAt: string;
}

/**
 * Geolocation API response
 */
export interface GeolocationResponse {
  /** Country code (ISO 3166-1 alpha-2) */
  country_code: string;
  /** Country name */
  country_name: string;
  /** City name */
  city?: string;
  /** Region/state name */
  region?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Timezone */
  timezone?: string;
}
