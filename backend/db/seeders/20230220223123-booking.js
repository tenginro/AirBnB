"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Bookings";

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
        startDate: "2020-02-20",
        endDate: "2020-02-21",
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2018-10-13",
        endDate: "2018-10-14",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2021-03-21",
        endDate: "2021-03-22",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2019-10-13",
        endDate: "2019-10-14",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2020-03-03",
        endDate: "2020-03-04",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2020-10-13",
        endDate: "2020-10-14",
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2021-06-20",
        endDate: "2021-06-22",
      },
      {
        spotId: 4,
        userId: 1,
        startDate: "2020-11-23",
        endDate: "2020-11-24",
      },
      {
        spotId: 5,
        userId: 2,
        startDate: "2020-09-03",
        endDate: "2020-09-05",
      },
      {
        spotId: 5,
        userId: 1,
        startDate: "2020-07-20",
        endDate: "2020-07-21",
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
