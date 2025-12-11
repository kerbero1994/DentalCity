import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  /**
   * Icon component from lucide-react
   */
  icon: LucideIcon;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Color variant
   */
  variant?: "default" | "primary" | "secondary" | "ghost";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * IconBadge - Reusable icon badge component
 *
 * Displays an icon in a circular badge with consistent styling
 *
 * @example
 * ```tsx
 * <IconBadge icon={Calendar} size="md" variant="primary" />
 * ```
 */
export function IconBadge({
  icon: Icon,
  size = "md",
  variant = "default",
  className,
}: IconBadgeProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const variants = {
    default: "bg-gray-100 text-gray-600 dark:bg-black/30 dark:text-gray-400",
    primary:
      "bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20",
    secondary: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    ghost: "bg-white/20 text-white",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full transition-colors",
        sizes[size],
        variants[variant],
        className
      )}
    >
      <Icon className={cn(iconSizes[size])} strokeWidth={2} />
    </div>
  );
}
