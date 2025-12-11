"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";

/**
 * Hook to format dates with locale support
 *
 * @param dateString - ISO date string or undefined
 * @param options - Intl.DateTimeFormatOptions (optional)
 * @returns Formatted date string or null if invalid
 *
 * @example
 * const formattedDate = useFormattedDate("2024-12-25");
 * // => "25 de diciembre de 2024" (in Spanish)
 * // => "December 25, 2024" (in English)
 *
 * const shortDate = useFormattedDate("2024-12-25", {
 *   month: "short",
 *   day: "numeric"
 * });
 * // => "dic 25" (in Spanish)
 */
export function useFormattedDate(
  dateString: string | undefined,
  options?: Intl.DateTimeFormatOptions
): string | null {
  const locale = useLocale();

  return useMemo(() => {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return null;

      const formatOptions: Intl.DateTimeFormatOptions = options ?? {
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      // Use es-MX for Spanish, en-US for English
      const formatLocale = locale === "es" ? "es-MX" : "en-US";

      return new Intl.DateTimeFormat(formatLocale, formatOptions).format(date);
    } catch (error) {
      return null;
    }
  }, [dateString, locale, options]);
}

/**
 * Hook to format date with time
 *
 * @param dateString - ISO date string or undefined
 * @returns Formatted date string with time or null if invalid
 *
 * @example
 * const formattedDateTime = useFormattedDateTime("2024-12-25T15:30:00");
 * // => "25 de diciembre de 2024, 15:30" (in Spanish)
 */
export function useFormattedDateTime(dateString: string | undefined): string | null {
  return useFormattedDate(dateString, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Hook to format date in short format
 *
 * @param dateString - ISO date string or undefined
 * @returns Formatted date string in short format or null if invalid
 *
 * @example
 * const shortDate = useFormattedDateShort("2024-12-25");
 * // => "25/12/2024" (in Spanish)
 * // => "12/25/2024" (in English)
 */
export function useFormattedDateShort(dateString: string | undefined): string | null {
  return useFormattedDate(dateString, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
