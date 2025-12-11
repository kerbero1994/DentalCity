import { type ReactNode, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const featureCardVariants = cva(
  "group relative flex overflow-hidden rounded-xl border bg-card transition-all",
  {
    variants: {
      variant: {
        default: "hover:shadow-lg hover:border-primary/50",
        outline: "border-2 hover:border-primary",
        ghost: "border-transparent hover:bg-accent/50",
        gradient:
          "border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20",
      },
      layout: {
        vertical: "flex-col",
        horizontal: "flex-row items-center",
        "image-top": "flex-col",
      },
      size: {
        sm: "p-4 gap-3",
        md: "p-6 gap-4",
        lg: "p-8 gap-6",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "vertical",
      size: "md",
    },
  }
);

type FeatureCardProps = {
  icon?: ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
  actions?: ReactNode;
} & VariantProps<typeof featureCardVariants>;

function FeatureCardComponent({
  icon,
  image,
  badge,
  title,
  description,
  href,
  linkLabel = "Learn more",
  className,
  variant,
  layout,
  size,
  actions,
}: FeatureCardProps) {
  const hasLink = Boolean(href);

  return (
    <article className={cn(featureCardVariants({ variant, layout, size }), className)}>
      {badge && (
        <span className="bg-primary/10 text-primary absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold">
          {badge}
        </span>
      )}

      {image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg",
            layout === "horizontal" ? "w-40 shrink-0" : "aspect-video w-full"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 600}
            height={image.height || 400}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      {icon && !image && (
        <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-lg">
          {icon}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-tight">
          {hasLink ? (
            <Link href={href!} className="hover:text-primary after:absolute after:inset-0">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {description && <p className="text-muted-foreground text-sm">{description}</p>}

        {actions && <div className="mt-2 flex items-center gap-2">{actions}</div>}

        {hasLink && !actions && (
          <p className="text-primary mt-auto flex items-center gap-2 text-sm font-medium">
            <span>{linkLabel}</span>
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </p>
        )}
      </div>
    </article>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const FeatureCard = memo(FeatureCardComponent);

// Compact Feature Card
function CompactFeatureCardComponent({
  icon,
  title,
  description,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    </div>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const CompactFeatureCard = memo(CompactFeatureCardComponent);

// Testimonial Card
function TestimonialCardComponent({
  quote,
  author,
  role,
  avatar,
  className,
}: {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
}) {
  return (
    <figure className={cn("bg-card flex flex-col gap-4 rounded-xl border p-6", className)}>
      <blockquote className="text-foreground text-lg italic">&quot;{quote}&quot;</blockquote>
      <figcaption className="flex items-center gap-3">
        {avatar && (
          <div className="relative size-10 overflow-hidden rounded-full">
            <Image src={avatar} alt={author} fill className="object-cover" />
          </div>
        )}
        <div>
          <div className="font-semibold">{author}</div>
          {role && <div className="text-muted-foreground text-sm">{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const TestimonialCard = memo(TestimonialCardComponent);
