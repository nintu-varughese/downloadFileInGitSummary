import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for the Home Page of QA Playground.
 * Provides methods to navigate, click links, and verify headings.
 */
export default class HomePage extends BasePage {
  readonly heading: Locator;
  readonly miniWebAppsLink: Locator;
  readonly miniWebAppsHeading: Locator;

  /**
   * Initializes all static locators on the Home Page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.heading = page.locator('//span[text()="QA Playground"]');
    this.miniWebAppsLink = page.locator('//a[text()="Mini Web Apps"]');
    this.miniWebAppsHeading = page.locator('//h2[text()="Mini Web Apps"]');
  }

  /**
   * Navigate to a given URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Click the "Mini Web Apps" link.
   */
  async clickMiniWebApps(): Promise<void> {
    await this.miniWebAppsLink.click();
  }

  /**
   * Verify that the main heading "QA Playground" is visible.
   */
  async verifyHeading(): Promise<void> {
    await expect(
      this.heading,
      "QA Playground heading should be visible"
    ).toBeVisible();
  }

  /**
   * Verify that the "Mini Web Apps" heading is visible after navigation.
   */
  async verifyMiniWebAppsHeading(): Promise<void> {
    await expect(
      this.miniWebAppsHeading,
      "Mini Web Apps heading should be visible after clicking the link"
    ).toBeVisible();
  }
}
