// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

// // Add a XSRF-TOKEN cookie in development
// to get the XSRF-TOKEN cookie on your frontend application because the React frontend is on a different server than the Express backend
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.status(201).json({});
  });
}

// for testing setup purpose - DNU
// router.get("/hello/world", function (req, res) {
//   // setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   //   sending the text, Hello World! as the response's body
//   res.send("Hello World!");
// });

// // Add a XSRF-TOKEN cookie - allow any developer to re-set the CSRF token cookie XSRF-TOKEN
// router.get("/api/csrf/restore", (req, res) => {
//   // setting a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
//   const csrfToken = req.csrfToken();
//   res.cookie("XSRF-TOKEN", csrfToken);
//   // send the token as the response for easy retrieval
//   res.status(200).json({
//     "XSRF-Token": csrfToken,
//   });
// });

module.exports = router;
