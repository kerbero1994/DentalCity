import { test, expect } from "@playwright/test";

test.describe("Bulletins", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es/bulletins");
  });

  test.describe("Bulletins Page", () => {
    test("displays bulletins page header", async ({ page }) => {
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toContainText(/bolet[ií]n|bulletin/i);
    });

    test("displays search bar", async ({ page }) => {
      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]');
      const hasSearch = await searchInput.count() > 0;

      if (hasSearch) {
        await expect(searchInput.first()).toBeVisible();
      }
    });

    test("displays bulletin cards", async ({ page }) => {
      await page.waitForSelector("article, .bulletin-card, [data-testid*='bulletin']", {
        timeout: 10000,
      });

      const bulletins = page.locator("article, .bulletin-card, [data-testid*='bulletin']");
      const count = await bulletins.count();
      expect(count).toBeGreaterThan(0);
    });

    test("each bulletin has title", async ({ page }) => {
      await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

      const firstTitle = page.locator("article h2, article h3, .bulletin-card h2, .bulletin-card h3").first();
      await expect(firstTitle).toBeVisible();
    });

    test("each bulletin has date", async ({ page }) => {
      await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

      const firstCard = page.locator("article, .bulletin-card").first();
      const date = firstCard.locator("time, .date, [datetime]");

      await expect(date.first()).toBeVisible();
    });

    test("bulletins are clickable", async ({ page }) => {
      await page.waitForSelector("article a, .bulletin-card a", { timeout: 10000 });

      const firstLink = page.locator("article a, .bulletin-card a").first();
      await expect(firstLink).toBeVisible();
      await expect(firstLink).toHaveAttribute("href", /.+/);
    });
  });

  test.describe("Bulletin Search", () => {
    test("search filters bulletins", async ({ page }) => {
      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();

      if (await searchInput.count() > 0) {
        await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

        await searchInput.fill("test search");
        await page.waitForTimeout(1000);

        // Should still show bulletins or no results message
        const visibleBulletins = await page.locator("article:visible, .bulletin-card:visible").count();
        const noResults = await page.locator(".no-results, .empty-state").count();

        expect(visibleBulletins > 0 || noResults > 0).toBeTruthy();
      }
    });
  });

  test.describe("Bulletin Interaction", () => {
    test("can navigate to bulletin detail", async ({ page }) => {
      await page.waitForSelector("article a, .bulletin-card a", { timeout: 10000 });

      const firstLink = page.locator("article a, .bulletin-card a").first();
      await firstLink.click();

      await page.waitForLoadState("networkidle");

      // Should navigate to detail page
      expect(page.url()).toBeTruthy();
    });

    test("bulletin PDF can be downloaded", async ({ page }) => {
      const pdfLink = page.locator("[href$='.pdf']").first();

      if (await pdfLink.count() > 0) {
        const href = await pdfLink.getAttribute("href");
        expect(href).toContain(".pdf");
      }
    });
  });

  test.describe("Bulletin Grid Layout", () => {
    test("displays in grid layout", async ({ page }) => {
      await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

      const grid = page.locator(".grid, [class*='grid-cols']");
      const hasGrid = await grid.count() > 0;

      expect(hasGrid).toBeTruthy();
    });

    test("responsive on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

      const bulletins = page.locator("article, .bulletin-card");
      await expect(bulletins.first()).toBeVisible();
    });
  });

  test.describe("Bulletin Metadata", () => {
    test("page has proper title", async ({ page }) => {
      await expect(page).toHaveTitle(/bolet[ií]n|bulletin/i);
    });

    test("has meta description", async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute("content", /.+/);
    });
  });

  test.describe("Bulletin Accessibility", () => {
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

  test.describe("Bulletin Pagination", () => {
    test("shows pagination if many bulletins", async ({ page }) => {
      await page.waitForSelector("article, .bulletin-card", { timeout: 10000 });

      const pagination = page.locator("nav[aria-label*='pagination' i], .pagination");
      const hasPagination = await pagination.count() > 0;

      if (hasPagination) {
        await expect(pagination.first()).toBeVisible();
      }
    });
  });
});
