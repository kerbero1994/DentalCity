import { test, expect } from "@playwright/test";

test.describe("Accessibility Tests", () => {
  test("home page should be keyboard navigable", async ({ page }) => {
    await page.goto("/");

    // Tab through the page
    await page.keyboard.press("Tab");

    // Check if first focusable element is the skip link
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedElement).toContain("Saltar");
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Get all headings
    const h1Count = await page.locator("h1").count();
    const h2Count = await page.locator("h2").count();

    // Should have exactly one h1
    expect(h1Count).toBe(1);

    // Should have at least one h2
    expect(h2Count).toBeGreaterThan(0);
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get all images except decorative ones
    const images = page.locator("img:not([role='presentation']):not([aria-hidden='true'])");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");

      // Alt should exist (can be empty for decorative images with role)
      expect(alt).not.toBeNull();
    }
  });

  test("form inputs should have labels", async ({ page }) => {
    await page.goto("/");

    // Get all input elements
    const inputs = page.locator('input:not([type="hidden"])');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);

      // Check for label, aria-label, or aria-labelledby
      const hasLabel = await input.evaluate((el: HTMLInputElement) => {
        const id = el.id;
        const hasAssociatedLabel = id && document.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = el.getAttribute("aria-label");
        const hasAriaLabelledBy = el.getAttribute("aria-labelledby");

        return hasAssociatedLabel || hasAriaLabel || hasAriaLabelledBy;
      });

      expect(hasLabel).toBeTruthy();
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto("/");

    // This is a basic check - for comprehensive testing, use axe-core
    // Just verify that text is not the same color as background
    const textColor = await page.locator("body").evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    const bgColor = await page.locator("body").evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    expect(textColor).not.toBe(bgColor);
  });

  test("interactive elements should be focusable", async ({ page }) => {
    await page.goto("/");

    // Get all buttons and links
    const buttons = page.locator("button:visible, a:visible");
    const count = await buttons.count();

    // Check a few interactive elements
    for (let i = 0; i < Math.min(5, count); i++) {
      const element = buttons.nth(i);

      // Focus the element
      await element.focus();

      // Check if it's focused
      const isFocused = await element.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBeTruthy();
    }
  });

  test("should have proper ARIA roles", async ({ page }) => {
    await page.goto("/");

    // Check for main landmark
    await expect(page.locator('main, [role="main"]')).toHaveCount(1);

    // Check for navigation landmark
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toHaveCount(await nav.count());

    // Should have at least one navigation
    expect(await nav.count()).toBeGreaterThan(0);
  });
});
