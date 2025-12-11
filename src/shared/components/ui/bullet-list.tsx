import { type ReactNode } from "react";
import { CheckCircle2, Check, Circle, Dot } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const listVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

const itemVariants = cva("flex items-start gap-2.5 text-sm sm:text-base", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("mt-0.5 shrink-0", {
  variants: {
    iconStyle: {
      check: "text-primary",
      "check-circle": "text-primary",
      circle: "text-muted-foreground",
      dot: "text-primary",
    },
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    iconStyle: "check-circle",
    size: "md",
  },
});

type BulletListProps = {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  icon?: ReactNode | "check" | "check-circle" | "circle" | "dot";
} & VariantProps<typeof listVariants> &
  VariantProps<typeof itemVariants> &
  VariantProps<typeof iconVariants>;

export function BulletList({
  items,
  className,
  itemClassName,
  spacing,
  variant,
  icon = "check-circle",
  size,
}: BulletListProps) {
  const getIcon = () => {
    if (typeof icon !== "string") return icon;

    const iconMap: Record<string, ReactNode> = {
      check: <Check className={iconVariants({ iconStyle: "check", size })} aria-hidden />,
      "check-circle": (
        <CheckCircle2 className={iconVariants({ iconStyle: "check-circle", size })} aria-hidden />
      ),
      circle: <Circle className={iconVariants({ iconStyle: "circle", size })} aria-hidden />,
      dot: <Dot className={iconVariants({ iconStyle: "dot", size })} aria-hidden />,
    };

    return iconMap[icon];
  };

  const iconElement = getIcon();

  return (
    <ul className={cn(listVariants({ spacing }), className)}>
      {items.map((item, index) => (
        <li key={index} className={cn(itemVariants({ variant }), itemClassName)}>
          {iconElement}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type ChecklistProps = Omit<BulletListProps, "icon"> & {
  checked?: boolean[];
};

export function Checklist({ items, checked, className, ...props }: ChecklistProps) {
  return (
    <ul className={cn(listVariants({ spacing: props.spacing }), className)}>
      {items.map((item, index) => {
        const isChecked = checked?.[index] ?? true;
        return (
          <li
            key={index}
            className={cn(
              itemVariants({ variant: props.variant }),
              !isChecked && "text-muted-foreground line-through"
            )}
          >
            {isChecked ? (
              <CheckCircle2
                className={iconVariants({ iconStyle: "check-circle", size: props.size })}
                aria-hidden
              />
            ) : (
              <Circle
                className={iconVariants({ iconStyle: "circle", size: props.size })}
                aria-hidden
              />
            )}
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
