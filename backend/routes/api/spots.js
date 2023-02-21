const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

require("dotenv").config();

const router = express.Router();

const validateNewSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49, min: 1 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];
// post new spot
router.post("/", requireAuth, validateNewSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;
  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  return res.status(201).json(newSpot);
});

// return all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  let arr = [];
  for (let spot of spots) {
    // console.log("spotid", spot.id);
    let totalRating = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    // console.log(totalRating);
    let countRating = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    // console.log(countRating);
    let avgRating = (totalRating / countRating).toFixed(1);
    // console.log(avgRating);
    // spot["avgRating"] = avgRating;
    // console.log(spot.avgRating);
    let previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    if (previewImage) {
      //   spot["previewImage"] = previewImage.url;
      // } else spot["previewImage"] = "no preview image";
      arr.push({
        ...spot.toJSON(),
        avgRating: avgRating,
        previewImage: previewImage.url,
      });
    }
  }
  return res.status(200).json({ Spots: arr });
});

module.exports = router;
