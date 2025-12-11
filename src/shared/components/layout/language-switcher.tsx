"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { locales } from "@/shared/config/supported-locales";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1">
      {locales.map((lng) => (
        <Button
          key={lng}
          variant={locale === lng ? "default" : "ghost"}
          size="sm"
          onClick={() => switchLocale(lng)}
          className="min-w-[40px] px-2"
        >
          {lng.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
