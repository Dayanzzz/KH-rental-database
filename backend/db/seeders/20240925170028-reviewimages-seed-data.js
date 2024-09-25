'use strict';
const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await ReviewImage.bulkCreate([
      {
        reviewId:1 ,
        url: 'https://example.com/image1.jpg',

      },
      {
        reviewId: 1,
        url: 'https://example.com/image2.jpg',

      },
      {
        reviewId: 1,
        url: 'https://example.com/image3.jpg',

      },
      {
        reviewId: 1,
        url: 'https://example.com/image4.jpg',

      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  },
};
