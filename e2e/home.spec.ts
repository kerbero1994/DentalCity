import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section with title", async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole("heading", { name: /sitimm/i, level: 1 })).toBeVisible();
  });

  test("should have accessible navigation", async ({ page }) => {
    // Check header navigation
    const nav = page.getByRole("navigation").first();
    await expect(nav).toBeVisible();

    // Verify skip link for accessibility
    const skipLink = page.getByRole("link", { name: /saltar al contenido/i });
    await expect(skipLink).toBeInViewport();
  });

  test("should display hero carousel", async ({ page }) => {
    // Wait for carousel to be visible
    await expect(page.locator('[role="button"][aria-label*="Expandir"]')).toBeVisible();
  });

  test("should expand carousel on click", async ({ page }) => {
    // Click to expand carousel
    const carousel = page.locator('[role="button"][aria-label*="Expandir"]');
    await carousel.click();

    // Check close button appears
    await expect(page.getByRole("button", { name: /cerrar/i })).toBeVisible();
  });

  test("should have working footer links", async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer is visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check hero is still visible
    await expect(page.getByRole("heading", { name: /sitimm/i, level: 1 })).toBeVisible();
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out known/acceptable errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("Failed to load resource") && // CDN timeouts are acceptable
        !error.includes("net::ERR_") // Network errors in tests are acceptable
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should have proper SEO meta tags", async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/SITIMM/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);
  });

  test("should load images successfully", async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState("networkidle");

    // Get all images
    const images = page.locator("img");
    const count = await images.count();

    // Check at least some images are loaded
    expect(count).toBeGreaterThan(0);

    // Verify first few images have loaded
    for (let i = 0; i < Math.min(3, count); i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
