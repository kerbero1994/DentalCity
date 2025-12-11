/**
 * Type definitions for external libraries and global objects
 * This file contains type definitions for third-party libraries that don't have types
 * or for global browser APIs that need augmentation
 */

/**
 * Google Translate API types
 */
export interface GoogleTranslateAPI {
  translate: {
    TranslateElement: GoogleTranslateElementConstructor;
  };
}

export interface GoogleTranslateElementConstructor {
  new (config: GoogleTranslateConfig, containerId: string | null): void;
  InlineLayout: {
    SIMPLE: number;
    HORIZONTAL: number;
    VERTICAL: number;
  };
}

export interface GoogleTranslateConfig {
  /** Source language of the page */
  pageLanguage: string;
  /** Comma-separated list of languages to include */
  includedLanguages: string;
  /** Layout style */
  layout: number;
  /** Whether to auto-display the widget */
  autoDisplay: boolean;
}

/**
 * Extended Window interface with Google Translate
 */
export interface WindowWithGoogleTranslate {
  /** Google Translate API object */
  google?: GoogleTranslateAPI;
  /** Google Translate initialization callback */
  googleTranslateElementInit?: () => void;
}

/**
 * IP Geolocation API response (ipapi.co)
 */
export interface IPGeolocationResponse {
  /** IP address */
  ip: string;
  /** City name */
  city: string;
  /** Region/state name */
  region: string;
  /** Region code */
  region_code: string;
  /** Country name */
  country: string;
  /** Country code (ISO 3166-1 alpha-2) */
  country_code: string;
  /** Country code (ISO 3166-1 alpha-3) */
  country_code_iso3: string;
  /** Country capital */
  country_capital: string;
  /** Country TLD */
  country_tld: string;
  /** Continent code */
  continent_code: string;
  /** Whether in EU */
  in_eu: boolean;
  /** Postal code */
  postal: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Timezone */
  timezone: string;
  /** UTC offset */
  utc_offset: string;
  /** Country calling code */
  country_calling_code: string;
  /** Currency */
  currency: string;
  /** Currency name */
  currency_name: string;
  /** Languages spoken */
  languages: string;
  /** Country area in km² */
  country_area: number;
  /** Country population */
  country_population: number;
  /** ASN */
  asn: string;
  /** Organization */
  org: string;
}

/**
 * Storybook Meta type
 */
export interface StoryMeta<T> {
  /** Component title in Storybook */
  title: string;
  /** The component */
  component: React.ComponentType<T>;
  /** Parameter configuration */
  parameters?: {
    layout?: "centered" | "fullscreen" | "padded";
    backgrounds?: {
      default?: string;
      values?: Array<{ name: string; value: string }>;
    };
    docs?: {
      description?: {
        component?: string;
      };
    };
  };
  /** Arg types configuration */
  argTypes?: Record<string, unknown>;
  /** Tags for categorization */
  tags?: string[];
}

/**
 * Storybook Story type
 */
export interface Story<T> {
  /** Story arguments */
  args?: Partial<T>;
  /** Story parameters */
  parameters?: {
    docs?: {
      description?: {
        story?: string;
      };
    };
  };
}

/**
 * YouTube embed URL params
 */
export interface YouTubeEmbedParams {
  /** Video ID */
  videoId: string;
  /** Autoplay (0 or 1) */
  autoplay?: number;
  /** Show related videos (0 or 1) */
  rel?: number;
  /** Start time in seconds */
  start?: number;
  /** End time in seconds */
  end?: number;
  /** Enable controls (0 or 1) */
  controls?: number;
  /** Show video info (0 or 1) */
  showinfo?: number;
  /** Enable fullscreen (0 or 1) */
  fs?: number;
}
