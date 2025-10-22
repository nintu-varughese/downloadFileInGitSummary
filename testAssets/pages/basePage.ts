import { Page } from "@playwright/test";

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a given URL.
   * @param url {string} - The URL to navigate to.
   */
  async navigate(url: string) {
    await this.page.goto(url);
  }
  /**
   * Navigate to the secondary application URL defined in environment variables.
   * @throws Will throw an error if SECONDARY_BASE_URL is not defined in the .env file.
   */
  async navigateToSecondaryApp() {
    const secondaryUrl = process.env.SECONDARY_BASE_URL;
    if (!secondaryUrl) {
      throw new Error("SECONDARY_BASE_URL is not defined in the .env file");
    }
    await this.page.goto(secondaryUrl);
  }

  /**
   * Check if an element is visible on the page.
   * @param locator {string} - The selector or locator of the element to check visibility.
   * @returns {Promise<boolean>} True if the element is visible, otherwise false.
   */
  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }
}
