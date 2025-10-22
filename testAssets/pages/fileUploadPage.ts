import { Page, Locator } from "@playwright/test";
import path from "path";
import BasePage from "./basePage";

/**
 * Page Object for handling File Upload and Download operations.
 */
export default class FileUploadPage extends BasePage {
  readonly filePath: string;
  readonly moreMenu: Locator;
  readonly fileUploadLink: Locator;
  readonly fileInput: Locator;
  readonly uploadSuccess: Locator;
  readonly fileDownloadLink: Locator;
  readonly textArea: Locator;
  readonly generateFileButton: Locator;
  readonly downloadLink: Locator;

  /**
   * Initializes locators and file path for upload/download
   * @param {Page} page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);

    // Updated path to point to testData folder
    this.filePath = path.resolve(__dirname, "../testData/uploadFile.png");
    this.moreMenu = page.locator('//a[text()="More"]');
    this.fileUploadLink = page.locator('//a[text()="File Upload"]');
    this.fileInput = page.locator('//input[@id="input-4"]');
    this.uploadSuccess = page.locator('//span[text()="Upload"]');
    this.fileDownloadLink = page.locator('//a[text()="File Download"]');
    this.textArea = page.locator('//textarea[@id="textbox"]');
    this.generateFileButton = page.locator('(//button[text()="Generate File"])[1]');
    this.downloadLink = page.locator('//a[@id="link-to-download"]');
  }

  /**
   * Navigate to File Upload section and upload a file
   * @async
   * @returns {Promise<Locator>} Locator of the uploaded file success message
   */
  async uploadFile(): Promise<Locator> {
    await this.moreMenu.click();
    await this.fileUploadLink.click();
    await this.fileInput.setInputFiles(this.filePath);
    await this.uploadSuccess.waitFor({ state: "visible", timeout: 5000 });
    return this.uploadSuccess;
  }
}
