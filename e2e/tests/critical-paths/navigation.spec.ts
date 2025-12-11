import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { EventsPage } from "../../pages/events.page";

test.describe("Navigation Critical Paths", () => {
  test("user can navigate from home to all main sections", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Verify home page loaded
    expect(await homePage.isLoaded()).toBe(true);

    // Navigate to Events
    await homePage.goToEvents();
    await expect(page).toHaveURL(/.*\/events/);
    const eventsPage = new EventsPage(page);
    await expect(eventsPage.pageTitle).toBeVisible();

    // Navigate back to home
    await page.goBack();
    await expect(page).toHaveURL(/.*\/(es|en)/);

    // Navigate to Programs
    await homePage.goToPrograms();
    await expect(page).toHaveURL(/.*\/programs/);

    // Navigate to About
    await page.goto("/es");
    await homePage.goToAbout();
    await expect(page).toHaveURL(/.*\/about/);
  });

  test("mobile navigation works correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const homePage = new HomePage(page);
    await homePage.goto();

    // Open mobile menu
    await homePage.openMobileMenu();
    expect(await homePage.isMobileMenuVisible()).toBe(true);

    // Navigate to events from mobile menu
    await homePage.goToEvents();
    await expect(page).toHaveURL(/.*\/events/);
  });

  test("navigation links are keyboard accessible", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Use skip link
    await homePage.useSkipLink();

    // Tab through navigation
    const links = await homePage.getNavigationLinks();
    expect(links.length).toBeGreaterThan(0);

    // Focus first link
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(focusedElement).toBe("A");
  });

  test("breadcrumbs work on nested pages", async ({ page }) => {
    await page.goto("/es/events");
    await page.waitForLoadState("networkidle");

    // Look for breadcrumbs
    const breadcrumbs = page.locator('[aria-label="Breadcrumb"]');
    if (await breadcrumbs.isVisible()) {
      const homeLink = breadcrumbs.getByRole("link", { name: /inicio|home/i });
      await expect(homeLink).toBeVisible();

      // Click home breadcrumb
      await homeLink.click();
      await expect(page).toHaveURL(/.*\/(es|en)\/?$/);
    }
  });

  test("back button navigation works", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Navigate forward
    await homePage.goToEvents();
    await expect(page).toHaveURL(/.*\/events/);

    // Navigate back
    await page.goBack();
    await expect(page).toHaveURL(/.*\/(es|en)/);

    // Navigate forward again
    await page.goForward();
    await expect(page).toHaveURL(/.*\/events/);
  });

  test("navigation preserves locale", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto("en");

    expect(homePage.getCurrentLocale()).toBe("en");

    // Navigate to different pages
    await homePage.goToEvents();
    await expect(page).toHaveURL(/\/en\/events/);

    await page.goto("/en");
    await homePage.goToPrograms();
    await expect(page).toHaveURL(/\/en\/programs/);
  });

  test("external links open in new tab", async ({ context, page }) => {
    await page.goto("/es");

    // Find external links (if any)
    const externalLinks = await page
      .locator('a[target="_blank"]')
      .all();

    if (externalLinks.length > 0) {
      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        externalLinks[0].click(),
      ]);

      expect(newPage).toBeTruthy();
      await newPage.close();
    }
  });
});

test.describe("Navigation Performance", () => {
  test("navigation should be fast", async ({ page }) => {
    const homePage = new HomePage(page);

    const startTime = Date.now();
    await homePage.goto();
    const loadTime = Date.now() - startTime;

    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test("subsequent navigations should be faster (prefetching)", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // First navigation
    const startTime1 = Date.now();
    await homePage.goToEvents();
    const time1 = Date.now() - startTime1;

    // Go back
    await page.goBack();

    // Second navigation (should use cache)
    const startTime2 = Date.now();
    await homePage.goToEvents();
    const time2 = Date.now() - startTime2;

    // Second should be faster
    expect(time2).toBeLessThan(time1);
  });
});
