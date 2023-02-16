// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
// const { requireAuth } = require("../../utils/auth.js");

// router.post("/test", function (req, res) {
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

module.exports = router;
