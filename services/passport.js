const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); // this just pulls out the users collections
// This allows us to not export model in User.js , as when User.js is run users will be loaded in mongoose
// and can be pull by this statement, this is preferred method
// MAKE SURE passport.js IS REQUIRED AFTER User.js IN index.js

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id}).then((existingUser)=> {
        if (existingUser) {
          // already have this user in database
        } else {
          // make a new record for this user
          new User({ googleId: profile.id }).save();
        }
      })
    }
  )
); // callbackURL is the URL which user will be redirected to after he grants permission
// 'google' is used to refer to the GoogleStrategy
