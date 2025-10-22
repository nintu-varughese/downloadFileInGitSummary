import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';

export default class NewTabPage extends BasePage {
  private readonly newTabHeading: Locator;
  private readonly openNewTabButton: Locator;
  private readonly newPageTextSelector: string;

  /**
   * Function property to generate a locator for the new tab page.
   * Accepts a Page object (the new tab) and returns a Locator.
   */
  readonly newPageHeadingLocator: (p: Page) => Locator;

  constructor(page: Page) {
    super(page);
    this.newTabHeading = page.locator('//h3[text()="New Tab"]');
    this.openNewTabButton = page.locator('//a[text()="Open New Tab"]');
    this.newPageTextSelector = '//h1[text()="Welcome to the new page!"]';
    this.newPageHeadingLocator = (p: Page) => p.locator(this.newPageTextSelector);
  }

  /** Open the "New Tab" section */
  async openNewTabSection() {
    await this.newTabHeading.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click "Open New Tab" and return the new Page object
   */
  async clickOpenNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'), 
      this.openNewTabButton.click(),             
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
