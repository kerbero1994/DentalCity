import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva("grid gap-6", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-10",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
  },
});

type CardGridProps = {
  children: ReactNode;
  className?: string;
  role?: string;
} & VariantProps<typeof gridVariants>;

export function CardGrid({ children, className, columns, gap, role = "list" }: CardGridProps) {
  return (
    <div role={role} className={cn(gridVariants({ columns, gap }), className)}>
      {children}
    </div>
  );
}

// Masonry-style grid for mixed sizes
const masonryGridVariants = cva("grid gap-6", {
  variants: {
    layout: {
      "2-1":
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(1)]:lg:col-span-2 [&>*:nth-child(2)]:lg:col-span-1",
      "1-2":
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(1)]:lg:col-span-1 [&>*:nth-child(2)]:lg:col-span-2",
      featured:
        "grid-cols-1 lg:grid-cols-3 [&>*:nth-child(-n+2)]:lg:col-span-3 [&>*:nth-child(n+3)]:lg:col-span-1",
    },
  },
  defaultVariants: {
    layout: "2-1",
  },
});

type MasonryGridProps = {
  children: ReactNode;
  className?: string;
  role?: string;
} & VariantProps<typeof masonryGridVariants>;

export function MasonryGrid({ children, className, layout, role = "list" }: MasonryGridProps) {
  return (
    <div role={role} className={cn(masonryGridVariants({ layout }), className)}>
      {children}
    </div>
  );
}
