"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs";
import { BreadcrumbSchema } from "@/shared/components/seo";
import { getSiteUrl } from "@/lib/metadata";
import { useMemo } from "react";

interface AutoBreadcrumbsProps {
  locale: string;
}

/**
 * AutoBreadcrumbs component that automatically generates breadcrumbs
 * based on the current route. This centralizes breadcrumb logic and
 * ensures consistency across all pages.
 */
export function AutoBreadcrumbs({ locale }: AutoBreadcrumbsProps) {
  const pathname = usePathname();
  const tCommon = useTranslations("common");
  const tBlog = useTranslations("blog");
  const tPrograms = useTranslations("programs");
  const tEvents = useTranslations("events");
  const tFAQ = useTranslations("faq");
  const tBenefits = useTranslations("bonuses");
  const tBulletins = useTranslations("bulletins");
  const tMagazines = useTranslations("magazines");

  const breadcrumbItems = useMemo(() => {
    const siteUrl = getSiteUrl();
    const items = [{ name: tCommon("home"), url: `${siteUrl}/${locale}` }];

    // Remove locale prefix from pathname for analysis
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");

    // Skip breadcrumbs for homepage
    if (!pathWithoutLocale || pathWithoutLocale === "/") {
      return [];
    }

    const segments = pathWithoutLocale.split("/").filter(Boolean);

    // Build breadcrumb items based on route segments
    if (segments[0] === "blog") {
      items.push({
        name: tBlog("title"),
        url: `${siteUrl}/${locale}/blog`,
      });

      // If it's a blog post detail page
      if (segments.length > 1) {
        // For detail pages, we'll show "..." as we don't have the post title here
        // The page component can override this if needed
        items.push({
          name: "...",
          url: pathname,
        });
      }
    } else if (segments[0] === "programas") {
      items.push({
        name: tPrograms("title"),
        url: `${siteUrl}/${locale}/programas`,
      });

      if (segments.length > 1) {
        items.push({
          name: "...",
          url: pathname,
        });
      }
    } else if (segments[0] === "eventos") {
      items.push({
        name: tEvents("title"),
        url: `${siteUrl}/${locale}/eventos`,
      });
    } else if (segments[0] === "preguntas-frecuentes") {
      items.push({
        name: tFAQ("title"),
        url: `${siteUrl}/${locale}/preguntas-frecuentes`,
      });
    } else if (segments[0] === "descuentos") {
      items.push({
        name: tBenefits("title"),
        url: `${siteUrl}/${locale}/descuentos`,
      });
    } else if (segments[0] === "boletines") {
      items.push({
        name: tBulletins("title"),
        url: `${siteUrl}/${locale}/boletines`,
      });
    } else if (segments[0] === "revistas") {
      items.push({
        name: tMagazines("title"),
        url: `${siteUrl}/${locale}/revistas`,
      });
    } else if (segments[0] === "buscar") {
      items.push({
        name: tCommon("search"),
        url: `${siteUrl}/${locale}/buscar`,
      });
    }

    return items;
  }, [
    pathname,
    locale,
    tCommon,
    tBlog,
    tPrograms,
    tEvents,
    tFAQ,
    tBenefits,
    tBulletins,
    tMagazines,
  ]);

  // Don't render breadcrumbs on homepage
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="container mx-auto px-4 pt-6 pb-2">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
    </>
  );
}
