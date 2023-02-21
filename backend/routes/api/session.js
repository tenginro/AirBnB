// backend/routes/api/session.js
const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  // check whether or not req.body.credential and req.body.password are empty
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    // .withMessage("Please provide a valid email or username."),
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    // .withMessage("Please provide a password."),
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    // const err = new Error("Login failed");
    const err = new Error("Invalid credentials");
    err.status = 401;
    // err.title = "Login failed";
    // err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  await setTokenCookie(res, user);

  const returnUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
  return res.status(200).json({
    user: returnUser,
  });
});

// Log out
// remove the token cookie from the response and return a JSON success message.
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
// If there is not a session, it will return a JSON with an empty object. To get the session user, connect the restoreUser middleware.
// Answered: shall i remove restoreUser here since it is applied globally? - Certainly
// router.get("/", restoreUser, requireAuth, (req, res) => {
router.get("/", requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).json({
      // user: user.toSafeObject(),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    });
  } else return res.json({ user: null });
});

module.exports = router;
