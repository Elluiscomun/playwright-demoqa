import { Page, Locator, expect } from '@playwright/test';

export class PracticeFormPage {
    readonly url: string = '/automation-practice-form';

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly genderOther: Locator;
    readonly mobile: Locator;
    readonly dateOfBirthInput: Locator;
    readonly subjectsInput: Locator;
    readonly sportRadioButton: Locator;
    readonly readingRadioButton: Locator;
    readonly musicRadioButton: Locator;
    readonly uploadPictureInput: Locator;
    readonly currentAddressInput: Locator;
    readonly stadeInput: Locator;
    readonly cityInput: Locator;
    readonly submitButton: Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.genderMale = page.locator('label[for="gender-radio-1"]');
        this.genderFemale = page.locator('#gender-radio-2');
        this.genderOther = page.locator('#gender-radio-3');
        this.mobile = page.locator('#userNumber');
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsInput');
        this.sportRadioButton = page.locator('#hobbies-checkbox-1');
        this.readingRadioButton = page.locator('#hobbies-checkbox-2');
        this.musicRadioButton = page.locator('#hobbies-checkbox-3');
        this.uploadPictureInput = page.locator('#uploadPicture');
        this.currentAddressInput = page.locator('#currentAddress');
        this.stadeInput = page.locator('#react-select-3-input');
        this.cityInput = page.locator('#react-select-4-input');
        this.submitButton = page.locator('#submit');
    }

    async open(): Promise<void> {
        await this.page.goto('https://demoqa.com/automation-practice-form');
        await expect(this.firstNameInput).toBeVisible({ timeout: 5000 });
    }

    async fillBasicInfo(): Promise<void> {
        await this.firstNameInput.fill('Luis');
        await this.lastNameInput.fill('Doe');
        await this.emailInput.fill('luis.doe@example.com');
        await this.mobile.fill('3242333333');
        await this.genderMale.check();
        await this.dateOfBirthInput.click();
        await this.page.locator('.react-datepicker__month-select').selectOption('0');
        await this.page.locator('.react-datepicker__year-select').selectOption('1990');
        await this.page.locator('.react-datepicker__day--015').click();
    }

    async submit(): Promise<void> {
        await this.submitButton.scrollIntoViewIfNeeded();
        await this.submitButton.click();
    }

}