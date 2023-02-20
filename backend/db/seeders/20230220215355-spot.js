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
          "This-sitting on your deck watching spectacular sunsets with  family after a day on your private beach, swimming paddle boarding and kayaking.  You have the grill going and lobster ready! ",
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
        description:
          "Relax with the whole family at this peaceful place to stay. Cottage boasts 4 bedrooms and 2 full bathrooms and a huge wrap around deck. Master bedroom on first floor has an en-suite bath and it’s own patio. ",
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
          "This is a brand new oceanfront condo on 2 nd floor. It features granite countertops in kitchen & baths, lvp, tile flooring ,in-unit laundry, workstation if you choose to work from home and one reserved parking! Family and kid friendly. ",
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
          "This beautiful and cozy beach cottage has direct access to beach and features a very private atmosphere. From the breathtaking view of New York City on the upper deck to the relaxing chaise lounge on the lower deck, everything this place has to offer makes it the perfect getaway for you and your family.",
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
          "Wake up on the Cape and practically roll out of bed onto Thatcher, Seaview and Parkers River Beach, located in immaculate South Yarmouth. A ten minute drive from Cape Cod airport, and less than two hours from Boston.",
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
