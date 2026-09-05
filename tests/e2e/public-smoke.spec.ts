import { expect, test } from '@playwright/test';

test('public homepage provides the primary requirement path', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Kora Business Solutions/i);
  await expect(page.getByRole('link', { name: /Start a requirement/i }).first()).toHaveAttribute('href', '/request');
  await expect(page.getByRole('link', { name: /What we do/i }).first()).toHaveAttribute('href', '/what-we-do');
});

test('request form exposes the approved minimum contact fields', async ({ page }) => {
  await page.goto('/request?type=teaming');
  await expect(page.getByRole('heading', { name: /Start a requirement/i })).toBeVisible();
  await expect(page.getByLabel(/Contact name/i)).toBeVisible();
  await expect(page.getByLabel(/Email/i)).toBeVisible();
  await expect(page.getByLabel(/capability|partnership summary/i)).toBeVisible();
});
