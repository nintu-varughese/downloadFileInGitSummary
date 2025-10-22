import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class PopUpWindowPage extends BasePage {
  private readonly popUpHeading: Locator;
  private readonly openButton: Locator;
  private readonly closeButtonSelector: string; // store as selector string
  private readonly successMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.popUpHeading = page.locator('//h3[text()="Pop-Up Window"]');
    this.openButton = page.locator('//a[@onclick="openPopUp()"]');
    this.closeButtonSelector = '//button[@onclick="window.close()"]'; // use string
    this.successMessageLocator = page.locator('//p[text()="Button Clicked"]');
  }

  /** Open the Pop-Up Window section */
  async openPopUpSection() {
    await this.popUpHeading.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Open the popup, click Close, wait for popup to close, and return locator for main page success message
   */
  async openPopUpAndClose(): Promise<Locator> {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openButton.click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    const popupClosePromise = popup.waitForEvent('close');
    await popup.locator(this.closeButtonSelector).click();
    await popupClosePromise;

    return this.successMessageLocator;
  }
}
