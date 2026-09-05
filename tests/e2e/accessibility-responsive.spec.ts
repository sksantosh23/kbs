import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const publicRoutes = ['/', '/what-we-do', '/government', '/partners/suppliers', '/request?type=teaming'];

test.describe('public accessibility and responsive release checks', () => {
  for (const route of publicRoutes) {
    test(`axe has no WCAG violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }

  test('public routes load first-party scripts without browser errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', error => errors.push(error.message));
    for (const route of publicRoutes) await page.goto(route);
    expect(errors).toEqual([]);
  });

  for (const viewport of [{ name: 'mobile', width: 375, height: 812 }, { name: 'tablet', width: 768, height: 1024 }, { name: 'desktop', width: 1440, height: 900 }]) {
    test(`${viewport.name} layout reflows without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/request?type=teaming');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    });
  }

  test('keyboard navigation reaches the skip link and reduced motion is honored', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('href', '#main');
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  });

  test('200% zoom remains within the viewport and security headers are present', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.headers()['x-content-type-options']).toBe('nosniff');
    expect(response?.headers()['x-frame-options']).toBe('DENY');
    await page.evaluate(() => { document.body.style.zoom = '2'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth * 2 + 2)).toBe(true);
  });

  test('public navigation stays within the local performance budget', async ({ page }) => {
    await page.goto('/');
    const timing = await page.evaluate(() => {
      const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return { responseEnd: entry.responseEnd, domContentLoaded: entry.domContentLoadedEventEnd, transfer: entry.transferSize };
    });
    expect(timing.responseEnd).toBeLessThan(2500);
    expect(timing.domContentLoaded).toBeLessThan(2500);
    expect(timing.transfer).toBeLessThan(1_500_000);
  });
});
