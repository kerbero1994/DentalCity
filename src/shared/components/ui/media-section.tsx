import { type ReactNode } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const layoutVariants = cva("grid gap-8 lg:gap-12", {
  variants: {
    layout: {
      "image-left": "lg:grid-cols-2",
      "image-right": "lg:grid-cols-2",
      stacked: "grid-cols-1",
    },
  },
  defaultVariants: {
    layout: "image-right",
  },
});

const mediaWrapperVariants = cva("relative", {
  variants: {
    layout: {
      "image-left": "lg:order-first",
      "image-right": "lg:order-last",
      stacked: "",
    },
  },
  defaultVariants: {
    layout: "image-right",
  },
});

type MediaSectionProps = {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  withOffset?: boolean;
} & VariantProps<typeof layoutVariants>;

export function MediaSection({
  imageSrc,
  imageAlt,
  imageWidth = 880,
  imageHeight = 560,
  badge,
  children,
  className,
  imageClassName,
  layout = "image-right",
  priority = false,
  withOffset = true,
}: MediaSectionProps) {
  return (
    <div className={cn(layoutVariants({ layout }), className)}>
      <div className="flex flex-col gap-6 lg:gap-8">{children}</div>

      <figure className={cn(mediaWrapperVariants({ layout }), "relative")}>
        {withOffset && (
          <span
            className="from-primary/5 to-primary/10 absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br"
            aria-hidden
          />
        )}

        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className={cn("object-cover", imageClassName)}
            sizes="(max-width: 1024px) 100vw, 560px"
          />

          {badge && (
            <figcaption className="bg-background/90 absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm">
              {badge}
            </figcaption>
          )}
        </div>
      </figure>
    </div>
  );
}
