import { expect, test } from '@playwright/test';

test.describe('TeNow auth (web)', () => {
  test('shows sign in screen first', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('sign-in-screen')).toBeVisible();
    await expect(page.getByText('Use your TeNow account to continue.')).toBeVisible();
    await expect(page.getByText('Create account')).toBeVisible();
  });
});
