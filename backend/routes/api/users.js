// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  // call the signup static method on the User model

  const user = await User.signup({
    email,
    username,
    firstName,
    lastName,
    password,
  });
  // If the user is successfully created, then call setTokenCookie and return a JSON response with the user information
  const token = await setTokenCookie(res, user);

  // // origin code from auth.me
  // return res.json({
  //   user: user,
  // });

  // to return one {}
  const returnUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token: token,
  };
  return res.json(returnUser);
  // If the creation of the user is unsuccessful, then a Sequelize Validation error will be passed onto the next error-handling middleware.
});

module.exports = router;
