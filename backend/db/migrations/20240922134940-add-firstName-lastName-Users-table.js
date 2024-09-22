'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING(60),
    }, options.table);
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(60),
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users"
    await queryInterface.removeColumn('Users', 'firstName', options);
    return queryInterface.removeColumn('Users', 'lastName', options);
  }
};
