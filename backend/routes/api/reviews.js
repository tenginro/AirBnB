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
const { Op } = require("sequelize");

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
const validateNewReviewImage = [
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Image url is required"),
  handleValidationErrors,
];

// post a new reviewImage
router.post(
  "/:reviewId/images",
  requireAuth,
  validateNewReviewImage,
  async (req, res) => {
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
  }
);

// get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId: userId,
    },
  });
  let arr = [];
  for (let i in reviews) {
    let obj = reviews[i].toJSON();
    console.log(reviews[i].toJSON());
    arr.push(obj);
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "firstName", "lastName"],
    });
    const spot = await Spot.findOne({
      where: {
        ownerId: userId,
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
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: parseInt(spot.id),
        preview: true,
      },
      attributes: ["url"],
    });
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: reviews[i].id,
      },
      attributes: ["id", "url"],
    });
    arr[i].User = user;
    if (!previewImage) {
      arr[i].Spot = {
        ...spot.toJSON(),
        previewImage: "Preview image is not set yet",
      };
    } else {
      arr[i].Spot = { ...spot.toJSON(), previewImage: previewImage.url };
    }
    arr[i].ReviewImage = reviewImages;
  }
  return res.status(200).json({
    Reviews: arr,
  });
});

// edit a review
router.put("/:reviewId", requireAuth, validateNewReview, async (req, res) => {
  const reviewId = req.params.reviewId;
  const existingReview = await Review.findOne({
    where: {
      id: reviewId,
    },
  });
  if (!existingReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  const { review, stars } = req.body;
  await existingReview.update({
    review,
    stars,
  });
  return res.status(200).json(existingReview);
});

module.exports = router;
