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

const validateNewBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is required"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End date is required"),
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
    let spot = spot[i].toJSON();
    arr.push(spot);
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
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
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
});

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
  arr = await spotsWithRatingImg(spots, arr);

  return res.status(200).json({ Spots: arr });
});

module.exports = router;
