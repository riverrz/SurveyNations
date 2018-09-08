const passport = require("passport"); // this is node module

module.exports = app => {
  // we will require this is index.js so app.get and app.post will work fine
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // automatically inserted by passport
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
