const express = require("express");
const {check} = require("express-validator");
const {User} = require("../models");
const {signup, login, refresh} = require("../controllers/auth");

const app = express();
app.use(express.json());

app.post("/signup", [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email address")
      .custom((value, {req}) => {
        return User.findOne({where: {email: value}}).then(user => {
          if (user) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    check("password").trim().isLength({min: 8}),
    check("firstName").trim().not().isEmpty(),
    check("lastName").trim().not().isEmpty()
  ], signup
);

app.post("/login", [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    check("password").trim().isLength({min: 8}),
  ], login
);

app.post("/refresh", [
  check("refreshToken")
    .not()
    .isEmpty()
], refresh);

module.exports = app;