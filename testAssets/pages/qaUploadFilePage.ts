import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';
import path from 'path';

export default class QaUploadFilePage extends BasePage {
  private readonly uploadHeading: Locator;
  private readonly uploadIcon: Locator;
  private readonly uploadedFileName: Locator;
  private readonly fileInput: Locator;

  /**
   * Initializes all locators required for the Upload File page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.uploadHeading = page.locator('//h3[text()="Upload File"]');
    this.uploadIcon = page.locator('//i[@class="fas fa-upload"]');
    this.uploadedFileName = page.locator('//figcaption[text()="uploadFile.png"]');
    this.fileInput = page.locator('input[type="file"]');
  }

  /**
   * Upload a file and return the locator for verification.
   * Steps:
   * 1. Click the heading to open the section.
   * 2. Click the upload icon (if required).
   * 3. Upload the file using the file input locator.
   * 4. Return locator for uploaded file verification.
   *
   * @async
   * @returns {Promise<Locator>} Locator of the uploaded file name for assertion in tests.
   */
  async uploadFileAndReturnLocator(): Promise<Locator> {
    await this.uploadHeading.click();
    await this.uploadIcon.click();
    const filePath = path.resolve(__dirname, '../testData/uploadFile.png');
    await this.fileInput.setInputFiles(filePath);
    return this.uploadedFileName;
  }
}
