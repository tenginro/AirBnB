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

// delete a review image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const img = await ReviewImage.findOne({
    where: {
      id: req.params.imageId,
    },
  });
  if (!img) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }
  const review = await Review.findOne({
    where: {
      id: img.reviewId,
    },
  });
  if (review.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await img.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
