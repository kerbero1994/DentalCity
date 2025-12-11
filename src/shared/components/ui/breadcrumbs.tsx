/**
 * Breadcrumbs UI component
 * Provides visual navigation path with JSON-LD structured data
 */

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "@/shared/components/seo";
import { useTranslations } from "next-intl";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const t = useTranslations("ui.breadcrumbs");

  return (
    <>
      {/* JSON-LD Schema */}
      <BreadcrumbSchema items={items} />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label={t("ariaLabel")}
        className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}
      >
        <ol className="flex items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {!isFirst && <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />}

                {isLast ? (
                  <span className="font-medium text-gray-900 dark:text-white" aria-current="page">
                    {isFirst && <Home className="mr-1 inline h-4 w-4" aria-hidden="true" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="rounded transition-colors hover:text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:outline-none"
                  >
                    {isFirst && <Home className="mr-1 inline h-4 w-4" aria-hidden="true" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
