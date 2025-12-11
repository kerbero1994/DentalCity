"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
    >
      {t("skipToContent")}
    </a>
  );
}
