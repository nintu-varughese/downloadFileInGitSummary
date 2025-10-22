import { Page, Locator } from "@playwright/test";
 
export class SortableListPage {
  readonly page: Page;
  readonly header: Locator;
  readonly peopleList: Locator;
  readonly checkButton: Locator;
  readonly title: Locator;
 
  /**
   * Initializes the SortableListPage with required locators.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//h3[text()="Sortable List"]');
    this.peopleList = page.locator('#draggable-list li');
    this.checkButton = page.locator('#check');
    this.title = page.locator('//h1[text()="10 Richest People"]');
  }
 
  /**
   * Navigates to the Sortable List section by clicking the header.
   *
   * @async
   * @returns {Promise<void>}
   */
  async navigate(): Promise<void> {
    await this.header.click();
  }
 
  /**
   * Clicks the "Check Order" button to verify the current order of list items.
   *
   * @async
   * @returns {Promise<void>}
   */
  async clickCheckOrder(): Promise<void> {
    await this.checkButton.click();

  }
 
  /**
   * Retrieves all items in the people list along with their associated class names.
   *
   * @async
   * @returns {Promise<{name: string | null, className: string | null}[]>} Array of objects containing name and className of each item.
   */
  async getAllItemsClasses(): Promise<{ name: string | null, className: string | null }[]> {
    const items = await this.peopleList.elementHandles();
    const results = [];
    for (const item of items) {
      const name = await item.$eval('.person-name', el => el.textContent?.trim());
      const className = await item.getAttribute('class');
      results.push({ name, className });
    }
    return results;
  }
 
  /**
   * Drags an item from a source index to a target index in the list.
   *
   * @async
   * @param {number} sourceIndex - The zero-based index of the item to drag.
   * @param {number} targetIndex - The zero-based index of the target position.
   * @returns {Promise<void>}
   */
  async dragItem(sourceIndex: number, targetIndex: number): Promise<void> {
    if (sourceIndex === targetIndex) return;
    const sourceItem = this.peopleList.nth(sourceIndex);
    const targetItem = this.peopleList.nth(targetIndex);
    await sourceItem.dragTo(targetItem, { force: true });
  }
 
  /**
   * Returns the total number of items in the sortable list.
   *
   * @async
   * @returns {Promise<number>} Count of list items.
   */
  async countItems(): Promise<number> {
    return await this.peopleList.count();
  }
}
