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

// helper function
const dateFormat = (str) => {
  let string = new Date(str);
  let date = string.toISOString().split("T")[0];
  let time = string.toLocaleTimeString("en-GB");
  return `${date} ${time}`;
};
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
    // createdAt: dateFormat(spot.createdAt),
    // updatedAt: dateFormat(spot.updatedAt),
  };
  return newSpot;
};

// get all current user's bookings
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    order: [["startDate"]],
  });
  let arr = [];
  for (let i in bookings) {
    let booking = bookings[i].toJSON();
    const spot = await Spot.findOne({
      where: {
        id: booking.spotId,
      },
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
    });
    const spotImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    arr.push({
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        // ...spot.toJSON(),
        ...spotFormat(spot),
        previewImage: spotImage.url,
      },
      userId: booking.userId,
      startDate: dateFormat(booking.startDate).split(" ")[0],
      endDate: dateFormat(booking.endDate).split(" ")[0],
      createdAt: dateFormat(booking.createdAt),
      updatedAt: dateFormat(booking.updatedAt),
    });
  }
  return res.status(200).json({
    Bookings: arr,
  });
});

// edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;

  const { startDate, endDate } = req.body;
  if (endDate <= startDate) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }
  const today = new Date();
  const end = new Date(endDate);
  if (end <= today) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
    },
  });
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const conflict = await Booking.findOne({
    where: {
      spotId: booking.spotId,
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
  await booking.update({
    startDate,
    endDate,
  });
  return res.status(200).json(booking);
});

// delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const booking = await Booking.findOne({
    where: {
      id: req.params.bookingId,
    },
  });
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const spot = await Spot.findOne({
    where: {
      id: booking.spotId,
    },
  });
  if (booking.userId !== req.user.id && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  let start = new Date(booking.startDate);
  let end = new Date(booking.endDate);
  // Interesting - timezone!!!!
  let endPlus = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  let now = new Date();

  if (start.getTime() <= now.getTime() && endPlus.getTime() >= now.getTime()) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }
  await booking.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
