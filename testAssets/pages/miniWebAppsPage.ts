import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for the Mini Web Apps section.
 * Handles interactions with the Dynamic Table and related elements.
 */
export default class MiniWebApps extends BasePage {
  readonly dynamicTableHeading: Locator;
  readonly tableHeader: Locator;
  readonly spiderManRows: Locator;
  readonly fullCoursesLink: Locator;
  readonly spiderManRealNameCell: Locator;

  /**
   * Initializes all locators for the Mini Web Apps page.
   * @param {Page} page - Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);

    this.dynamicTableHeading = page.locator('//h3[text()="Dynamic Table"]');
    this.tableHeader = page.locator("text=SUPERHERO");
    this.spiderManRows = page.locator("tbody#tbody tr", {
      hasText: "Spider-Man",
    });
    this.fullCoursesLink = page.locator('//a[@aria-label="full courses"]');
    this.spiderManRealNameCell = this.spiderManRows
      .locator("td")
      .nth(2)
      .locator("span");
  }
  /**
   * Returns the row(s) containing Spider-Man.
   */
  public get spiderManRow(): Locator {
    return this.spiderManRows;
  }

  /**
   * Returns the cell containing Spider-Man's real name.
   */
  public get spiderManRealName(): Locator {
    return this.spiderManRealNameCell;
  }
  /**
   * Clicks on the Dynamic Table heading to open the section.
   */
  async clickDynamicTable(): Promise<void> {
    await this.dynamicTableHeading.click();
  }

  /**
   * Clicks the "Full Courses" link to navigate back to the home page.
   */
  async goBackToHomePage(): Promise<void> {
    await this.fullCoursesLink.click();
  }

  /**
   * Reloads the current page to refresh the table content.
   */
  async reloadTablePage(): Promise<void> {
    await this.page.reload();
  }
}
