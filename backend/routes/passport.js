const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secret", (err, decoded) => {
      User.findOne({ _id: decoded.data._id }, (err, user) => {
        if (!user) {
          return done(null, false);
        }
        if (err) {
          return done(null, false);
        }
        return done(null, { user });
      });
    });
  })
);
