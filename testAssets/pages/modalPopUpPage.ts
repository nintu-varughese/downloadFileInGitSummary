import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for handling Modal Popup interactions.
 * Includes actions like opening the modal and accessing locators.
 */
export default class ModalPopUpPage extends BasePage {
  readonly modalHeading: Locator;
  readonly closeIcon: Locator;
  readonly welcomeMessage: Locator;

  /**
   * Initializes all locators for the Modal Popup page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.modalHeading = page.locator('//h3[text()="Onboarding Modal Popup"]');
    this.closeIcon = page.locator('//i[@class="fas fa-bars"]');
    this.welcomeMessage = page.locator("div.title", {
      hasText: "Welcome Peter Parker!",
    });
  }

  /**
   * Opens the Modal Popup section and closes the popup via the close icon.
   */
  async openModalPopupSection(): Promise<void> {
    await this.modalHeading.click();
    await this.closeIcon.click();
  }
}
