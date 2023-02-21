"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "ReviewImages";

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
        reviewId: 1,
        url: "review1.url",
      },
      {
        reviewId: 2,
        url: "review2.url",
      },
      {
        reviewId: 3,
        url: "review3.url",
      },
      {
        reviewId: 4,
        url: "review4.url",
      },
      {
        reviewId: 5,
        url: "review5.url",
      },
      {
        reviewId: 6,
        url: "review6.url",
      },
      {
        reviewId: 7,
        url: "review7.url",
      },
      {
        reviewId: 8,
        url: "review8.url",
      },
      {
        reviewId: 9,
        url: "review9.url",
      },
      {
        reviewId: 10,
        url: "review10.url",
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
        url: {
          [Op.in]: [
            "review1.url",
            "review2.url",
            "review3.url",
            "review4.url",
            "review5.url",
            "review6.url",
            "review7.url",
            "review8.url",
            "review9.url",
            "review10.url",
          ],
        },
      },
      {}
    );
  },
};
