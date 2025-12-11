"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ctaVariants = cva("relative overflow-hidden rounded-2xl", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      gradient: "bg-gradient-to-br from-primary to-red-600 text-white",
      outline: "border-2 border-primary bg-background",
      ghost: "bg-accent/50",
    },
    size: {
      sm: "p-8",
      md: "p-10 md:p-12",
      lg: "p-12 md:p-16",
    },
  },
  defaultVariants: {
    variant: "gradient",
    size: "md",
  },
});

type CTAProps = {
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
  image?: ReactNode;
  className?: string;
} & VariantProps<typeof ctaVariants>;

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  className,
  variant,
  size,
}: CTAProps) {
  return (
    <section className={cn(ctaVariants({ variant, size }), className)}>
      {/* Background overlay */}
      <span
        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>

        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90 sm:text-xl">{description}</p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="text-primary inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <span>{primaryAction.label}</span>
                {primaryAction.icon || <ArrowRight className="size-5" aria-hidden />}
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon || <ArrowRight className="size-5" aria-hidden />}
              </Link>
            )}
          </div>
        )}
      </div>

      {image && <div className="absolute inset-0 opacity-10">{image}</div>}
    </section>
  );
}

// Split CTA with image
export function SplitCTA({
  title,
  description,
  action,
  image,
  imagePosition = "right",
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  image?: { src: string; alt: string };
  imagePosition?: "left" | "right";
  className?: string;
}) {
  return (
    <section
      className={cn("bg-card grid overflow-hidden rounded-2xl border lg:grid-cols-2", className)}
    >
      <div
        className={cn(
          "flex flex-col justify-center p-8 md:p-12",
          imagePosition === "left" && "lg:order-2"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground mt-4 text-lg">{description}</p>}
        {action && (
          <Link
            href={action.href}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all"
          >
            <span>{action.label}</span>
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        )}
      </div>

      {image && (
        <div
          className={cn(
            "bg-muted relative min-h-[300px]",
            imagePosition === "left" && "lg:order-1"
          )}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      )}
    </section>
  );
}

// Banner CTA
export function BannerCTA({
  message,
  action,
  onDismiss,
  className,
}: {
  message: ReactNode;
  action?: { label: string; href: string };
  onDismiss?: () => void;
  className?: string;
}) {
  const t = useTranslations("ui.callToAction");

  return (
    <div className={cn("bg-primary text-primary-foreground relative px-4 py-3", className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="text-sm font-medium sm:text-base">{message}</p>

        <div className="flex shrink-0 items-center gap-3">
          {action && (
            <Link
              href={action.href}
              className="text-primary inline-flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-white/90"
            >
              {action.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="rounded p-1 hover:bg-white/10"
              aria-label={t("dismiss")}
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
