const jwt = require("jsonwebtoken");
const {getKeyPair, generateHash, setKeyPair} = require("./redis");
const {CustomError} = require("./error");
const ms = require("ms");

async function getJWT(signature) {
  const signatureHash = generateHash(signature);
  const tokenPart = await getKeyPair(signatureHash);
  if (!tokenPart) return null;
  return `${tokenPart}.${signature}`;
}

module.exports.getJWT = getJWT;

async function signAccessToken(userID) {
  return new Promise((resolve, reject) => {
    const payload = {userID: userID};
    const secret = process.env.ACCESS_TOKEN_SECRET;
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

module.exports.signAccessToken = signAccessToken;

async function signRefreshToken(userID) {
  return new Promise((resolve, reject) => {
    const payload = {userID: userID};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      audience: "https://note.alex-lowe.tech",
      issuer: "Note Application INC"
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

module.exports.signRefreshToken = signRefreshToken;

module.exports.verifyAccessToken = async (signature) => {
  return new Promise(async (resolve, reject) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
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

module.exports.verifyRefreshToken = async (signature) => {
  return new Promise(async (resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      audience: "https://note.alex-lowe.tech",
      issuer: "Note Application INC"
    }
    const refreshToken = await getJWT(signature);
    if (!refreshToken) return reject(new CustomError("Not authenticated", 401));
    jwt.verify(refreshToken, secret, options, (err, decodedToken) => {
      if (err) return reject(err);
      return resolve(decodedToken)
    });
  });
};

module.exports.generateTokenPair = async (userID, tokenType = "access") => {
  let token;
  let time;
  if (tokenType === "access") {
    token = await signAccessToken(userID);
    time = ms(process.env.JWT_ACCESS_TOKEN_EXPIRATION) / 1000;
  } else if (tokenType === "refresh") {
    token = await signRefreshToken(userID);
    time = ms(process.env.JWT_REFRESH_TOKEN_EXPIRATION) / 1000;
  }
  const [header, body, signature] = token.split(".");
  const redisPayload = `${header}.${body}`;
  const signatureHash = generateHash(signature);
  await setKeyPair(signatureHash, redisPayload, time);
  return signature;
}