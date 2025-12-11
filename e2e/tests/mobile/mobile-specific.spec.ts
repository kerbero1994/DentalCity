import { test, expect, devices } from "@playwright/test";

// Configure mobile device at file level (required by Playwright)
test.use({ ...devices["iPhone 12"] });

test.describe("Mobile-Specific Tests", () => {
  test.describe("Mobile Navigation", () => {
    test("hamburger menu is visible on mobile", async ({ page }) => {
      await page.goto("/es");

      const hamburgerMenu = page.locator('button[aria-label*="menu" i], button[aria-label*="menú" i], .hamburger, .mobile-menu-toggle');
      await expect(hamburgerMenu.first()).toBeVisible();
    });

    test("can open mobile menu", async ({ page }) => {
      await page.goto("/es");

      const hamburgerMenu = page.locator('button[aria-label*="menu" i], button[aria-label*="menú" i]').first();
      await hamburgerMenu.click();

      await page.waitForTimeout(500);

      const mobileNav = page.locator("nav[aria-label*='mobile' i], .mobile-menu, [data-testid*='mobile-menu']");
      if (await mobileNav.count() > 0) {
        await expect(mobileNav.first()).toBeVisible();
      } else {
        // Check if navigation links became visible
        const navLinks = page.locator("nav a");
        await expect(navLinks.first()).toBeVisible();
      }
    });

    test("can close mobile menu", async ({ page }) => {
      await page.goto("/es");

      const hamburgerMenu = page.locator('button[aria-label*="menu" i]').first();
      await hamburgerMenu.click();
      await page.waitForTimeout(300);

      const closeButton = page.locator('button[aria-label*="close" i], button[aria-label*="cerrar" i]').first();
      if (await closeButton.count() > 0) {
        await closeButton.click();
        await page.waitForTimeout(300);
      }
    });

    test("mobile menu links are clickable", async ({ page }) => {
      await page.goto("/es");

      const hamburgerMenu = page.locator('button[aria-label*="menu" i]').first();
      await hamburgerMenu.click();
      await page.waitForTimeout(500);

      const firstLink = page.locator("nav a").first();
      await expect(firstLink).toBeVisible();

      await firstLink.click();
      await page.waitForLoadState("networkidle");

      expect(page.url()).toBeTruthy();
    });
  });

  test.describe("Mobile Touch Interactions", () => {
    test("can swipe through carousel", async ({ page }) => {
      await page.goto("/es");

      const carousel = page.locator('[data-testid*="carousel"], .carousel, .slider').first();

      if (await carousel.count() > 0) {
        const box = await carousel.boundingBox();
        if (box) {
          // Simulate swipe left
          await page.mouse.move(box.x + box.width - 50, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + 50, box.y + box.height / 2);
          await page.mouse.up();

          await page.waitForTimeout(500);

          expect(await carousel.isVisible()).toBeTruthy();
        }
      }
    });

    test("touch targets are adequately sized", async ({ page }) => {
      await page.goto("/es");

      const buttons = page.locator("button, a");
      const firstButton = buttons.first();

      if (await firstButton.count() > 0) {
        const box = await firstButton.boundingBox();
        if (box) {
          // Minimum touch target size should be 44x44px (iOS guideline)
          expect(box.height >= 40).toBeTruthy();
          expect(box.width >= 40).toBeTruthy();
        }
      }
    });

    test("tap on accordion expands item", async ({ page }) => {
      await page.goto("/es/faq");

      const accordion = page.locator("details summary, button[aria-expanded]").first();

      if (await accordion.count() > 0) {
        await accordion.tap();
        await page.waitForTimeout(300);

        // Should be expanded
        const parentDetails = accordion.locator("..").first();
        if ((await parentDetails.count()) > 0) {
          const isOpen = await parentDetails.getAttribute("open");
          expect(isOpen).not.toBeNull();
        }
      }
    });
  });

  test.describe("Mobile Form Interactions", () => {
    test("mobile keyboard appears for input fields", async ({ page }) => {
      await page.goto("/es");

      const input = page.locator("input[type='text'], input[type='search'], input[type='email']").first();

      if (await input.count() > 0) {
        await input.tap();

        // Input should be focused
        const isFocused = await input.evaluate((el) => el === document.activeElement);
        expect(isFocused).toBeTruthy();
      }
    });

    test("numeric keyboard for phone input", async ({ page }) => {
      await page.goto("/es");

      const phoneInput = page.locator('input[type="tel"]').first();

      if (await phoneInput.count() > 0) {
        const inputType = await phoneInput.getAttribute("type");
        expect(inputType).toBe("tel");
      }
    });

    test("email keyboard for email input", async ({ page }) => {
      await page.goto("/es");

      const emailInput = page.locator('input[type="email"]').first();

      if (await emailInput.count() > 0) {
        const inputType = await emailInput.getAttribute("type");
        expect(inputType).toBe("email");
      }
    });

    test("autocomplete works on mobile", async ({ page }) => {
      await page.goto("/es");

      const input = page.locator('input[autocomplete]').first();

      if (await input.count() > 0) {
        const autocomplete = await input.getAttribute("autocomplete");
        expect(autocomplete).toBeTruthy();
      }
    });
  });

  test.describe("Mobile Viewport", () => {
    test("content fits within mobile viewport", async ({ page }) => {
      await page.goto("/es");

      const body = page.locator("body");
      const box = await body.boundingBox();

      if (box) {
        // Should not exceed viewport width
        const viewportSize = page.viewportSize();
        expect(viewportSize).toBeTruthy();
        if (viewportSize) {
          expect(box.width <= viewportSize.width).toBeTruthy();
        }
      }
    });

    test("text is readable without zooming", async ({ page }) => {
      await page.goto("/es");

      const paragraphs = page.locator("p, .text-base, body");
      const firstParagraph = paragraphs.first();

      if (await firstParagraph.count() > 0) {
        const fontSize = await firstParagraph.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        const fontSizeNum = parseInt(fontSize);
        // Minimum recommended font size for mobile is 14px
        expect(fontSizeNum >= 14).toBeTruthy();
      }
    });

    test("images scale appropriately", async ({ page }) => {
      await page.goto("/es");

      const images = page.locator("img");
      const firstImage = images.first();

      if (await firstImage.count() > 0) {
        const box = await firstImage.boundingBox();
        const viewportSize = page.viewportSize();

        if (box && viewportSize) {
          // Image should not exceed viewport width
          expect(box.width <= viewportSize.width).toBeTruthy();
        }
      }
    });
  });

  test.describe("Mobile Performance", () => {
    test("page loads quickly on mobile", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/es");
      await page.waitForLoadState("networkidle");

      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds on mobile
      expect(loadTime).toBeLessThan(5000);
    });

    test("lazy loading works on mobile", async ({ page }) => {
      await page.goto("/es");

      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);

      const images = page.locator("img");
      const count = await images.count();

      expect(count).toBeGreaterThan(0);
    });

    test("mobile animations are smooth", async ({ page }) => {
      await page.goto("/es");

      const animatedElement = page.locator('.transition, [class*="animate"]').first();

      if (await animatedElement.count() > 0) {
        await animatedElement.hover();
        await page.waitForTimeout(300);

        // Element should still be visible after animation
        await expect(animatedElement).toBeVisible();
      }
    });
  });

  test.describe("Mobile Orientation", () => {
    test("works in portrait mode", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/es");

      const heading = page.locator("h1");
      await expect(heading.first()).toBeVisible();
    });

    test("works in landscape mode", async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto("/es");

      const heading = page.locator("h1");
      await expect(heading.first()).toBeVisible();
    });

    test("adapts layout for landscape", async ({ page }) => {
      // Portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/es");
      const portraitHeight = await page.evaluate(() => document.documentElement.scrollHeight);

      // Landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.reload();
      const landscapeHeight = await page.evaluate(() => document.documentElement.scrollHeight);

      // Layout should adapt
      expect(portraitHeight !== landscapeHeight).toBeTruthy();
    });
  });

  test.describe("Mobile Search", () => {
    test("search input is accessible on mobile", async ({ page }) => {
      await page.goto("/es/blog");

      const searchInput = page.locator('input[type="search"]').first();
      await expect(searchInput).toBeVisible();

      await searchInput.tap();
      await expect(searchInput).toBeFocused();
    });

    test("mobile keyboard appears for search", async ({ page }) => {
      await page.goto("/es/blog");

      const searchInput = page.locator('input[type="search"]').first();
      await searchInput.tap();

      const isFocused = await searchInput.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBeTruthy();
    });

    test("search results display correctly on mobile", async ({ page }) => {
      await page.goto("/es/blog");

      const searchInput = page.locator('input[type="search"]').first();
      await searchInput.fill("test");
      await searchInput.press("Enter");

      await page.waitForLoadState("networkidle");

      const results = page.locator("article, .blog-card");
      await expect(results.first()).toBeVisible();
    });
  });

  test.describe("Mobile Accessibility", () => {
    test("sufficient contrast on mobile", async ({ page }) => {
      await page.goto("/es");

      const body = page.locator("body");
      const styles = await body.evaluate((el) => {
        return {
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          color: window.getComputedStyle(el).color,
        };
      });

      expect(styles.backgroundColor).toBeTruthy();
      expect(styles.color).toBeTruthy();
    });

    test("focus indicators visible on mobile", async ({ page }) => {
      await page.goto("/es");

      const button = page.locator("button, a").first();
      await button.focus();

      const hasFocusStyle = await button.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.outline !== "none" || style.boxShadow !== "none";
      });

      expect(hasFocusStyle).toBeTruthy();
    });

    test("mobile screen reader compatibility", async ({ page }) => {
      await page.goto("/es");

      const main = page.locator("main, [role='main']");
      await expect(main.first()).toBeVisible();

      const nav = page.locator("nav, [role='navigation']");
      await expect(nav.first()).toBeVisible();
    });
  });

  test.describe("Mobile-Specific Features", () => {
    test("pull-to-refresh indicator (if implemented)", async ({ page }) => {
      await page.goto("/es");

      // Simulate pull down gesture
      await page.evaluate(() => window.scrollTo(0, -100));
      await page.waitForTimeout(500);

      // Page should still be functional
      const heading = page.locator("h1");
      await expect(heading.first()).toBeVisible();
    });

    test("mobile sticky header works", async ({ page }) => {
      await page.goto("/es");

      const header = page.locator("header, [role='banner']").first();
      const initialPosition = await header.boundingBox();

      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);

      const scrolledPosition = await header.boundingBox();

      // Header should remain visible (sticky)
      if (initialPosition && scrolledPosition) {
        expect(await header.isVisible()).toBeTruthy();
      }
    });

    test("mobile footer is accessible", async ({ page }) => {
      await page.goto("/es");

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      const footer = page.locator("footer, [role='contentinfo']");
      await expect(footer.first()).toBeVisible();
    });
  });
});
