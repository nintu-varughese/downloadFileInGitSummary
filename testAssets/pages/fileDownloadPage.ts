import { Page, Locator } from "@playwright/test";
import path from "path";
import fs from "fs";

/**
 * Page Object Model for the "File Download" component.
 * Handles navigation, text input, file creation, file download, and verification.
 */
export class FileDownloadPage {
  readonly page: Page;
  readonly moreLink: Locator;
  readonly fileDownloadLink: Locator;
  readonly textBox: Locator;
  readonly createBtn: Locator;
  readonly downloadLink: Locator;

  /**
   * Initializes all locators for the File Download page.
   * @param page - The Playwright Page instance representing the current browser page.
   */
  constructor(page: Page) {
    this.page = page;
    this.moreLink = page.locator('//a[text()="More"]');
    this.fileDownloadLink = page.locator('//a[text()="File Download"]');
    this.textBox = page.locator("#textbox");
    this.createBtn = page.locator("#createTxt");
    this.downloadLink = page.locator("#link-to-download");
  }

  /**
   * Navigates to the "File Download" section by clicking the More and File Download links.
   */
  async navigateToFileDownload(): Promise<void> {
    await this.moreLink.click();
    await this.fileDownloadLink.click();
  }

  /**
   * Fills the input textbox with the given text and presses Enter.
   * @param data - The text content to enter into the textbox.
   */
  async enterText(data: string): Promise<void> {
    await this.textBox.fill(data);
    await this.textBox.press("Enter");
  }

  /**
   * Clicks the "Create" button to generate a text file.
   * Waits until the button is visible before clicking.
   */
  async clickCreateButton(): Promise<void> {
    await this.createBtn.waitFor({ state: "visible" });
    await this.createBtn.click();
  }

  /**
   * Downloads the created file and saves it to the "downloadFile" folder.
   * If the folder does not exist, it is created.
   * @returns The absolute file path where the downloaded file is saved.
   */
  async downloadFile(): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadLink.click(),
    ]);

    // Ensure download folder exists
    const downloadDir = path.resolve(__dirname, "../../.artifacts/downloadFile");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const filePath = path.resolve(downloadDir, await download.suggestedFilename());
    await download.saveAs(filePath);
    return filePath;
  }

  /**
   * Reads the contents of a file at the given path.
   * @param filePath - The absolute path to the file to read.
   * @returns The content of the file as a string.
   */
  readFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
  }

  /**
   * Checks whether a file exists at the given path.
   * @param filePath - The absolute path to the file to check.
   * @returns True if the file exists, otherwise false.
   */
  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
}
