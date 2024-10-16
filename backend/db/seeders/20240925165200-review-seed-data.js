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
        spotId: 1, // Tropical Paradise Retreat
        userId: 3,
        review: 'Had an amazing time at the Tropical Paradise Retreat! The beach was stunning, and the bungalow was cozy and comfortable. Perfect place for a getaway!',
        stars: 5,
      },
      {
        spotId: 2, // Twilight Town Inn
        userId: 6,
        review: 'The Twilight Town Inn had a lovely, nostalgic feel. The staff was welcoming and the atmosphere was cozy. Just what I needed!',
        stars: 4,
      },
      {
        spotId: 3, // Bastion Castle Stay
        userId: 1,
        review: 'Staying at the Bastion Castle was a dream! The views of the Aegean Sea were breathtaking, and the castle was full of charm.',
        stars: 5,
      },
      {
        spotId: 4, // Traverse Town Suites
        userId: 4,
        review: 'Traverse Town Suites were perfect for our wine tour! Beautifully designed rooms and the location was ideal for exploring Napa.',
        stars: 4,
      },
      {
        spotId: 6, // Neverland Beach House
        userId: 3,
        review: 'The Neverland Beach House was fantastic! Kids loved the beach and the views were to die for. A perfect family vacation spot.',
        stars: 5,
      },
      {
        spotId: 8, // Graveyard Oasis
        userId: 6,
        review: 'A unique stay at Graveyard Oasis! The desert landscape was mesmerizing, and the peace and quiet were just what we needed.',
        stars: 4,
      },
      {
        spotId: 9, // Coliseum View Apartments
        userId: 4,
        review: 'Coliseum View Apartments offered stunning views of Athens! A great base for exploring the rich history and culture.',
        stars: 5,
      },
      {
        spotId: 11, // Enchanted Garden Retreat
        userId: 5,
        review: 'The Enchanted Garden Retreat was a magical experience. The charm of Mont Saint-Michel is hard to beat, and the accommodations were lovely.',
        stars: 4,
      },
    ], options);


  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      [Op.or]: [
        { review: 'Had an amazing time at the Tropical Paradise Retreat! The beach was stunning, and the bungalow was cozy and comfortable. Perfect place for a getaway!' },
        { review: 'The Twilight Town Inn had a lovely, nostalgic feel. The staff was welcoming and the atmosphere was cozy. Just what I needed!' },
        { review: 'Staying at the Bastion Castle was a dream! The views of the Aegean Sea were breathtaking, and the castle was full of charm.' },
        { review: 'Traverse Town Suites were perfect for our wine tour! Beautifully designed rooms and the location was ideal for exploring Napa.' },
        { review: 'The Neverland Beach House was fantastic! Kids loved the beach and the views were to die for. A perfect family vacation spot.' },
        { review: 'A unique stay at Graveyard Oasis! The desert landscape was mesmerizing, and the peace and quiet were just what we needed.' },
        { review: 'Coliseum View Apartments offered stunning views of Athens! A great base for exploring the rich history and culture.' },
        { review: 'The Enchanted Garden Retreat was a magical experience. The charm of Mont Saint-Michel is hard to beat, and the accommodations were lovely.' },
      ]
    }, {});
  }
};
