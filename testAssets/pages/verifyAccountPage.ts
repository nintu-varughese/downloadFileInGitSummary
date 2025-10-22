import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

/**
 * Page Object for interacting with the "Verify Your Account" section.
 * Provides methods to fill verification code inputs and submit them.
 */
export default class VerifyAccountPage extends BasePage {
  readonly codeInputs: Locator;
  readonly successMessage: Locator;
  readonly verifyAccountLink: Locator;

  /**
   * Initializes all locators for the Verify Account page.
   *
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.verifyAccountLink = page.locator('//h3[text()="Verify Your Account"]');
    this.codeInputs = page.locator('.code');
    this.successMessage = page.locator('//small[@class="info success"]');
  }

  /**
   * Open the "Verify Your Account" section.
   *
   * @async
   * @returns {Promise<void>}
   */
  async openVerifyAccountPage(): Promise<void> {
    await this.verifyAccountLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Open a base URL for fresh navigation (useful for negative test scenarios).
   *
   * @async
   * @param {string} baseURL - The base URL of the application to navigate to.
   * @returns {Promise<void>}
   */
  async openBaseUrl(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fill all verification code input fields with the given value.
   *
   * @async
   * @param {string} value - The value to fill into each code input field.
   * @returns {Promise<void>}
   */
  async fillCodeInputs(value: string): Promise<void> {
    const count = await this.codeInputs.count();
    for (let i = 0; i < count; i++) {
      await this.codeInputs.nth(i).fill(value);
    }
  }

  /**
   * Press the Enter key on the last input field (typically to submit the code).
   *
   * @async
   * @returns {Promise<void>}
   */
  async pressEnterOnLastInput(): Promise<void> {
    const count = await this.codeInputs.count();
    if (count > 0) {
      await this.codeInputs.nth(count - 1).press('Enter');
    }
  }

  /**
   * Combined workflow: Opens the Verify Account page, fills all code inputs with a value, and submits.
   *
   * @async
   * @param {string} value - The value to fill into all code input fields before submitting.
   * @returns {Promise<void>}
   */
  async fillAndSubmitCode(value: string): Promise<void> {
    await this.openVerifyAccountPage();
    await this.fillCodeInputs(value);
    await this.pressEnterOnLastInput();
  }
}
