import { expect, test } from '@playwright/test';

test.describe('TeNow home (web)', () => {
  test('shows branded welcome screen', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('home-screen')).toBeVisible();
    await expect(page.getByTestId('home-welcome-title')).toHaveText(
      'Welcome to TeNow',
    );
    await expect(page.getByText('Class TA')).toBeVisible();
    await expect(page.getByText('Teacher Assistant')).toBeVisible();
  });
});
