/**
 * Type definitions for dynamic page builder system
 * All pages are configured via JSON from the API
 */

// ============================================================================
// Core Types
// ============================================================================

export type SectionType =
  | "hero"
  | "text-content"
  | "image-grid"
  | "card-list"
  | "cta-banner"
  | "accordion"
  | "form"
  | "video"
  | "testimonials"
  | "stats"
  | "timeline"
  | "team"
  | "contact"
  | "map"
  | "carousel"
  | "tabs"
  | "pricing"
  | "features"
  | "custom";

export type LayoutVariant = "full-width" | "contained" | "narrow" | "wide";
export type ColorScheme = "default" | "primary" | "secondary" | "accent" | "neutral" | "dark";
export type Alignment = "left" | "center" | "right";
export type VerticalAlignment = "top" | "center" | "bottom";

// ============================================================================
// Base Section
// ============================================================================

export interface BaseSection {
  id: string;
  type: SectionType;
  visible?: boolean;
  order?: number;

  // Layout
  layout?: {
    variant?: LayoutVariant;
    padding?: {
      top?: "none" | "small" | "medium" | "large" | "xlarge";
      bottom?: "none" | "small" | "medium" | "large" | "xlarge";
    };
    background?: {
      color?: ColorScheme | string;
      image?: string;
      gradient?: {
        from: string;
        to: string;
        direction?: "to-right" | "to-left" | "to-top" | "to-bottom" | "diagonal";
      };
      overlay?: {
        color: string;
        opacity: number;
      };
    };
  };

  // Content
  content?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    body?: string;
  };

  // Styling
  style?: {
    className?: string;
    textAlign?: Alignment;
    textColor?: string;
  };

  // SEO
  seo?: {
    anchor?: string; // ID for linking
    ariaLabel?: string;
  };
}

// ============================================================================
// Specific Section Types
// ============================================================================

export interface HeroSection extends BaseSection {
  type: "hero";
  hero: {
    variant?: "default" | "split" | "centered" | "minimal" | "full-screen";
    media?: {
      type: "image" | "video" | "carousel";
      src?: string;
      sources?: string[];
      alt?: string;
      priority?: boolean;
    };
    ctas?: Array<{
      label: string;
      href: string;
      variant: "primary" | "secondary" | "outline" | "ghost";
      icon?: string;
      target?: "_self" | "_blank";
    }>;
    overlay?: boolean;
  };
}

export interface TextContentSection extends BaseSection {
  type: "text-content";
  textContent: {
    format?: "prose" | "markdown" | "html";
    columns?: 1 | 2 | 3;
    body: string;
  };
}

export interface ImageGridSection extends BaseSection {
  type: "image-grid";
  imageGrid: {
    columns?: 2 | 3 | 4 | 5;
    gap?: "small" | "medium" | "large";
    aspectRatio?: "square" | "portrait" | "landscape" | "auto";
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      link?: string;
    }>;
  };
}

export interface CardListSection extends BaseSection {
  type: "card-list";
  cardList: {
    variant?: "default" | "elevated" | "outlined" | "minimal";
    columns?: 1 | 2 | 3 | 4;
    cards: Array<{
      id?: string;
      icon?: string;
      image?: {
        src: string;
        alt: string;
      };
      badge?: string;
      title: string;
      description?: string;
      link?: {
        href: string;
        label: string;
      };
    }>;
  };
}

export interface CTABannerSection extends BaseSection {
  type: "cta-banner";
  ctaBanner: {
    variant?: "default" | "bordered" | "gradient";
    image?: string;
    ctas: Array<{
      label: string;
      href: string;
      variant?: "primary" | "secondary" | "outline" | "ghost";
      icon?: string;
      target?: "_self" | "_blank";
    }>;
  };
}

export interface AccordionSection extends BaseSection {
  type: "accordion";
  accordion: {
    variant?: "default" | "bordered" | "separated";
    allowMultiple?: boolean;
    items: Array<{
      id: string;
      title: string;
      content: string;
      defaultOpen?: boolean;
    }>;
  };
}

export interface FormSection extends BaseSection {
  type: "form";
  form: {
    id: string;
    action: string;
    method?: "GET" | "POST";
    successMessage?: string;
    errorMessage?: string;
    fields: Array<{
      name: string;
      type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "radio";
      label: string;
      placeholder?: string;
      required?: boolean;
      validation?: {
        pattern?: string;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
      };
      options?: Array<{
        value: string;
        label: string;
      }>;
    }>;
    submitButton: {
      label: string;
      variant?: "primary" | "secondary";
    };
  };
}

export interface VideoSection extends BaseSection {
  type: "video";
  video: {
    provider?: "youtube" | "vimeo" | "custom" | "self-hosted";
    videoId?: string;
    src?: string;
    url?: string;
    poster?: string;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    caption?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9" | "9/16";
  };
}

export interface TestimonialsSection extends BaseSection {
  type: "testimonials";
  testimonials: {
    variant?: "cards" | "carousel" | "grid";
    items: Array<{
      id: string;
      quote: string;
      author: {
        name: string;
        role?: string;
        company?: string;
        avatar?: string;
      };
      rating?: number;
    }>;
  };
}

export interface StatsSection extends BaseSection {
  type: "stats";
  stats: {
    variant?: "default" | "bordered" | "cards" | "card" | "minimal";
    columns?: 2 | 3 | 4 | 5;
    items: Array<{
      id?: string;
      value: string | number;
      label: string;
      description?: string;
      icon?: string;
      prefix?: string;
      suffix?: string;
      trend?: {
        direction: "up" | "down";
        value: string;
      };
    }>;
  };
}

export interface TimelineSection extends BaseSection {
  type: "timeline";
  timeline: {
    variant?: "vertical" | "horizontal";
    items: Array<{
      id: string;
      date: string;
      title: string;
      description?: string;
      image?: string;
      link?: {
        href: string;
        label: string;
      };
    }>;
  };
}

export interface TeamSection extends BaseSection {
  type: "team";
  team: {
    columns?: 2 | 3 | 4 | 5;
    members: Array<{
      id: string;
      name: string;
      role: string;
      bio?: string;
      image?: string;
      social?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
      };
    }>;
  };
}

export interface ContactSection extends BaseSection {
  type: "contact";
  contact: {
    variant?: "default" | "split" | "centered";
    info: {
      address?: string[];
      phone?: string;
      email?: string;
      hours?: string;
    };
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
    showForm?: boolean;
  };
}

export interface MapSection extends BaseSection {
  type: "map";
  map: {
    provider?: "google" | "mapbox" | "openstreetmap";
    center: {
      lat: number;
      lng: number;
    };
    zoom?: number;
    markers?: Array<{
      lat: number;
      lng: number;
      title?: string;
      description?: string;
    }>;
  };
}

export interface CarouselSection extends BaseSection {
  type: "carousel";
  carousel: {
    variant?: "default" | "fade" | "cards";
    autoplay?: boolean;
    interval?: number;
    showArrows?: boolean;
    showDots?: boolean;
    slides: Array<{
      id: string;
      image?: string;
      title?: string;
      description?: string;
      cta?: {
        label: string;
        href: string;
      };
    }>;
  };
}

export interface TabsSection extends BaseSection {
  type: "tabs";
  tabs: {
    variant?: "default" | "pills" | "underline";
    orientation?: "horizontal" | "vertical";
    items: Array<{
      id: string;
      label: string;
      content: string;
      icon?: string;
    }>;
  };
}

export interface PricingSection extends BaseSection {
  type: "pricing";
  pricing: {
    variant?: "default" | "comparison";
    billingPeriods?: Array<"monthly" | "yearly">;
    plans: Array<{
      id: string;
      name: string;
      description?: string;
      price: {
        monthly?: number;
        yearly?: number;
        currency?: string;
      };
      features: string[];
      highlighted?: boolean;
      cta: {
        label: string;
        href: string;
      };
    }>;
  };
}

export interface FeaturesSection extends BaseSection {
  type: "features";
  features: {
    variant?: "grid" | "list" | "alternating";
    columns?: 2 | 3 | 4;
    layout?: "grid" | "alternating";
    items: Array<{
      id: string;
      icon?: string;
      image?: {
        src: string;
        alt: string;
      };
      title: string;
      description: string;
      items?: string[];
      link?: {
        href: string;
        label: string;
        target?: "_self" | "_blank";
      };
    }>;
  };
}

export interface CustomSection extends BaseSection {
  type: "custom";
  custom: {
    componentName: string;
    props?: Record<string, unknown>;
  };
}

// ============================================================================
// Union Type
// ============================================================================

export type PageSection =
  | HeroSection
  | TextContentSection
  | ImageGridSection
  | CardListSection
  | CTABannerSection
  | AccordionSection
  | FormSection
  | VideoSection
  | TestimonialsSection
  | StatsSection
  | TimelineSection
  | TeamSection
  | ContactSection
  | MapSection
  | CarouselSection
  | TabsSection
  | PricingSection
  | FeaturesSection
  | CustomSection;

// ============================================================================
// Page Configuration
// ============================================================================

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    title?: string;
    description?: string;
    image?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
    };
  };
}

export interface PageConfig {
  id: string;
  slug: string;
  metadata: PageMetadata;
  sections: PageSection[];
  createdAt?: string;
  updatedAt?: string;
  status?: "draft" | "published" | "archived";
}

// ============================================================================
// API Response
// ============================================================================

export interface PageResponse {
  success: boolean;
  data?: PageConfig;
  error?: {
    code: string;
    message: string;
  };
}
