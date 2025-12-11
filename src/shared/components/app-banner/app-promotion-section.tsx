"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./app-promotion-section.module.css";

// App Store URLs
const APP_STORE_URL = "https://apps.apple.com/mx/app/yo-soy-sitimm/id1523747987";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.sitimm.app&hl=es_MX";

// QR Code URLs using QR Server API (200x200 size, high error correction)
const IOS_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=H&data=${encodeURIComponent(APP_STORE_URL)}`;
const ANDROID_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=H&data=${encodeURIComponent(PLAY_STORE_URL)}`;

interface AppPromotionSectionProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * App promotion section with QR codes and store badges
 * Shows download options for iOS and Android apps
 */
export function AppPromotionSection({
  variant = "full",
  className = "",
}: AppPromotionSectionProps) {
  const t = useTranslations("appPromotion");

  return (
    <section className={`${styles.section} ${styles[variant]} ${className}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.appIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="2"
                width="14"
                height="20"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="18" r="1" fill="currentColor" />
              <path d="M9 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        {/* App Cards */}
        <div className={styles.cards}>
          {/* iOS Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg className={styles.storeIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <span className={styles.cardLabel}>{t("downloadOn")}</span>
                <span className={styles.cardStore}>{t("appStore")}</span>
              </div>
            </div>
            <div className={styles.qrWrapper}>
              <Image
                src={IOS_QR_URL}
                alt={t("iosQrAlt")}
                width={160}
                height={160}
                className={styles.qrCode}
                unoptimized
              />
            </div>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t("downloadIOS")}
            </a>
          </div>

          {/* Android Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg className={styles.storeIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 2.066a.5.5 0 0 0-.68-.18l-1.726.99a6.96 6.96 0 0 0-6.233 0l-1.727-.99a.5.5 0 1 0-.5.866l1.5.865a6.98 6.98 0 0 0-2.13 3.383H3.5a.5.5 0 0 0 0 1h2.382a7.027 7.027 0 0 0 0 2H3.5a.5.5 0 0 0 0 1h2.527a6.98 6.98 0 0 0 2.13 3.383l-1.5.865a.5.5 0 1 0 .5.866l1.727-.99a6.96 6.96 0 0 0 6.233 0l1.726.99a.5.5 0 1 0 .5-.866l-1.5-.865a6.98 6.98 0 0 0 2.13-3.383h2.527a.5.5 0 0 0 0-1h-2.382a7.027 7.027 0 0 0 0-2h2.382a.5.5 0 0 0 0-1h-2.527a6.98 6.98 0 0 0-2.13-3.383l1.5-.865a.5.5 0 0 0 .18-.68zM9.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <div>
                <span className={styles.cardLabel}>{t("getItOn")}</span>
                <span className={styles.cardStore}>{t("googlePlay")}</span>
              </div>
            </div>
            <div className={styles.qrWrapper}>
              <Image
                src={ANDROID_QR_URL}
                alt={t("androidQrAlt")}
                width={160}
                height={160}
                className={styles.qrCode}
                unoptimized
              />
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.downloadButton} ${styles.androidButton}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              {t("downloadAndroid")}
            </a>
          </div>
        </div>

        {/* Features */}
        {variant === "full" && (
          <div className={styles.features}>
            <div className={styles.feature}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>{t("featureSecure")}</span>
            </div>
            <div className={styles.feature}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{t("featureFast")}</span>
            </div>
            <div className={styles.feature}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{t("featureNotifications")}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
