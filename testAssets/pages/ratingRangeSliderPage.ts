import { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class RatingRangeSliderPage extends BasePage {
  readonly sectionHeader: Locator;
  readonly sliderInput: Locator;
  readonly thumb: Locator;
  readonly progressBar: Locator;
  readonly sendFeedbackButton: Locator;
  readonly feedbackMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeader = page.locator('//h3[text()="Rating Range Slider"]');
    this.sliderInput = page.locator('//input[@type="range"]');
    this.thumb = page.locator('//div[@class="thumb"]');
    this.progressBar = page.locator('//div[@class="progress-bar"]');
    this.sendFeedbackButton = page.locator('//button[@id="feedback"]');
    this.feedbackMessage = page.locator('//p[text()="Thank you for your feedback!"]');
  }

  /** Step 1: Open the Rating Range Slider section */
  async openSection() {
    await this.sectionHeader.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Step 2: Move slider gradually until Send Feedback button is visible */
  async moveSliderUntilFeedbackVisible() {
    for (let value = 0; value <= 100; value++) {
      await this.sliderInput.evaluate((el, val) => {
        const input = el as HTMLInputElement;
        input.value = val.toString();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);

      if (await this.sendFeedbackButton.isVisible()) {
        break;
      }
    }

    // Optional: wait for progress bar to update
    await expect(this.progressBar, "Progress bar is not visible after moving the slider").toBeVisible();
  }

  /** Step 3: Click the Feedback button */
  async clickFeedbackButton() {
    await this.sendFeedbackButton.scrollIntoViewIfNeeded();
    await this.sendFeedbackButton.click();
  }
}
