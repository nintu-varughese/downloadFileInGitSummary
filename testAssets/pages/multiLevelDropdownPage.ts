import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";
import testData from "../testData/testdata.json";


/**
 * Page Object for Multi-Level Dropdown interactions.
 * Handles opening dropdown sections, clicking icons, navigating submenus, and retrieving submenu items.
 */
export default class MultiLevelDropdownPage extends BasePage {
  readonly dropdownLink: Locator;
  readonly iconButton: Locator;
  readonly settingsLink: Locator;
  readonly animalsLink: Locator;
  readonly subMenuItems: Locator;
  readonly expectedSettingsSubMenu: string[] =
    testData.multiLevelDropdown.expectedSettingsSubMenu;
  readonly expectedAnimalsSubMenu: string[] =
    testData.multiLevelDropdown.expectedAnimalsSubMenu;

  /**
   * Initializes all locators for the Multi-Level Dropdown page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.dropdownLink = page.locator('//h3[text()="Multi Level Dropdown"]');
    this.iconButton = page.locator('(//a[@class="icon-button"])[4]');
    this.settingsLink = page.locator('//a[@href="#settings"]');
    this.animalsLink = page.locator('//a[@href="#animals"]');
    this.subMenuItems = page.locator(
      "div.menu.menu-secondary-enter-done > a.menu-item"
    );
  }

  /**
   * Opens the Multi-Level Dropdown section by clicking its header.
   */
  async openDropdownSection(): Promise<void> {
    await this.dropdownLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Clicks the icon button to reveal submenu items.
   */
  async clickIconButton(): Promise<void> {
    await this.iconButton.click();
  }

  /**
   * Clicks the "Settings" menu item.
   */
  async clickSettings(): Promise<void> {
    await this.settingsLink.click();
  }

  /**
   * Clicks the "Animals" menu item.
   */
  async clickAnimals(): Promise<void> {
    await this.animalsLink.click();
  }

  /**
   * Returns all visible submenu items text as a string array.
   * Skips parent links like "Settings" or "Animals" and removes emojis/line breaks.
   * @returns {Promise<string[]>} Array of submenu item texts
   */
  async getSubMenuItemsText(): Promise<string[]> {
    await this.subMenuItems.first().waitFor({ state: "visible" });
    const count = await this.subMenuItems.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      let text = await this.subMenuItems.nth(i).innerText();
      text = text.trim();
      if (text === "Settings" || text === "Animals") continue;
      text = text.replace(/^[^\w]*(.*)/s, "$1").trim();
      texts.push(text);
    }
    return texts;
  }

  /**
   * Opens Settings submenu and returns current URL and submenu items.
   * @returns {Promise<{ url: string, submenuItems: string[] }>} URL and submenu items text
   */
  async openSettingsAndGetDetails(): Promise<{
    url: string;
    submenuItems: string[];
  }> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickSettings();
    const url = this.page.url();
    const submenuItems = await this.getSubMenuItemsText();
    return { url, submenuItems };
  }

  /**
   * Opens Animals submenu and returns current URL and submenu items.
   * @returns {Promise<{ url: string, submenuItems: string[] }>} URL and submenu items text
   */
  async openAnimalsAndGetDetails(): Promise<{
    url: string;
    submenuItems: string[];
  }> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickAnimals();
    const url = this.page.url();
    const submenuItems = await this.getSubMenuItemsText();
    return { url, submenuItems };
  }

  /**
   * Clicks a submenu item by visible text.
   * @param {string} itemText - The exact text of the submenu item to click
   */
  async clickSubMenuItem(itemText: string): Promise<void> {
    const itemLocator = this.subMenuItems.filter({ hasText: itemText });
    await itemLocator.first().click();
  }

  /**
   * Opens Settings submenu and clicks the "HTML" submenu item.
   */
  async clickHTMLSubMenu(): Promise<void> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickSettings();
    await this.clickSubMenuItem("HTML");
  }

  /**
   * Opens Animals submenu and clicks a submenu item by name.
   * @param {string} itemText - The exact text of the Animals submenu item to click
   */
  async clickAnimalsSubMenu(itemText: string): Promise<void> {
    await this.openDropdownSection();
    await this.clickIconButton();
    await this.clickAnimals();
    await this.clickSubMenuItem(itemText);
  }

  /**
   * Returns the current page URL.
   * @returns {Promise<string>} Current URL of the page
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
}
