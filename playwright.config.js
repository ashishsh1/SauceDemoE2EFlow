const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    // Directory where Playwright looks for test files.
    testDir: './tests',

    // Run tests sequentially for now.
    // We can enable parallel execution later if required.
    fullyParallel: false,

    // Prevent accidental test.only from being committed.
    forbidOnly: !!process.env.CI,

    // Retry failed tests in CI.
    retries: process.env.CI ? 2 : 0,

    // Number of workers used for test execution.
    workers: process.env.CI ? 1 : undefined,

    // Generate Playwright HTML report.
    reporter: [
        ['list'],
        ['html', {
            open: 'never'
        }]],

    use: {
        // Central application URL.
        baseURL: 'https://www.saucedemo.com',

        // Capture screenshot only when a test fails.
        /*screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure', */

        // Browser action timeout.
        actionTimeout: 10000,

        // Navigation timeout.
        navigationTimeout: 30000,

        // Run browser in headless mode by default.
        headless: true,
        launchOptions: {
            slowMo: 1000
        }
    },

    // Browser configuration.
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
