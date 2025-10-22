import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';
import path from 'path';
import fs from 'fs';

export default class QaDownloadFilePage extends BasePage {
  private readonly downloadHeading: Locator;
  private readonly downloadButton: Locator;

  constructor(page: Page) {
    super(page);
    this.downloadHeading = page.locator('//h3[text()="Download File"]');
    this.downloadButton = page.locator('//a[@class="btn btn-lg btn-green-outline"]');
  }

  /**
   * Clicks on the "Download File" heading and button, downloads the file,
   * and returns the full local path for verification.
   *
   * @param {string} expectedFileName - The expected name of the file to be downloaded.
   * @returns {Promise<string>} - Resolves to the absolute path where the file is saved.
   *
   * @example
   * const filePath = await qaDownloadFilePage.downloadFileAndReturnPath("sample.pdf");
   * expect(fs.existsSync(filePath)).toBeTruthy();
   */
  async downloadFileAndReturnPath(expectedFileName: string): Promise<string> {
    // Click the download heading to ensure the section is active
    await this.downloadHeading.click();

    // Start download and wait for the download event
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click(),
    ]);

    const downloadDir = path.resolve(__dirname, "../../.artifacts/downloadFile");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Save the downloaded file inside downloadFile folder
    const downloadPath = path.resolve(downloadDir, expectedFileName);
    await download.saveAs(downloadPath);

    return downloadPath;
  }
}
