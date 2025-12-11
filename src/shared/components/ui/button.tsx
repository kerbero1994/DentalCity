import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
        sitimm:
          "!bg-[var(--color-primary)] !text-white hover:!bg-[var(--color-primary-hover)] shadow-sm focus:ring-[var(--color-primary)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus:ring-destructive/50 dark:bg-destructive/60",
        outline:
          "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:bg-black/40 dark:text-gray-200 dark:hover:bg-black/60 focus:ring-gray-500",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:ring-accent/50",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline dark:text-red-400 focus:ring-[var(--color-primary)]/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
