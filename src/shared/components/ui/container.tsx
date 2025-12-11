import { type ReactNode, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-screen-2xl",
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "md",
  },
});

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof containerVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  size,
  padding,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component className={cn(containerVariants({ size, padding }), className)} {...props}>
      {children}
    </Component>
  );
}
