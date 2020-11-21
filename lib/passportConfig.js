let passport = require("passport");
let Customer = require("../models/customer.models");
let LocalStrategy = require("passport-local").Strategy;
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;

//for passport to handle the login of user
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    Customer.findById(id, function (err, user) {
      done(err, user);
    });
  });

//passport strategy to login. temporary using email and password until further confirmation.
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );

//using jsonwebtoken as authentication after login
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;