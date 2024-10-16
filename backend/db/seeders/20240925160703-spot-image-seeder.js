'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "/images/1bathroom.jpg",
        preview:true
      },
      {
        spotId: 2,
        url: "/images/1bed.jpg",
        preview:true
      },
      {
        spotId: 3,
        url: "/images/1front.jpg",
        preview:true
      },
      {
        spotId: 4,
        url: "/images/1bathroom.jpg",
        preview:true
      },
      {
        spotId: 5,
        url: "/images/1bed.jpg",
        preview:true
      },
      {
        spotId: 6,
        url: "/images/1front.jpg",
        preview:true
      },{
        spotId: 7,
        url: "/images/1bathroom.jpg",
        preview:true
      },
      {
        spotId: 8,
        url: "/images/1bed.jpg",
        preview:true
      },
      {
        spotId: 9,
        url: "/images/1front.jpg",
        preview:true
      },{
        spotId: 10,
        url: "/images/1bathroom.jpg",
        preview:true
      },
      {
        spotId: 11,
        url: "/images/1bed.jpg",
        preview:true
      },
      {
        spotId: 12,
        url: "/images/1front.jpg",
        preview:true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          "/images/1bathroom.jpg", 
          "/images/1front.jpg", 
           "/images/1bed.jpg"
        ]
      }
    }, {});
  }
};
