import { test, expect } from '@playwright/test';

/**
 * Portal Authentication Tests
 *
 * These tests debug the team portal login functionality
 * Testing both Turkish and English versions
 */

const CORRECT_PASSWORD = process.env.PUBLIC_PORTAL_PASS || 'seksendoksaniki';
const WRONG_PASSWORD = 'wrongpassword123';

test.describe('Portal Authentication - Turkish', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/portal');
    await page.evaluate(() => localStorage.clear());
  });

  test('should load portal page correctly', async ({ page }) => {
    await page.goto('/portal');

    // Check if the auth form is visible
    await expect(page.locator('#portal-auth')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Takım Portalı');

    // Check if password input exists
    await expect(page.locator('#password')).toBeVisible();

    // Check if submit button exists
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error with wrong password', async ({ page }) => {
    await page.goto('/portal');

    // Fill in wrong password
    await page.fill('#password', WRONG_PASSWORD);

    // Submit form
    await page.click('button[type="submit"]');

    // Error message should be visible
    await expect(page.locator('#error-message')).toBeVisible();

    // Portal content should still be hidden
    await expect(page.locator('#portal-content')).not.toBeVisible();
  });

  test('should login successfully with correct password', async ({ page }) => {
    await page.goto('/portal');

    // Fill in correct password
    await page.fill('#password', CORRECT_PASSWORD);

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for authentication
    await page.waitForTimeout(1000);

    // Error message should not be visible
    await expect(page.locator('#error-message')).not.toBeVisible();

    // Portal content should be visible
    await expect(page.locator('#portal-content')).toBeVisible();

    // Auth form should be hidden
    await expect(page.locator('#portal-auth')).not.toBeVisible();
  });

  test('should persist authentication in localStorage', async ({ page }) => {
    await page.goto('/portal');

    // Login
    await page.fill('#password', CORRECT_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Check localStorage
    const authValue = await page.evaluate(() => localStorage.getItem('portal_auth'));
    expect(authValue).toBe('authenticated');
  });

  test('should stay authenticated on page reload', async ({ page }) => {
    await page.goto('/portal');

    // Login
    await page.fill('#password', CORRECT_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Reload page
    await page.reload();

    // Should still be authenticated
    await expect(page.locator('#portal-content')).toBeVisible();
    await expect(page.locator('#portal-auth')).not.toBeVisible();
  });

  test('should debug password comparison', async ({ page }) => {
    await page.goto('/portal');

    // Get the actual password from the page
    const serverPassword = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const authScript = scripts.find(s => s.textContent?.includes('CORRECT_PASSWORD'));
      if (authScript) {
        const match = authScript.textContent.match(/CORRECT_PASSWORD\s*=\s*["']([^"']+)["']/);
        return match ? match[1] : null;
      }
      return null;
    });

    console.log('Server password:', serverPassword);
    console.log('Test password:', CORRECT_PASSWORD);
    console.log('Passwords match:', serverPassword === CORRECT_PASSWORD);

    // Try to login and capture any errors
    await page.fill('#password', CORRECT_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Take screenshot for debugging
    await page.screenshot({ path: 'tests/screenshots/portal-auth-debug.png', fullPage: true });
  });
});

test.describe('Portal Authentication - English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/portal');
    await page.evaluate(() => localStorage.clear());
  });

  test('should load English portal page correctly', async ({ page }) => {
    await page.goto('/en/portal');

    await expect(page.locator('#portal-auth')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Team Portal');
    await expect(page.locator('#password')).toBeVisible();
  });

  test('should login successfully with correct password (EN)', async ({ page }) => {
    await page.goto('/en/portal');

    await page.fill('#password', CORRECT_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    await expect(page.locator('#portal-content')).toBeVisible();
    await expect(page.locator('#portal-auth')).not.toBeVisible();
  });
});

test.describe('Portal Authentication - Production', () => {
  test('should test production deployment', async ({ page }) => {
    // This test will be skipped if PRODUCTION_URL is not set
    const productionUrl = process.env.PRODUCTION_URL;

    if (!productionUrl) {
      test.skip();
      return;
    }

    await page.goto(`${productionUrl}/portal`);

    // Debug: Get the password from production
    const serverPassword = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const authScript = scripts.find(s => s.textContent?.includes('CORRECT_PASSWORD'));
      if (authScript) {
        const match = authScript.textContent.match(/CORRECT_PASSWORD\s*=\s*["']([^"']+)["']/);
        return match ? match[1] : null;
      }
      return null;
    });

    console.log('Production password:', serverPassword);
    console.log('Expected password:', CORRECT_PASSWORD);
    console.log('Passwords match:', serverPassword === CORRECT_PASSWORD);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/production-portal.png', fullPage: true });

    // Try logging in
    await page.fill('#password', CORRECT_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    // Check result
    const isLoggedIn = await page.locator('#portal-content').isVisible();
    console.log('Login successful:', isLoggedIn);

    if (!isLoggedIn) {
      const errorVisible = await page.locator('#error-message').isVisible();
      console.log('Error message visible:', errorVisible);

      // Take failure screenshot
      await page.screenshot({
        path: 'tests/screenshots/production-login-failed.png',
        fullPage: true,
      });
    }
  });
});
