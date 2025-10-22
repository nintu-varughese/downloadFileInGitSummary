import { test, expect } from "../pages/customFixture";

test.describe("Automation Demo Site - Web Component Functional Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await test.step("Navigate to the Automation Demo secondary application", async () => {
      await basePage.navigateToSecondaryApp();
    });
  });

  test.describe("Alert Functionality Tests", () => {
    test("TC01: Simple Alert - Verify that a simple alert can be accepted", async ({
      demoAlertPage,
    }) => {
      await test.step("Click the OK button on a simple alert and handle the dialog", async () => {
        const handled = await demoAlertPage.handleAlertFlow();
        await expect(
          handled,
          "Simple alert was not handled successfully"
        ).toBeTruthy();
      });
    });

    test("TC02: Confirm Alert - Verify that clicking OK confirms the alert", async ({
      demoAlertPage,
    }) => {
      await test.step("Click the OK button on a confirm alert and handle the dialog", async () => {
        const handled = await demoAlertPage.handleConfirmAlertOk();
        await expect(
          handled,
          "Confirm alert OK was not handled successfully"
        ).toBeTruthy();
      });
    });

    test("TC03: Confirm Alert - Verify that clicking Cancel dismisses the alert", async ({
      demoAlertPage,
    }) => {
      await test.step("Click the Cancel button on a confirm alert and handle the dialog", async () => {
        const handled = await demoAlertPage.handleConfirmAlertCancel();
        await expect(
          handled,
          "Confirm alert Cancel was not handled successfully"
        ).toBeTruthy();
      });
    });

    test("TC04: Prompt Alert - Verify that entering text and clicking OK displays the correct message", async ({
      demoAlertPage,
    }) => {
      await test.step("Enter text into the prompt alert and accept it", async () => {
        const inputText = "Hello!";
        const isVisible = await demoAlertPage.handlePromptAlertOk(inputText);
        await expect(
          isVisible,
          `Prompt alert with text "${inputText}" was not displayed correctly`
        ).toBeTruthy();
      });
    });

    test("TC05: Prompt Alert - Verify that clicking Cancel does not display the prompt message", async ({
      demoAlertPage,
    }) => {
      await test.step("Dismiss the prompt alert without entering any text", async () => {
        const isNotVisible = await demoAlertPage.handlePromptAlertCancel();
        await expect(
          isNotVisible,
          "Prompt alert message was displayed after cancel"
        ).toBeTruthy();
      });
    });
  });
  test.describe("File Upload and Download Tests", () => {
    test("TC06: File Upload - Verify that a file can be uploaded successfully", async ({
      fileUploadPage,
    }) => {
      await test.step("Navigate to the File Upload section and upload the test file", async () => {
        const uploadLocator = await fileUploadPage.uploadFile();
        await expect(
          await uploadLocator.isVisible(),
          "Uploaded file is not visible"
        ).toBeTruthy();
      });
    });

    test("TC07: File Download - Verify that a text file can be generated, downloaded, and its content verified", async ({
      fileDownloadPage,
    }) => {
      await test.step("Navigate to the File Download section, enter text, and generate a text file", async () => {
        await fileDownloadPage.navigateToFileDownload();
        const sampleData = "Automation Test Data";
        await fileDownloadPage.enterText(sampleData);
        await fileDownloadPage.clickCreateButton();
      });

      await test.step("Download the generated file and verify the file exists, has correct extension, and contains the expected text", async () => {
        const filePath = await fileDownloadPage.downloadFile();
        expect(
          fileDownloadPage.fileExists(filePath),
          "Downloaded file does not exist"
        ).toBeTruthy();
        expect(
          filePath.endsWith(".txt"),
          "Downloaded file does not have .txt extension"
        ).toBeTruthy();
        expect(
          fileDownloadPage.readFile(filePath).trim(),
          "Downloaded file content mismatch"
        ).toBe("Automation Test Data");
      });
    });
  });
  test.describe("Drag and Drop Functionality Tests", () => {
    test("TC08: Static Drag and Drop - Verify that all static images can be dragged and dropped correctly", async ({
      dragDropPage,
    }) => {
      await test.step("Navigate to the Static Drag and Drop section and drag all images to the drop area", async () => {
        await dragDropPage.dragAndDropStaticImages();
      });

      await test.step("Verify that all static images are visible in the drop area after drag and drop", async () => {
        for (const img of dragDropPage.droppedStaticImages) {
          await expect(
            await img.isVisible(),
            `Static image ${img} is not visible in the drop area`
          ).toBeTruthy();
        }
      });
    });
    test("TC09: Dynamic Drag and Drop - Verify that all dynamic images can be dragged and dropped correctly", async ({
      dragDropPage,
    }) => {
      await test.step("Navigate to the Dynamic Drag and Drop section and drag all images to the drop area", async () => {
        await dragDropPage.dragAndDropDynamicImages();
      });

      await test.step("Verify that all dynamic images are visible in the drop area after drag and drop", async () => {
        for (const img of dragDropPage.dynamicDroppedImages) {
          await expect(
            await img.isVisible(),
            `Dynamic image ${img} is not visible in the drop area`
          ).toBeTruthy();
        }
      });
    });
  });
});
