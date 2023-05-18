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
        lat: 41.6037018,
        lng: -71.2260308,
        name: "Sitting on your deck watching spectacular sunsets",
        description:
          "Situated on premium beachfront property, this single family home has luxurious amenities like super plush towels, organic cotton bedding.",
        price: 302.0,
      },
      {
        ownerId: 1,
        address: "Ferry Beach",
        city: "Saco",
        state: "Maine",
        country: "USA",
        lat: 43.5100925,
        lng: -70.464751,
        name: "Beautiful Oceanfront Cottage",
        description:
          "Such a gracious host! The views are unbeatable and the accommodation was so luxurious.",
        price: 600.0,
      },
      {
        ownerId: 2,
        address: "Hampton Beach",
        city: "Hampton",
        state: "New Hampshire",
        country: "USA",
        lat: 42.9305615,
        lng: -70.8808208,
        name: "Sandy shores family's next ocean-front vacation",
        description:
          "This completely renovated, sunny unit boasts ocean views sitting right across the street from a resident beach. This is not your typical studio apartment, as it features a full sized kitchen and a separate living space.",
        price: 250.0,
      },
      {
        ownerId: 2,
        address: "Keansburg Beach",
        city: "Keansburg",
        state: "New Jersey",
        country: "USA",
        lat: 40.4677162,
        lng: -74.1895024,
        name: "Perfect beach cottage",
        description:
          "Sitting right on the beach, this family home is just steps to the beach! Wake up to ocean views, enjoy the indoor swimming pool and jacuzzi complete with French doors that open to towards the ocean.",
        price: 227.0,
      },
      {
        ownerId: 3,
        address: "Seaview Beach",
        city: "Yarmouth",
        state: "Massachusetts",
        country: "USA",
        lat: 41.6569591,
        lng: -70.2568803,
        name: "Fully Renovated Single Floor Home",
        description:
          "Stairs on the deck lead down to the south end of Cove where you can surf, boogie board or just play in the ocean. This house will not only give you a peaceful getaway but also the opportunity to discover the charming stores in downtown nearby.",
        price: 202.0,
      },
      {
        ownerId: 1,
        address: "Hollywood Beach",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        lat: 34.0089407,
        lng: -118.4148688,
        name: "Private Garden",
        description:
          "This elegant converted 1925 church rectory in French Gothic style features original stained-glass windows, and one charming guestroom + bath with claw foot tub/shower, chandelier, A/C, and shared kitchen. Enjoy a sunny morning coffee in the garden, a glass of wine, or read by the fire in the living room on chilly nights. ",
        price: 220.0,
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
            "Hollywood Beach",
          ],
        },
      },
      {}
    );
  },
};
