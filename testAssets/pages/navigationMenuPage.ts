import { Page, Locator } from "@playwright/test";
import testData from "../testData/testdata.json";

/**
 * Page Object for the Navigation Menu section.
 * Handles opening the navigation menu, clicking menu items, and retrieving page headers.
 */
export default class NavigationMenuPage {
  readonly page: Page;
  readonly navMenu: Locator;
  readonly pageHeader: Locator;
  readonly goBackLink: Locator;
  readonly pages: string[];
  readonly menuItemLocators: Record<string, Locator>; // Map of menu item -> locator

  /**
   * Initializes all locators and loads menu item data from test data JSON.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.locator('//h3[text()="Navigation Menu"]');
    this.pageHeader = page.locator("//h1").nth(1);
    this.goBackLink = page.locator('//a[text()="Go Back"]');

    // Load menu items from test data
    this.pages = testData.navigationMenuPages;

    // Initialize locators for all menu items
    this.menuItemLocators = {};
    for (const item of this.pages) {
      this.menuItemLocators[item] = this.page.locator(
        `#nav a:text-is("${item}")`
      );
    }
  }

  /**
   * Clicks the main "Navigation Menu" header to open the menu.
   * @returns {Promise<void>}
   */
  async clickNavMenu(): Promise<void> {
    await this.navMenu.click();
  }

  /**
   * Clicks a specific menu item in the navigation menu.
   * @param {string} item - The exact text of the menu item to click (must exist in test data).
   * @returns {Promise<void>}
   */
  async clickMenuItem(item: string): Promise<void> {
    const locator = this.menuItemLocators[item];
    if (!locator) throw new Error(`Menu item "${item}" not found in locators`);
    await locator.click();
  }

  /**
   * Retrieves the text content of the current page header.
   * @returns {Promise<string>} The header text of the currently opened page
   */
  async getPageHeader(): Promise<string> {
    return (await this.pageHeader.textContent())?.trim() || "";
  }

  /**
   * Clicks the "Go Back" link to return to the previous page.
   * @returns {Promise<void>}
   */
  async goBack(): Promise<void> {
    await this.goBackLink.click();
  }

  /**
   * Navigates sequentially through all menu items defined in test data,
   * collects the page header of each page, and returns them in an array.
   * @returns {Promise<string[]>} Array of page header texts for each menu item
   */
  async getAllPagesFlow(): Promise<string[]> {
    const headers: string[] = [];

    for (const item of this.pages) {
      await this.clickMenuItem(item);
      const header = await this.getPageHeader();
      headers.push(header);
      await this.goBack();
    }

    return headers;
  }
}
