"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { SearchBar } from "./search/search-bar";
import { SettingsDropdown } from "./settings-dropdown";
import { ThemeToggleWithTransition } from "./theme-toggle-with-transition";
import { LanguageDropdown } from "./language-dropdown";

import sitimmLogo from "@/assets/sitimm_logo.webp";

import styles from "./site-header.module.css";

export type HeaderContent = {
  brand?: string;
  brandSubtitle?: string;
  logoAlt?: string;
  logoSrc?: string;
  nav?: Array<{ label: string; href: string }>;
  searchLabel?: string;
  menuLabel?: string;
  ariaLabel?: string;
  cta?: {
    label: string;
    href: string;
  };
};

export function SiteHeader({
  content,
  locale,
}: {
  content?: HeaderContent | Record<string, unknown>;
  locale?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const tCommon = useTranslations("common");
  const tEvents = useTranslations("events");
  const tHeader = useTranslations("header");
  const currentLocale = useLocale();
  const activeLocale = locale || currentLocale;
  const pathname = usePathname();

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const header = (content ?? {}) as HeaderContent;

  const FALLBACK_NAV: Array<{ label: string; href: string }> = [
    { label: tCommon("home"), href: `/${activeLocale}` },
    { label: tEvents("title"), href: `/${activeLocale}/eventos` },
    { label: tCommon("programs"), href: `/${activeLocale}/programas` },
    { label: tCommon("magazines"), href: `/${activeLocale}/revistas` },
    { label: tCommon("blog"), href: `/${activeLocale}/blog` },
    { label: tCommon("faq"), href: `/${activeLocale}/preguntas-frecuentes` },
    {
      label: tCommon("bulletins"),
      href: `/${activeLocale}/boletines`,
    },
    {
      label: tCommon("benefits"),
      href: `/${activeLocale}/descuentos`,
    },
  ];

  const brand = header.brand ?? "SITIMM";
  const logoSource = header.logoSrc ?? sitimmLogo;
  const logoAlt = header.logoAlt ?? tCommon("sitimmLogo");
  const navItems = Array.isArray(header.nav) && header.nav.length > 0 ? header.nav : FALLBACK_NAV;
  const searchLabel = header.searchLabel ?? tCommon("search");
  const menuLabel = header.menuLabel ?? tCommon("menu");
  const ariaLabel = header.ariaLabel ?? tHeader("a11y.mainNav");
  const brandSubtitle = header.brandSubtitle ?? tHeader("brandSubtitle");

  // Check if we're on the search page
  const isSearchPage = pathname.includes("/buscar") || pathname.includes("/search");

  return (
    <>
      <header className={`${styles.header} ${isMobileSearchOpen ? styles.headerSearchOpen : ""}`}>
        <div className={`container ${styles.inner}`}>
          {/* Marca */}
          <Link href={`/${activeLocale}`} className={styles.brandWrapper}>
            <span className={styles.brandMark} aria-hidden>
              {logoSource ? (
                <Image
                  src={logoSource}
                  alt={logoAlt}
                  width={46}
                  height={46}
                  className={styles.brandImage}
                  priority
                />
              ) : (
                <span className={styles.brandInitial}>Si</span>
              )}
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>{brand}</span>
              {brandSubtitle ? <span className={styles.brandSubtitle}>{brandSubtitle}</span> : null}
            </span>
          </Link>

          <div className={styles.navActions}>
            <div className={styles.navigationArea}>
              {/* Navegación principal */}
              <nav className={styles.nav} aria-label={ariaLabel}>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <details className={styles.mobileMenu} role="list">
                <summary className={styles.menuSummary} aria-label={menuLabel}>
                  <span className={styles.icon} aria-hidden>
                    menu
                  </span>
                  <span className={styles.menuText}>{menuLabel}</span>
                </summary>
                <div className={styles.mobilePanel} role="list">
                  {!isSearchPage && (
                    <SearchBar
                      ariaLabel={tHeader("a11y.searchMobile")}
                      placeholder={tHeader("searchPlaceholder")}
                      action={`/${activeLocale}/buscar`}
                      className={styles.searchMobile}
                    />
                  )}

                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.mobileLink}>
                      <span>{item.label}</span>
                      <span className={styles.icon} aria-hidden>
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            </div>

            {/* Acciones: search adaptativo + CTA + Theme/Language */}
            <div className={styles.actions}>
              {!isSearchPage && (
                <>
                  <div className={styles.searchInline}>
                    <SearchBar
                      ariaLabel={searchLabel}
                      placeholder={tHeader("searchPlaceholder")}
                      action={`/${activeLocale}/buscar`}
                      className={styles.searchBar}
                    />
                  </div>

                  {/* Mobile Search Button */}
                  <button
                    className={`${styles.mobileSearchButton} ${isMobileSearchOpen ? styles.mobileSearchButtonHidden : ""}`}
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    aria-label={tCommon("search")}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Hamburger Menu Button for Tablet/Mobile */}
              <button
                className={styles.hamburgerButton}
                onClick={() => (isMobileMenuOpen ? handleCloseMenu() : setIsMobileMenuOpen(true))}
                aria-label={isMobileMenuOpen ? tCommon("close") : tCommon("menu")}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Theme and Language - Hidden on mobile, Settings on mobile */}
              <div className={styles.desktopControls}>
                <ThemeToggleWithTransition />
                <LanguageDropdown />
              </div>
              <div className={styles.mobileControls}>
                <SettingsDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {!isSearchPage && isMobileSearchOpen && (
        <div className={styles.mobileSearchContainer}>
          <div className={styles.mobileSearchWrapper}>
            <SearchBar
              ariaLabel={searchLabel}
              placeholder={tHeader("searchPlaceholder")}
              action={`/${activeLocale}/buscar`}
              className={styles.mobileSearchBar}
            />
            <button
              className={styles.mobileSearchCloseButton}
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label={tCommon("close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`${styles.mobileMenuBackdrop} ${isClosing ? styles.fadeOut : ""}`}
            onClick={handleCloseMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <nav className={`${styles.mobileMenuPanel} ${isClosing ? styles.slideOutRight : ""}`}>
            <div className={styles.mobileMenuContent}>
              {/* Close button */}
              <button
                className={styles.mobileMenuClose}
                onClick={handleCloseMenu}
                aria-label={tCommon("close")}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Links */}
              <div className={styles.mobileMenuLinks}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileMenuLink}
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
