"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import { getEnabledLocales } from "@/shared/config/supported-locales";

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const enabledLocales = getEnabledLocales();

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Preserve existing query params and add lang-changed=true
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("lang-changed", "true");

    const newPath = `/${newLocale}${pathWithoutLocale}?${currentParams.toString()}`;
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        aria-label={t("selectLanguage")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 min-w-[180px] rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="py-1">
            {enabledLocales.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  locale === lang.code
                    ? "bg-gray-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                role="menuitem"
              >
                <span className="text-lg" role="img" aria-label={lang.name}>
                  {lang.flag}
                </span>
                <span className="flex-1 text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</div>
                </span>
                {locale === lang.code && (
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
