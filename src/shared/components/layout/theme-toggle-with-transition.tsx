"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggleButton, useThemeTransition } from "@/shared/components/ui/theme-toggle-button";

export function ThemeToggleWithTransition() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { startTransition } = useThemeTransition();
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    startTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  };

  return (
    <ThemeToggleButton
      theme={theme as "light" | "dark"}
      variant="circle"
      onClick={handleToggle}
      aria-label={t("toggleTheme")}
    />
  );
}
