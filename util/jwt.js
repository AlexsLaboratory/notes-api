const jwt = require("jsonwebtoken");
const {getKeyPair, generateHash} = require("./redis");
const {catchAsync, CustomError} = require("./error");

module.exports.signAccessToken = (userID) => {
  return new Promise((resolve, reject) => {
    const payload = {userID: userID};
    const secret = process.env.API_SECRET;
    const options = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      audience: "https://note.alex-lowe.tech",
      issuer: "Note Application INC"
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

async function getJWT(signature) {
  const signatureHash = generateHash(signature);
  const tokenPart = await getKeyPair(signatureHash);
  if (!tokenPart) return null;
  return `${tokenPart}.${signature}`;
}

module.exports.getJWT = getJWT;

module.exports.verifyAccessToken = async (signature) => {
  return new Promise(async (resolve, reject) => {
    const secret = process.env.API_SECRET;
    const options = {
      audience: "https://note.alex-lowe.tech",
      issuer: "Note Application INC"
    }
    const accessToken = await getJWT(signature);
    if (!accessToken) return reject(new CustomError("Not authenticated", 401));
    jwt.verify(accessToken, secret, options, (err, decodedToken) => {
      if (err) return reject(err);
      return resolve(decodedToken)
    });
  });
};