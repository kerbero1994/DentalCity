import { cn } from "@/shared/utils/cn";
import { ReactNode, ElementType } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "gradient" | "muted";
  align?: "left" | "center" | "right";
}

export default function Heading({
  children,
  className,
  level = 2,
  as,
  variant = "default",
  align = "left",
}: HeadingProps) {
  const Component: ElementType = as || `h${level}`;

  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold",
    3: "text-2xl md:text-3xl lg:text-4xl font-semibold",
    4: "text-xl md:text-2xl lg:text-3xl font-semibold",
    5: "text-lg md:text-xl lg:text-2xl font-medium",
    6: "text-base md:text-lg lg:text-xl font-medium",
  };

  const variants = {
    default: "text-gray-900 dark:text-white",
    gradient: "text-gradient",
    muted: "text-gray-600 dark:text-gray-400",
  };

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Component
      className={cn(
        sizes[level],
        variants[variant],
        alignments[align],
        "transition-colors",
        className
      )}
    >
      {children}
    </Component>
  );
}
