"use client";

import { useMemo } from "react";

import { useTheme } from "@/shared/components/theme/theme-provider";

import styles from "./theme-toggle.module.css";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.svg} {...props}>
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </g>
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.svg} {...props}>
      <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646a9 9 0 1 0 11.708 11.708z" fill="currentColor" />
    </svg>
  );
}

export function ThemeToggle({ label }: { label: string }) {
  const { theme, toggleTheme } = useTheme();

  const icon = useMemo(() => (theme === "dark" ? <MoonIcon /> : <SunIcon />), [theme]);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
    >
      {icon}
      <span className="visually-hidden">{theme}</span>
    </button>
  );
}
