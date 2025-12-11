"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ThemeToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "light" | "dark";
  variant?: "circle" | "circle-blur" | "polygon" | "gif";
  start?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  url?: string;
}

export const ThemeToggleButton = React.forwardRef<HTMLButtonElement, ThemeToggleButtonProps>(
  (
    {
      className,
      theme,
      variant = "circle",
      start: _start = "center",
      url: _url,
      onClick,
      ...props
    },
    _ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) {
        onClick?.(e);
        return;
      }

      // Setup CSS variables for animation origin
      const { top, left, width, height } = button.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);
      document.documentElement.style.setProperty("--r", `${maxRadius}px`);

      // Let the parent handle the transition
      onClick?.(e);
    };

    React.useEffect(() => {
      const style = document.createElement("style");

      let animationCSS = "";

      if (variant === "circle") {
        animationCSS = `
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }

          ::view-transition-new(root) {
            z-index: 1;
          }

          ::view-transition-old(root) {
            z-index: 999;
          }

          .dark::view-transition-old(root) {
            z-index: 1;
          }

          .dark::view-transition-new(root) {
            z-index: 999;
          }

          ::view-transition-old(root) {
            animation: scale-out 0.5s cubic-bezier(0.4, 0, 1, 1);
          }

          ::view-transition-new(root) {
            animation: scale-in 0.5s cubic-bezier(0, 0, 0.2, 1);
          }

          @keyframes scale-in {
            from {
              clip-path: circle(0% at var(--x) var(--y));
            }
            to {
              clip-path: circle(var(--r) at var(--x) var(--y));
            }
          }

          @keyframes scale-out {
            from {
              clip-path: circle(var(--r) at var(--x) var(--y));
            }
            to {
              clip-path: circle(0% at var(--x) var(--y));
            }
          }
        `;
      } else if (variant === "circle-blur") {
        animationCSS = `
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }

          ::view-transition-new(root) {
            z-index: 1;
          }

          ::view-transition-old(root) {
            z-index: 999;
            filter: blur(20px);
          }

          .dark::view-transition-old(root) {
            z-index: 1;
          }

          .dark::view-transition-new(root) {
            z-index: 999;
            filter: blur(20px);
          }

          ::view-transition-old(root) {
            animation: scale-out-blur 0.5s cubic-bezier(0.4, 0, 1, 1);
          }

          ::view-transition-new(root) {
            animation: scale-in-blur 0.5s cubic-bezier(0, 0, 0.2, 1);
          }

          @keyframes scale-in-blur {
            from {
              clip-path: circle(0% at var(--x) var(--y));
            }
            to {
              clip-path: circle(var(--r) at var(--x) var(--y));
            }
          }

          @keyframes scale-out-blur {
            from {
              clip-path: circle(var(--r) at var(--x) var(--y));
            }
            to {
              clip-path: circle(0% at var(--x) var(--y));
            }
          }
        `;
      } else if (variant === "polygon") {
        animationCSS = `
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
          }

          ::view-transition-new(root) {
            z-index: 1;
          }

          ::view-transition-old(root) {
            z-index: 999;
          }

          .dark::view-transition-old(root) {
            z-index: 1;
          }

          .dark::view-transition-new(root) {
            z-index: 999;
          }

          ::view-transition-old(root) {
            animation: polygon-out 0.5s cubic-bezier(0.4, 0, 1, 1);
          }

          ::view-transition-new(root) {
            animation: polygon-in 0.5s cubic-bezier(0, 0, 0.2, 1);
          }

          @keyframes polygon-in {
            from {
              clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
            }
            to {
              clip-path: polygon(-100% -100%, 200% -100%, 200% 200%, -100% 200%);
            }
          }

          @keyframes polygon-out {
            from {
              clip-path: polygon(-100% -100%, 200% -100%, 200% 200%, -100% 200%);
            }
            to {
              clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
            }
          }
        `;
      }

      style.textContent = animationCSS;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, [variant]);

    return (
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    );
  }
);

ThemeToggleButton.displayName = "ThemeToggleButton";

export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const transitionRef = React.useRef(false);

  const startTransition = React.useCallback((callback: () => void) => {
    // Use ref for synchronous check
    if (transitionRef.current) {
      return;
    }

    if (!document.startViewTransition) {
      callback();
      return;
    }

    // Set both ref and state
    transitionRef.current = true;
    setIsTransitioning(true);

    try {
      const transition = document.startViewTransition(callback);

      transition.finished
        .then(() => {
          transitionRef.current = false;
          setIsTransitioning(false);
        })
        .catch(() => {
          transitionRef.current = false;
          setIsTransitioning(false);
        });
    } catch {
      transitionRef.current = false;
      setIsTransitioning(false);
      callback();
    }
  }, []);

  return { startTransition, isTransitioning };
}
