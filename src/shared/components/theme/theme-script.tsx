const script = `(() => {
  const storageKey = "sitimm-theme";
  const attribute = "data-theme";
  try {
    const stored = window.localStorage.getItem(storageKey);
    const systemMatch = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = systemMatch.matches ? "dark" : "light";
    const theme = stored === "light" || stored === "dark" ? stored : systemTheme;
    document.documentElement.setAttribute(attribute, theme);
  } catch (error) {
    document.documentElement.setAttribute(attribute, "light");
  }
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
