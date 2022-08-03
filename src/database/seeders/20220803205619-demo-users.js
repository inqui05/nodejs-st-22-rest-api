'use strict';
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        login: "first",
        password: "12345678abc",
        age: 23,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: "second",
        password: "abc12345678",
        age: 30,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
