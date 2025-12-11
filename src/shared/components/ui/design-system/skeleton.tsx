import { cn } from "@/shared/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  count?: number;
  animated?: boolean;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  count = 1,
  animated = true,
}: SkeletonProps) {
  const baseClasses = cn(
    "bg-gray-500 border border-gray-300 dark:bg-gray-700 dark:border-gray-600",
    animated && "animate-pulse",
    className
  );

  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl",
  };

  const style = {
    width: width || (variant === "circular" ? 40 : "100%"),
    height: height || (variant === "circular" ? 40 : variant === "card" ? 200 : 16),
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={cn(baseClasses, variants[variant])} style={style} />
        ))}
      </div>
    );
  }

  return <div className={cn(baseClasses, variants[variant])} style={style} />;
}

// Preset skeleton components for common use cases
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-base space-y-4 p-4", className)}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="text" count={3} />
      <div className="flex justify-between">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="circular" width={32} height={32} />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-base flex items-center space-x-4 p-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="card-base overflow-hidden">
      <div className="divider-x border-b p-4">
        <Skeleton variant="text" width="30%" height={24} />
      </div>
      <table className="w-full">
        <thead className="divider-x border-b">
          <tr>
            {Array.from({ length: cols }).map((_, index) => (
              <th key={index} className="p-4">
                <Skeleton variant="text" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="divider-x border-b">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <Skeleton variant="text" width={colIndex === 0 ? "100%" : "80%"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="card-base overflow-hidden">
      <Skeleton variant="rectangular" height={240} />
      <div className="space-y-3 p-5">
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" count={3} />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={100} />
          </div>
          <Skeleton variant="text" width={80} />
        </div>
      </div>
    </div>
  );
}
