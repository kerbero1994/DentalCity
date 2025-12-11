"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, Languages } from "lucide-react";
import { languageConfig } from "@/shared/config/supported-locales";
import { useThemeTransition } from "@/shared/components/ui/theme-toggle-button";

export function SettingsDropdown() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}?lang-changed=true`;
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-lg border border-gray-200/50 bg-white/80 p-2 transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-black/50 dark:backdrop-blur-md dark:hover:bg-white/10"
        aria-label={t("settings")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 min-w-[280px] rounded-lg border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-black/90 dark:backdrop-blur-xl dark:backdrop-saturate-150">
          {/* Theme Toggle Section */}
          <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">
            <div className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              {t("theme")}
            </div>
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
              <span className="flex-1 text-left text-gray-700 dark:text-gray-300">
                {theme === "dark" ? t("lightMode") : t("darkMode")}
              </span>
            </button>
          </div>

          {/* Language Section */}
          <div className="px-4 py-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              <Languages className="h-4 w-4" />
              {t("languageLabel")}
            </div>
            <div className="max-h-[300px] space-y-1 overflow-y-auto">
              {languageConfig.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
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
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
