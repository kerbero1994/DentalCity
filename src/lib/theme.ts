export const THEME_STORAGE_KEY = "sitimm-theme";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export const themes: Theme[] = ["light", "dark"];
export const defaultTheme: ThemePreference = "system";

export function resolveTheme(
  preference: ThemePreference,
  systemPreference: Theme = "light"
): Theme {
  if (preference === "system") {
    return systemPreference;
  }

  return preference;
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || isTheme(value);
}
