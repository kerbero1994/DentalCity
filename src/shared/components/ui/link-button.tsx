import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const linkButtonVariants = cva("group inline-flex items-center gap-2 transition-all", {
  variants: {
    variant: {
      default: "text-primary hover:underline",
      button: "",
      ghost: "text-foreground hover:text-primary",
      arrow: "text-sm font-medium text-primary hover:gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  showArrow?: boolean;
  className?: string;
  iconClassName?: string;
  "aria-label"?: string;
  external?: boolean;
} & VariantProps<typeof linkButtonVariants>;

export function LinkButton({
  href,
  children,
  icon,
  showArrow = true,
  className,
  iconClassName,
  variant,
  "aria-label": ariaLabel,
  external = false,
}: LinkButtonProps) {
  const iconElement = icon ?? (showArrow ? <ArrowRight className="size-4" aria-hidden /> : null);
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (variant === "button") {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant: "default" }), className)}
        aria-label={ariaLabel}
        {...externalProps}
      >
        {children}
        {iconElement && (
          <span className={cn("transition-transform group-hover:translate-x-1", iconClassName)}>
            {iconElement}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(linkButtonVariants({ variant }), className)}
      aria-label={ariaLabel}
      {...externalProps}
    >
      <span>{children}</span>
      {iconElement && (
        <span className={cn("transition-transform group-hover:translate-x-1", iconClassName)}>
          {iconElement}
        </span>
      )}
    </Link>
  );
}

type LinkButtonGroupProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

export function LinkButtonGroup({ children, className, align = "left" }: LinkButtonGroupProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-4", alignClasses[align], className)}>
      {children}
    </div>
  );
}
