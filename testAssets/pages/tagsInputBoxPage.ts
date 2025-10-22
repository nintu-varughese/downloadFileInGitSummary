import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

/**
 * Page Object for interacting with the Tags Input Box page.
 * Provides methods to add, remove, and manage tags.
 */
export default class TagsInputBoxPage extends BasePage {
  readonly tagsLink: Locator;
  readonly tags: Locator;
  readonly remainingCount: Locator;
  readonly removeAllButton: Locator;
  readonly inputField: Locator;

  /**
   * Initializes all locators for the Tags Input Box page.
   *
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.tagsLink = page.locator('//h3[text()="Tags Input Box"]'); 
    this.inputField = page.locator('.content >> input'); 
    this.tags = page.locator('.content >> ul >> li'); 
    this.remainingCount = page.locator('.details >> p >> span'); 
    this.removeAllButton = page.locator('.details >> button'); 
  }

  /**
   * Open the Tags Input Box page.
   *
   * @async
   * @returns {Promise<void>}
   */
  async openTagsInputBoxPage(): Promise<void> {
    await this.tagsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Add a single tag to the input field.
   *
   * @async
   * @param {string} tag - The name of the tag to add.
   * @returns {Promise<void>}
   */
  async addTag(tag: string): Promise<void> {
    await this.inputField.fill(tag);
    await this.inputField.press('Enter');
  }

  /**
   * Remove a specific tag by its text.
   *
   * @async
   * @param {string} tagText - The text of the tag to remove.
   * @returns {Promise<void>}
   */
  async removeTag(tagText: string): Promise<void> {
    const tagItem = this.tags.locator(`text=${tagText}`);
    await tagItem.locator('i').click();
  }

  /**
   * Remove all tags at once.
   *
   * @async
   * @returns {Promise<void>}
   */
  async removeAllTags(): Promise<void> {
    await this.removeAllButton.click();
  }

  /**
   * Clear all existing tags and add multiple new tags.
   *
   * @async
   * @param {string[]} tags - Array of tag names to add.
   * @returns {Promise<void>}
   */
  async addTagsAndReset(tags: string[]): Promise<void> {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    for (const tag of tags) {
      await this.addTag(tag);
    }
  }

  /**
   * Clear all tags, add initial tags, and remove a specific tag.
   *
   * @async
   * @param {string[]} initialTags - Array of tags to add first.
   * @param {string} removeTagName - The tag to remove after adding initial tags.
   * @returns {Promise<void>}
   */
  async removeTagAfterAdding(initialTags: string[], removeTagName: string): Promise<void> {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    for (const tag of initialTags) {
      await this.addTag(tag);
    }
    await this.removeTag(removeTagName);
  }

  /**
   * Clear all tags and add a single tag.
   *
   * @async
   * @param {string} tag - The tag to add after resetting.
   * @returns {Promise<void>}
   */
  async resetAndAddSingleTag(tag: string): Promise<void> {
    await this.openTagsInputBoxPage();
    await this.removeAllTags();
    await this.addTag(tag);
  }
}
