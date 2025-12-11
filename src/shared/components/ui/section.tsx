import { type ReactNode, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

const containerVariants = cva("mx-auto w-full px-4 sm:px-6", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type SectionProps = {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
} & VariantProps<typeof sectionVariants> &
  VariantProps<typeof containerVariants>;

export function Section({
  as: Component = "section",
  id,
  children,
  className,
  containerClassName,
  spacing,
  size,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(sectionVariants({ spacing }), className)}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      <div className={cn(containerVariants({ size }), containerClassName)}>{children}</div>
    </Component>
  );
}
