const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { environment } = require("./config"); //if not specified, will look at the index file
const routes = require("./routes");
// catching Sequelize errors
const { ValidationError } = require("sequelize");

// true if the environment is in production
const isProduction = environment === "production";

// Initialize the Express application
const app = express();
// connect morgan middleware for logging info about req and res
app.use(morgan("dev"));

// cookie-parser middleware for parsing cookies
app.use(cookieParser());
// express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development, CORS isn't needed in production since all of our React and Express resources will come from the same origin
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    // allow images with URLs to render in deployment.
    policy: "cross-origin",
  })
);

// testing
app.use((req, res, next) => {
  console.log("!!!!!!Before csurf in app.use csurf!!!!!!!"), next();
});

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    // configure it to use cookies
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// testing
app.use((req, res, next) => {
  console.log("!!!!!!after csurf in app.use csurf!!!!!!!");
  next();
});

// testing
app.use((req, res, next) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CSRF token:", req.csrfToken());
  next();
});

app.use(routes); // Connect all the routes
// make sure you are defining your error handlers after your route connections in app.js (i.e., after app.use(routes)).

// Error handlers - START
// Catch unhandled requests 404 and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  console.log("sequelize", err);
  console.log(err instanceof ValidationError);
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// Error formatter before returning a JSON response
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    // title: err.title || "Server Error",
    message: err.message,
    statusCode: res.statusCode,
    errors: err.errors,
    // leave it as it is
    stack: isProduction ? null : err.stack,
  });
});
// Error handlers - END

module.exports = app;
