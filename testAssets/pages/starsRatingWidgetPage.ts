import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class StarsRatingPage extends BasePage {
  private readonly starsHeading: Locator;
  private readonly stars: Locator[];
  private readonly emojis: Locator[];

  constructor(page: Page) {
    super(page);

    this.starsHeading = page.locator('//h3[text()="Stars Rating Widget"]');
    this.stars = [
      page.locator('//label[@for="star-1"]'),
      page.locator('//label[@for="star-2"]'),
      page.locator('//label[@for="star-3"]'),
      page.locator('//label[@for="star-4"]'),
      page.locator('//label[@for="star-5"]'),
    ];
    this.emojis = [
      page.locator('//img[@src="emojis/emoji-1.png"]'),
      page.locator('//img[@src="emojis/emoji-2.png"]'),
      page.locator('//img[@src="emojis/emoji-3.png"]'),
      page.locator('//img[@src="emojis/emoji-4.png"]'),
      page.locator('//img[@src="emojis/emoji-5.png"]'),
    ];
  }

  /** Open Stars Rating Widget section */
  async openStarsRatingWidget() {
    await this.starsHeading.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Rate a specific star and return locator for corresponding emoji
   * @param starIndex index from 0 to 4
   */
  async rateStarAndGetEmojiLocator(starIndex: number): Promise<Locator> {
    await this.stars[starIndex].click();
    return this.emojis[starIndex];
  }
}
