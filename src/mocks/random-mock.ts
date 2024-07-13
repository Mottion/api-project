import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakePlace() {
  return {
    name: faker.person.fullName(),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakePlaceComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
