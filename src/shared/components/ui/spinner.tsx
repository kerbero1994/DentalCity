"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-12",
    },
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      white: "text-white",
      current: "text-current",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type SpinnerProps = {
  className?: string;
  label?: string;
} & VariantProps<typeof spinnerVariants>;

export function Spinner({ className, size, variant, label }: SpinnerProps) {
  const t = useTranslations("ui.spinner");
  const defaultLabel = label || t("loading");

  return (
    <Loader2
      className={cn(spinnerVariants({ size, variant }), className)}
      aria-label={defaultLabel}
    />
  );
}

// Centered spinner with optional text
type SpinnerWithTextProps = SpinnerProps & {
  text?: string;
};

export function SpinnerWithText({ text, className, ...props }: SpinnerWithTextProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Spinner {...props} />
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  );
}

// Full page loading spinner
export function PageSpinner({ text }: { text?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SpinnerWithText text={text} size="lg" />
    </div>
  );
}

// Inline spinner for buttons
export function ButtonSpinner({ className }: { className?: string }) {
  return <Spinner size="sm" variant="current" className={className} />;
}

// Dots spinner alternative
const dotsVariants = cva("flex items-center justify-center gap-1", {
  variants: {
    size: {
      sm: "[&>span]:size-1.5",
      md: "[&>span]:size-2",
      lg: "[&>span]:size-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DotsSpinnerProps = {
  className?: string;
} & VariantProps<typeof dotsVariants>;

export function DotsSpinner({ className, size }: DotsSpinnerProps) {
  const t = useTranslations("ui.spinner");

  return (
    <div className={cn(dotsVariants({ size }), className)} role="status" aria-label={t("loading")}>
      <span className="animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <span className="animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <span className="animate-bounce rounded-full bg-current" />
    </div>
  );
}

// Pulse spinner
export function PulseSpinner({
  className,
  size,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const t = useTranslations("ui.spinner");

  const sizes = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  return (
    <div
      className={cn("relative", sizes[size || "md"], className)}
      role="status"
      aria-label={t("loading")}
    >
      <div className="bg-primary absolute inset-0 animate-ping rounded-full opacity-75" />
      <div className="bg-primary relative size-full rounded-full" />
    </div>
  );
}

// Ring spinner
export function RingSpinner({
  className,
  size,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const t = useTranslations("ui.spinner");

  const sizes = {
    sm: "size-6 border-2",
    md: "size-10 border-3",
    lg: "size-16 border-4",
  };

  return (
    <div
      className={cn(
        "border-primary animate-spin rounded-full border-t-transparent",
        sizes[size || "md"],
        className
      )}
      role="status"
      aria-label={t("loading")}
    >
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}
