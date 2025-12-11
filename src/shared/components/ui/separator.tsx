import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    variant: {
      default: "bg-border",
      muted: "bg-muted",
      primary: "bg-primary/20",
      gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      spacing: "sm",
      class: "my-2",
    },
    {
      orientation: "horizontal",
      spacing: "md",
      class: "my-4",
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      class: "my-6",
    },
    {
      orientation: "horizontal",
      spacing: "xl",
      class: "my-8",
    },
    {
      orientation: "vertical",
      spacing: "sm",
      class: "mx-2",
    },
    {
      orientation: "vertical",
      spacing: "md",
      class: "mx-4",
    },
    {
      orientation: "vertical",
      spacing: "lg",
      class: "mx-6",
    },
    {
      orientation: "vertical",
      spacing: "xl",
      class: "mx-8",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    spacing: "none",
    variant: "default",
  },
});

type SeparatorProps = {
  className?: string;
  decorative?: boolean;
} & VariantProps<typeof separatorVariants>;

export function Separator({
  className,
  orientation,
  spacing,
  variant,
  decorative = true,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation || undefined}
      className={cn(separatorVariants({ orientation, spacing, variant }), className)}
    />
  );
}

// Divider with label
type DividerProps = {
  children?: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Divider({ children, className, orientation = "horizontal" }: DividerProps) {
  if (!children) {
    return <Separator orientation={orientation} className={className} />;
  }

  if (orientation === "vertical") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <Separator orientation="vertical" className="flex-1" />
        <span className="text-muted-foreground text-xs font-medium">{children}</span>
        <Separator orientation="vertical" className="flex-1" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Separator className="flex-1" />
      <span className="text-muted-foreground text-xs font-medium">{children}</span>
      <Separator className="flex-1" />
    </div>
  );
}

// Decorative separator with icon
type DecorativeSeparatorProps = {
  icon?: React.ReactNode;
  className?: string;
};

export function DecorativeSeparator({ icon, className }: DecorativeSeparatorProps) {
  return (
    <div className={cn("relative flex items-center justify-center py-8", className)}>
      <Separator variant="gradient" className="absolute inset-x-0" />
      {icon && (
        <span className="bg-background text-muted-foreground ring-border relative z-10 flex size-8 items-center justify-center rounded-full ring-1">
          {icon}
        </span>
      )}
    </div>
  );
}
