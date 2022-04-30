const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const {User} = require("../models");
const {signAccessToken} = require("../util/jwt");
const {setKey} = require("../util/redis");
const ms = require("ms");
const {CustomError, catchAsync} = require("../util/error");

exports.signup = catchAsync(async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) return next(new CustomError("Validation failed", 422));
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email: email, password: hashedPassword, firstName: firstName, lastName: lastName,
  });
  const result = await user.save();
  res.status(201).json({message: "User created", userID: result.id});
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser = await User.findOne({where: {email: email}});
  if (!loadedUser) return next(new CustomError("A user with this email could not be found", 404));
  const isAuthorized = await bcrypt.compare(password, loadedUser.password);
  if (!isAuthorized) return next(new CustomError("Check your email and password again", 401));
  const accessToken = await signAccessToken(loadedUser.id);
  const [header, body, signature] = accessToken.split(".");
  const redisPayload = `${header}.${body}`;
  const signatureHash = crypto.createHash("sha256").update(signature).digest("base64");
  const time = ms(process.env.JWT_ACCESS_TOKEN_EXPIRATION) / 1000;
  await setKey(signatureHash, redisPayload, time);
  res.status(200).json({token: signature})
});