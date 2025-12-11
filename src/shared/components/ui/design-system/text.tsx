import { cn } from "@/shared/utils/cn";
import { ReactNode, ElementType } from "react";

interface TextProps {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "label";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  variant?: "default" | "muted" | "error" | "success";
  align?: "left" | "center" | "right";
  truncate?: boolean;
}

export default function Text({
  children,
  className,
  as = "p",
  size = "md",
  weight = "normal",
  variant = "default",
  align = "left",
  truncate = false,
}: TextProps) {
  const Component: ElementType = as;

  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const variants = {
    default: "text-gray-900 dark:text-gray-100",
    muted: "text-gray-600 dark:text-gray-400",
    error: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400",
  };

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Component
      className={cn(
        sizes[size],
        weights[weight],
        variants[variant],
        alignments[align],
        truncate && "truncate",
        "leading-relaxed",
        className
      )}
    >
      {children}
    </Component>
  );
}
