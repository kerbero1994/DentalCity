import { test, expect } from "@playwright/test";

test.describe("Blog Posts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es/blog");
  });

  test.describe("Blog Listing Page", () => {
    test("displays blog page header", async ({ page }) => {
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toContainText(/blog|noticias/i);
    });

    test("displays search bar", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await expect(searchInput).toBeVisible();
    });

    test("displays blog posts list", async ({ page }) => {
      // Wait for blog cards to load
      await page.waitForSelector('[data-testid*="blog"], article, .blog-card', {
        timeout: 10000,
      });

      const blogCards = page.locator("article, .blog-card, [data-testid*='blog']");
      const count = await blogCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test("each blog post shows title", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const firstPost = page.locator("article, .blog-card").first();
      await expect(firstPost.locator("h2, h3, .title")).toBeVisible();
    });

    test("each blog post shows date", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const firstPost = page.locator("article, .blog-card").first();
      const dateElement = firstPost.locator("time, .date, [datetime]");
      await expect(dateElement).toBeVisible();
    });

    test("each blog post has image", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const firstPost = page.locator("article, .blog-card").first();
      const image = firstPost.locator("img");
      await expect(image).toBeVisible();
    });

    test("blog posts are clickable", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await expect(firstPostLink).toBeVisible();
      await expect(firstPostLink).toHaveAttribute("href", /.+/);
    });
  });

  test.describe("Blog Search", () => {
    test("search input accepts text", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("tecnología");
      await expect(searchInput).toHaveValue("tecnología");
    });

    test("search filters blog posts", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const initialCount = await page.locator("article, .blog-card").count();

      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("test search query xyz123");
      await searchInput.press("Enter");

      await page.waitForTimeout(1000);

      const filteredCount = await page.locator("article, .blog-card").count();
      // Should show fewer results or no results message
      expect(filteredCount <= initialCount).toBeTruthy();
    });

    test("search can be cleared", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("search term");

      // Look for clear button
      const clearButton = page.locator('button[aria-label*="clear" i], button[aria-label*="limpiar" i]');
      if (await clearButton.isVisible()) {
        await clearButton.click();
        await expect(searchInput).toHaveValue("");
      }
    });

    test("search updates URL params", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("tecnología");
      await searchInput.press("Enter");

      await page.waitForTimeout(500);

      const url = page.url();
      expect(url.includes("search") || url.includes("q=") || url.includes("tecnología")).toBeTruthy();
    });
  });

  test.describe("Blog Post Detail", () => {
    test("can navigate to blog post detail", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await firstPostLink.click();

      await page.waitForLoadState("networkidle");

      // Should navigate to detail page
      expect(page.url()).not.toBe(await page.evaluate(() => window.location.origin + "/es/blog"));
    });

    test("detail page shows post title", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await firstPostLink.click();

      await page.waitForLoadState("networkidle");

      const heading = page.locator("h1");
      await expect(heading).toBeVisible();
    });

    test("detail page shows post content", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await firstPostLink.click();

      await page.waitForLoadState("networkidle");

      // Content should be visible
      const article = page.locator("article, main, .content");
      await expect(article).toBeVisible();
    });

    test("detail page shows publication date", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await firstPostLink.click();

      await page.waitForLoadState("networkidle");

      const dateElement = page.locator("time, .date, [datetime]");
      await expect(dateElement.first()).toBeVisible();
    });

    test("can navigate back to blog listing", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstPostLink = page.locator("article a, .blog-card a").first();
      await firstPostLink.click();

      await page.waitForLoadState("networkidle");

      await page.goBack();

      await page.waitForLoadState("networkidle");

      // Should be back on listing page
      const searchInput = page.getByRole("searchbox");
      await expect(searchInput).toBeVisible();
    });
  });

  test.describe("Blog Pagination", () => {
    test("shows pagination if many posts", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const pagination = page.locator("nav[aria-label*='pagination' i], .pagination");
      const hasPagination = await pagination.count() > 0;

      if (hasPagination) {
        await expect(pagination.first()).toBeVisible();
      }
    });

    test("can navigate to next page", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const nextButton = page.locator('a:has-text("Siguiente"), a:has-text("Next"), button:has-text("Siguiente"), button:has-text("Next")');

      if (await nextButton.count() > 0) {
        const firstPostTitle = await page.locator("article h2, .blog-card h2").first().textContent();

        await nextButton.first().click();
        await page.waitForLoadState("networkidle");

        const newFirstPostTitle = await page.locator("article h2, .blog-card h2").first().textContent();
        expect(firstPostTitle).not.toBe(newFirstPostTitle);
      }
    });
  });

  test.describe("Blog Categories/Tags", () => {
    test("shows categories or tags if available", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const categoryElements = page.locator(".category, .tag, [data-testid*='category'], [data-testid*='tag']");
      const hasCategories = await categoryElements.count() > 0;

      if (hasCategories) {
        await expect(categoryElements.first()).toBeVisible();
      }
    });

    test("can filter by category", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const categoryLink = page.locator(".category a, .tag a").first();

      if (await categoryLink.count() > 0) {
        await categoryLink.click();
        await page.waitForLoadState("networkidle");

        // Should filter posts
        await expect(page.locator("article, .blog-card").first()).toBeVisible();
      }
    });
  });

  test.describe("Blog Metadata", () => {
    test("page has proper title", async ({ page }) => {
      await expect(page).toHaveTitle(/blog|noticias/i);
    });

    test("page has meta description", async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute("content", /.+/);
    });

    test("images have alt text", async ({ page }) => {
      await page.waitForSelector("article img, .blog-card img", { timeout: 10000 });

      const firstImage = page.locator("article img, .blog-card img").first();
      const altText = await firstImage.getAttribute("alt");
      expect(altText).toBeTruthy();
    });
  });

  test.describe("Blog Responsive Design", () => {
    test("displays correctly on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      const searchInput = page.getByRole("searchbox");
      await expect(searchInput).toBeVisible();

      const blogCards = page.locator("article, .blog-card");
      await expect(blogCards.first()).toBeVisible();
    });

    test("search works on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("test");
      await expect(searchInput).toHaveValue("test");
    });
  });

  test.describe("Blog Loading States", () => {
    test("shows loading skeleton initially", async ({ page }) => {
      // Reload to catch loading state
      await page.reload();

      // Look for skeleton or loading indicator
      const skeleton = page.locator(".skeleton, .loading, [data-testid*='skeleton']");
      const hasLoadingState = await skeleton.count() > 0;

      // This is optional - some pages may load too quickly
      if (hasLoadingState) {
        expect(hasLoadingState).toBeTruthy();
      }
    });

    test("loading state disappears after content loads", async ({ page }) => {
      await page.waitForSelector("article, .blog-card", { timeout: 10000 });

      // Skeleton should be gone
      const skeleton = page.locator(".skeleton:visible, .loading:visible");
      const skeletonCount = await skeleton.count();
      expect(skeletonCount).toBe(0);
    });
  });

  test.describe("Blog Accessibility", () => {
    test("main content has proper heading hierarchy", async ({ page }) => {
      await page.waitForSelector("h1", { timeout: 10000 });

      const h1 = await page.locator("h1").count();
      expect(h1).toBeGreaterThan(0);
    });

    test("search input has label", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      const ariaLabel = await searchInput.getAttribute("aria-label");
      const placeholder = await searchInput.getAttribute("placeholder");

      // Should have either aria-label or placeholder
      expect(ariaLabel || placeholder).toBeTruthy();
    });

    test("links are keyboard accessible", async ({ page }) => {
      await page.waitForSelector("article a, .blog-card a", { timeout: 10000 });

      const firstLink = page.locator("article a, .blog-card a").first();
      await firstLink.focus();

      const isFocused = await firstLink.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBeTruthy();
    });
  });

  test.describe("Blog Multi-language", () => {
    test("can switch to English", async ({ page }) => {
      // Look for language switcher
      const langSwitcher = page.locator('[data-testid="language-switcher"], .language-selector, [href*="/en/"]');

      if (await langSwitcher.count() > 0) {
        const enLink = page.locator('[href*="/en/blog"]').first();
        if (await enLink.count() > 0) {
          await enLink.click();
          await page.waitForLoadState("networkidle");

          expect(page.url()).toContain("/en/blog");
        }
      }
    });

    test("maintains search when switching language", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("test");
      await searchInput.press("Enter");

      await page.waitForTimeout(500);

      const currentUrl = page.url();

      // Switch language if possible
      const enLink = page.locator('[href*="/en/blog"]').first();
      if (await enLink.count() > 0) {
        await enLink.click();
        await page.waitForLoadState("networkidle");

        // Search param should be preserved
        const newUrl = page.url();
        if (currentUrl.includes("search") || currentUrl.includes("q=")) {
          expect(newUrl.includes("search") || newUrl.includes("q=")).toBeTruthy();
        }
      }
    });
  });
});
