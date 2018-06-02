const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); // this just pulls out the users collections
// This allows us to not export model in User.js , as when User.js is run users will be loaded in mongoose
// and can be pull by this statement, this is preferred method
// MAKE SURE passport.js IS REQUIRED AFTER User.js IN index.js

// serializeUser will make a cookie for the user
passport.serializeUser((user, done) => {
  // user argument here is what we passed in done() when finding the user
  done(null, user.id); // user.id is the id in database , in mlab user will have _id and inside $oid , .id here used is shortcut to
  // get the id directly
});

passport.deserializeUser((id, done) => {
  // id here is the token(cookie) which was user.id
  User.findById(id).then(user => {
    done(null,user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have this user in database
          done(null, existingUser); // first argument is for any error , if no error pass null
        } else {
          // make a new record for this user
          new User({ googleId: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
); // callbackURL is the URL which user will be redirected to after he grants permission
// 'google' is used to refer to the GoogleStrategy
