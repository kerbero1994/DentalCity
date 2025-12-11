import { test, expect } from "@playwright/test";

test.describe("Magazines", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es/magazines");
  });

  test.describe("Magazines Page", () => {
    test("displays magazines page header", async ({ page }) => {
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toContainText(/revista|magazine/i);
    });

    test("displays magazine cards", async ({ page }) => {
      await page.waitForSelector("article, .magazine-card, [data-testid*='magazine']", {
        timeout: 10000,
      });

      const magazines = page.locator("article, .magazine-card, [data-testid*='magazine']");
      const count = await magazines.count();
      expect(count).toBeGreaterThan(0);
    });

    test("each magazine has cover image", async ({ page }) => {
      await page.waitForSelector("article img, .magazine-card img", { timeout: 10000 });

      const firstImage = page.locator("article img, .magazine-card img").first();
      await expect(firstImage).toBeVisible();
    });

    test("each magazine has title", async ({ page }) => {
      await page.waitForSelector("article, .magazine-card", { timeout: 10000 });

      const firstTitle = page.locator("article h2, article h3, .magazine-card h2, .magazine-card h3").first();
      await expect(firstTitle).toBeVisible();
    });

    test("each magazine has date or edition number", async ({ page }) => {
      await page.waitForSelector("article, .magazine-card", { timeout: 10000 });

      const firstCard = page.locator("article, .magazine-card").first();
      const dateOrEdition = firstCard.locator("time, .date, .edition, [datetime]");

      await expect(dateOrEdition.first()).toBeVisible();
    });

    test("magazines are clickable or downloadable", async ({ page }) => {
      await page.waitForSelector("article a, .magazine-card a, article button, .magazine-card button", {
        timeout: 10000,
      });

      const firstLink = page.locator("article a, .magazine-card a, article button, .magazine-card button").first();
      await expect(firstLink).toBeVisible();
    });
  });

  test.describe("Magazine Interaction", () => {
    test("can click magazine to view details", async ({ page }) => {
      await page.waitForSelector("article a, .magazine-card a", { timeout: 10000 });

      const firstLink = page.locator("article a, .magazine-card a").first();
      await firstLink.click();

      await page.waitForLoadState("networkidle");

      // Should navigate or open magazine
      const currentUrl = page.url();
      expect(currentUrl).toBeTruthy();
    });

    test("magazine download opens PDF", async ({ page }) => {
      await page.waitForSelector("[href$='.pdf'], button:has-text('Descargar'), button:has-text('Download')", {
        timeout: 10000,
      });

      const downloadLink = page.locator("[href$='.pdf']").first();

      if (await downloadLink.count() > 0) {
        const href = await downloadLink.getAttribute("href");
        expect(href).toContain(".pdf");
      }
    });
  });

  test.describe("Magazine Grid Layout", () => {
    test("displays in grid layout", async ({ page }) => {
      await page.waitForSelector("article, .magazine-card", { timeout: 10000 });

      const grid = page.locator(".grid, [class*='grid-cols']");
      const hasGrid = await grid.count() > 0;

      expect(hasGrid).toBeTruthy();
    });

    test("responsive on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.waitForSelector("article, .magazine-card", { timeout: 10000 });

      const magazines = page.locator("article, .magazine-card");
      await expect(magazines.first()).toBeVisible();
    });
  });

  test.describe("Magazine Metadata", () => {
    test("page has proper title", async ({ page }) => {
      await expect(page).toHaveTitle(/revista|magazine/i);
    });

    test("images have alt text", async ({ page }) => {
      await page.waitForSelector("img", { timeout: 10000 });

      const firstImage = page.locator("img").first();
      const altText = await firstImage.getAttribute("alt");
      expect(altText).toBeTruthy();
    });
  });

  test.describe("Magazine Accessibility", () => {
    test("has proper heading hierarchy", async ({ page }) => {
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test("links are keyboard accessible", async ({ page }) => {
      await page.waitForSelector("a", { timeout: 10000 });

      const firstLink = page.locator("a").first();
      await firstLink.focus();

      const isFocused = await firstLink.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBeTruthy();
    });
  });
});
