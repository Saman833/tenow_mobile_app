import { expect, test } from '@playwright/test';

test.describe('TeNow home (web)', () => {
  test('shows core dashboard view', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('home-screen')).toBeVisible();
    await expect(page.getByTestId('home-welcome-title')).toHaveText(
      'Welcome back',
    );
    await expect(page.getByText('Join a class')).toBeVisible();
    await expect(page.getByText('Create a class')).toBeVisible();
  });
});
