'use strict';
const { Spot, User, Review, ReviewImag } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate( [
      {
        spotId: 1,
        userId: 1,
        review: 'Amazing stay! Highly recommend this spot.',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Decent stay, could be cleaner.',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Great stay! Would recommend this spot to a friend.',
        stars: 4,
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      [Op.or]: [
        { review: 'Amazing stay! Highly recommend this spot.' },
        { review: 'Decent stay, could be cleaner.' },
        { review: 'Great stay! Would recommend this spot to a friend.' },
      ]
    }, {});
  }
  };
