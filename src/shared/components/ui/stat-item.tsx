import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statVariants = cva("flex gap-3", {
  variants: {
    layout: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-start",
    },
    align: {
      start: "items-start",
      center: "items-center",
    },
  },
  defaultVariants: {
    layout: "vertical",
    align: "start",
  },
});

const iconWrapperVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
    },
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const valueVariants = cva("font-bold", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl sm:text-3xl",
      lg: "text-3xl sm:text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type StatItemProps = {
  icon?: ReactNode;
  value: ReactNode;
  label: ReactNode;
  className?: string;
  role?: string;
} & VariantProps<typeof statVariants> &
  VariantProps<typeof iconWrapperVariants> &
  Pick<VariantProps<typeof valueVariants>, "size">;

export function StatItem({
  icon,
  value,
  label,
  className,
  role = "listitem",
  layout,
  align,
  variant,
  size,
}: StatItemProps) {
  return (
    <div role={role} className={cn(statVariants({ layout, align }), className)}>
      {icon && (
        <span className={iconWrapperVariants({ size, variant })} aria-hidden>
          {icon}
        </span>
      )}

      <div className="flex flex-col gap-1">
        <span className={valueVariants({ size })}>{value}</span>
        <span className={labelVariants({ size })}>{label}</span>
      </div>
    </div>
  );
}

type StatGridProps = {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
};

export function StatGrid({ children, className, columns = 3 }: StatGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div role="list" className={cn("grid gap-6 lg:gap-8", gridCols[columns], className)}>
      {children}
    </div>
  );
}
