import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  /**
   * Category/Institution name
   */
  label: string;

  /**
   * Category type for color mapping
   */
  category?: "SITIMM" | "IMSS" | "INFONAVIT" | "FONACOT" | "AFORE";

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Visual variant
   */
  variant?: "solid" | "subtle" | "ghost";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CategoryBadge - Reusable category/institution badge
 *
 * Displays category or institution labels with consistent styling
 *
 * @example
 * ```tsx
 * <CategoryBadge label="IMSS" category="IMSS" />
 * ```
 */
export function CategoryBadge({
  label,
  category,
  size = "md",
  variant = "solid",
  className,
}: CategoryBadgeProps) {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  // Get category color
  const getCategoryStyles = () => {
    if (!category) {
      return variant === "solid"
        ? "bg-gray-600 text-white"
        : variant === "subtle"
          ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          : "bg-white/20 text-white";
    }

    const institutionColors: Record<string, string> = {
      SITIMM: "bg-[var(--color-primary)] text-white",
      IMSS: "bg-[var(--color-imss)] text-white",
      INFONAVIT: "bg-[var(--color-infonavit)] text-white",
      FONACOT: "bg-[var(--color-fonacot)] text-white",
      AFORE: "bg-[var(--color-afore)] text-white",
    };

    if (variant === "solid") {
      return institutionColors[category] || "bg-gray-600 text-white";
    }

    if (variant === "subtle") {
      // Create subtle versions with opacity
      const subtleColors: Record<string, string> = {
        SITIMM:
          "bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20",
        IMSS: "bg-[var(--color-imss)]/10 text-[var(--color-imss)] dark:bg-[var(--color-imss)]/20",
        INFONAVIT:
          "bg-[var(--color-infonavit)]/10 text-[var(--color-infonavit)] dark:bg-[var(--color-infonavit)]/20",
        FONACOT:
          "bg-[var(--color-fonacot)]/10 text-[var(--color-fonacot)] dark:bg-[var(--color-fonacot)]/20",
        AFORE:
          "bg-[var(--color-afore)]/10 text-[var(--color-afore)] dark:bg-[var(--color-afore)]/20",
      };
      return subtleColors[category] || "bg-gray-100 text-gray-700";
    }

    // Ghost variant
    return "bg-white/20 text-white";
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full font-semibold tracking-wide uppercase transition-colors",
        sizes[size],
        getCategoryStyles(),
        className
      )}
    >
      {label}
    </span>
  );
}
