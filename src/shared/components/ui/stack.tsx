import { type ReactNode, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
      reverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: 4,
    align: "stretch",
    justify: "start",
    wrap: false,
  },
});

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof stackVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Stack<T extends ElementType = "div">({
  as,
  children,
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  ...props
}: StackProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// VStack - Vertical Stack
export function VStack({
  direction = "column",
  ...props
}: Omit<StackProps, "direction"> & { direction?: "column" | "column-reverse" }) {
  return <Stack direction={direction} {...props} />;
}

// HStack - Horizontal Stack
export function HStack({
  direction = "row",
  ...props
}: Omit<StackProps, "direction"> & { direction?: "row" | "row-reverse" }) {
  return <Stack direction={direction} {...props} />;
}

// Spacer - Flexible spacer for flex layouts
export function Spacer({ className }: { className?: string }) {
  return <div className={cn("flex-1", className)} aria-hidden />;
}

// Grid component
const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
  },
});

type GridProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof gridVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Grid<T extends ElementType = "div">({
  as,
  children,
  className,
  cols,
  gap,
  ...props
}: GridProps<T>) {
  const Component = as || "div";

  return (
    <Component className={cn(gridVariants({ cols, gap }), className)} {...props}>
      {children}
    </Component>
  );
}

// Center - Centers content both horizontally and vertically
export function Center({ as, children, className, ...props }: StackProps) {
  return (
    <Stack as={as} direction="row" align="center" justify="center" className={className} {...props}>
      {children}
    </Stack>
  );
}

// Divider with flex
export function FlexDivider({ className }: { className?: string }) {
  return <div className={cn("bg-border h-px w-full", className)} role="separator" />;
}
