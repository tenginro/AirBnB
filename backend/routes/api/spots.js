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
  handleValidationErrors,
];

const validateSpotImage = [
  check("url").exists({ checkFalsy: true }).withMessage("url is required"),
  check("preview")
    .exists({ checkFalsy: true })
    .withMessage("preview is required"),
  handleValidationErrors,
];

// helper functions
const spotFormat = (spot) => {
  let newSpot = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: +spot.lat,
    lng: +spot.lng,
    name: spot.name,
    description: spot.description,
    price: +spot.price,
    createdAt: dateFormat(spot.createdAt),
    updatedAt: dateFormat(spot.updatedAt),
  };
  return newSpot;
};

// Interesting - convert time to the format yyyy-mm-dd hh:mm:ss
const dateFormat = (str) => {
  let string = new Date(str);
  let date = string.toISOString().split("T")[0];
  let time = string.toLocaleTimeString("en-GB");
  return `${date} ${time}`;
};

const spotsWithRatingImg = async (spots, arr) => {
  for (let i in spots) {
    let spot = spots[i].toJSON();
    arr.push({ ...spotFormat(spot) });

    // use sequelize.fn to get average
    let spotReviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });
    let avgRating = spotReviews[0].toJSON().avgRating;
    // convert string to number
    // Interesting - postgre wrap number in string
    if (+avgRating === 0) arr[i].avgRating = "No reviews yet";
    else arr[i].avgRating = +(+avgRating).toFixed(1);

    let previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
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
    arr.push({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: dateFormat(review.createdAt),
      updatedAt: dateFormat(review.updatedAt),
    });
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

// create new spotImage
router.post(
  "/:spotId/images",
  [requireAuth, validateSpotImage],
  async (req, res) => {
    const { url, preview } = req.body;
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

    // check authorization
    if (spot.ownerId !== userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    // allow only one preview image
    if (preview === true) {
      const existingPreview = await SpotImage.findOne({
        where: {
          spotId: spotId,
          preview: true,
        },
      });
      if (existingPreview) {
        await existingPreview.update({
          preview: false,
        });
      }
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
  }
);

// create a booking for a spot
router.post(
  "/:spotId/bookings",
  [requireAuth, validateNewBooking],
  async (req, res) => {
    let { startDate, endDate } = req.body;

    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    let today = new Date();
    // with this validation, if there is no future bookingin the seeder file, couldn't test delete booking that has been started
    if (startDateTime <= today) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "startDate cannot be on or before today",
        },
      });
    }
    if (endDateTime.getTime() <= startDateTime.getTime()) {
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

    // check authorization
    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    const fullPeriodConflict = await Booking.findOne({
      where: {
        spotId: spotId,
        startDate: {
          [Op.between]: [startDate, endDate],
        },
        endDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    const conflict = await Booking.findOne({
      where: {
        spotId: spotId,
        [Op.and]: [
          {
            startDate: {
              [Op.lte]: startDate,
            },
            endDate: {
              [Op.gte]: startDate,
            },
          },
          {
            startDate: {
              [Op.lte]: endDate,
            },
            endDate: {
              [Op.gte]: endDate,
            },
          },
        ],
      },
    });
    if (fullPeriodConflict || conflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    const startDateConflict = await Booking.findOne({
      where: {
        spotId: spotId,
        startDate: {
          [Op.lte]: startDate,
        },
        endDate: {
          [Op.gte]: startDate,
        },
      },
    });
    if (startDateConflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
        },
      });
    }

    const endDateConflict = await Booking.findOne({
      where: {
        spotId: spotId,
        startDate: {
          [Op.lte]: endDate,
        },
        endDate: {
          [Op.gte]: endDate,
        },
      },
    });
    if (endDateConflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    const newBooking = await Booking.create({
      spotId,
      userId,
      startDate: dateFormat(startDate).split(" ")[0],
      endDate: dateFormat(endDate).split(" ")[0],
    });
    return res.status(200).json({
      id: newBooking.id,
      spotId: newBooking.spotId,
      userId: newBooking.userId,
      startDate: dateFormat(newBooking.startDate).split(" ")[0],
      endDate: dateFormat(newBooking.endDate).split(" ")[0],
      createdAt: dateFormat(newBooking.createdAt),
      updatedAt: dateFormat(newBooking.updatedAt),
    });
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
        User: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: dateFormat(booking.startDate).split(" ")[0],
        endDate: dateFormat(booking.endDate).split(" ")[0],
        createdAt: dateFormat(booking.createdAt),
        updatedAt: dateFormat(booking.updatedAt),
      });
    } else {
      arr.push({
        spotId: booking.spotId,
        startDate: dateFormat(booking.startDate).split(" ")[0],
        endDate: dateFormat(booking.endDate).split(" ")[0],
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
  [requireAuth, validateNewReview],
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

    // check authorization
    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    const booking = await Booking.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });
    if (!booking) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    const existingBookings = await Booking.findAll({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });
    const existingReviews = await Review.findAll({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });
    // Interesting - what if a user booked twice
    if (existingBookings.length === existingReviews.length) {
      return res.status(403).json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    }

    // const existingReview = await Review.findOne({
    //   where: {
    //     spotId: spotId,
    //     userId: userId,
    //   },
    // });
    // if (existingReview) {
    //   return res.status(403).json({
    //     message: "User already has a review for this spot",
    //     statusCode: 403,
    //   });
    // }

    const { review, stars } = req.body;
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });
    return res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: dateFormat(newReview.createdAt),
      updatedAt: dateFormat(newReview.updatedAt),
    });
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
router.put("/:spotId", [requireAuth, validateNewSpot], async (req, res) => {
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
  // check authorization
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

  return res.status(200).json(spotFormat(spot));
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
    ...spotFormat(spot),
    numReviews: +numReviews || "No reviews yet",
    avgStarRating: +avgStarRating || "No reviews yet",
    SpotImages: spotImages.length === 0 ? "No spot images yet" : spotImages,
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

  // check authorization
  // not spot.userId but ownerId
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

// create new spot
router.post("/", [requireAuth, validateNewSpot], async (req, res) => {
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
  return res.status(201).json({
    id: newSpot.id,
    ownerId: newSpot.ownerId,
    address: newSpot.address,
    city: newSpot.city,
    state: newSpot.state,
    country: newSpot.country,
    lat: +newSpot.lat,
    lng: +newSpot.lng,
    name: newSpot.name,
    description: newSpot.description,
    price: +newSpot.price,
    createdAt: dateFormat(newSpot.createdAt),
    updatedAt: dateFormat(newSpot.updatedAt),
  });
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

  const spots = await Spot.findAll({ ...query });

  let arr = [];
  arr = await spotsWithRatingImg(spots, arr);
  return res.status(200).json({ Spots: arr, page: page, size: size });
});

module.exports = router;
