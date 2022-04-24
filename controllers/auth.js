const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const {User} = require("../models");
const {signAccessToken} = require("../util/jwt");
const {setKey} = require("../util/redis");
const ms = require("ms");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email, password: hashedPassword, firstName: firstName, lastName: lastName,
      })
      return user.save();
    })
    .then(result => {
      res.status(201).json({message: "User created", userID: result.id});
    }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser = await User.findOne({where: {email: email}});
    if (!loadedUser) return createError(404, "A user with this email could not be found");
    const isAuthorized = bcrypt.compare(password, loadedUser.password);
    if (!isAuthorized) return createError(401, "Check your email and password again");
    const accessToken = await signAccessToken(loadedUser.id);
    const [header, body, signature] = accessToken.split(".");
    const redisPayload = `${header}.${body}`;
    const signatureHash = crypto.createHash("sha256").update(signature).digest("base64");
    const time = ms(process.env.JWT_ACCESS_TOKEN_EXPIRATION) / 1000;
    await setKey(signatureHash, redisPayload, time);
    res.status(200).json({token: signature})
  } catch (err) {
    const error = createError(500, "Sorry something on our end failed");
    next(error);
  }
}