"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "SpotImages";

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
        url: "image1.url",
        preview: true,
      },
      {
        spotId: 1,
        url: "image2.url",
        preview: false,
      },
      {
        spotId: 2,
        url: "image3.url",
        preview: true,
      },
      {
        spotId: 3,
        url: "image4.url",
        preview: true,
      },
      {
        spotId: 2,
        url: "image5.url",
        preview: false,
      },
      {
        spotId: 3,
        url: "image6.url",
        preview: false,
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
            "image1.url",
            "image2.url",
            "image3.url",
            "image4.url",
            "image5.url",
            "image6.url",
          ],
        },
      },
      {}
    );
  },
};
