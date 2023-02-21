"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        // validate: {
        //   max: 90,
        //   min: -90,
        //   isValid(value) {
        //     if (value > 90 || value < -90) throw Error("Latitude is not valid");
        //   },
        // },
      },
      lng: {
        type: DataTypes.DECIMAL,
        // validate: {
        //   max: 180,
        //   min: -180,
        //   isValid(value) {
        //     if (value > 180 || value < -180)
        //       throw new Error("Longitude is not valid");
        //   },
        // },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [1, 49],
        //   length(value) {
        //     if (value.length >= 50)
        //       throw new Error("Name must be less than 50 characters");
        //   },
        // },
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
