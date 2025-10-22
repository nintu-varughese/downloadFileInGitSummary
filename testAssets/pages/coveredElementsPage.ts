import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for handling the "Covered Elements" section.
 * Provides methods to open the section, interact with the button,
 * and verify the success message.
 */
export default class CoveredElementsPage extends BasePage {
  readonly coveredElementsHeading: Locator;
  readonly wrapperDiv: Locator;
  readonly youGotMeButton: Locator;
  readonly missionAccomplishedText: Locator;

  /**
   * Initializes all locators required for the Covered Elements page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.coveredElementsHeading = page.locator(
      '//h3[text()="Covered Elements"]'
    );
    this.wrapperDiv = page.locator('//div[@class="wrapper"]');
    this.youGotMeButton = page.locator('//a[@onclick="youGotMe()"]');
    this.missionAccomplishedText = page.locator(
      '//p[text()="Mission accomplished"]'
    );
  }

  /**
   * Navigate to the "Covered Elements" section by clicking the heading.
   *
   * @async
   * @returns {Promise<void>} Resolves when the section is opened.
   */
  async openCoveredElementsSection(): Promise<void> {
    await this.coveredElementsHeading.click();
  }

  /**
   * Scroll down to the wrapper, click the "You Got Me" button,
   * scroll back to the top, and verify the "Mission accomplished" text.
   *
   * @async
   * @throws Will throw an error if the "Mission accomplished" text is not visible.
   * @returns {Promise<void>} Resolves when the button is clicked and the message is verified.
   */
  async scrollClickAndVerify(): Promise<void> {
    await this.wrapperDiv.scrollIntoViewIfNeeded();
    await this.youGotMeButton.click();
    await this.page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
}
