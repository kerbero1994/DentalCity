"use client";

import { Search, X, SlidersHorizontal, LayoutGrid, LayoutList, Table } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type ViewMode = "grid" | "list" | "compact";

interface SearchBarProps {
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
   * @deprecated Avoid using autoFocus for accessibility reasons
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

  /**
   * Show filter button
   */
  showFilter?: boolean;

  /**
   * Filter button click handler
   */
  onFilterClick?: () => void;

  /**
   * Filter panel content (rendered when filter is active)
   */
  filterContent?: ReactNode;

  /**
   * Show view mode toggle
   */
  showViewToggle?: boolean;

  /**
   * Current view mode
   */
  viewMode?: ViewMode;

  /**
   * View mode change handler
   */
  onViewModeChange?: (mode: ViewMode) => void;

  /**
   * Show results count
   */
  showResultsCount?: boolean;

  /**
   * Number of results
   */
  resultsCount?: number;

  /**
   * Icon for results counter
   */
  resultsIcon?: ReactNode;

  /**
   * Custom actions to render on the right side
   */
  actions?: ReactNode;
}

/**
 * SearchBar - Unified search bar component for design system
 *
 * Provides consistent search functionality with optional filters, view toggles, and result counts
 *
 * @example
 * ```tsx
 * // Basic search
 * <SearchBar
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   placeholder="Buscar..."
 * />
 *
 * // With filters and view toggle
 * <SearchBar
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   showFilter
 *   filterContent={<FilterPanel />}
 *   showViewToggle
 *   viewMode="grid"
 *   onViewModeChange={setViewMode}
 *   showResultsCount
 *   resultsCount={42}
 * />
 * ```
 */
export function SearchBar({
  value,
  onChange,
  placeholder,
  className,
  size = "md",
  autoFocus = false,
  disabled = false,
  ariaLabel,
  showFilter = false,
  onFilterClick,
  filterContent,
  showViewToggle = false,
  viewMode = "grid",
  onViewModeChange,
  showResultsCount = false,
  resultsCount = 0,
  resultsIcon,
  actions,
}: SearchBarProps) {
  const t = useTranslations("ui.searchBar");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const defaultPlaceholder = placeholder || t("defaultPlaceholder");
  const defaultAriaLabel = ariaLabel || t("defaultAriaLabel");

  const sizes = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    onFilterClick?.();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Main search bar container */}
      <div className="flex items-center gap-3">
        {/* Search input section */}
        <div className="relative flex-1">
          {/* Search Icon */}
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500",
              iconSizes[size]
            )}
            aria-hidden="true"
          />

          {/* Input Field */}
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={defaultPlaceholder}
            disabled={disabled}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            aria-label={defaultAriaLabel}
            className={cn(
              "w-full rounded-lg border pr-10 pl-10",
              "bg-white dark:bg-gray-800",
              "border-gray-300 dark:border-gray-600",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "text-gray-900 dark:text-gray-100",
              "transition-all duration-200",
              "focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none",
              "dark:focus:ring-offset-gray-900",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizes[size]
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
                "focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none",
                "dark:focus:ring-offset-gray-900",
                "rounded"
              )}
              aria-label={t("clearSearch")}
            >
              <X className={iconSizes[size]} />
            </button>
          )}
        </div>

        {/* Filter Button */}
        {showFilter && (
          <button
            type="button"
            onClick={handleFilterClick}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 transition-colors",
              sizes[size],
              isFilterOpen
                ? "border-red-600 bg-red-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
            aria-label={t("toggleFilters")}
            aria-expanded={isFilterOpen}
          >
            <SlidersHorizontal className={iconSizes[size]} />
            <span className="hidden sm:inline">{t("filters")}</span>
          </button>
        )}

        {/* View Mode Toggle */}
        {showViewToggle && onViewModeChange && (
          <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "rounded p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-white text-red-600 shadow-sm dark:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              aria-label={t("gridView")}
              title={t("gridView")}
            >
              <LayoutGrid className={iconSizes[size]} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={cn(
                "rounded p-2 transition-colors",
                viewMode === "list"
                  ? "bg-white text-red-600 shadow-sm dark:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              aria-label={t("listView")}
              title={t("listView")}
            >
              <LayoutList className={iconSizes[size]} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("compact")}
              className={cn(
                "rounded p-2 transition-colors",
                viewMode === "compact"
                  ? "bg-white text-red-600 shadow-sm dark:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              aria-label={t("compactView")}
              title={t("compactView")}
            >
              <Table className={iconSizes[size]} />
            </button>
          </div>
        )}

        {/* Results Count */}
        {showResultsCount && (
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {resultsIcon}
            <span>
              {resultsCount} {resultsCount === 1 ? t("result") : t("results")}
            </span>
          </div>
        )}

        {/* Custom Actions */}
        {actions}
      </div>

      {/* Filter Panel */}
      {showFilter && isFilterOpen && filterContent && (
        <div className="mt-4 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {filterContent}
        </div>
      )}
    </div>
  );
}
