"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { languageConfig } from "@/shared/config/supported-locales";

export function LanguageDropdown() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Encontrar el idioma actual
  const currentLanguage = languageConfig.find((lang) => lang.code === locale) || languageConfig[0];

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Construct new path with new locale and lang-changed query param
    const newPath = `/${newLocale}${pathWithoutLocale}?lang-changed=true`;
    router.push(newPath);
    setIsOpen(false);
  };

  // Cerrar dropdown al hacer clic fuera
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
        className="flex items-center gap-2 rounded-lg border border-gray-200/50 bg-white/80 px-3 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-black/50 dark:backdrop-blur-md dark:hover:bg-white/10"
        aria-label={`${t("selectLanguage")}: ${currentLanguage.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {currentLanguage.flag && (
          <span className="text-lg" aria-hidden="true">
            {currentLanguage.flag}
          </span>
        )}
        <span className={currentLanguage.flag ? "hidden sm:inline" : ""} aria-hidden="true">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 min-w-[180px] rounded-lg border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-black/90 dark:backdrop-blur-xl dark:backdrop-saturate-150">
          <div className="py-1">
            {languageConfig.map((lang) => {
              return (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-all duration-200 ${
                    locale === lang.code
                      ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                  }`}
                  role="menuitem"
                >
                  {lang.flag && (
                    <span className="text-lg" role="img" aria-label={lang.name}>
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
      )}
    </div>
  );
}
