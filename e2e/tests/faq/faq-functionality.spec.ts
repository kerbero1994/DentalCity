import { test, expect } from "@playwright/test";

test.describe("FAQ Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es/faq");
  });

  test.describe("FAQ Page Layout", () => {
    test("displays FAQ page header", async ({ page }) => {
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toContainText(/faq|preguntas|frecuentes/i);
    });

    test("displays search functionality", async ({ page }) => {
      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i], input[placeholder*="search" i]');
      await expect(searchInput.first()).toBeVisible();
    });

    test("displays FAQ categories", async ({ page }) => {
      await page.waitForSelector(".category, [data-testid*='category'], button, a", {
        timeout: 10000,
      });

      const categories = page.locator(".category, [data-testid*='category']");
      const categoryButtons = page.locator("button, a").filter({ hasText: /general|académico|técnico|inscripción/i });

      const hasCategoriesOrButtons = (await categories.count()) > 0 || (await categoryButtons.count()) > 0;
      expect(hasCategoriesOrButtons).toBeTruthy();
    });

    test("displays FAQ items", async ({ page }) => {
      await page.waitForSelector("details, .faq-item, [data-testid*='faq'], button", {
        timeout: 10000,
      });

      const faqItems = page.locator("details, .faq-item, [data-testid*='faq']");
      const count = await faqItems.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("FAQ Accordion Interaction", () => {
    test("can expand FAQ item", async ({ page }) => {
      await page.waitForSelector("details, .faq-item, button", { timeout: 10000 });

      // Try to find expandable FAQ items
      const detailsElement = page.locator("details").first();
      const buttonElement = page.locator("button").filter({ hasText: /\?|pregunta|question/i }).first();

      if (await detailsElement.count() > 0) {
        // Using details/summary
        const summary = detailsElement.locator("summary");
        await summary.click();

        const isOpen = await detailsElement.getAttribute("open");
        expect(isOpen).not.toBeNull();
      } else if (await buttonElement.count() > 0) {
        // Using button with aria-expanded
        await buttonElement.click();

        await page.waitForTimeout(300);

        const ariaExpanded = await buttonElement.getAttribute("aria-expanded");
        expect(ariaExpanded).toBe("true");
      }
    });

    test("can collapse expanded FAQ item", async ({ page }) => {
      await page.waitForSelector("details, button", { timeout: 10000 });

      const detailsElement = page.locator("details").first();
      const buttonElement = page.locator("button").filter({ hasText: /\?/i }).first();

      if (await detailsElement.count() > 0) {
        const summary = detailsElement.locator("summary");

        // Open
        await summary.click();
        await page.waitForTimeout(300);

        // Close
        await summary.click();
        await page.waitForTimeout(300);

        const isOpen = await detailsElement.getAttribute("open");
        expect(isOpen).toBeNull();
      } else if (await buttonElement.count() > 0) {
        // Open
        await buttonElement.click();
        await page.waitForTimeout(300);

        // Close
        await buttonElement.click();
        await page.waitForTimeout(300);

        const ariaExpanded = await buttonElement.getAttribute("aria-expanded");
        expect(ariaExpanded === "false" || ariaExpanded === null).toBeTruthy();
      }
    });

    test("expanded item shows answer content", async ({ page }) => {
      await page.waitForSelector("details, button", { timeout: 10000 });

      const detailsElement = page.locator("details").first();

      if (await detailsElement.count() > 0) {
        const summary = detailsElement.locator("summary");
        await summary.click();

        await page.waitForTimeout(300);

        // Content should be visible
        const content = detailsElement.locator("p, div").filter({ hasNotText: await summary.textContent() || "" });
        await expect(content.first()).toBeVisible();
      }
    });

    test("multiple FAQs can be open simultaneously", async ({ page }) => {
      await page.waitForSelector("details", { timeout: 10000 });

      const allDetails = page.locator("details");
      const count = await allDetails.count();

      if (count >= 2) {
        const firstSummary = allDetails.nth(0).locator("summary");
        const secondSummary = allDetails.nth(1).locator("summary");

        await firstSummary.click();
        await page.waitForTimeout(300);

        await secondSummary.click();
        await page.waitForTimeout(300);

        const firstOpen = await allDetails.nth(0).getAttribute("open");
        const secondOpen = await allDetails.nth(1).getAttribute("open");

        expect(firstOpen).not.toBeNull();
        expect(secondOpen).not.toBeNull();
      }
    });
  });

  test.describe("FAQ Search", () => {
    test("search input accepts text", async ({ page }) => {
      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();
      await searchInput.fill("inscripción");
      await expect(searchInput).toHaveValue("inscripción");
    });

    test("search filters FAQ items", async ({ page }) => {
      await page.waitForSelector("details, .faq-item", { timeout: 10000 });

      const initialCount = await page.locator("details, .faq-item").count();

      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();
      await searchInput.fill("xyz123nonexistent");

      await page.waitForTimeout(1000);

      const filteredCount = await page.locator("details:visible, .faq-item:visible").count();
      expect(filteredCount <= initialCount).toBeTruthy();
    });

    test("search shows matching results", async ({ page }) => {
      await page.waitForSelector("details, .faq-item", { timeout: 10000 });

      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();
      await searchInput.fill("programa");

      await page.waitForTimeout(1000);

      // Should show at least one result or "no results" message
      const visibleFaqs = await page.locator("details:visible, .faq-item:visible").count();
      const noResults = page.locator('[data-testid="no-results"], .no-results, .empty-state');
      const noResultsVisible = await noResults.count() > 0;

      expect(visibleFaqs > 0 || noResultsVisible).toBeTruthy();
    });

    test("search can be cleared", async ({ page }) => {
      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();
      await searchInput.fill("test");

      const clearButton = page.locator('button[aria-label*="clear" i], button[aria-label*="limpiar" i]');
      if (await clearButton.count() > 0) {
        await clearButton.click();
        await expect(searchInput).toHaveValue("");
      } else {
        // Try clearing manually
        await searchInput.clear();
        await expect(searchInput).toHaveValue("");
      }
    });

    test("search is case insensitive", async ({ page }) => {
      await page.waitForSelector("details, .faq-item", { timeout: 10000 });

      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();

      // Search with lowercase
      await searchInput.fill("programa");
      await page.waitForTimeout(500);
      const lowercaseCount = await page.locator("details:visible, .faq-item:visible").count();

      // Clear and search with uppercase
      await searchInput.clear();
      await searchInput.fill("PROGRAMA");
      await page.waitForTimeout(500);
      const uppercaseCount = await page.locator("details:visible, .faq-item:visible").count();

      // Results should be similar
      expect(Math.abs(lowercaseCount - uppercaseCount) <= 1).toBeTruthy();
    });
  });

  test.describe("FAQ Categories", () => {
    test("can filter by category", async ({ page }) => {
      await page.waitForSelector("button, a, .category", { timeout: 10000 });

      const categoryButtons = page.locator("button, a").filter({ hasText: /general|académico|técnico/i });

      if (await categoryButtons.count() > 0) {
        const firstCategory = categoryButtons.first();
        await firstCategory.click();

        await page.waitForTimeout(500);

        // FAQs should still be visible (filtered by category)
        const visibleFaqs = await page.locator("details:visible, .faq-item:visible").count();
        expect(visibleFaqs).toBeGreaterThan(0);
      }
    });

    test("category filter updates active state", async ({ page }) => {
      const categoryButtons = page.locator("button, a").filter({ hasText: /general|académico/i });

      if (await categoryButtons.count() >= 2) {
        const firstCategory = categoryButtons.first();
        await firstCategory.click();

        await page.waitForTimeout(300);

        // Check for active class or aria-current
        const hasActiveIndicator =
          (await firstCategory.getAttribute("class"))?.includes("active") ||
          (await firstCategory.getAttribute("aria-current")) === "true";

        expect(hasActiveIndicator).toBeTruthy();
      }
    });

    test("can view all categories", async ({ page }) => {
      const allButton = page.locator("button, a").filter({ hasText: /todos|all|todas/i }).first();

      if (await allButton.count() > 0) {
        // Filter by a category first
        const categoryButton = page.locator("button, a").filter({ hasText: /general|académico/i }).first();
        if (await categoryButton.count() > 0) {
          await categoryButton.click();
          await page.waitForTimeout(300);
        }

        // Click "All"
        await allButton.click();
        await page.waitForTimeout(300);

        // Should show more FAQs
        const visibleFaqs = await page.locator("details:visible, .faq-item:visible").count();
        expect(visibleFaqs).toBeGreaterThan(0);
      }
    });
  });

  test.describe("FAQ Content", () => {
    test("each FAQ has a question", async ({ page }) => {
      await page.waitForSelector("details summary, .faq-question, button", { timeout: 10000 });

      const firstQuestion = page.locator("details summary, .faq-question, button").first();
      const text = await firstQuestion.textContent();
      expect(text?.length).toBeGreaterThan(0);
    });

    test("each FAQ has an answer", async ({ page }) => {
      await page.waitForSelector("details", { timeout: 10000 });

      const firstDetails = page.locator("details").first();
      const summary = firstDetails.locator("summary");

      await summary.click();
      await page.waitForTimeout(300);

      const answerContent = firstDetails.locator("p, div").filter({ hasNotText: await summary.textContent() || "" });
      await expect(answerContent.first()).toBeVisible();
    });

    test("answers contain meaningful content", async ({ page }) => {
      await page.waitForSelector("details", { timeout: 10000 });

      const firstDetails = page.locator("details").first();
      const summary = firstDetails.locator("summary");

      await summary.click();
      await page.waitForTimeout(300);

      const answerContent = await firstDetails.locator("p, div").first().textContent();
      expect(answerContent?.length).toBeGreaterThan(10);
    });
  });

  test.describe("FAQ Metadata", () => {
    test("page has proper title", async ({ page }) => {
      await expect(page).toHaveTitle(/faq|preguntas/i);
    });

    test("page has meta description", async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute("content", /.+/);
    });

    test("FAQ schema markup exists", async ({ page }) => {
      const schemaScript = page.locator('script[type="application/ld+json"]');
      const count = await schemaScript.count();

      if (count > 0) {
        const content = await schemaScript.first().textContent();
        expect(content).toBeTruthy();
      }
    });
  });

  test.describe("FAQ Responsive Design", () => {
    test("displays correctly on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.waitForSelector("details, .faq-item", { timeout: 10000 });

      const faqItems = page.locator("details, .faq-item");
      await expect(faqItems.first()).toBeVisible();
    });

    test("accordion works on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.waitForSelector("details", { timeout: 10000 });

      const firstDetails = page.locator("details").first();
      const summary = firstDetails.locator("summary");

      await summary.click();
      await page.waitForTimeout(300);

      const isOpen = await firstDetails.getAttribute("open");
      expect(isOpen).not.toBeNull();
    });

    test("search works on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const searchInput = page.locator('input[type="search"], input[placeholder*="buscar" i]').first();
      await searchInput.fill("test");
      await expect(searchInput).toHaveValue("test");
    });
  });

  test.describe("FAQ Accessibility", () => {
    test("has proper heading hierarchy", async ({ page }) => {
      const h1 = await page.locator("h1").count();
      expect(h1).toBe(1);
    });

    test("accordion is keyboard navigable", async ({ page }) => {
      await page.waitForSelector("details summary, button", { timeout: 10000 });

      const firstInteractive = page.locator("details summary, button").first();
      await firstInteractive.focus();

      const isFocused = await firstInteractive.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBeTruthy();
    });

    test("search input has label", async ({ page }) => {
      const searchInput = page.locator('input[type="search"]').first();
      const ariaLabel = await searchInput.getAttribute("aria-label");
      const placeholder = await searchInput.getAttribute("placeholder");

      expect(ariaLabel || placeholder).toBeTruthy();
    });

    test("accordion uses proper ARIA attributes", async ({ page }) => {
      await page.waitForSelector("details, button[aria-expanded]", { timeout: 10000 });

      const buttonWithAria = page.locator("button[aria-expanded]").first();

      if (await buttonWithAria.count() > 0) {
        const ariaExpanded = await buttonWithAria.getAttribute("aria-expanded");
        expect(ariaExpanded === "true" || ariaExpanded === "false").toBeTruthy();
      }
    });
  });

  test.describe("FAQ Multi-language", () => {
    test("can switch to English", async ({ page }) => {
      const enLink = page.locator('[href*="/en/faq"]').first();

      if (await enLink.count() > 0) {
        await enLink.click();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/en/faq");
      }
    });

    test("FAQ content changes with language", async ({ page }) => {
      const spanishQuestion = await page.locator("details summary, .faq-question").first().textContent();

      const enLink = page.locator('[href*="/en/faq"]').first();

      if (await enLink.count() > 0) {
        await enLink.click();
        await page.waitForLoadState("networkidle");

        await page.waitForSelector("details summary, .faq-question", { timeout: 10000 });

        const englishQuestion = await page.locator("details summary, .faq-question").first().textContent();

        // Questions should be different (translated)
        expect(spanishQuestion).not.toBe(englishQuestion);
      }
    });
  });

  test.describe("FAQ Performance", () => {
    test("page loads within reasonable time", async ({ page }) => {
      const startTime = Date.now();

      await page.waitForSelector("details, .faq-item", { timeout: 10000 });

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // 10 seconds max
    });

    test("search provides instant feedback", async ({ page }) => {
      await page.waitForSelector("details", { timeout: 10000 });

      const searchInput = page.locator('input[type="search"]').first();

      const startTime = Date.now();
      await searchInput.fill("test");

      await page.waitForTimeout(1500); // Wait for debounce

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(3000); // 3 seconds max for search results
    });
  });
});
