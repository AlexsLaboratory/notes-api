const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = (req, res, body) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name
      })
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: "User created", userId: result.id });
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.login = (req, res, body) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Login failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then(user => {
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            return res.status(201).json({ message: "Correct password." })
          }
          return res.status(422).json({ message: "Incorrect password." })
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        })
    })

}