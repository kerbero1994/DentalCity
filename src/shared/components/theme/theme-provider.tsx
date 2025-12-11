"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  THEME_STORAGE_KEY,
  defaultTheme,
  isTheme,
  resolveTheme,
  type Theme,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const SYSTEM_MEDIA_QUERY = "(prefers-color-scheme: dark)";

function detectSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(SYSTEM_MEDIA_QUERY).matches ? "dark" : "light";
}

function setDocumentTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);

  // Add/remove dark class for Tailwind
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeProvider({
  children,
  initialPreference = defaultTheme,
}: {
  children: React.ReactNode;
  initialPreference?: ThemePreference;
}) {
  const [systemTheme, setSystemTheme] = useState<Theme>(() => detectSystemTheme());
  const [preference, setPreferenceState] = useState<ThemePreference>(initialPreference);

  const theme = useMemo(() => resolveTheme(preference, systemTheme), [preference, systemTheme]);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && (stored === "light" || stored === "dark" || stored === "system")) {
      setPreferenceState(stored as ThemePreference);
    }

    const media = window.matchMedia(SYSTEM_MEDIA_QUERY);
    const handler = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const setPreference = useCallback((value: ThemePreference) => {
    setPreferenceState(value);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // Ignore storage errors (e.g. private mode)
    }

    if (value === "system") {
      setDocumentTheme(detectSystemTheme());
      return;
    }

    if (isTheme(value)) {
      setDocumentTheme(value);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setPreference(nextTheme);
  }, [theme, setPreference]);

  const value = useMemo(
    () => ({
      theme,
      preference,
      setPreference,
      toggleTheme,
    }),
    [theme, preference, setPreference, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
