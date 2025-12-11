import { type ReactNode, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-red-700 dark:text-red-500",
      destructive: "text-destructive",
      success: "text-green-700 dark:text-green-500",
      warning: "text-yellow-700 dark:text-yellow-500",
    },
    transform: {
      none: "normal-case",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
    lineClamp: {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      none: "",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    align: "left",
    color: "default",
    transform: "none",
    truncate: false,
    lineClamp: "none",
  },
});

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof textVariants> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    "as" | "className" | keyof VariantProps<typeof textVariants>
  >;

export function Text<T extends ElementType = "p">({
  as,
  children,
  className,
  size,
  weight,
  align,
  color,
  transform,
  truncate,
  lineClamp,
  ...props
}: TextProps<T>) {
  const Component = as || "p";
  return (
    <Component
      className={cn(
        textVariants({ size, weight, align, color, transform, truncate, lineClamp }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Specialized text components
export function Paragraph({ className, ...props }: Omit<TextProps, "as">) {
  return <Text as="p" className={cn("leading-7", className)} {...props} />;
}

export function Lead({ className, ...props }: Omit<TextProps, "as" | "size">) {
  return (
    <Text
      as="p"
      size="lg"
      className={cn("text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

export function Small({ className, ...props }: Omit<TextProps, "as" | "size">) {
  return <Text as="small" size="sm" className={cn("leading-none", className)} {...props} />;
}

export function Muted({ className, ...props }: Omit<TextProps, "as" | "color">) {
  return <Text as="p" color="muted" className={cn("text-sm", className)} {...props} />;
}

export function Code({ className, children, ...props }: Omit<TextProps, "as">) {
  return (
    <Text
      as="code"
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Kbd({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <kbd
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none",
        className
      )}
    >
      {children}
    </kbd>
  );
}
