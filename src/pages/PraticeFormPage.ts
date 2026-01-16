import { Page, Locator, expect } from '@playwright/test';
import { ROUTES, MOCKS } from '../constants/constants';
import { Student } from '../model/student.model';
import { Hobby } from '../model/hobby.enum';

export class PracticeFormPage {
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
        this.sportRadioButton = page.locator('label[for="hobbies-checkbox-1"]');
        this.readingRadioButton = page.locator('label[for="hobbies-checkbox-2"]');
        this.musicRadioButton = page.locator('label[for="hobbies-checkbox-3"]');
        this.uploadPictureInput = page.locator('#uploadPicture');
        this.currentAddressInput = page.locator('#currentAddress');
        this.stadeInput = page.locator('#react-select-3-input');
        this.cityInput = page.locator('#react-select-4-input');
        this.submitButton = page.locator('#submit');
    }

    async open(): Promise<void> {
        await this.page.goto(ROUTES.PRACTICE_FORM);
        await expect(this.firstNameInput).toBeVisible({ timeout: 5000 });
    }

    async selectDate(day: string, month: string, year: string): Promise<void> {
        await this.dateOfBirthInput.click();
        await this.page.locator('.react-datepicker__month-select').selectOption(month);
        await this.page.locator('.react-datepicker__year-select').selectOption(year);
        await this.page.locator(`.react-datepicker__day--0${day}`).click();
    }
    
    async cleanDate(): Promise<void> {
        await this.dateOfBirthInput.fill('');
    }

    async fillStudentInfo(student: Student, subjects: string[], stade: string, city: string): Promise<void> {
        await this.firstNameInput.fill(student.firstName);
        await this.lastNameInput.fill(student.lastName);
        await this.emailInput.fill(student.email);
        await this.mobile.fill(student.phone);

        for (const subject of subjects) {
            await this.subjectsInput.fill(subject);
            await this.subjectsInput.press('Enter');
        }

        await this.stadeInput.fill(stade);
        await this.stadeInput.press('Enter');

        await this.cityInput.fill(city);
        await this.cityInput.press('Enter');

        await this.currentAddressInput.fill(student.address);
    }

    async selectHobbies(hobbies: Hobby[]): Promise<void> {
        for (const hobby of hobbies) {
            await this.page.check(`label[for="${hobby}"]`);
        }
    }

    async selectGender(value: string): Promise<void> {
        await this.page.check(`label[for="gender-radio-${value}"]`);
    }

    async selectImage(filePath: string): Promise<void> {
        await this.uploadPictureInput.setInputFiles(filePath);
    }

    async submit(): Promise<void> {
        await this.submitButton.scrollIntoViewIfNeeded();
        await this.submitButton.click();
    }

    async submitWithoutButton(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

}