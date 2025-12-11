import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  /**
   * Icon to display (optional)
   */
  icon?: LucideIcon;

  /**
   * Main title text
   */
  title: string;

  /**
   * Description text (optional)
   */
  description?: string;

  /**
   * Action button (optional)
   */
  action?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Variant style
   */
  variant?: "default" | "dashed" | "minimal";
}

/**
 * EmptyState - Reusable empty state component
 *
 * Use when there's no data to display (search results, lists, etc.)
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={Search}
 *   title="No results found"
 *   description="Try adjusting your search criteria"
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = "default",
}: EmptyStateProps) {
  const variants = {
    default: "bg-white/90 dark:bg-black/30 border-gray-200/50 dark:border-white/10",
    dashed: "bg-white dark:bg-black/30 border-2 border-dashed border-gray-300 dark:border-white/10",
    minimal: "bg-transparent border-0",
  };

  return (
    <div
      className={cn(
        "flex min-h-[400px] items-center justify-center rounded-lg backdrop-blur-sm",
        variants[variant],
        variant !== "minimal" && "border",
        className
      )}
    >
      <div className="text-center">
        {Icon && (
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-black/30">
              <Icon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        )}

        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</p>

        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}

        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
