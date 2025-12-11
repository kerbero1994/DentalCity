import { cn } from "@/lib/utils";

interface ModalBackdropProps {
  /**
   * Click handler for backdrop
   */
  onClick?: () => void;

  /**
   * Opacity variant
   */
  variant?: "default" | "dark" | "blur";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Accessible label
   */
  ariaLabel?: string;
}

/**
 * ModalBackdrop - Reusable modal backdrop component
 *
 * Provides consistent backdrop styling for modals and overlays
 *
 * @example
 * ```tsx
 * <ModalBackdrop onClick={closeModal} variant="blur" />
 * ```
 */
export function ModalBackdrop({
  onClick,
  variant = "default",
  className,
  ariaLabel = "Close modal",
}: ModalBackdropProps) {
  const variants = {
    default: "bg-black/50",
    dark: "bg-black/70",
    blur: "bg-black/70 backdrop-blur-sm",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("fixed inset-0 z-40 transition-opacity", variants[variant], className)}
      aria-label={ariaLabel}
    />
  );
}
