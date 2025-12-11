"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import sitimmLogo from "@/assets/sitimm_logo.png";
import { LanguageDropdownMobile } from "./language-dropdown-mobile";
import { LanguageDropdown } from "./language-dropdown";

export function SiteHeaderResponsive() {
  const tCommon = useTranslations("common");
  const tEvents = useTranslations("events");
  const tHeader = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: tCommon("home"), href: `/${locale}` },
    { label: tEvents("title"), href: `/${locale}/eventos` },
    { label: tCommon("programs"), href: `/${locale}/programas` },
    { label: tCommon("magazines"), href: `/${locale}/revistas` },
    { label: tCommon("blog"), href: `/${locale}/blog` },
    { label: tCommon("faq"), href: `/${locale}/preguntas-frecuentes` },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/buscar?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full rounded-b-[28px] border-b border-white/[0.08] shadow-[0_16px_40px_rgba(115,11,18,0.35)]"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, #9b1015 55%, #820a10 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            {/* Left side - Search and Theme on mobile */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={tCommon("search")}
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={tCommon("theme")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Center - Logo */}
            <Link href={`/${locale}`} className="absolute left-1/2 -translate-x-1/2">
              <Image src={sitimmLogo} alt={tCommon("sitimmLogo")} width={40} height={40} priority />
            </Link>

            {/* Right side - Menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={tCommon("menu")}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden h-20 items-center justify-between lg:flex">
            {/* Logo and Brand */}
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image src={sitimmLogo} alt={tCommon("sitimmLogo")} width={50} height={50} priority />
              <div className="flex flex-col">
                <span className="text-xl font-bold">SITIMM</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {tHeader("brandSubtitle")}
                </span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 xl:text-base dark:text-gray-300 dark:hover:text-red-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions - Desktop */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative hidden xl:block">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tHeader("searchPlaceholder")}
                  className="w-64 rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label={tCommon("search")}
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Search button for LG screens */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="rounded-lg p-2 hover:bg-gray-100 xl:hidden dark:hover:bg-gray-800"
                aria-label={tCommon("search")}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Language Switcher */}
              <LanguageDropdown />

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={tCommon("theme")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 lg:hidden dark:border-gray-800">
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tHeader("searchPlaceholder")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-red-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                  aria-label={tCommon("search")}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Desktop Search Bar for LG screens */}
        {isSearchOpen && (
          <div className="hidden border-t border-gray-200 lg:block xl:hidden dark:border-gray-800">
            <form onSubmit={handleSearch} className="container mx-auto p-4">
              <div className="relative mx-auto max-w-2xl">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tHeader("searchPlaceholder")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-red-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                  aria-label={tCommon("search")}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-label={tCommon("close")}
            type="button"
          />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <span className="text-lg font-bold">{tCommon("menu")}</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={tCommon("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
                <LanguageDropdownMobile />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
