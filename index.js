const express = require("express");
const mongoose = require("mongoose");
const {mongoURI} = require("./config/keys");
require("./services/passport"); // Since passport.js doesnt return something no need to assign to a variable
// this will be just executed directly.
const authRoutes = require("./routes/authRoutes");
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI);

authRoutes(app); // this passes app in the authRoutes thus app.get and app.post will work

app.listen(PORT, () => {
  console.log("Server has started");
});
