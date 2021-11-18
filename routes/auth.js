const path = require("path");
const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/user");
const authController = require("../controllers/auth");

const app = express();
app.use(express.json());

app.put("/signup", [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email address")
      .custom((value, {req}) => {
        return User.findOne({where: {email: value} }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({min: 8}),
    body("name").trim().not().isEmpty()
  ], authController.signup
);

module.exports = app;