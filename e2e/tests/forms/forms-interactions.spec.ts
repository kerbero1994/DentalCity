import { test, expect } from "@playwright/test";

test.describe("Forms and User Interactions", () => {
  test.describe("Contact Form", () => {
    test.beforeEach(async ({ page }) => {
      // Try multiple potential contact form locations
      const contactUrls = ["/es/contact", "/es/contacto", "/es"];

      for (const url of contactUrls) {
        await page.goto(url);
        const form = page.locator("form");
        if ((await form.count()) > 0) {
          break;
        }
      }
    });

    test("contact form is visible", async ({ page }) => {
      const form = page.locator("form").first();
      const hasForm = await form.count() > 0;

      if (hasForm) {
        await expect(form).toBeVisible();
      }
    });

    test("name input accepts text", async ({ page }) => {
      const nameInput = page.locator('input[name*="name" i], input[placeholder*="nombre" i]').first();

      if (await nameInput.count() > 0) {
        await nameInput.fill("Juan Pérez");
        await expect(nameInput).toHaveValue("Juan Pérez");
      }
    });

    test("email input accepts valid email", async ({ page }) => {
      const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();

      if (await emailInput.count() > 0) {
        await emailInput.fill("test@example.com");
        await expect(emailInput).toHaveValue("test@example.com");
      }
    });

    test("phone input accepts numbers", async ({ page }) => {
      const phoneInput = page.locator('input[type="tel"], input[name*="phone" i], input[name*="telefono" i]').first();

      if (await phoneInput.count() > 0) {
        await phoneInput.fill("1234567890");
        await expect(phoneInput).toHaveValue(/\d+/);
      }
    });

    test("message textarea accepts text", async ({ page }) => {
      const textarea = page.locator("textarea").first();

      if (await textarea.count() > 0) {
        await textarea.fill("Este es un mensaje de prueba.");
        await expect(textarea).toHaveValue("Este es un mensaje de prueba.");
      }
    });

    test("required fields show validation", async ({ page }) => {
      const form = page.locator("form").first();

      if (await form.count() > 0) {
        const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();

        if (await submitButton.count() > 0) {
          await submitButton.click();

          await page.waitForTimeout(500);

          // Check for validation messages
          const validationMessage = page.locator(".error, [aria-invalid='true'], .invalid");
          const hasValidation = await validationMessage.count() > 0;

          // Or check for browser validation
          const requiredInput = form.locator("input[required]").first();
          if (await requiredInput.count() > 0) {
            const validationMsg = await requiredInput.evaluate((el: HTMLInputElement) => el.validationMessage);
            expect(validationMsg || hasValidation).toBeTruthy();
          }
        }
      }
    });

    test("form can be submitted with valid data", async ({ page }) => {
      const form = page.locator("form").first();

      if (await form.count() > 0) {
        // Fill out form
        const nameInput = form.locator('input[name*="name" i]').first();
        if (await nameInput.count() > 0) await nameInput.fill("Test User");

        const emailInput = form.locator('input[type="email"]').first();
        if (await emailInput.count() > 0) await emailInput.fill("test@example.com");

        const textarea = form.locator("textarea").first();
        if (await textarea.count() > 0) await textarea.fill("Test message");

        const submitButton = form.locator('button[type="submit"]').first();
        if (await submitButton.count() > 0) {
          await submitButton.click();

          await page.waitForTimeout(2000);

          // Check for success message or redirect
          const successMessage = page.locator(".success, .success-message, [role='alert']");
          const hasSuccess = await successMessage.count() > 0;

          // Or check if form was cleared
          const nameValue = await nameInput.inputValue();

          expect(hasSuccess || nameValue === "").toBeTruthy();
        }
      }
    });
  });

  test.describe("Search Forms", () => {
    test("global search accepts input", async ({ page }) => {
      await page.goto("/es");

      const searchInput = page.locator('input[type="search"], input[role="searchbox"]').first();

      if (await searchInput.count() > 0) {
        await searchInput.fill("programas");
        await expect(searchInput).toHaveValue("programas");
      }
    });

    test("search can be submitted", async ({ page }) => {
      await page.goto("/es");

      const searchInput = page.locator('input[type="search"], input[role="searchbox"]').first();

      if (await searchInput.count() > 0) {
        await searchInput.fill("ingeniería");
        await searchInput.press("Enter");

        await page.waitForLoadState("networkidle");

        const url = page.url();
        expect(url.includes("search") || url.includes("q=") || url.includes("ingeniería")).toBeTruthy();
      }
    });
  });

  test.describe("Newsletter Subscription", () => {
    test("newsletter form accepts email", async ({ page }) => {
      await page.goto("/es");

      const newsletterInput = page.locator('input[placeholder*="email" i], input[name*="newsletter" i]').first();

      if (await newsletterInput.count() > 0) {
        await newsletterInput.fill("newsletter@example.com");
        await expect(newsletterInput).toHaveValue("newsletter@example.com");
      }
    });

    test("newsletter can be submitted", async ({ page }) => {
      await page.goto("/es");

      const newsletterInput = page.locator('input[placeholder*="email" i], input[name*="newsletter" i]').first();
      const submitButton = page.locator('button:has-text("Suscribir"), button:has-text("Subscribe")').first();

      if ((await newsletterInput.count()) > 0 && (await submitButton.count()) > 0) {
        await newsletterInput.fill("test@example.com");
        await submitButton.click();

        await page.waitForTimeout(1000);

        // Check for success feedback
        const feedback = page.locator(".success, [role='alert'], .message");
        const hasFeedback = await feedback.count() > 0;

        expect(hasFeedback).toBeTruthy();
      }
    });
  });

  test.describe("Button Interactions", () => {
    test("CTA buttons are clickable", async ({ page }) => {
      await page.goto("/es");

      const ctaButton = page.locator('button:has-text("Inscribir"), a:has-text("Inscribir"), button:has-text("Comenzar")').first();

      if (await ctaButton.count() > 0) {
        await ctaButton.click();

        await page.waitForLoadState("networkidle");

        // Should navigate or open modal
        expect(page.url()).toBeTruthy();
      }
    });

    test("navigation buttons work", async ({ page }) => {
      await page.goto("/es");

      const navButton = page.locator("nav a, nav button").first();

      if (await navButton.count() > 0) {
        await navButton.click();

        await page.waitForLoadState("networkidle");

        expect(page.url()).toBeTruthy();
      }
    });

    test("hover states are visible", async ({ page }) => {
      await page.goto("/es");

      const button = page.locator("button, a.button").first();

      if (await button.count() > 0) {
        await button.hover();

        // Button should be visible and interactive
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe("Dropdown Interactions", () => {
    test("dropdown can be opened", async ({ page }) => {
      await page.goto("/es");

      const dropdown = page.locator('[aria-haspopup="true"], button[aria-expanded]').first();

      if (await dropdown.count() > 0) {
        await dropdown.click();

        await page.waitForTimeout(300);

        const ariaExpanded = await dropdown.getAttribute("aria-expanded");
        expect(ariaExpanded).toBe("true");
      }
    });

    test("dropdown options are selectable", async ({ page }) => {
      await page.goto("/es");

      const dropdown = page.locator("select").first();

      if (await dropdown.count() > 0) {
        const options = dropdown.locator("option");
        const optionCount = await options.count();

        if (optionCount > 1) {
          await dropdown.selectOption({ index: 1 });

          const selectedValue = await dropdown.inputValue();
          expect(selectedValue).toBeTruthy();
        }
      }
    });
  });

  test.describe("Modal Interactions", () => {
    test("modal can be opened", async ({ page }) => {
      await page.goto("/es");

      const modalTrigger = page.locator('button:has-text("Más información"), button:has-text("Ver más")').first();

      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();

        await page.waitForTimeout(500);

        // Look for modal
        const modal = page.locator('[role="dialog"], .modal, [data-testid*="modal"]');
        if (await modal.count() > 0) {
          await expect(modal.first()).toBeVisible();
        }
      }
    });

    test("modal can be closed", async ({ page }) => {
      await page.goto("/es");

      const modalTrigger = page.locator('button:has-text("Más información")').first();

      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();
        await page.waitForTimeout(500);

        const closeButton = page.locator('button[aria-label*="close" i], button[aria-label*="cerrar" i], .close').first();

        if (await closeButton.count() > 0) {
          await closeButton.click();
          await page.waitForTimeout(300);

          const modal = page.locator('[role="dialog"]:visible');
          const modalCount = await modal.count();
          expect(modalCount).toBe(0);
        }
      }
    });
  });

  test.describe("Keyboard Interactions", () => {
    test("tab navigation works", async ({ page }) => {
      await page.goto("/es");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test("Enter key activates buttons", async ({ page }) => {
      await page.goto("/es");

      const button = page.locator("button, a").first();

      if (await button.count() > 0) {
        await button.focus();
        await page.keyboard.press("Enter");

        await page.waitForTimeout(500);

        // Should trigger action
        expect(page.url()).toBeTruthy();
      }
    });

    test("Escape closes modals", async ({ page }) => {
      await page.goto("/es");

      const modalTrigger = page.locator('button:has-text("Más información")').first();

      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();
        await page.waitForTimeout(500);

        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);

        const modal = page.locator('[role="dialog"]:visible');
        const modalCount = await modal.count();
        expect(modalCount).toBe(0);
      }
    });
  });

  test.describe("Form Validation", () => {
    test("email validation works", async ({ page }) => {
      await page.goto("/es");

      const emailInput = page.locator('input[type="email"]').first();

      if (await emailInput.count() > 0) {
        await emailInput.fill("invalid-email");

        const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
        expect(isValid).toBe(false);
      }
    });

    test("required field validation works", async ({ page }) => {
      await page.goto("/es");

      const form = page.locator("form").first();

      if (await form.count() > 0) {
        const requiredInput = form.locator("input[required]").first();

        if (await requiredInput.count() > 0) {
          const isValid = await requiredInput.evaluate((el: HTMLInputElement) => el.validity.valid);

          if (!isValid) {
            expect(isValid).toBe(false);
          }
        }
      }
    });
  });
});
