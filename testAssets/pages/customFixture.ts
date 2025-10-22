import { test as base, Page, expect as baseExpect } from "@playwright/test";
import fs from "fs";
import path from "path";

// QA Playground pages
import HomePage from "./homePage";
import MiniWebApps from "./miniWebAppsPage";
import VerifyAccountPage from "./verifyAccountPage";
import TagsInputBoxPage from "./tagsInputBoxPage";
import MultiLevelDropdownPage from "./multiLevelDropdownPage";
import NewTabPage from "./newTabPage";
import PopUpWindowPage from "./popUpWindowPage";
import NestedIframePage from "./nestedIframePage";
import StarsRatingPage from "./starsRatingWidgetPage";
import CoveredElementsPage from "./coveredElementsPage";
import QaUploadFilePage from "./qaUploadFilePage";
import QaDownloadFilePage from "./qaDownloadFilePage";
import ModalPopUpPage from "./modalPopUpPage";
import BudgetTrackerPage from "./budgetTrackerPage";
import MouseHoverPage from "./mouseHoverPage";
import NavigationMenuPage from "./navigationMenuPage";
import ContextMenuPage from "./contextMenuPage";
import ShadowDomPage from "./shadowDomPage";
import RatingRangeSliderPage from "./ratingRangeSliderPage";
import { SortableListPage } from "./sotableListPage";
import RedirectChainPage from "./redirectChainPage";
import RightClickMenuPage from "./rightClickMenuPage";
import FetchingDataPage from "./fetchingDataPage";
import ChangeableIframePage from "./changeableIframePage";

// Demo pages
import BasePage from "./basePage";
import DemoAlertPage from "./demoAlertPage";
import DragDropPage from "./dragDropPage";
import FileUploadPage from "./fileUploadPage";
import { FileDownloadPage } from "./fileDownloadPage";

type MyFixtures = {
  // QA Playground
  homePage: HomePage;
  miniWebApps: MiniWebApps;
  verifyAccountPage: VerifyAccountPage;
  tagsInputBoxPage: TagsInputBoxPage;
  dropdownPage: MultiLevelDropdownPage;
  newTabPage: NewTabPage;
  popUpWindowPage: PopUpWindowPage;
  nestedIframePage: NestedIframePage;
  starsRatingPage: StarsRatingPage;
  coveredElementsPage: CoveredElementsPage;
  qaUploadFilePage: QaUploadFilePage;
  downloadPage: QaDownloadFilePage;
  modalPopUpPage: ModalPopUpPage;
  budgetTrackerPage: BudgetTrackerPage;
  mouseHoverPage: MouseHoverPage;
  navigationMenuPage: NavigationMenuPage;
  contextMenuPage: ContextMenuPage;
  shadowDomPage: ShadowDomPage;
  ratingSliderPage: RatingRangeSliderPage;
  sortableListPage: SortableListPage;
  redirectPage: RedirectChainPage;
  rightClickPage: RightClickMenuPage;
  fetchingDataPage: FetchingDataPage;
  changeableIframePage: ChangeableIframePage;

  // Demo / generic
  basePage: BasePage;
  demoAlertPage: DemoAlertPage;
  dragDropPage: DragDropPage;
  fileUploadPage: FileUploadPage;
  fileDownloadPage: FileDownloadPage;

  // Node.js utilities
  fs: typeof fs;
  path: typeof path;
};

// Extend Playwright test with all page objects + fs & path
export const test = base.extend<MyFixtures>({
  // QA Playground pages
  homePage: async ({ page }, use) => use(new HomePage(page)),
  miniWebApps: async ({ page }, use) => use(new MiniWebApps(page)),
  verifyAccountPage: async ({ page }, use) => use(new VerifyAccountPage(page)),
  tagsInputBoxPage: async ({ page }, use) => use(new TagsInputBoxPage(page)),
  dropdownPage: async ({ page }, use) => use(new MultiLevelDropdownPage(page)),
  newTabPage: async ({ page }, use) => use(new NewTabPage(page)),
  popUpWindowPage: async ({ page }, use) => use(new PopUpWindowPage(page)),
  nestedIframePage: async ({ page }, use) => use(new NestedIframePage(page)),
  starsRatingPage: async ({ page }, use) => use(new StarsRatingPage(page)),
  coveredElementsPage: async ({ page }, use) => use(new CoveredElementsPage(page)),
  qaUploadFilePage: async ({ page }, use) => use(new QaUploadFilePage(page)),
  downloadPage: async ({ page }, use) => use(new QaDownloadFilePage(page)),
  modalPopUpPage: async ({ page }, use) => use(new ModalPopUpPage(page)),
  budgetTrackerPage: async ({ page }, use) => use(new BudgetTrackerPage(page)),
  mouseHoverPage: async ({ page }, use) => use(new MouseHoverPage(page)),
  navigationMenuPage: async ({ page }, use) => use(new NavigationMenuPage(page)),
  contextMenuPage: async ({ page }, use) => use(new ContextMenuPage(page)),
  shadowDomPage: async ({ page }, use) => use(new ShadowDomPage(page)),
  ratingSliderPage: async ({ page }, use) => use(new RatingRangeSliderPage(page)),
  sortableListPage: async ({ page }, use) => use(new SortableListPage(page)),
  redirectPage: async ({ page }, use) => use(new RedirectChainPage(page)),
  rightClickPage: async ({ page }, use) => use(new RightClickMenuPage(page)),
  fetchingDataPage: async ({ page }, use) => use(new FetchingDataPage(page)),
  changeableIframePage: async ({ page }, use) => use(new ChangeableIframePage(page)),

  // Demo / generic pages
  basePage: async ({ page }, use) => use(new BasePage(page)),
  demoAlertPage: async ({ page }, use) => use(new DemoAlertPage(page)),
  dragDropPage: async ({ page }, use) => use(new DragDropPage(page)),
  fileUploadPage: async ({ page }, use) => use(new FileUploadPage(page)),
  fileDownloadPage: async ({ page }, use) => use(new FileDownloadPage(page)),

  // Node.js utilities
  fs: async ({}, use) => use(fs),
  path: async ({}, use) => use(path),
});

// Export expect
export const expect = baseExpect;
