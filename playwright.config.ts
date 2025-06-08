import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000, // lowered max test time to 30s
  expect: {
    timeout: 3000, // lower expect timeout to 3s
  },
  fullyParallel: true, // run tests in parallel as you had
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, // retry only once on CI to save time
  workers: process.env.CI ? 2 : undefined, // use all CPUs locally, but limit on CI to 2

  reporter: 'list', // simple reporter is faster than html

  use: {
    actionTimeout: 10000, // 10 seconds max per action, avoids hangs
    baseURL: 'https://pawie.vercel.app/',

    headless: true,
    viewport: { width: 1280, height: 720 }, // smaller viewport to speed rendering

    trace: 'off', // disable tracing for speed
    video: 'off', // disable video recording for speed

    // remove permissions if not needed
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ],

  outputDir: 'test-results/', // keep artifacts if needed
};

export default config;
