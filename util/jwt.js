const jwt = require("jsonwebtoken");
const {getKeyPair, generateHash} = require("./redis");

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

function getJWT(signature) {
  const signatureHash = generateHash(signature);
  const tokenPart = getKeyPair(signatureHash);
  return `${tokenPart}.${signature}`;
}

module.exports.getJWT = getJWT;

module.exports.verifyAccessToken = (signature) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.API_SECRET;
    const options = {
      audience: "https://note.alex-lowe.tech",
      issuer: "Note Application INC"
    }
    const accessToken = getJWT(signature);
    jwt.verify(accessToken, secret, options, (err, decodedToken) => {
      if (err) return reject(err);
      return resolve(decodedToken)
    });
  });
}