const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

require("dotenv").config();
const { Op } = require("sequelize");

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

const validateNewReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ max: 5, min: 1 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    // // .exists({ checkNull: true })
    // // .notEmpty()
    // // .bail()
    // // stop running if any previous one failed
    // .custom((value) => {
    //   if (!value) return false;
    //   return true;
    // })
    // .bail()
    // Interesting - .optional() - check only if it exists
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check("minLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateNewBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is required"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End date is required"),
  // // TODO lets try
  // check("endDate").toDate(),
  // check("startDate")
  //   .custom((value, { req }) => {
  //     if (value > req.body.endDate) {
  //       throw new Error("endDate cannot be on or before startDate");
  //     }
  //     return true;
  //   })
  //   .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

// helper functions
const spotsWithRatingImg = async (spots, arr) => {
  for (let i in spots) {
    let spot = spots[i].toJSON();
    arr.push({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.ownerId,
      lat: +spot.lat,
      lng: +spot.lng,
      name: spot.name,
      description: spot.description,
      price: +spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
    });

    // use sequelize.fn to get average
    let spotReviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });
    let avgRating = spotReviews[0].toJSON().avgRating;
    // convert string to number
    arr[i].avgRating = +avgRating.toFixed(1);

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

// get reviews for a spot
router.get("/:spotId/reviews", async (req, res) => {
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

  const reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
  });
  let arr = [];
  for (let i in reviews) {
    let review = reviews[i].toJSON();
    arr.push(review);
    const user = await User.findOne({
      where: {
        id: review.userId,
      },
      attributes: ["id", "firstName", "lastName"],
    });
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id,
      },
      attributes: ["id", "url"],
    });
    arr[i].User = user;
    arr[i].ReviewImages = reviewImages;
  }
  return res.status(200).json({ Reviews: arr });
});

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

// create a booking for a spot
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateNewBooking,
  async (req, res) => {
    const { startDate, endDate } = req.body;
    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot be on or before startDate",
        },
      });
    }
    const userId = req.user.id;
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
    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    const conflict = await Booking.findOne({
      where: {
        spotId: spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });
    if (conflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    const newBooking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate,
    });
    return res.status(200).json(newBooking);
  }
);

// get all bookings for a spot
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const userId = req.user.id;
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
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    order: [["startDate"]],
  });

  let arr = [];
  for (let i in bookings) {
    let booking = bookings[i].toJSON();
    const user = await User.findOne({
      where: {
        id: booking.userId,
      },
    });
    // if the spot is owned by the user
    if (spot.ownerId === userId) {
      arr.push({
        User: user,
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    } else {
      arr.push({
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  }

  return res.status(200).json({
    Bookings: arr,
  });
});

// create a review for a spot
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateNewReview,
  async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
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
    const existingReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });
    if (existingReview) {
      return res.status(403).json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    }
    const { review, stars } = req.body;
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });
    return res.status(201).json(newReview);
  }
);

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
  if (ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  await spot.update({
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

  return res.status(200).json(spot);
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

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id;
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
  // Interesting - not spot.userId but ownerId
  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await spot.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
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

// get all spots
router.get("/", validateQuery, async (req, res) => {
  let query = {};

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = req.query.page === undefined ? 1 : parseInt(req.query.page);
  // if (page < 1) page = 1;//already handled in the validation
  if (page > 10) page = 10;
  size = req.query.size === undefined ? 20 : parseInt(req.query.size);
  // if (size < 1) size = 1;//already handled in the validation
  if (size > 20) size = 20;
  query.limit = size;
  query.offset = size * (page - 1);

  if (minLat || maxLat || minLng || maxLng || minPrice || maxPrice) {
    let queryArr = [];
    if (minLat) queryArr.push({ lat: { [Op.gte]: parseInt(minLat) } });
    if (maxLat) queryArr.push({ lat: { [Op.lte]: parseInt(maxLat) } });
    if (minLng) queryArr.push({ lng: { [Op.gte]: parseInt(minLng) } });
    if (maxLng) queryArr.push({ lng: { [Op.lte]: parseInt(maxLng) } });
    if (minPrice) queryArr.push({ price: { [Op.gte]: parseInt(minPrice) } });
    if (maxPrice) queryArr.push({ price: { [Op.lte]: parseInt(maxPrice) } });

    query.where = {
      [Op.and]: queryArr,
    };
  }
  const spots = await Spot.findAll(query);
  let arr = [];
  arr = await spotsWithRatingImg(spots, arr);
  return res.status(200).json({ Spots: arr, page: page, size: size });
});

module.exports = router;
