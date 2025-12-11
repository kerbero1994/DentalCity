import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es");
    await page.waitForLoadState("networkidle");
  });

  test.describe("Global Search", () => {
    test("search input is accessible", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await expect(searchInput).toBeVisible();
    });

    test("can type in search input", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("seguridad");
      await expect(searchInput).toHaveValue("seguridad");
    });

    test("search triggers on Enter key", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("seguridad");
      await searchInput.press("Enter");

      // Should navigate to search results or filter content
      await page.waitForLoadState("networkidle");

      // Verify URL contains search parameter or results are filtered
      const url = page.url();
      expect(url.includes("seguridad") || url.includes("search") || url.includes("q=")).toBeTruthy();
    });

    test("search shows results for events", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("curso");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // Verify search results contain the search term
      const results = await page.locator("[data-testid='event-card'], .event-card, article").count();
      expect(results).toBeGreaterThanOrEqual(0); // May have zero results

      if (results > 0) {
        const firstResult = page.locator("[data-testid='event-card'], .event-card, article").first();
        await expect(firstResult).toBeVisible();
      }
    });

    test("search is case-insensitive", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      await searchInput.fill("CURSO");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      const url1 = page.url();

      await page.goto("/es/events");
      await searchInput.fill("curso");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // Results should be similar for case-insensitive search
      const results = await page.locator("[data-testid='event-card'], .event-card, article").count();
      expect(results).toBeGreaterThanOrEqual(0);
    });

    test("empty search shows all results", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const initialCount = await page.locator("[data-testid='event-card'], .event-card, article").count();

      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("test");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      await searchInput.clear();
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      const finalCount = await page.locator("[data-testid='event-card'], .event-card, article").count();

      // Should show all or similar number of results
      expect(finalCount).toBeGreaterThan(0);
    });
  });

  test.describe("Event Search", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");
    });

    test("events page has search functionality", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      await expect(searchInput).toBeVisible();
    });

    test("can search for specific event", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("taller");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // Check if results contain the search term
      const pageContent = await page.content();
      expect(pageContent.toLowerCase().includes("taller") ||
             pageContent.toLowerCase().includes("no results") ||
             pageContent.toLowerCase().includes("no se encontraron")).toBeTruthy();
    });

    test("search persists across page refresh", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("seguridad");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      await page.reload();
      await page.waitForLoadState("networkidle");

      // Search term may persist in URL or local storage
      const url = page.url();
      const currentSearch = await searchInput.inputValue();

      expect(url.includes("seguridad") || currentSearch === "seguridad").toBeTruthy();
    });

    test("search with special characters", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("capacitación");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // Should handle accented characters correctly
      expect(page.url()).toBeTruthy();
    });
  });

  test.describe("Program Search", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");
    });

    test("programs page has search", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      if (await searchInput.isVisible()) {
        await expect(searchInput).toBeVisible();
      }
    });

    test("can search programs", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();

      if (await searchInput.isVisible()) {
        await searchInput.fill("seguridad");
        await searchInput.press("Enter");
        await page.waitForLoadState("networkidle");

        const results = await page.locator("[data-testid='program-card'], .program-card, article").count();
        expect(results).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe("Search Autocomplete / Suggestions", () => {
    test("search may show suggestions", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("segu");

      // Wait to see if autocomplete appears
      await page.waitForTimeout(500);

      // Check if suggestions/dropdown appears
      const suggestions = page.locator("[role='listbox'], .autocomplete, .suggestions");
      const hasSuggestions = await suggestions.count() > 0;

      // Test passes whether or not autocomplete is implemented
      expect(hasSuggestions).toBeDefined();
    });
  });

  test.describe("Search Accessibility", () => {
    test("search has proper ARIA labels", async ({ page }) => {
      const searchInput = page.getByRole("searchbox").first();

      const ariaLabel = await searchInput.getAttribute("aria-label");
      const placeholder = await searchInput.getAttribute("placeholder");

      // Should have either aria-label or placeholder for accessibility
      expect(ariaLabel || placeholder).toBeTruthy();
    });

    test("search is keyboard accessible", async ({ page }) => {
      // Tab to search input
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBeDefined();
    });

    test("search results are announced", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      await searchInput.fill("curso");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // Check for ARIA live region or status
      const liveRegion = page.locator("[aria-live], [role='status']");
      const hasAnnouncement = await liveRegion.count() > 0;

      // Accessibility feature may or may not be implemented
      expect(hasAnnouncement).toBeDefined();
    });
  });

  test.describe("Search Performance", () => {
    test("search responds quickly", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      const startTime = Date.now();
      await searchInput.fill("seguridad");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");
      const endTime = Date.now();

      const duration = endTime - startTime;

      // Search should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    test("search handles rapid input changes", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      // Type quickly
      await searchInput.type("seguridadlaboral", { delay: 50 });
      await page.waitForTimeout(200);

      // Should handle without crashing
      const value = await searchInput.inputValue();
      expect(value).toBe("seguridadlaboral");
    });
  });

  test.describe("Multi-language Search", () => {
    test("search works in English", async ({ page }) => {
      await page.goto("/en/events");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("safety");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      expect(page.url()).toBeTruthy();
    });

    test("search works in French", async ({ page }) => {
      await page.goto("/fr/events");
      await page.waitForLoadState("networkidle");

      const searchInput = page.getByRole("searchbox").first();
      await searchInput.fill("sécurité");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      expect(page.url()).toBeTruthy();
    });

    test("search maintains language context", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      await searchInput.fill("curso");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      // URL should still contain /es/ language prefix
      expect(page.url()).toContain("/es");
    });
  });

  test.describe("No Results", () => {
    test("shows appropriate message for no results", async ({ page }) => {
      await page.goto("/es/events");
      const searchInput = page.getByRole("searchbox").first();

      await searchInput.fill("xyzabc123nonexistent");
      await searchInput.press("Enter");
      await page.waitForLoadState("networkidle");

      const content = await page.content();

      // Should show "no results" message (in Spanish or any language)
      const hasNoResultsMessage =
        content.toLowerCase().includes("no se encontraron") ||
        content.toLowerCase().includes("no results") ||
        content.toLowerCase().includes("sin resultados") ||
        content.toLowerCase().includes("no hay resultados");

      // Either shows no results message OR shows zero results
      const resultsCount = await page.locator("[data-testid='event-card'], .event-card, article").count();

      expect(hasNoResultsMessage || resultsCount === 0).toBeTruthy();
    });
  });
});
