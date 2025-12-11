import { type ReactNode, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl sm:text-5xl lg:text-6xl",
      h2: "text-3xl sm:text-4xl lg:text-5xl",
      h3: "text-2xl sm:text-3xl lg:text-4xl",
      h4: "text-xl sm:text-2xl lg:text-3xl",
      h5: "text-lg sm:text-xl",
      h6: "text-base sm:text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-red-700 dark:text-red-500",
    },
  },
  defaultVariants: {
    level: "h2",
    weight: "bold",
    align: "left",
    color: "default",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps<T extends HeadingLevel = "h2"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
} & VariantProps<typeof headingVariants> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    "as" | "className" | keyof VariantProps<typeof headingVariants>
  >;

export function Heading<T extends HeadingLevel = "h2">({
  as,
  children,
  className,
  level,
  weight,
  align,
  color,
  gradient = false,
  ...props
}: HeadingProps<T>) {
  const Component = (as || level || "h2") as ElementType;
  const finalLevel = level || (as as VariantProps<typeof headingVariants>["level"]);

  return (
    <Component
      className={cn(
        headingVariants({ level: finalLevel, weight, align, color }),
        gradient && "from-primary bg-gradient-to-r to-red-600 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

type HeadingWithAccentProps = Omit<HeadingProps, "children"> & {
  children: ReactNode;
  accent?: ReactNode;
  accentColor?: "primary" | "accent" | "destructive";
};

export function HeadingWithAccent({
  children,
  accent,
  accentColor = "primary",
  className,
  ...props
}: HeadingWithAccentProps) {
  const accentColors = {
    primary: "text-primary",
    accent: "text-red-700 dark:text-red-500",
    destructive: "text-destructive",
  };

  return (
    <Heading className={className} {...props}>
      {children}
      {accent && <span className={cn("ml-1", accentColors[accentColor])}>{accent}</span>}
    </Heading>
  );
}
