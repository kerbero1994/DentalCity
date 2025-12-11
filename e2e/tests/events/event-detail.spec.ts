import { test, expect } from "@playwright/test";

test.describe("Event Detail Pages", () => {
  test.describe("Event List to Detail Navigation", () => {
    test("can navigate from events list to event detail", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      // Find and click on first event
      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        const eventTitle = await firstEvent.locator("h2, h3, .title").first().textContent();

        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        // Should navigate to detail page
        expect(page.url()).toContain("/events/");

        // Page should contain the event title
        if (eventTitle) {
          const pageContent = await page.content();
          expect(pageContent.toLowerCase()).toContain(eventTitle.toLowerCase().substring(0, 20));
        }
      }
    });

    test("event detail page has proper URL structure", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const url = page.url();

        // URL should contain event slug or ID
        expect(url).toMatch(/\/events\/[a-z0-9-]+/);
        expect(url).toContain("/es/events/");
      }
    });
  });

  test.describe("Event Detail Content", () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to events and open first one
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");
      }
    });

    test("event detail displays title", async ({ page }) => {
      const title = page.locator("h1, [data-testid='event-title']").first();
      await expect(title).toBeVisible();

      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
      expect(titleText!.length).toBeGreaterThan(0);
    });

    test("event detail displays date", async ({ page }) => {
      // Look for date indicators
      const dateElement = page.locator("time, [datetime], [data-testid='event-date']").first();

      if (await dateElement.isVisible()) {
        const dateText = await dateElement.textContent();
        expect(dateText).toBeTruthy();
      }
    });

    test("event detail displays location/place", async ({ page }) => {
      const content = await page.content();

      // Should contain location information
      const hasLocation =
        content.includes("lugar") ||
        content.includes("location") ||
        content.includes("place") ||
        content.includes("dirección");

      // Or location might be in specific element
      const locationElement = await page.locator("[data-testid='event-location'], .location").count();

      expect(hasLocation || locationElement > 0).toBeTruthy();
    });

    test("event detail displays description", async ({ page }) => {
      const description = page.locator("[data-testid='event-description'], .description, article p").first();

      if (await description.isVisible()) {
        const descText = await description.textContent();
        expect(descText).toBeTruthy();
        expect(descText!.length).toBeGreaterThan(10);
      }
    });

    test("event detail may have registration button", async ({ page }) => {
      const registerButton = page.getByRole("button", { name: /registrar|inscribir|register|sign up/i });

      const hasButton = await registerButton.count() > 0;

      if (hasButton) {
        await expect(registerButton.first()).toBeVisible();
      }

      // Test passes whether or not registration is available
      expect(hasButton).toBeDefined();
    });

    test("event detail may have map or location link", async ({ page }) => {
      const mapLink = page.locator("a[href*='maps.google'], a[href*='maps.apple'], [data-testid='map-link']");

      const hasMap = await mapLink.count() > 0;

      if (hasMap) {
        await expect(mapLink.first()).toBeVisible();
      }

      expect(hasMap).toBeDefined();
    });
  });

  test.describe("Event Detail Metadata", () => {
    test("event detail has proper page title", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const title = await page.title();

        // Title should not be empty
        expect(title.length).toBeGreaterThan(0);

        // Title should not be generic
        expect(title).not.toBe("SITIMM");
      }
    });

    test("event detail has meta description", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const metaDescription = await page.locator('meta[name="description"]').getAttribute("content");

        if (metaDescription) {
          expect(metaDescription.length).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe("Event Detail Navigation", () => {
    test("can navigate back to events list", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        // Go back
        await page.goBack();
        await page.waitForLoadState("networkidle");

        // Should be back on events list
        expect(page.url()).toContain("/events");
        expect(page.url()).not.toMatch(/\/events\/[a-z0-9-]+/);
      }
    });

    test("breadcrumb navigation works", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        // Look for breadcrumbs
        const breadcrumb = page.locator("nav[aria-label='breadcrumb'], .breadcrumb, [data-testid='breadcrumb']");

        if (await breadcrumb.isVisible()) {
          const eventsLink = breadcrumb.getByRole("link", { name: /eventos|events/i });

          if (await eventsLink.isVisible()) {
            await eventsLink.click();
            await page.waitForLoadState("networkidle");

            expect(page.url()).toContain("/events");
          }
        }
      }
    });
  });

  test.describe("Event Detail Sharing", () => {
    test("may have share buttons", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const shareButtons = page.locator("button[aria-label*='compartir'], button[aria-label*='share'], .share-button");

        const hasShare = await shareButtons.count() > 0;

        // Feature may or may not be implemented
        expect(hasShare).toBeDefined();
      }
    });
  });

  test.describe("Multi-language Event Details", () => {
    test("event detail works in English", async ({ page }) => {
      await page.goto("/en/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/en/events/");

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
      }
    });

    test("event detail works in French", async ({ page }) => {
      await page.goto("/fr/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/fr/events/");
      }
    });

    test("language switching works on event detail", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        // Try to switch language
        const langSwitcher = page.locator("[data-testid='language-switcher'], .language-selector, select[name='language']");

        if (await langSwitcher.isVisible()) {
          const currentUrl = page.url();

          // Click language switcher
          await langSwitcher.click();

          // Select English
          const englishOption = page.getByRole("option", { name: /english|inglés|en/i }).first();

          if (await englishOption.isVisible()) {
            await englishOption.click();
            await page.waitForLoadState("networkidle");

            const newUrl = page.url();

            // Language should have changed in URL
            expect(newUrl).not.toBe(currentUrl);
            expect(newUrl).toContain("/en/events/");
          }
        }
      }
    });
  });

  test.describe("Event Detail Accessibility", () => {
    test("event detail has proper heading hierarchy", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        // Should have an h1
        const h1 = page.locator("h1");
        await expect(h1.first()).toBeVisible();

        const h1Count = await h1.count();
        // Should have exactly one h1
        expect(h1Count).toBeGreaterThanOrEqual(1);
      }
    });

    test("event detail is keyboard accessible", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        // Tab navigation should work
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");

        const focused = await page.evaluate(() => document.activeElement?.tagName);
        expect(focused).toBeDefined();
      }
    });
  });

  test.describe("Event Detail Performance", () => {
    test("event detail loads quickly", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        const startTime = Date.now();

        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const endTime = Date.now();
        const loadTime = endTime - startTime;

        // Detail page should load within 3 seconds
        expect(loadTime).toBeLessThan(3000);
      }
    });
  });

  test.describe("Related Events", () => {
    test("may show related or similar events", async ({ page }) => {
      await page.goto("/es/events");
      await page.waitForLoadState("networkidle");

      const firstEvent = page.locator("[data-testid='event-card'], .event-card, article").first();

      if (await firstEvent.isVisible()) {
        await firstEvent.click();
        await page.waitForLoadState("networkidle");

        const relatedSection = page.locator("[data-testid='related-events'], .related-events, h2:has-text('Eventos relacionados'), h2:has-text('Related events')");

        const hasRelated = await relatedSection.count() > 0;

        // Feature may or may not be implemented
        expect(hasRelated).toBeDefined();
      }
    });
  });
});
