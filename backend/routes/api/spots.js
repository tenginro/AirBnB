const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage, sequelize } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

require("dotenv").config();

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

// helper functions
const spotsWithRatingImg = async (spots, arr) => {
  for (let i in spots) {
    arr.push({ ...spots[i].toJSON() });
    let totalRating = await Review.sum("stars", {
      where: {
        spotId: spots[i].id,
      },
    });
    let countRating = await Review.count({
      where: {
        spotId: spots[i].id,
      },
    });

    if (countRating === 0) {
      arr[i].avgRating = "No reviews yet";
    } else {
      let avgRating = (totalRating / countRating).toFixed(1);
      arr[i].avgRating = avgRating;
    }

    let previewImage = await SpotImage.findOne({
      where: {
        spotId: spots[i].id,
        preview: true,
      },
    });

    if (previewImage) {
      arr[i].previewImage = previewImage.url;
    } else {
      arr[i].previewImage = "Preview image is not set yet";
    }
  }
  return arr;
};

// post new spotImage
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const newImage = await SpotImage.create({
    spotId: spotId,
    url,
    preview,
  });

  return res.status(200).json({
    // Answered: is it supposed to be spotId instead of id? - no, its the id column of the spotImage
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});

// get all spots owned by current user
// Interesting - needs to put this endpoint above /:spotId
router.get("/current", requireAuth, async (req, res) => {
  const ownerId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      ownerId: ownerId,
    },
  });
  let arr = [];
  await spotsWithRatingImg(spots, arr);
  return res.status(200).json({ Spots: arr });
});

// edit a spot
router.put("/:spotId", requireAuth, validateNewSpot, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const ownerId = spot.ownerId;
  const userId = req.user.id;
  if (parseInt(ownerId) !== parseInt(userId)) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
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
  return res.status(200).json(newSpot);
});

// get details of a spot from a spotId
router.get("/:spotId", async (req, res) => {
  const id = req.params.spotId;
  const spot = await Spot.findOne({
    where: {
      id: id,
    },
  });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const numReviews = await Review.count({
    where: {
      spotId: id,
    },
  });
  const totalReviews = await Review.sum("stars", {
    where: {
      spotId: id,
    },
  });
  const avgStarRating = (totalReviews / numReviews).toFixed(1);

  const spotImages = await spot.getSpotImages({
    attributes: ["id", "url", "preview"],
  });
  const owner = await spot.getUser({
    attributes: ["id", "firstName", "lastName"],
  });

  const returnSpot = {
    ...spot.toJSON(),
    SpotImages: spotImages,
    Owner: owner,
  };
  return res.status(200).json(returnSpot);
});

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
// Question: how did it get avgRating 4.5 in the response body in the readme file
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  let arr = [];
  arr = await spotsWithRatingImg(spots, arr);

  return res.status(200).json({ Spots: arr });
});

module.exports = router;
