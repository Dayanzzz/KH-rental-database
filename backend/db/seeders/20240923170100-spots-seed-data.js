'use strict';

const { Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll();
    await Spot.bulkCreate([
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "1 Destiny Islands Way",
        city: "Kailua-Kona",
        state: "Hawaii",
        country: "USA",
        lat: 19.6406,
        lng: -155.9711,
        name: "Tropical Paradise Retreat",
        description: "A cozy beachfront bungalow on the beautiful shores of Kailua-Kona, perfect for relaxing and soaking in the sun.",
        price: 200.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "2 Twilight Town Lane",
        city: "Kawaguchi",
        state: "Saitama",
        country: "Japan",
        lat: 35.8046,
        lng: 139.7205,
        name: "Twilight Town Inn",
        description: "A charming inn nestled in the heart of Kawaguchi, with a cozy atmosphere reminiscent of Twilight Town.",
        price: 120.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "3 Hollow Bastion Drive",
        city: "Bodrum",
        state: "Mugla",
        country: "Turkey",
        lat: 37.0267,
        lng: 27.4400,
        name: "Bastion Castle Stay",
        description: "Stay in a stunning castle-like villa overlooking the Aegean Sea, combining history and luxury.",
        price: 300.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "4 Traverse Town Square",
        city: "Napa",
        state: "California",
        country: "USA",
        lat: 38.2975,
        lng: -122.2869,
        name: "Traverse Town Suites",
        description: "Charming suites in the heart of Napa Valley, ideal for wine lovers and adventurers alike.",
        price: 180.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "5 Agrabah Market Street",
        city: "Marrakech",
        state: "Marrakech-Safi",
        country: "Morocco",
        lat: 31.6295,
        lng: -7.9811,
        name: "Agrabah Bazaar Stay",
        description: "Experience the magic of Marrakech with a stay in a vibrant riad near the bustling markets. Enjoy views of the lively street below and the stunning Atlas Mountains in the distance. The beautifully decorated bedroom offers a cozy retreat, while the traditional Moroccan bathroom features intricate tile work.",
        price: 150.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "6 Neverland Harbor",
        city: "Cancún",
        state: "Quintana Roo",
        country: "Mexico",
        lat: 21.1743,
        lng: -86.8515,
        name: "Neverland Beach House",
        description: "A tropical beach house with stunning ocean views, perfect for families and fun-filled adventures. The spacious bedrooms are designed for comfort, with large windows overlooking the beach. The modern kitchen is perfect for family meals, and the bathroom includes a walk-in shower.",
        price: 220.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "7 The Land of Departure",
        city: "Queenstown",
        state: "Otago",
        country: "New Zealand",
        lat: -45.0312,
        lng: 168.6625,
        name: "Departure Lodge",
        description: "A luxurious lodge with breathtaking views of Lake Wakatipu and the surrounding mountains. Each bedroom offers expansive views and elegant furnishings. The fully equipped kitchen allows for home-cooked meals, and the bathroom includes a spa tub for relaxation.",
        price: 250.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "8 The Keyblade Graveyard",
        city: "Albuquerque",
        state: "New Mexico",
        country: "USA",
        lat: 35.0844,
        lng: -106.6504,
        name: "Graveyard Oasis",
        description: "A unique desert retreat featuring stunning landscapes and a tranquil atmosphere. The cozy bedrooms provide a serene escape, and the kitchen is perfect for preparing meals with local ingredients. The bathroom is equipped with modern fixtures and offers a relaxing ambiance.",
        price: 130.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "9 Olympus Coliseum",
        city: "Athens",
        state: "Attica",
        country: "Greece",
        lat: 37.9838,
        lng: 23.7650,
        name: "Coliseum View Apartments",
        description: "Modern apartments with stunning views of the iconic Coliseum and city landmarks. Each apartment features stylish bedrooms, a fully equipped kitchen, and a modern bathroom. Step out onto the balcony for panoramic views and explore nearby historical sites, cafes, and shops within walking distance.",
        price: 170.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "10 Hollow Bastion Castle",
        city: "Edinburgh",
        state: "Scotland",
        country: "UK",
        lat: 55.9533,
        lng: -3.1883,
        name: "Castle Stay",
        description: "Stay in a historic castle in the heart of Edinburgh, rich with history and stunning architecture. Enjoy views of the city skyline from your bedroom, which combines classic charm with modern amenities. The kitchen is equipped for self-catering, while the luxurious bathroom features a clawfoot tub.",
        price: 280.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "11 Radiant Garden",
        city: "Mont Saint-Michel",
        state: "Normandy",
        country: "France",
        lat: 48.6360,
        lng: -1.5114,
        name: "Enchanted Garden Retreat",
        description: "Experience the charm of Mont Saint-Michel with a stay in this picturesque retreat. The cozy bedrooms offer views of the beautiful gardens, and the kitchen is perfect for preparing breakfast. The bathroom features elegant decor and modern amenities.",
        price: 140.00
      },
      {
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        address: "12 The World That Never Was",
        city: "Reykjavik",
        state: "Capital Region",
        country: "Iceland",
        lat: 64.1355,
        lng: -21.8174,
        name: "Shadow Realm Lodge",
        description: "Immerse yourself in the mystical atmosphere of Iceland with this unique lodge. Cloaks are included for your adventures! Enjoy stunning views of the surrounding landscape from your bedroom, which is designed for comfort.",
        price: 160.00
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['1 Destiny Islands Way', '2 Twilight Town Lane', '3 Hollow Bastion Drive','4 Traverse Town Square','5 Agrabah Market Street', '6 Neverland Harbor', '7 The Land of Departure','8 The Keyblade Graveyard', '9 Olympus Coliseum','10 Hollow Bastion Castle', '11 Radiant Garden', '12 The World That Never Was'] }
    }, {});
  }
};
