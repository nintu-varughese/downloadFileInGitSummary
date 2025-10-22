import { Locator, Page, expect } from '@playwright/test';
import BasePage from './basePage';

/**
 * Page Object for interacting with the "Nested Iframe" section.
 * Handles opening the section, clicking buttons inside nested iframes, and retrieving messages.
 */
export default class NestedIframePage extends BasePage {
  private readonly nestedIframeHeading: Locator;
  private readonly clickMeButtonSelector: string;
  private readonly buttonClickedMessageSelector: string;

  /**
   * Initializes locators for the Nested Iframe page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);

    this.nestedIframeHeading = page.locator('//h3[text()="Nested Iframe"]');
    this.clickMeButtonSelector = '//a[text()="Click Me"]';
    this.buttonClickedMessageSelector = '//p[text()="Button Clicked"]';
  }
  /**
   * Opens the "Nested Iframe" section by clicking its header.
   * Waits for the DOM content to be fully loaded.
   */
  async openNestedIframeSection(): Promise<void> {
    await this.nestedIframeHeading.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Clicks the "Click Me" button inside the nested iframe.
   * @returns {Promise<Locator>} Locator for the "Button Clicked" message inside the iframe.
   */
  async clickButtonAndGetMessage(): Promise<Locator> {
    const outerFrame = this.page.frameLocator('iframe').first();
    const innerFrame = outerFrame.frameLocator('iframe');
    await innerFrame.locator(this.clickMeButtonSelector).click();
    return innerFrame.locator(this.buttonClickedMessageSelector);
  }
}
