"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";
import { useTranslations } from "next-intl";

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  /**
   * Current search value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";

  /**
   * Auto focus on mount
   */
  autoFocus?: boolean;

  /**
   * Disable the input
   */
  disabled?: boolean;

  /**
   * Label for accessibility
   */
  ariaLabel?: string;
}

/**
 * SearchInput - Reusable search input component
 *
 * Provides consistent search input styling with clear button
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   placeholder="Buscar..."
 * />
 * ```
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    value,
    onChange,
    placeholder,
    className,
    size = "md",
    autoFocus: _autoFocus = false,
    disabled = false,
    ariaLabel,
    ...rest
  },
  ref
) {
  const t = useTranslations("ui.searchInput");
  const internalRef = useRef<HTMLInputElement>(null);

  const defaultPlaceholder = placeholder || t("defaultPlaceholder");
  const defaultAriaLabel = ariaLabel || t("defaultAriaLabel");

  const sizes = {
    sm: "h-8 text-sm pr-8",
    md: "h-10 text-base pr-10",
    lg: "h-12 text-lg pr-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClear = () => {
    onChange("");
    // Use either external ref or internal ref
    const inputEl = (ref as React.RefObject<HTMLInputElement>)?.current || internalRef.current;
    inputEl?.focus();
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400",
          iconSizes[size]
        )}
        aria-hidden="true"
      />

      {/* Input Field */}
      <input
        ref={(node) => {
          // Assign to both refs
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }
        }}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={defaultPlaceholder}
        disabled={disabled}
        aria-label={defaultAriaLabel}
        {...rest}
        className={cn(
          "w-full rounded-lg border pl-10",
          "bg-white/90 dark:bg-black/40",
          "border-gray-200/50 dark:border-white/10",
          "backdrop-blur-sm",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "text-gray-900 dark:text-gray-100",
          "transition-all duration-200",
          "focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:outline-none",
          "dark:focus:ring-offset-black",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizes[size],
          className
        )}
      />

      {/* Clear Button */}
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute top-1/2 right-3 -translate-y-1/2",
            "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
            "transition-colors",
            "focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:outline-none",
            "dark:focus:ring-offset-black",
            "rounded"
          )}
          aria-label={t("clearSearch")}
        >
          <X className={iconSizes[size]} />
        </button>
      )}
    </div>
  );
});
