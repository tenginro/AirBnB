const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  ReviewImage,
  SpotImage,
  sequelize,
} = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

require("dotenv").config();

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

// post a new reviewImage
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const { url } = req.body;
  const review = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  //   review must belong to the current user
  if (parseInt(review.userId) !== parseInt(req.user.id)) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const existingReviewImages = await ReviewImage.count({
    where: {
      reviewId: reviewId,
    },
  });
  if (existingReviewImages >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  const newReviewImage = await ReviewImage.create({
    reviewId: reviewId,
    url: url,
  });
  return res.status(200).json({
    id: newReviewImage.id,
    url: newReviewImage.url,
  });
});

module.exports = router;
