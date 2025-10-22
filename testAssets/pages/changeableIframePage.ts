import { expect, Locator, Page, FrameLocator } from "@playwright/test";
import BasePage from "./basePage";

export default class ChangeableIframePage extends BasePage {
  readonly header: Locator;
  readonly iframe: FrameLocator;
  readonly firstIframeLegend: Locator;
  readonly secondIframeLegend: Locator;
  readonly endMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('//h3[text()="Changeable Iframe"]');
    this.iframe = page.frameLocator("#frame1");
    this.firstIframeLegend = this.iframe.locator(
      '//legend[text()="First Iframe"]'
    );
    this.secondIframeLegend = this.iframe.locator(
      '//legend[text()="Second Iframe"]'
    );
    this.endMessage = this.iframe.locator(
      '//div[text()="This is the end of the journey"]'
    );
  }

  /**
   * Verifies iframe content changes from "First Iframe" to "Second Iframe"
   * by waiting until the final message appears.
   */
  async verifyIframeSequence(): Promise<void> {
    await expect(
      this.header,
      "Changeable Iframe header is not visible"
    ).toBeVisible();
    await this.header.click();

    await expect(
      this.firstIframeLegend,
      "First Iframe legend not visible after section click"
    ).toBeVisible();

    await expect(
      this.endMessage,
      "End message did not appear within the expected time"
    ).toBeVisible({ timeout: 15000 });
  }
}
