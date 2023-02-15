// backend/routes/index.js
const express = require("express");
const router = express.Router();

// for testing setup purpose - DNU
// router.get("/hello/world", function (req, res) {
//   // setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   //   sending the text, Hello World! as the response's body
//   res.send("Hello World!");
// });

module.exports = router;
