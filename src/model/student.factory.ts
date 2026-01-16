import { faker } from '@faker-js/faker';
import { Student } from './student.model';

export function createStudent(): Student {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress()
  };
}
