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
    // .withMessage("Please provide a valid email."),
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const dateFormat = (str) => {
  let string = new Date(str);
  let date = string.toISOString().split("T")[0];
  let time = string.toLocaleTimeString("en-GB");
  return `${date} ${time}`;
};

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  // call the signup static method on the User model

  const emailExist = await User.findOne({
    where: {
      email: email,
    },
  });
  const usernameExist = await User.findOne({
    where: {
      username: username,
    },
  });
  if (emailExist) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }
  if (usernameExist) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that username already exists",
      },
    });
  }
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
    createdAt: dateFormat(user.createdAt),
    updatedAt: dateFormat(user.updatedAt),
    // token: token,
  };
  return res.json({ user: returnUser });
  // If the creation of the user is unsuccessful, then a Sequelize Validation error will be passed onto the next error-handling middleware.
});

// // to remove at the end -  get all users
// router.get("/", async (req, res) => {
//   const users = await User.findAll({
//     attributes: ["id", "firstName", "lastName", "email", "username"],
//   });
//   return res.json(users);
// });

module.exports = router;
