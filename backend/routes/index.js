// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// for testing setup purpose - DNU
// router.get("/hello/world", function (req, res) {
//   // setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   //   sending the text, Hello World! as the response's body
//   res.send("Hello World!");
// });

// Add a XSRF-TOKEN cookie - allow any developer to re-set the CSRF token cookie XSRF-TOKEN
router.get("/api/csrf/restore", (req, res) => {
  // setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  // send the token as the response for easy retrieval
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
