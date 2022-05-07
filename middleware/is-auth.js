const jwt = require("jsonwebtoken");
const {CustomError, catchAsync} = require("../util/error");
const {verifyAccessToken} = require("../util/jwt");

module.exports = catchAsync(async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return next(new CustomError("Not authenticated", 401));
  const token = authHeader.split(" ")[1];
  const decodedToken = await verifyAccessToken(token);
  if (!decodedToken) return next(new CustomError("Not authenticated", 401));
  req.userID = decodedToken.userID
  next();
});