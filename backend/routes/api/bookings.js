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
    });
    arr.push({
      id: booking.id,
      spotId: booking.spotId,
      Spot: spot,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    });
  }
  return res.status(200).json({
    Bookings: arr,
  });
});

module.exports = router;
