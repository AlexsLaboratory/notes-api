const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
            crypto.randomBytes(32, (err, buffer) => {
              if (err) {
                return res.status(500).json({ message: "Internal server error." })
              }
              const token = buffer.toString('hex');
              user.loginToken = token;
              user.loginTokenExpiration = Date.now() + 604800000 // expires in one week
              user.save();
              return res.status(200).json({ email: email, token: token })
            })
          }
          else return res.status(422).json({ message: "Incorrect password." })
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        })
    })

}