import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

const SUPPORTED_LOCALES = ["es", "en", "fr", "de", "ja", "ko", "zh", "hi"];

test.describe("Internationalization (i18n)", () => {
  test.describe("Locale Loading", () => {
    for (const locale of SUPPORTED_LOCALES) {
      test(`${locale} - content loads correctly`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await page.waitForLoadState("networkidle");

        // Verify HTML lang attribute
        const htmlLang = await page.locator("html").getAttribute("lang");
        expect(htmlLang).toBe(locale);

        // Verify page has content
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        const text = await h1.textContent();
        expect(text).toBeTruthy();
        expect(text?.trim().length).toBeGreaterThan(0);

        // Verify content is not English placeholder (for non-English locales)
        if (locale !== "en") {
          const bodyText = await page.locator("body").textContent();
          // Should not have obvious English placeholders
          expect(bodyText).not.toContain("COURSE - WORKSHOP");
        }
      });
    }
  });

  test.describe("Language Switcher", () => {
    test("language switcher changes content language", async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto("es");

      // Get Spanish content
      const spanishTitle = await homePage.heroTitle.textContent();

      // Switch to English
      await homePage.switchLanguage("en");
      await expect(page).toHaveURL(/.*\/en/);

      // Get English content
      const englishTitle = await homePage.heroTitle.textContent();

      // Content should be different
      expect(spanishTitle).not.toBe(englishTitle);
    });

    test("language switcher shows all supported languages", async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await homePage.languageSwitcher.click();

      // Check for each locale option
      for (const locale of SUPPORTED_LOCALES) {
        const option = page.getByRole("option", {
          name: new RegExp(locale, "i"),
        });
        await expect(option).toBeVisible();
      }
    });

    test("language switcher preserves current page", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const homePage = new HomePage(page);
      await homePage.switchLanguage("en");

      // Should still be on events page, but in English
      await expect(page).toHaveURL(/\/en\/events/);
    });

    test("language preference persists across navigation", async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto("en");
      await homePage.goToEvents();

      // Should still be in English
      await expect(page).toHaveURL(/\/en\/events/);

      // Navigate to another page
      await page.goto("/en");
      await homePage.goToPrograms();

      // Should still be in English
      await expect(page).toHaveURL(/\/en\/programs/);
    });
  });

  test.describe("RTL Languages", () => {
    // If Arabic or Hebrew are added later
    test.skip("RTL languages have correct text direction", async ({ page }) => {
      await page.goto("/ar");
      const direction = await page.locator("html").getAttribute("dir");
      expect(direction).toBe("rtl");
    });
  });

  test.describe("Date and Number Formatting", () => {
    test("dates are formatted according to locale", async ({ page }) => {
      // Spanish
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");
      const dateSpanish = await page
        .locator('[data-testid="event-date"]')
        .first()
        .textContent();

      // English
      await page.goto("/en/events");
      await page.waitForLoadState("networkidle");
      const dateEnglish = await page
        .locator('[data-testid="event-date"]')
        .first()
        .textContent();

      // Formats should be different (if dates exist)
      if (dateSpanish && dateEnglish) {
        expect(dateSpanish).not.toBe(dateEnglish);
      }
    });
  });

  test.describe("Missing Translations", () => {
    test("pages don't show translation keys", async ({ page }) => {
      for (const locale of SUPPORTED_LOCALES) {
        await page.goto(`/${locale}`);
        await page.waitForLoadState("networkidle");

        const bodyText = await page.locator("body").textContent();

        // Should not contain translation key patterns
        expect(bodyText).not.toMatch(/\{\{.*\}\}/);
        expect(bodyText).not.toMatch(/\[missing\]/i);
        expect(bodyText).not.toMatch(/translation\.key/);
      }
    });
  });

  test.describe("URL Localization", () => {
    test("URLs include locale prefix", async ({ page }) => {
      await page.goto("/es");
      expect(page.url()).toContain("/es");

      await page.goto("/en");
      expect(page.url()).toContain("/en");
    });

    test("root URL redirects to default locale", async ({ page }) => {
      await page.goto("/");

      // Should redirect to a locale (likely es or en)
      const url = page.url();
      const hasLocale = SUPPORTED_LOCALES.some((locale) =>
        url.includes(`/${locale}`)
      );
      expect(hasLocale).toBe(true);
    });

    test("invalid locale redirects to default", async ({ page }) => {
      await page.goto("/invalid-locale");

      // Should redirect to valid locale
      const url = page.url();
      const hasValidLocale = SUPPORTED_LOCALES.some((locale) =>
        url.includes(`/${locale}`)
      );
      expect(hasValidLocale).toBe(true);
    });
  });

  test.describe("Content Translation Quality", () => {
    test("event titles are translated", async ({ page }) => {
      // Get Spanish event title
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");
      const titleEs = await page
        .locator('[data-testid="event-card"] h2, [data-testid="event-card"] h3')
        .first()
        .textContent();

      // Get English event title
      await page.goto("/en/events");
      await page.waitForLoadState("networkidle");
      const titleEn = await page
        .locator('[data-testid="event-card"] h2, [data-testid="event-card"] h3')
        .first()
        .textContent();

      // Titles should exist and be different
      if (titleEs && titleEn) {
        expect(titleEs).not.toBe(titleEn);
      }
    });

    test("navigation labels are translated", async ({ page }) => {
      const homePage = new HomePage(page);

      // Spanish
      await homePage.goto("es");
      const navTextEs = await homePage.navigation.textContent();
      expect(navTextEs).toContain("Eventos");

      // English
      await homePage.goto("en");
      const navTextEn = await homePage.navigation.textContent();
      expect(navTextEn).toContain("Events");
    });
  });
});
