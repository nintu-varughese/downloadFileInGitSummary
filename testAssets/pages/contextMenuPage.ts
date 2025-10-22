import { expect, Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export default class ContextMenuPage extends BasePage {
  private readonly contextMenuSection: Locator;
  private readonly messageLocator: Locator;
  private readonly contextMenuItem: (menu: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.contextMenuSection = page.locator(
      '//h3[text()="Right-Click Context Menu"]'
    );
    this.messageLocator = page.locator('//div[@id="message"]');
    /**
     * Dynamic locator generator for context menu items.
     * @param menu - The visible text of the context menu item.
     * @returns A Locator object for the specified menu item.
     */
    this.contextMenuItem = (menu: string) =>
      page.locator(`//div[@class="menu"]//li[text()="${menu}"]`);
  }

  /**
   * Opens the "Right-Click Context Menu" section on the page.
   * Waits until the section becomes visible and clicks to open it.
   */
  async openContextMenuSection(): Promise<void> {
    await expect(
      this.contextMenuSection,
      "Context menu section is not visible"
    ).toBeVisible({ timeout: 10000 });
    await this.contextMenuSection.click();
  }
  /**
   * Performs a right-click (context click) action on the given target element.
   * @param targetLocator - The XPath or CSS selector of the element to right-click.
   */
  async rightClickTarget(targetLocator: string): Promise<void> {
    const target = this.page.locator(targetLocator);
    await expect(
      target,
      `Target element "${targetLocator}" is not visible`
    ).toBeVisible({ timeout: 10000 });
    await target.scrollIntoViewIfNeeded();
    await target.click({ button: "right" });
  }

  /**
   * Clicks a specific item from the context menu.
   * @param menu - The exact visible text of the context menu item to click.
   */
  async menuItemClick(menu: string): Promise<void> {
    const menuItem = this.contextMenuItem(menu);
    await expect(
      menuItem,
      `Context menu item "${menu}" is not visible`
    ).toBeVisible({ timeout: 5000 });
    await menuItem.click();
  }

  /**
   * Hovers over a specific context menu item.
   * Useful for opening sub-menus or triggering hover effects.
   * @param menu - The visible text of the context menu item to hover.
   */
  async menuItemHover(menu: string): Promise<void> {
    const menuItem = this.contextMenuItem(menu);
    await expect(
      menuItem,
      `Context menu item "${menu}" is not visible for hover`
    ).toBeVisible({ timeout: 5000 });
    await menuItem.hover();
  }

  /**
   * Fetches the text displayed inside the message element.
   */
  async getMessageText(): Promise<string> {
    return this.messageLocator.innerText();
  }
}
