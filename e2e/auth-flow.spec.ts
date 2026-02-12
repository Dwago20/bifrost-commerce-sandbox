
import { test, expect } from '@playwright/test';

test.describe('Referral System Flow', () => {
    let sponsorEmail: string;
    let downlineEmail: string;
    let referralCode: string;

    test('Full Referral Cycle', async ({ page, browser }) => {
        sponsorEmail = `sponsor_${Date.now()}@test.com`;
        downlineEmail = `downline_${Date.now()}@test.com`;

        // 1. Register Sponsor
        await page.goto('/signup');
        await page.fill('input[name="name"]', 'Sponsor User');
        await page.fill('input[name="email"]', sponsorEmail);
        await page.fill('input[name="password"]', 'password');
        await page.selectOption('select[name="market"]', 'MY');
        await page.click('button[type="submit"]');

        // Wait for redirect to login
        await expect(page).toHaveURL(/\/login/);

        // 2. Login as Sponsor
        await page.fill('input[name="email"]', sponsorEmail);
        await page.fill('input[name="password"]', 'password');
        await page.click('button[type="submit"]');

        // Wait for redirect to dashboard
        await expect(page).toHaveURL(/\/dashboard/);

        // 3. Get Referral Code
        await page.goto('/dashboard/team');
        const codeElement = page.locator('.cursor-copy');
        referralCode = await codeElement.innerText();
        console.log('Referral Code:', referralCode);
        expect(referralCode).toBeTruthy();

        // 4. Logout
        // Click logout button in nav
        await page.click('button:has-text("Logout")');
        await expect(page).toHaveURL(/\/login/);

        // 5. Register Downline with Code
        await page.goto('/signup');
        await page.fill('input[name="name"]', 'Downline User');
        await page.fill('input[name="email"]', downlineEmail);
        await page.fill('input[name="password"]', 'password');
        await page.selectOption('select[name="market"]', 'MY');
        await page.fill('input[name="referralCode"]', referralCode);
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/\/login/);

        // 6. Login as Downline
        await page.fill('input[name="email"]', downlineEmail);
        await page.fill('input[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/dashboard/);

        // 7. Verify Sponsor in Downline's Team Page
        await page.goto('/dashboard/team');
        await expect(page.locator('text=My Sponsor')).toBeVisible();
        await expect(page.locator(`text=${sponsorEmail}`)).toBeVisible();

        // 8. Logout Downline
        await page.click('button:has-text("Logout")');

        // 9. Login as Sponsor to verify Downline list
        await page.fill('input[name="email"]', sponsorEmail);
        await page.fill('input[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await page.goto('/dashboard/team');

        await expect(page.locator('text=Direct Downlines')).toBeVisible();
        await expect(page.locator(`text=${downlineEmail}`)).toBeVisible();
    });
});
