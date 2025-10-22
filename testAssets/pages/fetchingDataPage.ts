import { Page, Locator } from "@playwright/test";

/**
 * Page Object for Fetching Data page
 */
export default class FetchingDataPage {
  readonly page: Page;
  readonly fetchingDataHeader: Locator;
  readonly cardSelector: string;
  readonly cardHeaderSelector: string;
  readonly cardBodySelector: string;

  /**
   * @param {Page} page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.fetchingDataHeader = page.locator('h3:text("Fetching Data")'); // CSS locator for header
    this.cardSelector = "div.icard"; // CSS selector for cards
    this.cardHeaderSelector = "div.header";
    this.cardBodySelector = "div[data-body]";
  }

  /**
   * Clicks on the "Fetching Data" header to load cards
   * and waits for 3 seconds to let cards load
   */
  async clickFetchingDataHeader(): Promise<void> {
    await this.fetchingDataHeader.click();
    const firstCard = this.page.locator(this.cardSelector).first();
    await firstCard.waitFor({ state: "visible" });
  }
}
