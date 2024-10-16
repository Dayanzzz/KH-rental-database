'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'mickey@kingdomhearts.com',
        username: 'MickeyMouse',
        firstName: 'Mickey',
        lastName: 'Mouse',
        hashedPassword: bcrypt.hashSync('passwordMickey')
      },
      {
        email: 'sora@kingdomhearts.com',
        username: 'Sora',
        firstName: 'Sora',
        lastName: 'Frost',
        hashedPassword: bcrypt.hashSync('passwordSora')
      },
      {
        email: 'chip@kingdomhearts.com',
        username: 'Chip',
        firstName: 'Chip',
        lastName: 'Potts',
        hashedPassword: bcrypt.hashSync('passwordChip')
      },
      {
        email: 'dale@kingdomhearts.com',
        username: 'Dale',
        firstName: 'Dale',
        lastName: 'Potts',
        hashedPassword: bcrypt.hashSync('passwordDale')
      },
      {
        email: 'roxas@kingdomhearts.com',
        username: 'Roxas',
        firstName: 'Roxas',
        lastName: 'Unknown',
        hashedPassword: bcrypt.hashSync('passwordRoxas')
      },
      {
        email: 'kairi@kingdomhearts.com',
        username: 'Kairi',
        firstName: 'Kairi',
        lastName: 'Destiny',
        hashedPassword: bcrypt.hashSync('kairi123')
      },
      {
        email: 'riku@kingdomhearts.com',
        username: 'Riku',
        firstName: 'Riku',
        lastName: 'Shadows',
        hashedPassword: bcrypt.hashSync('riku123')
      },
      {
        email: 'aqua@kingdomhearts.com',
        username: 'Aqua',
        firstName: 'Aqua',
        lastName: 'Warrior',
        hashedPassword: bcrypt.hashSync('aqua123')
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['MickeyMouse', 'Sora', 'Chip', 'Dale', 'Roxas', 'Kairi', 'Riku', 'Aqua'] }
    }, {});
  }
};
