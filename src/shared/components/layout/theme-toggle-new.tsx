"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleNew() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t("toggleTheme")}>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
      aria-label={theme === "dark" ? t("lightMode") : t("darkMode")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
    </Button>
  );
}
