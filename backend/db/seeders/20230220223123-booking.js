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
        startDate: "2023-02-20",
        endDate: "2023-02-27",
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2022-10-03",
        endDate: "2022-10-14",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-03-21",
        endDate: "2023-03-30",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-04-13",
        endDate: "2023-04-16",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-03-03",
        endDate: "2023-03-05",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-05-13",
        endDate: "2023-05-14",
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2023-01-20",
        endDate: "2023-01-22",
      },
      {
        spotId: 4,
        userId: 1,
        startDate: "2022-11-23",
        endDate: "2022-11-24",
      },
      {
        spotId: 5,
        userId: 2,
        startDate: "2022-09-03",
        endDate: "2022-09-15",
      },
      {
        spotId: 5,
        userId: 1,
        startDate: "2023-01-10",
        endDate: "2023-01-21",
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-06-01",
        endDate: "2023-06-07",
      },
      {
        spotId: 2,
        userId: 5,
        startDate: "2023-06-08",
        endDate: "2023-06-18",
      },
      {
        spotId: 3,
        userId: 6,
        startDate: "2023-06-28",
        endDate: "2023-06-30",
      },
      {
        spotId: 4,
        userId: 5,
        startDate: "2023-07-28",
        endDate: "2023-07-30",
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-07-08",
        endDate: "2023-07-12",
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
