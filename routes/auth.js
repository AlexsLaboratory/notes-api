const express = require("express");
const {check} = require("express-validator");
const {User} = require("../models");
const authController = require("../controllers/auth");

const app = express();
app.use(express.json());

app.put("/signup", [
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
    check("name").trim().not().isEmpty()
  ], authController.signup
);

app.post("/login", [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom((value, {req}) => {
        return User.findOne({where: {email: value}}).then(user => {
          if (!user) {
            return Promise.reject("User not found!");
          }
        });
      })
      .normalizeEmail(),
    check("password").trim().isLength({min: 8}),
  ], authController.login
);

module.exports = app;