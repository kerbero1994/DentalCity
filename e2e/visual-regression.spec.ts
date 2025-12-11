import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test("home page desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Wait for animations to settle
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("home-desktop.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("home page mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("home-mobile.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("home page tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("home-tablet.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hero = page.locator("#hero");
    await expect(hero).toHaveScreenshot("hero-section.png", {
      animations: "disabled",
    });
  });

  test("hero carousel expanded", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Expand carousel
    const carousel = page.locator('[role="button"][aria-label*="Expandir"]');
    await carousel.click();
    await page.waitForTimeout(500); // Wait for animation

    const hero = page.locator("#hero");
    await expect(hero).toHaveScreenshot("hero-carousel-expanded.png", {
      animations: "disabled",
    });
  });

  test("footer section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const footer = page.locator("footer");
    await expect(footer).toHaveScreenshot("footer-section.png", {
      animations: "disabled",
    });
  });

  test("dark mode (if implemented)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Try to toggle dark mode if theme switcher exists
    const themeSwitcher = page.locator('[aria-label*="tema"], [aria-label*="theme"]');
    const exists = (await themeSwitcher.count()) > 0;

    if (exists) {
      await themeSwitcher.click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("home-dark-mode.png", {
        fullPage: true,
        animations: "disabled",
      });
    }
  });
});

test.describe("Component Visual Tests", () => {
  test("programs section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const programs = page.locator("#programas");
    if ((await programs.count()) > 0) {
      await expect(programs).toHaveScreenshot("programs-section.png", {
        animations: "disabled",
      });
    }
  });

  test("services section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find services section if it exists
    const services = page.locator('section:has-text("Servicios"), #servicios');
    if ((await services.count()) > 0) {
      await expect(services.first()).toHaveScreenshot("services-section.png", {
        animations: "disabled",
      });
    }
  });
});
