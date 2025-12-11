import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      sitimm: "bg-[var(--color-primary)] text-white",
      sitimmOutline:
        "border border-[var(--color-primary)] bg-white dark:bg-gray-800 text-[var(--color-primary)]",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border border-border bg-background text-foreground",
      success: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      destructive: "bg-destructive/10 text-destructive",
      muted: "bg-muted text-muted-foreground",
      accent: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-500",
    },
    size: {
      sm: "rounded px-2 py-0.5 text-xs",
      md: "rounded-md px-2.5 py-1 text-sm",
      lg: "rounded-lg px-3 py-1.5 text-base",
    },
    shape: {
      default: "",
      pill: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "default",
  },
});

type BadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  dot?: boolean;
  className?: string;
} & VariantProps<typeof badgeVariants>;

export function Badge({ children, icon, dot, className, variant, size, shape }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, shape }), className)}>
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}

type NumberBadgeProps = {
  value: string | number;
  className?: string;
} & Omit<BadgeProps, "children">;

export function NumberBadge({ value, className, ...props }: NumberBadgeProps) {
  return (
    <Badge className={cn("tabular-nums", className)} {...props}>
      {value}
    </Badge>
  );
}

type FloatingBadgeProps = {
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
} & Omit<BadgeProps, "children">;

export function FloatingBadge({
  children,
  position = "top-right",
  className,
  ...badgeProps
}: FloatingBadgeProps) {
  const positions = {
    "top-right": "right-4 top-4",
    "top-left": "left-4 top-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <Badge className={cn("absolute", positions[position], className)} {...badgeProps}>
      {children}
    </Badge>
  );
}
