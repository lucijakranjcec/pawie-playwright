import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 3000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  use: {
    actionTimeout: 10000,
    baseURL: 'https://pawie.vercel.app/',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'off',
    video: 'off',
  },

  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
      }
    },
    {
      name: 'Edge',
      use: {
        channel: 'msedge',
        ...devices['Desktop Edge'], // ako postoji
      },
    },
    {
      name: 'Electron',
      use: {
        channel: 'electron',
      },
    }
  ],

  outputDir: 'test-results/',
};

export default config;
