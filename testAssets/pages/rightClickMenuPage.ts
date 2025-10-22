import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the "Right-Click Context Menu" section.
 * Handles right-click actions, hovering, and verification of menu items and sub-items.
 */
export default class RightClickMenuPage {
  readonly page: Page;
  readonly contextMenuHeader: Locator;
  readonly previewOption: Locator;
  readonly shareOption: Locator;
  readonly getLinkOption: Locator;
  readonly renameOption: Locator;
  readonly deleteOption: Locator;
  readonly settingsOption: Locator;
  readonly twitterOption: Locator;
  readonly instagramOption: Locator;
  readonly dribbleOption: Locator;
  readonly telegramOption: Locator;

  /**
   * Initializes all locators for the Right-Click Context Menu page.
   * @param {Page} page - The Playwright Page instance for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;

    // Top-level menu
    this.contextMenuHeader = page.locator('//h3[text()="Right-Click Context Menu"]');
    this.previewOption = page.locator(`//li[@onclick="itemClicked('Preview')"]`);
    this.shareOption = page.locator('//li[@class="menu-item share"]');
    this.getLinkOption = page.locator('//li[@onclick="itemClicked(\'Get Link\')"]');
    this.renameOption = page.locator('//li[@onclick="itemClicked(\'Rename\')"]');
    this.deleteOption = page.locator('//li[@onclick="itemClicked(\'Delete\')"]');
    this.settingsOption = page.locator('//li[@onclick="itemClicked(\'Settings\')"]');

    // Share submenu items
    this.twitterOption = page.locator('//li[@onclick="itemClicked(\'Twitter\')"]');
    this.instagramOption = page.locator('//li[@onclick="itemClicked(\'Instagram\')"]');
    this.dribbleOption = page.locator('//li[@onclick="itemClicked(\'Dribble\')"]');
    this.telegramOption = page.locator('//li[@onclick="itemClicked(\'Telegram\')"]');
  }

  /**
   * Right-clicks on the "Right-Click Context Menu" header to open the context menu.
   * @returns {Promise<void>} Resolves when the right-click is performed and menu is visible.
   */
  async rightClickHeader(): Promise<void> {
    await this.contextMenuHeader.click();
    await this.page.locator('body').click({ button: 'right' });
  }

  /**
   * Hovers over the "Share" menu item to reveal its submenu.
   * Useful for accessing the Share submenu items (Twitter, Instagram, etc.).
   * @returns {Promise<void>} Resolves when the hover action completes.
   */
  async hoverShare(): Promise<void> {
    await this.shareOption.hover();
  }
}
