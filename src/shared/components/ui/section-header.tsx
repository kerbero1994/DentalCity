import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva("flex flex-col gap-4", {
  variants: {
    align: {
      left: "text-left items-start",
      center: "text-center items-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const eyebrowVariants = cva(
  "inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        accent: "text-primary",
        brand: "text-red-700 dark:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const titleVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      sm: "text-2xl sm:text-3xl",
      md: "text-3xl sm:text-4xl lg:text-5xl",
      lg: "text-4xl sm:text-5xl lg:text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const descriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base sm:text-lg",
      lg: "text-lg sm:text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SectionHeaderProps = {
  id?: string;
  eyebrow?: ReactNode;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  titleAccent?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
} & VariantProps<typeof headerVariants> &
  VariantProps<typeof eyebrowVariants> &
  VariantProps<typeof titleVariants> &
  Pick<VariantProps<typeof descriptionVariants>, "size">;

export function SectionHeader({
  id,
  eyebrow,
  eyebrowIcon,
  title,
  titleAccent,
  description,
  actions,
  className,
  titleClassName,
  descriptionClassName,
  align,
  variant,
  size,
}: SectionHeaderProps) {
  const titleId = id ? `${id}-title` : undefined;
  const descId = id && description ? `${id}-desc` : undefined;

  return (
    <header className={cn(headerVariants({ align }), className)}>
      {eyebrow && (
        <p className={eyebrowVariants({ variant })}>
          {eyebrowIcon && <span aria-hidden>{eyebrowIcon}</span>}
          {eyebrow}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:gap-4">
        <h2 id={titleId} className={cn(titleVariants({ size }), titleClassName)}>
          {title}
          {titleAccent && <span className="text-primary"> {titleAccent}</span>}
        </h2>

        {description && (
          <p id={descId} className={cn(descriptionVariants({ size }), descriptionClassName)}>
            {description}
          </p>
        )}
      </div>

      {actions && <div className="mt-2">{actions}</div>}
    </header>
  );
}
