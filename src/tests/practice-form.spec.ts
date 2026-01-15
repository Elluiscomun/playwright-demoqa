import test, { expect } from "playwright/test";
import { PracticeFormPage } from "../pages/PraticeFormPage";

test.describe('Student Registration Form', () => {
  test('Happy path – successful submission', async ({ page }) => {
    const form = new PracticeFormPage(page);

    await form.open();
    await form.fillBasicInfo();
    await form.submit();

    const modalTitle = page.locator('#example-modal-sizes-title-lg');

    await expect(modalTitle).toHaveText(
      'Thanks for submitting the form',
      { timeout: 5000 }
    );
  });
});