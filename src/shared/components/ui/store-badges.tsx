"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "./store-badges.module.css";

interface StoreBadgeProps {
  href: string;
  className?: string;
}

export function AppStoreBadge({ href, className }: StoreBadgeProps) {
  const t = useTranslations("common.storeBadges");

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.badge} ${styles.appStore} ${className ?? ""}`}
      aria-label={t("appStore.aria")}
    >
      {/* Apple Logo */}
      <svg className={styles.appleLogo} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>

      <div className={styles.textContent}>
        <span className={styles.smallText}>{t("appStore.downloadOn")}</span>
        <span className={styles.storeName}>{t("appStore.name")}</span>
      </div>
    </Link>
  );
}

export function GooglePlayBadge({ href, className }: StoreBadgeProps) {
  const t = useTranslations("common.storeBadges");

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.badge} ${styles.googlePlay} ${className ?? ""}`}
      aria-label={t("googlePlay.aria")}
    >
      {/* Google Play Logo - Triangle */}
      <svg className={styles.playLogo} viewBox="0 0 512 512" fill="none" aria-hidden>
        <path
          d="M48 59.49v393a31.06 31.06 0 0 0 46.75 26.87L346 324.47a31.06 31.06 0 0 0 0-53.75L94.75 32.62A31.06 31.06 0 0 0 48 59.49z"
          fill="url(#playGradient)"
        />
        <defs>
          <linearGradient
            id="playGradient"
            x1="48"
            y1="256"
            x2="346"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00C3FF" />
            <stop offset="25%" stopColor="#00E676" />
            <stop offset="50%" stopColor="#FFEA00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.textContent}>
        <span className={styles.smallText}>{t("googlePlay.getItOn")}</span>
        <span className={styles.storeName}>{t("googlePlay.name")}</span>
      </div>
    </Link>
  );
}
