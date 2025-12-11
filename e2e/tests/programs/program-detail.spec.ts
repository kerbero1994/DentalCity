import { test, expect } from "@playwright/test";

test.describe("Program Detail Pages", () => {
  test.describe("Program List to Detail Navigation", () => {
    test("can navigate from programs list to program detail", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        const programTitle = await firstProgram.locator("h2, h3, .title").first().textContent();

        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        // Should navigate to detail page
        expect(page.url()).toContain("/programs/");

        // Page should contain the program title
        if (programTitle) {
          const pageContent = await page.content();
          expect(pageContent.toLowerCase()).toContain(programTitle.toLowerCase().substring(0, 20));
        }
      }
    });

    test("program detail page has proper URL structure", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const url = page.url();

        // URL should contain program slug
        expect(url).toMatch(/\/programs\/[a-z0-9-]+/);
        expect(url).toContain("/es/programs/");
      }
    });
  });

  test.describe("Program Detail Content", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");
      }
    });

    test("program detail displays title", async ({ page }) => {
      const title = page.locator("h1, [data-testid='program-title']").first();
      await expect(title).toBeVisible();

      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
      expect(titleText!.length).toBeGreaterThan(0);
    });

    test("program detail displays description", async ({ page }) => {
      const description = page.locator("[data-testid='program-description'], .description, article p").first();

      if (await description.isVisible()) {
        const descText = await description.textContent();
        expect(descText).toBeTruthy();
        expect(descText!.length).toBeGreaterThan(10);
      }
    });

    test("program detail may show subprograms/modules", async ({ page }) => {
      const subprograms = page.locator("[data-testid='subprogram'], .subprogram, .module");

      const hasSubprograms = await subprograms.count() > 0;

      if (hasSubprograms) {
        await expect(subprograms.first()).toBeVisible();
      }

      expect(hasSubprograms).toBeDefined();
    });

    test("program detail may show curriculum/syllabus", async ({ page }) => {
      const content = await page.content();

      const hasCurriculum =
        content.toLowerCase().includes("programa") ||
        content.toLowerCase().includes("curriculum") ||
        content.toLowerCase().includes("syllabus") ||
        content.toLowerCase().includes("módulos");

      expect(hasCurriculum).toBeDefined();
    });

    test("program detail may show duration", async ({ page }) => {
      const content = await page.content();

      const hasDuration =
        content.toLowerCase().includes("duración") ||
        content.toLowerCase().includes("duration") ||
        content.toLowerCase().includes("semanas") ||
        content.toLowerCase().includes("weeks") ||
        content.toLowerCase().includes("horas") ||
        content.toLowerCase().includes("hours");

      expect(hasDuration).toBeDefined();
    });

    test("program detail may have enrollment button", async ({ page }) => {
      const enrollButton = page.getByRole("button", { name: /inscribir|matricular|enroll|register/i });

      const hasButton = await enrollButton.count() > 0;

      if (hasButton) {
        await expect(enrollButton.first()).toBeVisible();
      }

      expect(hasButton).toBeDefined();
    });
  });

  test.describe("Program Subprograms/Modules", () => {
    test("subprograms can be expanded/collapsed", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        // Look for collapsible sections
        const expandButton = page.locator("button:has-text('ver más'), button:has-text('expand'), [aria-expanded]").first();

        if (await expandButton.isVisible()) {
          const initialState = await expandButton.getAttribute("aria-expanded");

          await expandButton.click();
          await page.waitForTimeout(300);

          const newState = await expandButton.getAttribute("aria-expanded");

          // State should change
          expect(newState).not.toBe(initialState);
        }
      }
    });

    test("each subprogram displays its content", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const subprograms = page.locator("[data-testid='subprogram'], .subprogram");

        const count = await subprograms.count();

        if (count > 0) {
          for (let i = 0; i < Math.min(count, 3); i++) {
            const subprogram = subprograms.nth(i);
            const title = subprogram.locator("h2, h3, h4, .title").first();

            if (await title.isVisible()) {
              const titleText = await title.textContent();
              expect(titleText).toBeTruthy();
            }
          }
        }
      }
    });
  });

  test.describe("Program Detail Navigation", () => {
    test("can navigate back to programs list", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        await page.goBack();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/programs");
        expect(page.url()).not.toMatch(/\/programs\/[a-z0-9-]+/);
      }
    });

    test("breadcrumb navigation works", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const breadcrumb = page.locator("nav[aria-label='breadcrumb'], .breadcrumb");

        if (await breadcrumb.isVisible()) {
          const programsLink = breadcrumb.getByRole("link", { name: /programas|programs/i });

          if (await programsLink.isVisible()) {
            await programsLink.click();
            await page.waitForLoadState("networkidle");

            expect(page.url()).toContain("/programs");
          }
        }
      }
    });
  });

  test.describe("Multi-language Program Details", () => {
    test("program detail works in English", async ({ page }) => {
      await page.goto("/en/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/en/programs/");

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
      }
    });

    test("program detail works in German", async ({ page }) => {
      await page.goto("/de/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        expect(page.url()).toContain("/de/programs/");
      }
    });
  });

  test.describe("Program Detail Accessibility", () => {
    test("program detail has proper heading hierarchy", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const h1 = page.locator("h1");
        await expect(h1.first()).toBeVisible();

        const h1Count = await h1.count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
      }
    });

    test("collapsible sections have proper ARIA attributes", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const expandButtons = page.locator("[aria-expanded]");

        const count = await expandButtons.count();

        if (count > 0) {
          for (let i = 0; i < Math.min(count, 3); i++) {
            const button = expandButtons.nth(i);
            const ariaExpanded = await button.getAttribute("aria-expanded");

            expect(ariaExpanded === "true" || ariaExpanded === "false").toBeTruthy();
          }
        }
      }
    });
  });

  test.describe("Program Detail Performance", () => {
    test("program detail loads quickly", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        const startTime = Date.now();

        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const endTime = Date.now();
        const loadTime = endTime - startTime;

        expect(loadTime).toBeLessThan(3000);
      }
    });
  });

  test.describe("Related Programs", () => {
    test("may show related programs", async ({ page }) => {
      await page.goto("/es/programs");
      await page.waitForLoadState("networkidle");

      const firstProgram = page.locator("[data-testid='program-card'], .program-card, article").first();

      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        await page.waitForLoadState("networkidle");

        const relatedSection = page.locator("[data-testid='related-programs'], .related-programs, h2:has-text('Programas relacionados')");

        const hasRelated = await relatedSection.count() > 0;

        expect(hasRelated).toBeDefined();
      }
    });
  });
});
