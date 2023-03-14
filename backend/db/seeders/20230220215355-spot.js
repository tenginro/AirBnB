"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Spots";

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
        ownerId: 1,
        address: "McCorrie Point Beach",
        city: "Tiverton",
        state: "Rhode Island",
        country: "USA",
        lat: 41.58,
        lng: 71.24,
        name: "Sitting on your deck watching spectacular sunsets",
        description:
          "It's always about the view and this place will leave you feeling energized and calm. Situated on premium beachfront property, this single family home has luxurious amenities like super plush towels, organic cotton bedding. ",
        price: 302.0,
      },
      {
        ownerId: 1,
        address: "Ferry Beach",
        city: "Saco",
        state: "Maine",
        country: "USA",
        lat: 43.47,
        lng: 70.39,
        name: "Beautiful Oceanfront Cottage",
        description: "6b4b",
        price: 600.0,
      },
      {
        ownerId: 2,
        address: "Hampton Beach",
        city: "Hampton",
        state: "New Hampshire",
        country: "USA",
        lat: 42.91,
        lng: 70.81,
        name: "Sandy shores family's next ocean-front vacation",
        description:
          "This completely renovated,  sunny unit boasts ocean views sitting right across the street from a resident beach. This is not your typical studio apartment, as it features a full sized kitchen and a separate living space.",
        price: 250.0,
      },
      {
        ownerId: 2,
        address: "Keansburg Beach",
        city: "Keansburg",
        state: "New Jersey",
        country: "USA",
        lat: 40.44,
        lng: 74.13,
        name: "Perfect beach cottage",
        description:
          "Sitting right on Easton's beach, this family home is just steps to the beach! Wake up to ocean views, enjoy the indoor swimming pool and jacuzzi complete with French doors that open to towards the ocean.",
        price: 227.0,
      },
      {
        ownerId: 3,
        address: "Seaview Beach",
        city: "Yarmouth",
        state: "Massachusetts",
        country: "USA",
        lat: 41.64,
        lng: 70.21,
        name: "Fully Renovated Single Floor Home",
        description:
          "Stairs on the deck lead down to the south end of Mondo's Cove where you can surf, boogie board or just play in the ocean. This house will not only give you a peaceful getaway but also the opportunity to discover the charming  stores in downtown Ventura nearby.",
        price: 202.0,
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
        address: {
          [Op.in]: [
            "McCorrie Point Beach",
            "Ferry Beach",
            "Hampton Beach",
            "Keansburg Beach",
            "Seaview Beach",
          ],
        },
      },
      {}
    );
  },
};
