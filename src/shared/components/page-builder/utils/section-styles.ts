import type { PageSection, LayoutVariant } from "@/core/types/lib/page-builder";
import { cn } from "@/lib/utils";

/**
 * Get wrapper styles for a section based on its configuration
 */
export function getSectionWrapperStyles(section: PageSection): string {
  const { layout, style } = section;

  const classes = [
    // Base styles
    "relative",

    // Layout variant
    getLayoutVariantClass(layout?.variant),

    // Padding
    getPaddingClass("top", layout?.padding?.top),
    getPaddingClass("bottom", layout?.padding?.bottom),

    // Text alignment
    style?.textAlign && `text-${style.textAlign}`,

    // Custom className
    style?.className,
  ];

  return cn(...classes.filter(Boolean));
}

function getLayoutVariantClass(variant?: LayoutVariant): string {
  switch (variant) {
    case "full-width":
      return "w-full";
    case "contained":
      return "container mx-auto px-4";
    case "narrow":
      return "container mx-auto px-4 max-w-4xl";
    case "wide":
      return "container mx-auto px-4 max-w-7xl";
    default:
      return "container mx-auto px-4";
  }
}

function getPaddingClass(
  side: "top" | "bottom",
  size?: "none" | "small" | "medium" | "large" | "xlarge"
): string | null {
  if (!size || size === "none") return null;

  const sizeMap = {
    small: "4",
    medium: "8",
    large: "12",
    xlarge: "16",
  };

  const prefix = side === "top" ? "pt" : "pb";
  return `${prefix}-${sizeMap[size]}`;
}

/**
 * Get color scheme class
 */
export function getColorSchemeClass(scheme?: string): string {
  if (!scheme || scheme === "default") return "";

  const schemeMap: Record<string, string> = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    neutral: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
    dark: "bg-gray-900 text-white",
  };

  return schemeMap[scheme] || "";
}

/**
 * Get container classes for content
 */
export function getContentContainerClass(variant?: "full" | "contained" | "narrow"): string {
  switch (variant) {
    case "full":
      return "w-full";
    case "narrow":
      return "max-w-3xl mx-auto";
    case "contained":
    default:
      return "max-w-5xl mx-auto";
  }
}

/**
 * Get grid columns class
 */
export function getGridColumnsClass(columns?: number): string {
  const columnsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  };

  return columnsMap[columns || 3] || columnsMap[3];
}

/**
 * Get gap size class
 */
export function getGapClass(size?: "small" | "medium" | "large"): string {
  const gapMap = {
    small: "gap-4",
    medium: "gap-6",
    large: "gap-8",
  };

  return gapMap[size || "medium"];
}
