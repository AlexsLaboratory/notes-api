const jwt = require("jsonwebtoken");
const {CustomError, catchAsync} = require("../util/error");
const {verifyAccessToken} = require("../util/jwt");

module.exports = catchAsync(async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const authCookie = req.cookies.accessToken;
  if (!authHeader && !authCookie) return next(new CustomError("Not authenticated", 401));
  let decodedToken;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    decodedToken = await verifyAccessToken(token);
  } else {
    decodedToken = await verifyAccessToken(authCookie);
  }
  req.userID = decodedToken.userID
  next();
});