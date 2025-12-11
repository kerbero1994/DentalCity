import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "brand";
  size?: "sm" | "md" | "lg";
}

export default function Badge({
  children,
  className,
  variant = "default",
  size = "md",
}: BadgeProps) {
  const variants = {
    default:
      "badge bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-900/20 dark:text-gray-400 dark:ring-gray-400/20",
    success:
      "badge bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-400/20",
    warning:
      "badge bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-400 dark:ring-yellow-400/20",
    error: "badge badge-red",
    info: "badge bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20",
    brand: "badge badge-red font-bold",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return <span className={cn(variants[variant], sizes[size], className)}>{children}</span>;
}
