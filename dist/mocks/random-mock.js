"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUser = fakeUser;
exports.fakeUserComplete = fakeUserComplete;
exports.fakePlace = fakePlace;
exports.fakePlaceComplete = fakePlaceComplete;
const faker_1 = require("@faker-js/faker");
function fakeUser() {
    return {
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.lorem.words(5),
    };
}
function fakeUserComplete() {
    return {
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.lorem.words(5),
    };
}
function fakePlace() {
    return {
        name: faker_1.faker.person.fullName(),
        city: faker_1.faker.lorem.words(5),
        state: faker_1.faker.lorem.words(5),
        updatedAt: faker_1.faker.date.anytime(),
    };
}
function fakePlaceComplete() {
    return {
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.person.fullName(),
        city: faker_1.faker.lorem.words(5),
        state: faker_1.faker.lorem.words(5),
        createdAt: new Date(),
        updatedAt: faker_1.faker.date.anytime(),
    };
}
//# sourceMappingURL=random-mock.js.map