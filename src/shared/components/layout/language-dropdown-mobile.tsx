"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { languageConfig } from "@/shared/config/supported-locales";

export function LanguageDropdownMobile() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Preserve existing query params and add lang-changed=true
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("lang-changed", "true");

    // Construct new path with new locale and query params
    const newPath = `/${newLocale}${pathWithoutLocale}?${currentParams.toString()}`;
    router.push(newPath);
  };

  return (
    <div className="w-full">
      <div className="mb-2 block px-1 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
        {t("languageLabel")}
      </div>
      <div className="space-y-1">
        {languageConfig.map((lang) => {
          return (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                locale === lang.code
                  ? "bg-red-50 font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              }`}
            >
              {lang.flag && (
                <span className="text-xl" role="img" aria-label={lang.name}>
                  {lang.flag}
                </span>
              )}
              <span className="flex-1 text-left">
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</div>
              </span>
              {locale === lang.code && (
                <svg
                  className="h-4 w-4 text-red-600 dark:text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
