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

// helper function
const dateFormat = (str) => {
  let string = new Date(str);
  let date = string.toISOString().split("T")[0];
  let time = string.toLocaleTimeString("en-GB");
  return `${date} ${time}`;
};

// create a new reviewImage
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
    if (review.userId !== req.user.id) {
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
        id: userId,
      },
      attributes: ["id", "firstName", "lastName"],
    });
    const spot = await Spot.findOne({
      where: {
        id: review.spotId,
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
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id,
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

    if (reviewImages.length > 0) {
      arr[i].ReviewImages = reviewImages;
    } else arr[i].ReviewImages = "No review images yet";
  }

  if (arr.length > 0) {
    return res.status(200).json({
      Reviews: arr,
    });
  }
  return res.status(200).json({
    Reviews: "No reviews yet",
  });
});

// edit a review
router.put("/:reviewId", requireAuth, validateNewReview, async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;
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
  if (existingReview.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const { review, stars } = req.body;
  await existingReview.update({
    review,
    stars,
  });
  return res.status(200).json({
    id: existingReview.id,
    userId: existingReview.userId,
    spotId: existingReview.spotId,
    review: existingReview.review,
    stars: existingReview.stars,
    createdAt: dateFormat(existingReview.createdAt),
    updatedAt: dateFormat(existingReview.updatedAt),
  });
});

// delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
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
  if (review.userId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await review.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
