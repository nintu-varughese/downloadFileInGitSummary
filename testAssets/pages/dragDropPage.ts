import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

/**
 * Page Object for handling Drag and Drop interactions
 * Supports both Static and Dynamic tabs in the Demo site
 */
export default class DragDropPage extends BasePage {
  readonly interactionsLink: Locator;
  readonly dragDropLink: Locator;
  readonly staticTab: Locator;
  readonly dynamicTab: Locator;
  readonly dropArea: Locator;
  readonly staticAngularImg: Locator;
  readonly staticMongoImg: Locator;
  readonly staticNodeImg: Locator;
  readonly staticImages: Locator[];
  readonly droppedStaticAngularImg: Locator;
  readonly droppedStaticMongoImg: Locator;
  readonly droppedStaticNodeImg: Locator;
  readonly droppedStaticImages: Locator[];
  readonly dynamicOriginalAngularImg: Locator;
  readonly dynamicOriginalMongoImg: Locator;
  readonly dynamicOriginalNodeImg: Locator;
  readonly dynamicOriginalImages: Locator[];
  readonly dynamicDroppedAngularImg: Locator;
  readonly dynamicDroppedMongoImg: Locator;
  readonly dynamicDroppedNodeImg: Locator;
  readonly dynamicDroppedImages: Locator[];

  /**
   * Initializes all locators required for drag-and-drop tests
   * @param {Page} page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);

    this.interactionsLink = page.locator('//a[text()="Interactions "]');
    this.dragDropLink = page.locator('//a[text()="Drag and Drop "]');
    this.staticTab = page.locator('//a[text()="Static "]');
    this.dynamicTab = page.locator('//a[text()="Dynamic "]');
    this.dropArea = page.locator('//div[@id="droparea"]');
    this.staticAngularImg = page.locator(
      '//div[@id="dragarea"]//img[@id="angular"]'
    );
    this.staticMongoImg = page.locator(
      '//div[@id="dragarea"]//img[@id="mongo"]'
    );
    this.staticNodeImg = page.locator('//div[@id="dragarea"]//img[@id="node"]');
    this.staticImages = [
      this.staticAngularImg,
      this.staticMongoImg,
      this.staticNodeImg,
    ];
    this.droppedStaticAngularImg = page.locator(
      '//div[@id="droparea"]//img[@id="angular"]'
    );
    this.droppedStaticMongoImg = page.locator(
      '//div[@id="droparea"]//img[@id="mongo"]'
    );
    this.droppedStaticNodeImg = page.locator(
      '//div[@id="droparea"]//img[@id="node"]'
    );
    this.droppedStaticImages = [
      this.droppedStaticAngularImg,
      this.droppedStaticMongoImg,
      this.droppedStaticNodeImg,
    ];
    this.dynamicOriginalAngularImg = page.locator(
      '//div[@id="dragarea"]//img[@id="angular"]'
    );
    this.dynamicOriginalMongoImg = page.locator(
      '//div[@id="dragarea"]//img[@id="mongo"]'
    );
    this.dynamicOriginalNodeImg = page.locator(
      '//div[@id="dragarea"]//img[@id="node"]'
    );
    this.dynamicOriginalImages = [
      this.dynamicOriginalAngularImg,
      this.dynamicOriginalMongoImg,
      this.dynamicOriginalNodeImg,
    ];
    this.dynamicDroppedAngularImg = page.locator(
      '//div[@id="droparea"]//img[@id="angular"]'
    );
    this.dynamicDroppedMongoImg = page.locator(
      '//div[@id="droparea"]//img[@id="mongo"]'
    );
    this.dynamicDroppedNodeImg = page.locator(
      '//div[@id="droparea"]//img[@id="node"]'
    );
    this.dynamicDroppedImages = [
      this.dynamicDroppedAngularImg,
      this.dynamicDroppedMongoImg,
      this.dynamicDroppedNodeImg,
    ];
  }

  /**
   * Drag all images from the source area to the drop area in the Static tab
   *
   * @async
   * @returns {Promise<void>}
   */
  async dragAndDropStaticImages(): Promise<void> {
    await this.interactionsLink.click();
    await this.dragDropLink.click();
    await this.staticTab.click();
    await this.dropArea.waitFor({ state: "visible" });

    for (const img of this.staticImages) {
      await img.waitFor({ state: "visible" });
      await img.dragTo(this.dropArea);
    }
  }

  /**
   * Drag all images from the source area to the drop area in the Dynamic tab
   *
   * @async
   * @returns {Promise<void>}
   */
  async dragAndDropDynamicImages(): Promise<void> {
    await this.interactionsLink.click();
    await this.dragDropLink.click();
    await this.dynamicTab.click();
    await this.dropArea.waitFor({ state: "visible" });

    for (const img of this.dynamicOriginalImages) {
      await img.waitFor({ state: "visible" });
      await img.dragTo(this.dropArea);
    }
  }
}
