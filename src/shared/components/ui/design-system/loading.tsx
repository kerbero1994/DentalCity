import { cn } from "@/shared/utils/cn";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse";
  color?: "primary" | "white" | "gray";
  label?: string;
}

export default function Loading({
  className,
  size = "md",
  variant = "spinner",
  color = "primary",
  label,
}: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colors = {
    primary: "text-primary",
    white: "text-white",
    gray: "text-gray-400",
  };

  if (variant === "spinner") {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        role="status"
        aria-label={label || "Loading"}
      >
        <svg
          className={cn("animate-spin", sizes[size], colors[color])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>}
      </div>
    );
  }

  if (variant === "dots") {
    const dotSize = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    };

    return (
      <div
        className={cn("flex items-center gap-1", className)}
        role="status"
        aria-label={label || "Loading"}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "animate-bounce rounded-full",
              dotSize[size],
              color === "primary" ? "bg-primary" : color === "white" ? "bg-white" : "bg-gray-400"
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {label && <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{label}</span>}
      </div>
    );
  }

  // Pulse variant
  const pulseSize = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-2", className)}
      role="status"
      aria-label={label || "Loading"}
    >
      <div
        className={cn(
          "animate-pulse rounded-full",
          pulseSize[size],
          color === "primary"
            ? "bg-primary/20"
            : color === "white"
              ? "bg-white/20"
              : "bg-gray-200 dark:bg-gray-700"
        )}
      />
      {label && <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>}
    </div>
  );
}
