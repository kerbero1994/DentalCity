import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      shimmer:
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SkeletonProps = {
  className?: string;
} & VariantProps<typeof skeletonVariants>;

export function Skeleton({ className, variant }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ variant }), className)} />;
}

// Pre-defined skeleton shapes
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 && "w-4/5")} />
      ))}
    </div>
  );
}

export function SkeletonHeading({ className }: { className?: string }) {
  return <Skeleton className={cn("h-8 w-3/4", className)} />;
}

export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };
  return <Skeleton className={cn("rounded-full", sizes[size], className)} />;
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-24", className)} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 rounded-lg border p-6", className)}>
      <Skeleton className="h-6 w-2/3" />
      <SkeletonText lines={2} />
      <Skeleton className="h-10 w-28" />
    </div>
  );
}

export function SkeletonImage({
  aspectRatio = "video",
  className,
}: {
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}) {
  const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };
  return <Skeleton className={cn("w-full", aspectRatios[aspectRatio], className)} />;
}

// Composite skeleton for common layouts
export function SkeletonArticle({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <SkeletonImage aspectRatio="video" />
      <SkeletonHeading />
      <SkeletonText lines={4} />
    </div>
  );
}

export function SkeletonProfile({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  cols = 4,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-10" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12" />
          ))}
        </div>
      ))}
    </div>
  );
}
