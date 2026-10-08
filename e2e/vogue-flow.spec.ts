import { test, expect } from '@playwright/test';

test.describe('VOGUE – SOA Fashion Club E2E Test Suite', () => {
  const BASE_URL = 'http://localhost:5000';

  test('Public User Flow: Landing Page -> Explore Themes -> Submit Audition', async ({ page }) => {
    // 1. Visit Home
    await page.goto(BASE_URL);

    // Verify Brand Title & Tagline
    await expect(page.locator('h1')).toContainText('VOGUE');
    await expect(page.getByText('More Than Fashion. A Movement.')).toBeVisible();

    // Verify Persistent Footer Credit
    await expect(page.getByText('Website crafted by GDGoC ITER')).toBeVisible();

    // 2. Click "Join the Movement" CTA
    const joinBtn = page.getByRole('link', { name: /Join the Movement/i }).first();
    await joinBtn.click();

    // Should navigate to #join or /apply
    await expect(page.getByText(/Join the Movement/i)).toBeVisible();

    // 3. Fill Audition Registration
    const regNum = `2341${Math.floor(100000 + Math.random() * 900000)}`;
    await page.fill('input[name="fullName"]', 'Aditi Sharma');
    await page.fill('input[name="regNumber"]', regNum);
    await page.fill('input[name="email"]', `aditi_${Date.now()}@soa.ac.in`);
    await page.fill('input[name="phone"]', '9876543210');
    await page.fill('input[name="branchYear"]', 'CSE - 2nd Year, ITER');

    // Submit Application
    await page.getByRole('button', { name: /Submit Audition Registration/i }).click();

    // Verify Confirmation
    await expect(page.getByText(/Application Received!/i)).toBeVisible({ timeout: 5000 });
  });

  test('Admin Flow: Login -> Review Applications -> Add Victory -> Delete', async ({ page }) => {
    // 1. Visit Admin Login
    await page.goto(`${BASE_URL}/admin/login`);

    // Verify Admin Heading
    await expect(page.getByText(/Admin Portal/i)).toBeVisible();

    // 2. Click demo autofill
    await page.getByText(/Autofill Default Admin Credentials/i).click();
    await page.getByRole('button', { name: /Sign In to Executive Console/i }).click();

    // 3. Verify Admin Dashboard
    await expect(page.getByText(/Control Center/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Audition Applications/i)).toBeVisible();

    // 4. Navigate to Achievements
    await page.getByRole('link', { name: /Achievements/i }).click();
    await expect(page.getByText(/Manage Achievements/i)).toBeVisible();

    // 5. Open Modal & Add Victory
    await page.getByRole('button', { name: /Add New Victory/i }).click();
    await page.fill('input[placeholder*="Spectra"]', 'National Couture Cup 2026');
    await page.fill('input[placeholder*="Champion"]', '1st Place Winner');
    await page.fill('input[placeholder*="Birla Global"]', 'IIT Kharagpur Spring Fest');
    await page.getByRole('button', { name: /Save Record/i }).click();

    // Verify added to table
    await expect(page.getByText('National Couture Cup 2026')).toBeVisible({ timeout: 5000 });
  });
});
