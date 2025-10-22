import { defineConfig, devices, ReporterDescription } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- Ensure artifacts folder and subfolders exist ---
const artifactsDir = path.resolve(__dirname, '.artifacts');
const folders = ['allure-results', 'videos', 'test-results', 'downloadFile'];

// Create artifacts folder if missing
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir, { recursive: true });

// Move existing folders into artifacts and ensure they exist
folders.forEach((folder) => {
  const src = path.resolve(__dirname, folder); // current project root
  const dest = path.join(artifactsDir, folder);

  // Move folder if it exists in root
  if (fs.existsSync(src)) {
    // Remove destination if already exists
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    fs.renameSync(src, dest);
  }

  // Ensure the folder exists in artifactsDir
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
});

// --- Reporter configuration ---
const reporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
  [
    'allure-playwright',
    {
      outputFolder: path.join(artifactsDir, 'allure-results'),
      detail: false,
      suiteTitle: false,
      useCucumberStepReporter: false,
      useStepsForHooks: false,
      screenshots: 'on',
      videos: 'on',
    },
  ],
];

export default defineConfig({
  testDir: './testAssets/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: reporters,

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
    contextOptions: {
      recordVideo: { dir: path.join(artifactsDir, 'videos'), size: { width: 1280, height: 720 } },
    },
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    acceptDownloads: true,
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Playwright artifacts (screenshots, traces)
  outputDir: path.join(artifactsDir, 'test-results'),
});
