"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Reviews";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review:
          "We loved the area! Very beautiful, we slept with the doors open in the master because the sound of the waves was so peaceful! We will be renting again!",
        stars: 4,
      },
      {
        spotId: 1,
        userId: 3,
        review: "The stay was okay",
        stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review:
          "Our stay was great the unit was clean and big my kids had a wonderful time and the host had great communication I would definitely be booking this unit again.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "The stay was okay",
        stars: 2,
      },
      {
        spotId: 3,
        userId: 3,
        review: "The stay was okay",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 1,
        review:
          "This home was an absolute blessing for the family and myself. It’s location is perfect because it’s as if you have a private beach, just a short distance right off your coastline north",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review:
          "Heaven on earth. This place has it all: quiet, clean, spacious, and modern. I wish I could give it even more stars! Enjoy.",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 1,
        review:
          "Nice place, nice host! Very friendly and responsive. We had a small problem and he solved it in just a few hours.",
        stars: 4,
      },
      {
        spotId: 5,
        userId: 2,
        review:
          "I don't even want to tell you how incredibly beautiful this house is, because I still want to be able to book it! ",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review:
          "The location and views are amazing! Short walk down to the beach and so fun to watch the surfers every morning.",
        stars: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
