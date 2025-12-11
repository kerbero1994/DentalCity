import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "outlined" | "elevated";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  variant = "default",
  hover = false,
  padding = "md",
  onClick,
}: CardProps) {
  const variants = {
    default: "card-base",
    glass: "glass glass-border rounded-xl shadow-lg",
    outlined: "rounded-xl border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black/40",
    elevated: "rounded-xl bg-white shadow-xl dark:bg-black/60 dark:shadow-premium-dark",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const Element = onClick ? "button" : "div";
  const buttonProps = onClick
    ? {
        type: "button" as const,
        onClick,
      }
    : {};

  return (
    <Element
      className={cn(
        variants[variant],
        paddings[padding],
        hover && "card-hover cursor-pointer",
        "transition-base",
        onClick && "w-full text-left",
        className
      )}
      {...buttonProps}
    >
      {children}
    </Element>
  );
}
