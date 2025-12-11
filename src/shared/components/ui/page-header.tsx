"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import TextType from "./text-type";
import { useLanguageChange } from "@/shared/hooks/use-language-change";
import { logger } from "@/shared/utils/logger";

interface PageHeaderProps {
  /**
   * Small label displayed above the title (e.g., "EVENTOS", "PROGRAMAS")
   * Will be displayed in uppercase with tracking
   */
  label?: string;

  /**
   * Main title - large and bold
   */
  title: string;

  /**
   * Optional description or subtitle displayed below the title
   */
  description?: string;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Enable animated text reveal (default: auto-detect language change via query param)
   * Set to false to disable animations completely
   * Set to true to force animations always
   */
  animated?: boolean;
}

/**
 * PageHeader - Reusable header component for section pages
 *
 * Used across Events, Programs, Magazines, etc.
 * Provides consistent styling with gradient background and text hierarchy.
 *
 * Animation triggers only when ?lang-changed=true is in URL (language change)
 *
 * @example
 * ```tsx
 * <PageHeader
 *   label="EVENTOS"
 *   title="Eventos del Sindicato"
 *   description="Mantente informado sobre nuestros cursos..."
 * />
 * ```
 */
export function PageHeader({ label, title, description, className, animated }: PageHeaderProps) {
  const { hasLanguageChanged, onAnimationComplete } = useLanguageChange();
  const [completedAnimations, setCompletedAnimations] = useState<Set<string>>(new Set());
  const hasNotifiedRef = useRef(false);

  // If animated is explicitly set, use that value
  // Otherwise, use language change detection from query param (default behavior)
  const shouldAnimate = animated !== undefined ? animated : hasLanguageChanged;

  // Track which animations need to complete
  const totalAnimations = [
    label ? "label" : null,
    "title",
    description ? "description" : null,
  ].filter(Boolean).length;

  // Handle individual animation completion (no longer calls onAnimationComplete directly)
  const handleAnimationComplete = useCallback(
    (animationName: string) => {
      setCompletedAnimations((prev) => {
        // Don't update if already completed (prevents infinite loops)
        if (prev.has(animationName)) {
          return prev;
        }

        const newSet = new Set(prev);
        newSet.add(animationName);

        logger.log(
          `[PageHeader] Animation "${animationName}" completed. Total: ${newSet.size}/${totalAnimations}`
        );

        return newSet;
      });
    },
    [totalAnimations]
  );

  // Separate effect to watch for completion and call the callback
  useEffect(() => {
    if (
      completedAnimations.size === totalAnimations &&
      totalAnimations > 0 &&
      shouldAnimate &&
      !hasNotifiedRef.current
    ) {
      logger.log("[PageHeader] All animations complete!");
      hasNotifiedRef.current = true;
      onAnimationComplete();
    }
  }, [completedAnimations, totalAnimations, shouldAnimate, onAnimationComplete]);

  // Reset notification flag when language changes
  useEffect(() => {
    if (hasLanguageChanged) {
      hasNotifiedRef.current = false;
      setCompletedAnimations(new Set());
    }
  }, [hasLanguageChanged]);

  return (
    <div
      className={cn(
        "relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 shadow-lg dark:from-red-600 dark:to-red-700",
        className
      )}
    >
      {/* Overlay gradients for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 px-8 py-6 md:px-12 md:py-8">
        {/* Category label - small, uppercase */}
        {label && (
          <div className="mb-2">
            {shouldAnimate ? (
              <TextType
                text={label}
                as="span"
                typingSpeed={24}
                loop={false}
                showCursor={false}
                onComplete={() => handleAnimationComplete("label")}
                className="text-xs font-semibold tracking-[0.15em] text-white/80 uppercase"
              />
            ) : (
              <p className="text-xs font-semibold tracking-[0.15em] text-white/80 uppercase">
                {label}
              </p>
            )}
          </div>
        )}

        {/* Main Title - large, bold with typing animation */}
        <div className="mb-3">
          {shouldAnimate ? (
            <TextType
              text={title}
              as="h1"
              typingSpeed={18}
              loop={false}
              showCursor={false}
              initialDelay={label ? 180 : 0}
              onComplete={() => handleAnimationComplete("title")}
              className="text-2xl font-bold text-white md:text-3xl lg:text-4xl"
            />
          ) : (
            <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">{title}</h1>
          )}
        </div>

        {/* Description/Subtitle - readable text */}
        {description && (
          <div className="max-w-3xl">
            {shouldAnimate ? (
              <TextType
                text={description}
                as="p"
                typingSpeed={11}
                loop={false}
                showCursor={false}
                initialDelay={label ? 450 : 300}
                onComplete={() => handleAnimationComplete("description")}
                className="text-base leading-relaxed text-white/85"
              />
            ) : (
              <p className="text-base leading-relaxed text-white/85">{description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
