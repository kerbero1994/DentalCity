import type { HTMLAttributes, ReactNode, ElementType } from "react";

import { cn } from "@/lib/utils";

import styles from "./gradient-wrapper.module.css";

export type GradientWrapperVariant = "brand" | "pearl" | "rose" | "midnight";

type GradientWrapperProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: GradientWrapperVariant;
  contentClassName?: string;
  children?: ReactNode;
};

const variantClassName: Record<GradientWrapperVariant, string> = {
  brand: styles.variantBrand,
  pearl: styles.variantPearl,
  rose: styles.variantRose,
  midnight: styles.variantMidnight,
};

export function GradientWrapper({
  as = "div",
  variant = "brand",
  className,
  contentClassName,
  children,
  ...rest
}: GradientWrapperProps) {
  const Component = as as ElementType;

  return (
    <Component {...rest} className={cn(styles.shell, variantClassName[variant], className)}>
      <span className={styles.overlay} aria-hidden />
      <div className={cn(styles.inner, contentClassName)}>{children}</div>
    </Component>
  );
}
