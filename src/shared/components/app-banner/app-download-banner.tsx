"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./app-download-banner.module.css";

interface AppDownloadBannerProps {
  /**
   * Deep link path to open in the app
   * @example "/descuentos/123"
   */
  deepLinkPath?: string;
}

/**
 * Banner that promotes downloading/opening the SITIMM mobile app
 * Shows when user is on mobile and hasn't dismissed it
 */
export function AppDownloadBanner({ deepLinkPath }: AppDownloadBannerProps) {
  const t = useTranslations("appBanner");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobile = /iphone|ipad|ipod|android/.test(userAgent);
      setIsMobile(mobile);
      return mobile;
    };

    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem("app-banner-dismissed");
    const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Show banner if on mobile and not dismissed in last 24 hours
    if (checkMobile() && now - dismissedTime > oneDayInMs) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("app-banner-dismissed", Date.now().toString());
  };

  const handleOpenApp = () => {
    const appUrl = deepLinkPath
      ? `https://sitimm.org/app${deepLinkPath}`
      : "https://sitimm.org/app/home";

    // Try to open the app
    window.location.href = appUrl;

    // Fallback to app store after a delay if app doesn't open
    setTimeout(() => {
      const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
      const storeUrl = isIOS
        ? "https://apps.apple.com/mx/app/yo-soy-sitimm/id1523747987"
        : "https://play.google.com/store/apps/details?id=com.sitimm.app&hl=es_MX";

      window.location.href = storeUrl;
    }, 2000);
  };

  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3C19 1.89543 18.1046 1 17 1Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{t("title")}</p>
          <p className={styles.description}>{t("description")}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleOpenApp} className={styles.openButton}>
            {t("open")}
          </button>
          <button
            onClick={handleDismiss}
            className={styles.dismissButton}
            aria-label={t("dismiss")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
