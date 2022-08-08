'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Groups", {
      id: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("Groups");
  }
};
