import { test } from "@playwright/test";
import { Gender } from "../model/gender.enum";
import { Hobby } from "../model/hobby.enum";
import { PracticeFormPage } from "../pages/PraticeFormPage";
import { createStudent } from "../model/student.factory";
import { MOCKS } from "../constants/constants";
import { expect } from "@playwright/test";

const combinations = [
    { gender: Gender.Male, hobbies: [Hobby.Music], state: 0, submit: 'click' },
    { gender: Gender.Female, hobbies: [Hobby.Reading], state: 1, submit: 'enter' },
    { gender: Gender.Other, hobbies: [Hobby.Music, Hobby.Reading], state: 0, submit: 'click' },

    // Multi-hobby combinations
    { gender: Gender.Male, hobbies: [Hobby.Music, Hobby.Reading], state: 1, submit: 'enter' },
    { gender: Gender.Female, hobbies: [Hobby.Sports, Hobby.Music], state: 0, submit: 'click' },
    { gender: Gender.Other, hobbies: [Hobby.Reading, Hobby.Sports], state: 2, submit: 'enter' },

    // All hobbies (boundary / max selection)
    { gender: Gender.Male, hobbies: [Hobby.Music, Hobby.Reading, Hobby.Sports], state: 0, submit: 'click' },

    // Submit-method emphasis
    { gender: Gender.Female, hobbies: [Hobby.Music], state: 2, submit: 'enter' },
    { gender: Gender.Other, hobbies: [Hobby.Reading], state: 1, submit: 'click' },
];

test.describe('Combination of submission', () => {

    let count = 0;
    for (const combo of combinations) {
        test(`Submission ${count} gender=${combo.gender} submit=${combo.submit}`, async ({ page }) => {
            const form = new PracticeFormPage(page);
            const student = createStudent();

            await form.open();
            await form.fillStudentInfo(
                student,
                MOCKS.SUBJECTS,
                MOCKS.STATES[combo.state].name,
                MOCKS.STATES[combo.state].cities[0]
            );

            await form.selectGender(combo.gender);
            await form.selectHobbies(combo.hobbies);

            combo.submit === 'click'
                ? await form.submit()
                : await form.submitWithoutButton();

            await expect(
                page.locator('#example-modal-sizes-title-lg')
            ).toHaveText('Thanks for submitting the form');
        });
        count++;
    }
});