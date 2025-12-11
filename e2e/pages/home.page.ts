import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Home Page
 * Contains all locators and actions for the home page
 */
export class HomePage {
  readonly page: Page;

  // Hero Section
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly heroCtaButton: Locator;

  // Navigation
  readonly navigation: Locator;
  readonly languageSwitcher: Locator;
  readonly skipLink: Locator;

  // Main Navigation Links
  readonly eventsLink: Locator;
  readonly programsLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;

  // Features Section
  readonly featuresSection: Locator;

  // Stats Section
  readonly statsSection: Locator;

  // CTA Banner
  readonly ctaBanner: Locator;
  readonly ctaBannerButton: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero
    this.heroTitle = page.locator("h1").first();
    this.heroDescription = page.locator('[data-testid="hero-description"]');
    this.heroCtaButton = page.locator('[data-testid="hero-cta"]');

    // Navigation
    this.navigation = page.locator("nav");
    this.languageSwitcher = page.locator('[data-testid="language-switcher"]');
    this.skipLink = page.locator('[href="#main-content"]');

    // Nav Links
    this.eventsLink = page.getByRole("link", { name: /eventos|events/i });
    this.programsLink = page.getByRole("link", { name: /programas|programs/i });
    this.aboutLink = page.getByRole("link", { name: /nosotros|about/i });
    this.contactLink = page.getByRole("link", { name: /contacto|contact/i });

    // Sections
    this.featuresSection = page.locator('[data-testid="features-section"]');
    this.statsSection = page.locator('[data-testid="stats-section"]');
    this.ctaBanner = page.locator('[data-testid="cta-banner"]');
    this.ctaBannerButton = this.ctaBanner.getByRole("button");

    // Footer
    this.footer = page.locator("footer");
  }

  /**
   * Navigate to home page
   */
  async goto(locale = "es") {
    await this.page.goto(`/${locale}`);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get the current locale from URL
   */
  getCurrentLocale(): string {
    const url = this.page.url();
    const match = url.match(/\/([a-z]{2})\//);
    return match ? match[1] : "es";
  }

  /**
   * Switch language
   */
  async switchLanguage(langCode: string) {
    await this.languageSwitcher.click();
    await this.page.getByRole("option", { name: new RegExp(langCode, "i") }).click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Click hero CTA button
   */
  async clickHeroCta() {
    await this.heroCtaButton.click();
  }

  /**
   * Navigate to Events page
   */
  async goToEvents() {
    await this.eventsLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigate to Programs page
   */
  async goToPrograms() {
    await this.programsLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigate to About page
   */
  async goToAbout() {
    await this.aboutLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Use skip link (keyboard accessibility)
   */
  async useSkipLink() {
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Enter");
  }

  /**
   * Check if page has loaded successfully
   */
  async isLoaded(): Promise<boolean> {
    try {
      await this.heroTitle.waitFor({ state: "visible", timeout: 5000 });
      await this.navigation.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all visible navigation links
   */
  async getNavigationLinks() {
    return await this.navigation.getByRole("link").all();
  }

  /**
   * Check if mobile menu is visible
   */
  async isMobileMenuVisible(): Promise<boolean> {
    const mobileMenu = this.page.locator('[data-testid="mobile-menu"]');
    return await mobileMenu.isVisible();
  }

  /**
   * Open mobile menu
   */
  async openMobileMenu() {
    const menuButton = this.page.getByRole("button", { name: /menu|menú/i });
    await menuButton.click();
  }
}
