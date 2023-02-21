// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotRouter = require("./spots.js");
const reviewRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js");

const { restoreUser } = require("../../utils/auth.js");
// const { requireAuth } = require("../../utils/auth.js");

// router.post("/test", requireAuth, function (req, res) {
//   res.json({ requestBody: req.body });
// });

// // GET /api/set-token-cookie
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
// // GET /api/restore-user
router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// // GET /api/require-auth
// router.get("/require-auth", requireAuth, (req, res) => {
//   // If there is no session user, the route will return an error. Otherwise it will return the session user's information.
//   return res.json(req.user);
// });

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/reviews", reviewRouter);
router.use("/bookings", bookingRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
