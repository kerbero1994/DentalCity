"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  pulse?: boolean;
  glow?: boolean;
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      pulse = false,
      glow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("ui.button");
    const baseStyles = cn(
      // Base styles
      "relative inline-flex items-center justify-center font-medium",
      "transition-all duration-300 ease-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "overflow-hidden group",

      // Premium effects
      "before:absolute before:inset-0 before:transition-all before:duration-300",
      "after:absolute after:inset-0 after:transition-all after:duration-500",

      // Hover lift effect
      "hover:-translate-y-0.5 hover:shadow-xl",
      "active:translate-y-0 active:shadow-lg"
    );

    const variants = {
      primary: cn(
        "bg-red-600 text-white",
        "hover:bg-red-700",
        "focus:ring-red-500",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:-translate-x-full hover:before:translate-x-full",
        glow && "shadow-red-500/25 hover:shadow-red-500/40"
      ),
      secondary: cn(
        "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "focus:ring-gray-500"
      ),
      outline: cn(
        "border-2 border-red-600 text-red-600",
        "hover:bg-red-600 hover:text-white",
        "focus:ring-red-500",
        "dark:border-red-500 dark:text-red-500"
      ),
      ghost: cn(
        "text-gray-700 dark:text-gray-300",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:ring-gray-500"
      ),
      destructive: cn("bg-red-500 text-white", "hover:bg-red-600", "focus:ring-red-500"),
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
      md: "px-4 py-2 text-base rounded-lg gap-2",
      lg: "px-6 py-3 text-lg rounded-lg gap-2.5",
      xl: "px-8 py-4 text-xl rounded-xl gap-3",
    };

    const pulseAnimation =
      pulse &&
      !disabled &&
      cn(
        "animate-pulse",
        "after:absolute after:inset-0",
        "after:bg-white/20 after:rounded-full",
        "after:scale-0 after:opacity-0",
        "hover:after:scale-100 hover:after:opacity-100"
      );

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          pulseAnimation,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple effect container */}
        <span className="rounded-inherit absolute inset-0 overflow-hidden">
          <span className="absolute inset-0 bg-white opacity-0 transition-opacity group-active:opacity-20" />
        </span>

        {/* Content */}
        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>{t("loading")}</span>
            </>
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <span className="transition-transform group-hover:scale-110">{icon}</span>
              )}
              {children}
              {icon && iconPosition === "right" && (
                <span className="transition-transform group-hover:scale-110">{icon}</span>
              )}
            </>
          )}
        </span>

        {/* Premium glow effect */}
        {glow && !disabled && (
          <span className="absolute inset-0 -z-10 animate-pulse">
            <span className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-red-400/50 blur-xl" />
          </span>
        )}
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
