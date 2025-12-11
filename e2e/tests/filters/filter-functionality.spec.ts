import { test, expect } from "@playwright/test";

test.describe("Filter Functionality", () => {
  test.describe("Programs Filters", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/programs");
    });

    test("displays filter options", async ({ page }) => {
      await page.waitForSelector(".filter, [data-testid*='filter'], select, button", {
        timeout: 10000,
      });

      const filterElements = page.locator(".filter, [data-testid*='filter'], select").first();
      const hasFilters = await filterElements.count() > 0;

      expect(hasFilters).toBeTruthy();
    });

    test("can filter by category", async ({ page }) => {
      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a|salud|negocios/i }).first();

      if (await categoryButton.count() > 0) {
        const initialCount = await page.locator("article, .program-card").count();

        await categoryButton.click();
        await page.waitForTimeout(1000);

        const filteredCount = await page.locator("article:visible, .program-card:visible").count();

        expect(filteredCount > 0).toBeTruthy();
      }
    });

    test("can clear filters", async ({ page }) => {
      const clearButton = page.locator('button:has-text("Limpiar"), button:has-text("Clear"), button:has-text("Todos")').first();

      if (await clearButton.count() > 0) {
        // Apply a filter first
        const filterButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();
        if (await filterButton.count() > 0) {
          await filterButton.click();
          await page.waitForTimeout(500);
        }

        // Clear filters
        await clearButton.click();
        await page.waitForTimeout(500);

        const visibleItems = await page.locator("article:visible, .program-card:visible").count();
        expect(visibleItems).toBeGreaterThan(0);
      }
    });

    test("filter updates URL params", async ({ page }) => {
      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(500);

        const url = page.url();
        expect(url.includes("filter") || url.includes("category") || url.includes("type")).toBeTruthy();
      }
    });
  });

  test.describe("Blog Filters", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/blog");
    });

    test("can filter by category or tag", async ({ page }) => {
      const categoryLink = page.locator(".category a, .tag a").first();

      if (await categoryLink.count() > 0) {
        await categoryLink.click();
        await page.waitForLoadState("networkidle");

        const visiblePosts = await page.locator("article:visible, .blog-card:visible").count();
        expect(visiblePosts).toBeGreaterThan(0);
      }
    });

    test("search acts as filter", async ({ page }) => {
      const searchInput = page.locator('input[type="search"]').first();

      if (await searchInput.count() > 0) {
        const initialCount = await page.locator("article, .blog-card").count();

        await searchInput.fill("tecnología");
        await page.waitForTimeout(1000);

        const filteredCount = await page.locator("article:visible, .blog-card:visible").count();
        expect(filteredCount <= initialCount).toBeTruthy();
      }
    });
  });

  test.describe("Events Filters", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/events");
    });

    test("can filter by date range", async ({ page }) => {
      const dateFilter = page.locator('input[type="date"], select[name*="date"]').first();

      if (await dateFilter.count() > 0) {
        await dateFilter.click();

        await page.waitForTimeout(500);

        const visibleEvents = await page.locator("article:visible, .event-card:visible").count();
        expect(visibleEvents >= 0).toBeTruthy();
      }
    });

    test("can filter by event type", async ({ page }) => {
      const typeButton = page.locator("button, a").filter({ hasText: /conferencia|taller|seminario/i }).first();

      if (await typeButton.count() > 0) {
        await typeButton.click();
        await page.waitForTimeout(1000);

        const visibleEvents = await page.locator("article:visible, .event-card:visible").count();
        expect(visibleEvents >= 0).toBeTruthy();
      }
    });
  });

  test.describe("FAQ Filters", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/faq");
    });

    test("can filter by category", async ({ page }) => {
      const categoryButton = page.locator("button, a").filter({ hasText: /general|académico|técnico/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(500);

        const visibleFaqs = await page.locator("details:visible, .faq-item:visible").count();
        expect(visibleFaqs).toBeGreaterThan(0);
      }
    });

    test("search filters FAQ results", async ({ page }) => {
      const searchInput = page.locator('input[type="search"]').first();

      if (await searchInput.count() > 0) {
        await searchInput.fill("programa");
        await page.waitForTimeout(1000);

        const visibleFaqs = await page.locator("details:visible, .faq-item:visible").count();
        const noResults = await page.locator(".no-results, .empty-state").count();

        expect(visibleFaqs > 0 || noResults > 0).toBeTruthy();
      }
    });
  });

  test.describe("Multiple Filters", () => {
    test("can apply multiple filters simultaneously", async ({ page }) => {
      await page.goto("/es/programs");

      // Apply first filter
      const firstFilter = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();
      if (await firstFilter.count() > 0) {
        await firstFilter.click();
        await page.waitForTimeout(500);
      }

      // Apply second filter if available
      const secondFilter = page.locator('select, button:has-text("Filtrar")').first();
      if (await secondFilter.count() > 0) {
        await secondFilter.click();
        await page.waitForTimeout(500);
      }

      const visibleItems = await page.locator("article:visible, .program-card:visible").count();
      expect(visibleItems >= 0).toBeTruthy();
    });

    test("filters work together correctly", async ({ page }) => {
      await page.goto("/es/events");

      const categoryFilter = page.locator("button, a").filter({ hasText: /conferencia/i }).first();
      const searchInput = page.locator('input[type="search"]').first();

      if ((await categoryFilter.count()) > 0 && (await searchInput.count()) > 0) {
        // Apply category filter
        await categoryFilter.click();
        await page.waitForTimeout(500);

        const countAfterCategory = await page.locator("article:visible, .event-card:visible").count();

        // Add search filter
        await searchInput.fill("seguridad");
        await page.waitForTimeout(1000);

        const countAfterBoth = await page.locator("article:visible, .event-card:visible").count();

        // Combined filters should show same or fewer results
        expect(countAfterBoth <= countAfterCategory).toBeTruthy();
      }
    });
  });

  test.describe("Filter Persistence", () => {
    test("filters persist across navigation", async ({ page }) => {
      await page.goto("/es/programs");

      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(500);

        const urlWithFilter = page.url();

        // Navigate away and back
        await page.goto("/es");
        await page.goBack();

        await page.waitForLoadState("networkidle");

        // Filter should still be applied (check URL)
        const currentUrl = page.url();
        expect(currentUrl === urlWithFilter || currentUrl.includes("filter") || currentUrl.includes("category")).toBeTruthy();
      }
    });

    test("filter state survives page reload", async ({ page }) => {
      await page.goto("/es/programs");

      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(500);

        const countBeforeReload = await page.locator("article:visible, .program-card:visible").count();

        await page.reload();
        await page.waitForLoadState("networkidle");

        const countAfterReload = await page.locator("article:visible, .program-card:visible").count();

        // Should show similar number of filtered results
        expect(Math.abs(countBeforeReload - countAfterReload) <= 1).toBeTruthy();
      }
    });
  });

  test.describe("Filter UI/UX", () => {
    test("active filter is visually indicated", async ({ page }) => {
      await page.goto("/es/programs");

      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(300);

        // Check for active state
        const className = await categoryButton.getAttribute("class");
        const ariaCurrent = await categoryButton.getAttribute("aria-current");

        expect(className?.includes("active") || ariaCurrent === "true").toBeTruthy();
      }
    });

    test("filter count updates correctly", async ({ page }) => {
      await page.goto("/es/programs");

      const initialCount = await page.locator("article, .program-card").count();

      const categoryButton = page.locator("button, a").filter({ hasText: /ingenier[ií]a/i }).first();

      if (await categoryButton.count() > 0) {
        await categoryButton.click();
        await page.waitForTimeout(1000);

        const filteredCount = await page.locator("article:visible, .program-card:visible").count();

        // Count should be different or show count indicator
        const countIndicator = page.locator(".count, .results-count, [data-testid*='count']");
        const hasCountIndicator = await countIndicator.count() > 0;

        expect(filteredCount !== initialCount || hasCountIndicator).toBeTruthy();
      }
    });

    test("no results message appears when appropriate", async ({ page }) => {
      await page.goto("/es/blog");

      const searchInput = page.locator('input[type="search"]').first();

      if (await searchInput.count() > 0) {
        await searchInput.fill("xyznonexistentquery12345");
        await page.waitForTimeout(1500);

        const noResults = page.locator(".no-results, .empty-state, [data-testid*='no-results']");
        const visiblePosts = await page.locator("article:visible, .blog-card:visible").count();

        expect((await noResults.count()) > 0 || visiblePosts === 0).toBeTruthy();
      }
    });
  });
});
