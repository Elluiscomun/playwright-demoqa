import test, { expect } from "playwright/test";
import { PracticeFormPage } from "../pages/PraticeFormPage";
import { createStudent } from "../model/student.factory";
import { MOCKS } from "../constants/constants";
import { Hobby } from "../model/hobby.enum";
import { Gender } from "../model/gender.enum";

const TIMEOUT = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000;


test.describe('Submission', () => {
  test('Successful submission', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    await form.selectImage(process.env.IMAGE_PATH || 'src/assets/sample-picture.png');
    await form.selectGender(Gender.Female);
    await form.selectDate('15', '8', '1990');
    await form.selectHobbies([Hobby.Music, Hobby.Reading]);
    await form.submit();

    const modalTitle = page.locator('#example-modal-sizes-title-lg');

    await expect(modalTitle).toHaveText(
      'Thanks for submitting the form',
      { timeout: TIMEOUT }
    );
  });

  test('Submission without clicking submit button', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[1].name, MOCKS.STATES[1].cities[0]);
    await form.selectImage(process.env.IMAGE_PATH || 'src/assets/sample-picture.png');
    await form.selectGender(Gender.Other);
    await form.selectDate('15', '8', '1990');
    await form.selectHobbies([Hobby.Music, Hobby.Reading]);
    await form.submitWithoutButton();
    const modalTitle = page.locator('#example-modal-sizes-title-lg');

    await expect(modalTitle).toHaveText(
      'Thanks for submitting the form',
      { timeout: TIMEOUT }
    );
  });

  test('Should not submit without First Name', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.firstName = '';

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    await form.selectGender(Gender.Male);
    await form.submit();

    await expect(
      page.locator('#example-modal-sizes-title-lg')
    ).not.toBeVisible();
  });

  test('Should not submit without Last Name', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.lastName = '';

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    await form.selectGender(Gender.Female);
    await form.submit();

    await expect(
      page.locator('#example-modal-sizes-title-lg')
    ).not.toBeVisible();
  });

  test('Should not submit without Gender selected', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    // No gender selected
    await form.submit();

    await expect(
      page.locator('#example-modal-sizes-title-lg')
    ).not.toBeVisible();
  });

  test('Should not submit without Mobile Number', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.phone = '';

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    await form.selectGender(Gender.Other);
    await form.submit();

    await expect(
      page.locator('#example-modal-sizes-title-lg')
    ).not.toBeVisible();
  });

});

test.describe('Manage errors', () => {
  test('Successful submission when user delete date', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[2].name, MOCKS.STATES[2].cities[0]);
    await form.selectImage(process.env.IMAGE_PATH || 'src/assets/sample-picture.png');
    await form.selectGender(Gender.Female);
    await form.cleanDate();
    await form.selectDate('15', '8', '1990');
    await form.selectHobbies([Hobby.Music, Hobby.Reading]);
    await form.submit();

    const modalTitle = page.locator('#example-modal-sizes-title-lg');

    await expect(modalTitle).toHaveText(
      'Thanks for submitting the form',
      { timeout: TIMEOUT }
    );
  });


  test('Management submission when try to put cellphone number with more than 10 digits', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.phone = '1234567890123'; // Invalid phone number with more than 10 digits

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[2].name, MOCKS.STATES[2].cities[0]);
    const numberInput = page.locator('#userNumber');
    await form.selectImage(process.env.IMAGE_PATH || 'src/assets/sample-picture.png');
    await form.selectGender(Gender.Female);
    await form.selectDate('15', '8', '1990');
    await form.selectHobbies([Hobby.Music, Hobby.Reading]);
    await form.submit();

    const modalTitle = page.locator('#example-modal-sizes-title-lg');

    await expect(modalTitle).toHaveText(
      'Thanks for submitting the form',
      { timeout: TIMEOUT }
    );
    await expect(numberInput).toHaveValue(
      '1234567890',
      { timeout: TIMEOUT }
    );
    await expect(numberInput).not.toHaveValue(
      '1234567890123',
      { timeout: TIMEOUT }
    );
  });

  test('Don\'t accept invalid extension of images', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();

    await form.open();
    await form.fillStudentInfo(student, MOCKS.SUBJECTS, MOCKS.STATES[0].name, MOCKS.STATES[0].cities[0]);
    await form.selectImage(process.env.EMAIL_FILE_PATH || 'src/assets/sample-picture.msg');
    await form.selectGender(Gender.Female);
    await form.selectDate('15', '8', '1990');
    await form.selectHobbies([Hobby.Music, Hobby.Reading]);
    await form.submit();
    const uploadPictureInput = page.locator('#uploadPicture');

    await expect(uploadPictureInput).not.toHaveValue(
      "C:\\fakepath\\sample-picture.msg",
      { timeout: TIMEOUT }
    )
  });

  test('Names with 1 character not should be accepted', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.firstName = 'A';
    student.lastName = 'B';

    await form.open();
    await form.fillStudentInfo(
      student,
      MOCKS.SUBJECTS,
      MOCKS.STATES[0].name,
      MOCKS.STATES[0].cities[0]
    );
    await form.selectGender(Gender.Male);
    await form.submit();

    await expect(
      page.locator('#example-modal-sizes-title-lg')
    ).not.toBeVisible();
  });

  test('Extremely long First Name should not break submission and is managemend', async ({ page }) => {
    const form = new PracticeFormPage(page);
    const student = createStudent();
    student.firstName = 'A'.repeat(256);

    await form.open();
    await form.fillStudentInfo(
      student,
      MOCKS.SUBJECTS,
      MOCKS.STATES[0].name,
      MOCKS.STATES[0].cities[0]
    );
    await form.selectGender(Gender.Female);
    await form.submit();

    const firstNameValue = await page.locator('#firstName').inputValue();
    
    await expect(
      page.getByText('Thanks for submitting the form')
    ).toBeVisible();
    expect(firstNameValue.length).toBeLessThan(255);
  });


});