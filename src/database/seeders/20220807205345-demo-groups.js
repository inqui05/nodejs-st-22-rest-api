'use strict';
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert("Groups", [
      {
        id: uuidv4(),
        name: "clients",
        permissions: ["READ", "WRITE"],
      },
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("Groups", null, {});
  }
};
