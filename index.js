const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// client ID-  

// Client secret

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server has started");
});
