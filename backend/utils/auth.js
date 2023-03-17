// backend/utils/auth.js
const jwt = require("jsonwebtoken");

const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
// setting the JWT cookie after a user is logged in or signed up.
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
  // token parsed from cookies

  // console.log("restoreUser backend running");

  const { token } = req.cookies;
  // console.log("this is token from req.cookies");
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    // console.log("return jwt verify running");
    if (err) {
      // console.log("jwt verify if error running", err);
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
      // console.log("this is req.user from restoreUser try block", req.user);
    } catch (e) {
      // console.log("catch e running in restoreUser, this is e", e);
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.title = "Authentication required";
  err.errors = { message: "Authentication required" };
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
