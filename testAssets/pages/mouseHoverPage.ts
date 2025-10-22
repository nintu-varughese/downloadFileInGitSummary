import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for the Mouse Hover section.
 * Handles interactions with movie posters and retrieves movie details.
 */
export default class MouseHoverPage extends BasePage {
  readonly sectionHeader: Locator;
  readonly poster: Locator;
  readonly movieTitle: Locator;
  readonly currentPrice: Locator;
  readonly oldPrice: Locator;
  readonly buyButton: Locator;

  readonly expectedTitle = "Spider-Man: No Way Home";
  readonly expectedCurrentPrice = "$24.96";
  readonly expectedOldPrice = "$38.99";

  /**
   * Initializes all locators for the Mouse Hover section.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.sectionHeader = page.locator('//h3[text()="Mouse Hover"]');
    this.poster = page.locator('//img[@class="poster"]');
    this.movieTitle = page.locator(".title-content h4.movie-title");
    this.currentPrice = page.locator(".title-content .current-price");
    this.oldPrice = page.locator(".title-content .old-price");
    this.buyButton = page.locator(".title-content .buy-btn");
  }

  /**
   * Clicks the "Mouse Hover" section header to open the section.
   */
  async openMouseHoverSection(): Promise<void> {
    await this.sectionHeader.click();
  }

  /**
   * Hovers over the movie poster to reveal details like title, price, and buy button.
   */
  async hoverOverMovie(): Promise<void> {
    await this.poster.hover();
  }

  /**
   * Retrieves the details of the hovered movie.
   * @returns {Promise<{title: string | null, current: string | null, old: string | null, buyVisible: boolean}>}
   *   An object containing:
   *   - title: The movie title text
   *   - current: The current price text
   *   - old: The old price text
   *   - buyVisible: Whether the buy button is visible
   */
  async getMovieDetails(): Promise<{
    title: string | null;
    current: string | null;
    old: string | null;
    buyVisible: boolean;
  }> {
    const title = await this.movieTitle.textContent();
    const current = await this.currentPrice.textContent();
    const old = await this.oldPrice.textContent();
    const buyVisible = await this.buyButton.isVisible();
    return { title, current, old, buyVisible };
  }
}
