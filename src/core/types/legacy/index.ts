/**
 * Central export point for all TypeScript types
 * Import types from here instead of individual files for better organization
 */

// API types
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  ApiRequestConfig,
  FileUploadResponse,
  GeolocationResponse,
} from "./api";

// Common types
export type {
  Locale,
  ViewMode,
  Status,
  EventStatus,
  CountryCode,
  Region,
  FileObject,
  ImageObject,
  DateRange,
  SearchParams,
  Audience,
  Translation,
  Coordinates,
  PlaceInfo,
  BaseEntity,
  ToggleableEntity,
  ComponentError,
} from "./common";

// External library types
export type {
  GoogleTranslateAPI,
  GoogleTranslateElementConstructor,
  GoogleTranslateConfig,
  WindowWithGoogleTranslate,
  IPGeolocationResponse,
  StoryMeta,
  Story,
  YouTubeEmbedParams,
} from "./external";

// Page builder types
export type {
  PageSection,
  SectionType,
  TextContentSection,
  FeaturesSection,
  HeroSection,
  CTABannerSection,
  PageConfig,
  PageMetadata as PageBuilderMetadata,
} from "../lib/page-builder";
