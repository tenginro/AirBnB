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
        review: "good",
        stars: 4,
      },
      {
        spotId: 1,
        userId: 3,
        review: "bad",
        stars: 2,
      },
      {
        spotId: 2,
        userId: 3,
        review: "great",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "bad",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 3,
        review: "bad",
        stars: 2,
      },
      {
        spotId: 3,
        userId: 1,
        review: "great",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review: "good",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 1,
        review: "good",
        stars: 4,
      },
      {
        spotId: 5,
        userId: 2,
        review: "great",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: "good",
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
