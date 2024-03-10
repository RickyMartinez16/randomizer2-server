'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        "first_name",
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'last_name',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'first_name'),
      queryInterface.removeColumn('Users', 'last_name')
    ]);
  }
};
