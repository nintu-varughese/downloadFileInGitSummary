import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export default class BudgetTrackerPage extends BasePage {
  readonly budgetHeader: Locator;
  readonly newEntryButton: Locator;
  readonly amountInput: Locator;
  readonly totalAmount: Locator;
  readonly typeDropdown: Locator;

  /**
   * Initializes the BudgetTrackerPage with all required locators.
   * @param {Page} page - The Playwright Page object for browser interactions.
   */
  constructor(page: Page) {
    super(page);
    this.budgetHeader = page.locator('//h3[text()="Budget Tracker"]');
    this.newEntryButton = page.locator('//button[text()="New Entry"]');
    this.amountInput = page.locator('//input[@type="number"]').first();
    this.totalAmount = page.locator("td.summary span.total");
    this.typeDropdown = page.locator("select.input-type").first();
  }

  /**
   * Open the Budget Tracker section by clicking its header.
   *
   * @async
   * @returns {Promise<void>} Resolves when the section header is clicked.
   */
  async openBudgetTracker(): Promise<void> {
    await this.budgetHeader.click();
  }

  /**
   * Add a new budget entry with the specified amount and type.
   *
   * @async
   * @param {number} amount - The amount for the new entry.
   * @param {'income' | 'expense'} [type='income'] - The type of the entry. Defaults to 'income'.
   * @returns {Promise<void>} Resolves when the entry is added and the total is updated.
   */
  async addEntry(
    amount: number,
    type: "income" | "expense" = "income"
  ): Promise<void> {
    await this.newEntryButton.click();
    await this.typeDropdown.selectOption(type);
    await this.amountInput.fill(amount.toString());
    await this.amountInput.press("Enter");
  }

  /**
   * Get the current total amount from the Budget Tracker summary.
   *
   * @async
   * @returns {Promise<number>} The total amount as a number. Returns 0 if the total text is empty or invalid.
   */
  async getTotal(): Promise<number> {
    const text = await this.totalAmount.textContent();
    return parseFloat(text?.replace("$", "").trim() || "0");
  }
}
