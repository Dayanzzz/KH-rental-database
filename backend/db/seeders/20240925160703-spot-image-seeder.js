'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

// Cloudinary base URL
const cloudinaryBaseUrl = process.env.CLOUDINARY_BASE_URL;

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 2,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 3,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 4,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 5,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 6,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 7,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 8,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 9,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 10,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 11,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 12,
        url: `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: true
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          `${cloudinaryBaseUrl}v1729100589/1ocean_bmkjxt.jpg`
      
        ]
      }
    }, {});
  }
};
