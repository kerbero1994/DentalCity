import { type ReactNode, memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group relative flex flex-col gap-4 rounded-lg border bg-card p-6 transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary/50",
        outline: "border-border/50 hover:border-primary",
        ghost: "border-transparent hover:bg-accent/50",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

const iconWrapperVariants = cva("flex size-10 shrink-0 items-center justify-center rounded-lg", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      accent: "bg-accent text-accent-foreground",
      brand: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type IconCardProps = {
  badge?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
  as?: "article" | "div";
  role?: string;
  iconVariant?: VariantProps<typeof iconWrapperVariants>["variant"];
} & VariantProps<typeof cardVariants>;

function IconCardComponent({
  badge,
  icon,
  title,
  description,
  href,
  linkLabel = "Conocer más",
  className,
  as: Component = "article",
  role,
  variant,
  interactive,
  iconVariant = "default",
}: IconCardProps) {
  const hasLink = Boolean(href);
  const isInteractive = interactive ?? hasLink;

  return (
    <Component
      role={role}
      className={cn(cardVariants({ variant, interactive: isInteractive }), className)}
    >
      {badge && (
        <span className="bg-muted text-muted-foreground absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-semibold">
          {badge}
        </span>
      )}

      {icon && (
        <div className={iconWrapperVariants({ variant: iconVariant })} aria-hidden>
          {icon}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {hasLink ? (
            <Link href={href!} className="after:absolute after:inset-0 hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>

      {hasLink && (
        <p className="text-primary mt-auto flex items-center gap-2 text-sm font-medium">
          <span>{linkLabel}</span>
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </p>
      )}
    </Component>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const IconCard = memo(IconCardComponent);
