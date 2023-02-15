const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { environment } = require("./config"); //if not specified, will look at the index file
const routes = require("./routes");

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

app.use(routes); // Connect all the routes

module.exports = app;
