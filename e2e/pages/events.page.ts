import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model for Events Page
 */
export class EventsPage {
  readonly page: Page;

  // Page Elements
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly eventsGrid: Locator;
  readonly eventCards: Locator;
  readonly loadingSpinner: Locator;
  readonly emptyState: Locator;

  // Filters
  readonly filterSection: Locator;
  readonly dateFilter: Locator;
  readonly categoryFilter: Locator;

  // Pagination
  readonly pagination: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator("h1");
    this.searchInput = page.getByPlaceholder(/buscar|search/i);
    this.eventsGrid = page.locator('[data-testid="events-grid"]');
    this.eventCards = page.locator('[data-testid="event-card"]');
    this.loadingSpinner = page.locator('[data-testid="loading"]');
    this.emptyState = page.locator('[data-testid="empty-state"]');

    this.filterSection = page.locator('[data-testid="filters"]');
    this.dateFilter = page.locator('[data-testid="date-filter"]');
    this.categoryFilter = page.locator('[data-testid="category-filter"]');

    this.pagination = page.locator('[data-testid="pagination"]');
    this.nextPageButton = page.getByRole("button", { name: /next|siguiente/i });
    this.prevPageButton = page.getByRole("button", {
      name: /previous|anterior/i,
    });
  }

  async goto(locale = "es") {
    await this.page.goto(`/${locale}/events`);
    await this.page.waitForLoadState("networkidle");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async getEventCount(): Promise<number> {
    return await this.eventCards.count();
  }

  async clickEventCard(index = 0) {
    const card = this.eventCards.nth(index);
    await card.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getEventTitle(index = 0): Promise<string> {
    const card = this.eventCards.nth(index);
    const title = card.locator("h2, h3").first();
    return (await title.textContent()) || "";
  }

  async isLoading(): Promise<boolean> {
    return await this.loadingSpinner.isVisible();
  }

  async hasEvents(): Promise<boolean> {
    const count = await this.getEventCount();
    return count > 0;
  }

  async showsEmptyState(): Promise<boolean> {
    return await this.emptyState.isVisible();
  }
}
