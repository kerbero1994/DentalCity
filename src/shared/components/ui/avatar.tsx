"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
      xl: "size-16",
      "2xl": "size-20",
      "3xl": "size-24",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const fallbackVariants = cva(
  "flex size-full items-center justify-center bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        xs: "text-[10px]",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
        "3xl": "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  className?: string;
  priority?: boolean;
} & VariantProps<typeof avatarVariants>;

export function Avatar({ src, alt, fallback, className, size, priority = false }: AvatarProps) {
  const t = useTranslations("ui.avatar");
  const defaultAlt = alt || t("defaultAlt");
  const renderFallback = () => {
    if (fallback) {
      return <span className={fallbackVariants({ size })}>{fallback}</span>;
    }

    // Default icon fallback
    const iconSizes = {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
      "2xl": "size-10",
      "3xl": "size-12",
    };

    return (
      <span className={fallbackVariants({ size })}>
        <User className={iconSizes[size || "md"]} aria-hidden />
      </span>
    );
  };

  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src ? (
        <Image
          src={src}
          alt={defaultAlt}
          fill
          className="object-cover"
          sizes="(max-width: 96px) 100vw, 96px"
          priority={priority}
        />
      ) : (
        renderFallback()
      )}
    </span>
  );
}

// Avatar with badge/status indicator
type AvatarWithBadgeProps = AvatarProps & {
  badge?: ReactNode;
  badgeClassName?: string;
  status?: "online" | "offline" | "away" | "busy";
};

export function AvatarWithBadge({
  badge,
  badgeClassName,
  status,
  className,
  ...props
}: AvatarWithBadgeProps) {
  const t = useTranslations("ui.avatar");

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const statusLabels = {
    online: t("statusOnline"),
    offline: t("statusOffline"),
    away: t("statusAway"),
    busy: t("statusBusy"),
  };

  return (
    <div className="relative inline-block">
      <Avatar className={className} {...props} />
      {status && (
        <span
          className={cn(
            "border-background absolute right-0 bottom-0 block size-3 rounded-full border-2",
            statusColors[status]
          )}
          aria-label={statusLabels[status]}
        />
      )}
      {badge && !status && (
        <span
          className={cn(
            "border-background absolute right-0 bottom-0 flex items-center justify-center rounded-full border-2",
            badgeClassName
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

// Avatar Group
type AvatarGroupProps = {
  children: ReactNode;
  max?: number;
  className?: string;
  spacing?: "tight" | "normal" | "loose";
};

export function AvatarGroup({
  children,
  max = 5,
  className,
  spacing = "normal",
}: AvatarGroupProps) {
  const spacingClasses = {
    tight: "-space-x-2",
    normal: "-space-x-3",
    loose: "-space-x-1",
  };

  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = max ? childArray.slice(0, max) : childArray;
  const remaining = max && childArray.length > max ? childArray.length - max : 0;

  return (
    <div className={cn("flex items-center", spacingClasses[spacing], className)}>
      {visibleChildren}
      {remaining > 0 && (
        <span className="border-background bg-muted text-muted-foreground relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-sm font-medium">
          +{remaining}
        </span>
      )}
    </div>
  );
}
