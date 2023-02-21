const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  for (let spot of spots) {
    // console.log("spotid", spot.id);
    let totalRating = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    // console.log(totalRating);
    let countRating = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    // console.log(countRating);
    let avgRating = (totalRating / countRating).toFixed(1);
    console.log(avgRating);
    spot.avgRating = avgRating;
  }

  return res.status(200).json({ Spots: spots });
});

module.exports = router;
