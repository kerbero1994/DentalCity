"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { cn } from "@/shared/utils/cn";

interface PremiumImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

// Memoize SVG generation outside component to avoid re-creating on every render
const createShimmerSVG = (width: number, height: number): string => {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="shimmer-${width}-${height}">
          <stop stop-color="#f6f6f6" offset="0%" stop-opacity="1">
            <animate attributeName="offset" values="-2;1" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop stop-color="#f0f0f0" offset="50%" stop-opacity="1">
            <animate attributeName="offset" values="-1;2" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop stop-color="#f6f6f6" offset="100%" stop-opacity="1">
            <animate attributeName="offset" values="0;3" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer-${width}-${height})" />
    </svg>
  `;
};

// Convert string to base64 - memoized outside component
const toBase64 = (str: string): string =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

// Cache for base64 encoded shimmer placeholders
const shimmerCache = new Map<string, string>();

const getShimmerDataURL = (width: number, height: number): string => {
  const key = `${width}-${height}`;

  if (!shimmerCache.has(key)) {
    const svg = createShimmerSVG(width, height);
    const dataURL = `data:image/svg+xml;base64,${toBase64(svg)}`;
    shimmerCache.set(key, dataURL);
  }

  return shimmerCache.get(key)!;
};

function PremiumImageComponent({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  blurDataURL,
  quality = 85, // Reduced from 90 to 85 for better performance (imperceptible quality difference)
  sizes,
  aspectRatio,
  objectFit = "cover",
}: PremiumImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Initialize with priority value
  const imgRef = useRef<HTMLDivElement>(null);

  // Memoize the onLoad callback
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Memoize IntersectionObserver callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "100px", // Start loading 100px before entering viewport
      threshold: 0.01,
    });

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [priority, isInView, handleIntersection]);

  // Memoize the default blur data URL
  const defaultBlurDataURL = useMemo(
    () => getShimmerDataURL(width || 400, height || 400),
    [width, height]
  );

  // Memoize container style
  const containerStyle = useMemo(() => (aspectRatio ? { aspectRatio } : undefined), [aspectRatio]);

  // Memoize image style
  const imageStyle = useMemo(() => ({ objectFit }), [objectFit]);

  return (
    <div
      ref={imgRef}
      className={cn("relative overflow-hidden", containerClassName)}
      style={containerStyle}
    >
      {/* Skeleton loader */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
          "animate-pulse transition-opacity duration-500",
          isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      />

      {/* Actual image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          quality={quality}
          sizes={sizes}
          priority={priority}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          className={cn(
            "transition-all duration-700 ease-out",
            isLoaded ? "blur-0 scale-100 opacity-100" : "scale-105 opacity-0 blur-sm",
            className
          )}
          style={imageStyle}
          onLoad={handleLoad}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const PremiumImage = memo(PremiumImageComponent);
