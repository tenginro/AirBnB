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
      {
        ownerId: 2,
        address: "Adirondack Mountains",
        city: "Remsen",
        state: "New York",
        country: "USA",
        lat: 43.3284703,
        lng: -75.1922899,
        name: "Luxury Villa with Hotub",
        description:
          "This brand-new luxurious property features floor to ceiling Marvin windows with with built-in hot tub and outdoor propane fireplace overlooking the glorious lake and mountain scenery!  ",
        price: 715.0,
      },
      {
        ownerId: 1,
        address: "Empire State",
        city: "New York City",
        state: "New York",
        country: "USA",
        lat: 40.7484405,
        lng: -73.9882393,
        name: "Stunning views to Empire State",
        description:
          "Amazing apartment with stunning skyline views to Manhattan and the Empire State. don't look further if you need a quick access  to to Hudson Yards, Time Square, Hell's Kitchen, Javits Center, the Summit Vanderbilt , Bryant Park, The Vessel and many more.",
        price: 950.0,
      },
      {
        ownerId: 1,
        address: "UofU",
        city: "Salt Lake City",
        state: "Utah",
        country: "USA",
        lat: 40.7682196,
        lng: -111.8627015,
        name: "Spacious suite in downtown",
        description:
          "This is a complete 400 sq ft suite, centrally located in downtown SLC. Complete with an en-suite bathroom, sitting room, and bedroom with work desk, and has its own door.",
        price: 68.0,
      },
      {
        ownerId: 5,
        address: "Westcliffe",
        city: "Westcliffe",
        state: "Colorado",
        country: "USA",
        lat: 38.1353372,
        lng: -105.4909211,
        name: "Modern ranch cabin",
        description:
          "Modern ranch style cabin on 160 acre property with incredible large mountain views all around.  House was designed by an architect and shows in every detail and the gorgeous furnishings throughout the inside and exterior of the home. ",
        price: 500.0,
      },
      {
        ownerId: 5,
        address: "RedAwning",
        city: "Broken Bow",
        state: "Oklahoma",
        country: "USA",
        lat: 34.0559601,
        lng: -94.8222086,
        name: "Cabin of the Pines",
        description:
          "This is a beautiful pet friendly pine cabin with very high ceilings & a unique floor plan. Our large bar & kitchen allow you to cook with ease or grill on the big porch under the stars.Equipped with washer and dryer. ",
        price: 500.0,
      },
      {
        ownerId: 6,
        address: "Wanderlust",
        city: "Crane Hill",
        state: "Alabama",
        country: "USA",
        lat: 34.0939888,
        lng: -87.0836191,
        name: "Treehouse",
        description:
          "Great for a couples retreat, honeymoon, or spiritual reconnecting. Get away from it all and enjoy the nature trails and 2 acre lake(seasonal at times)to pass the time and be able to really unwind. Sit and enjoy your morning coffee outside on the deck as you may be able to catch a peak at the deer.  ",
        price: 350.0,
      },
      {
        ownerId: 6,
        address: "Theatre Airhokey",
        city: "Gatlinburg",
        state: "Tennessee",
        country: "USA",
        lat: 35.7272221,
        lng: -83.5802457,
        name: "Entire cabin",
        description:
          "Bring family and friends to our newly constructed cabin located in the Cobbly Nob Community and take in the fresh Great Smoky Mountain National Park air as you gaze upon the mountain landscape from the decks of Diamond in the Bluff with our wall of windows framing the beautiful mountain scenery and the amazing views. ",
        price: 550.0,
      },
      {
        ownerId: 5,
        address: "Elsberry",
        city: "Elsberry",
        state: "Missouri",
        country: "USA",
        lat: 39.1725536,
        lng: -90.8119041,
        name: "Incredible Cabin with Even Better Views",
        description:
          "Our family's dream home perched high on a hill overlooking the beautiful river bottoms.  This home boast some of the best views in the state.  Enjoy all of this while staying in a beautiful home that includes 30' ceilings, spiral staircase, dozens of animal mounts, and a 3-story bunk bed!  ",
        price: 500.0,
      },
      {
        ownerId: 4,
        address: "Zion EcoCabin",
        city: "Hildale",
        state: "Utah",
        country: "USA",
        lat: 37.0097463,
        lng: -113.0119246,
        name: "Zion Canyon Views",
        description:
          "Soak up the sun & unwind in the Zion EcoCabin A-Frame! This one of a kind a-frame has a private hot tub with front row views of the South Zion Mountains! The convertible door on the cabin fully opens, allowing the indoor comforts of this cozy cabin to blend seamlessly with the stunning nature of the red-rock canyons. ",
        price: 760.0,
      },
      {
        ownerId: 3,
        address: "Peak Haus",
        city: "Leavenworth",
        state: "Washington",
        country: "USA",
        lat: 47.5895161,
        lng: -120.6810391,
        name: "Peak Haus",
        description:
          "Located just five minutes from the Bavarian Village of Leavenworth, it is brand new, luxurious modern mountain home nestled in the middle of 3.5 acres of woodland valley.",
        price: 560.0,
      },
      {
        ownerId: 5,
        address: "Exquisite Lake Views",
        city: "Lakeside",
        state: "Oregon",
        country: "USA",
        lat: 43.5775995,
        lng: -124.1836699,
        name: "Luxury Retreat",
        description:
          "Looking for the perfect place to enjoy all the Oregon Coast has to offer?? Then look no further than this stunning luxury cabin with breathtaking views over-looking Tenmile Lake.",
        price: 360.0,
      },
      {
        ownerId: 5,
        address: "Fire Pit",
        city: "Kemp",
        state: "Texas",
        country: "USA",
        lat: 32.4366287,
        lng: -96.2539048,
        name: "Lake House",
        description:
          "A place that is great for everyone. 3 bedroom 2 bath that sleeps 9 comfortably. Life can be busy, but at the lake house everyone comes together. These are the memories that will last a lifetime, and the stories that will be told and laughed about for decades.",
        price: 360.0,
      },
      {
        ownerId: 6,
        address: "Surf Beach Estate Malibu",
        city: "Malibu",
        state: "California",
        country: "USA",
        lat: 34.030852,
        lng: -118.84756,
        name: "Luxury stay in Malibu",
        description:
          "Vines ground this modern-Tuscan Malibu retreat in its surroundings. Burnt orange hills and blue water complement each other, and in the middle sit the pool, hot tub, and loungers, all facing the ocean. ",
        price: 1360.0,
      },
      {
        ownerId: 6,
        address: "The Hideaway in Sedona",
        city: "Sedona",
        state: "Arizona",
        country: "USA",
        lat: 34.8599852,
        lng: -111.8333367,
        name: "The Hideaway in Sedona",
        description:
          "Welcome to The Hideaway. A premier Sedona Vacation Home located on the edge of the Coconino National Forest. Walk out the backdoor to a network of Sedona`s best hiking & biking trails. Incredible views of the red rocks can be seen almost anywhere in the home.  ",
        price: 1360.0,
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
            "Adirondack Mountains",
            "Empire State",
            "UofU",
            "Westcliffe",
            "RedAwning",
            "Wanderlust",
            "Theatre Airhokey",
            "Elsberry",
            "Zion EcoCabin",
            "Peak Haus",
            "Exquisite Lake Views",
            "Fire Pit",
            "Surf Beach Estate Malibu",
            "The Hideaway in Sedona",
          ],
        },
      },
      {}
    );
  },
};
