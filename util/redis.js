const Redis = require("ioredis");
const crypto = require("crypto");
const {CustomError} = require("./error");

function redisInstance() {
  const client = new Redis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
  client.on("connect", () => {
    console.log("Redis Client Connected!");
  });
  client.on("error", (err) => {
    throw new CustomError(err, 500);
  });
  return client;
}

const instance = redisInstance();

module.exports.generateHash = (value) => {
  return crypto.createHash("sha256").update(value).digest("base64");
}

module.exports.getKeyPair = async (key) => {
  try {
    return await instance.get(key);
  } catch (e) {
    throw new CustomError(e, 500);
  }
}

module.exports.setKeyPair = async (key, value, time) => {
  try {
    return await instance.set(key, value, "EX", time, "NX");
  } catch (e) {
    throw new CustomError(e, 500);
  }
}

module.exports.setKeyPairEpoch = async (key, value, epoch) => {
  try {
    return await instance.set(key, value, "EXAT", epoch, "NX");
  } catch (e) {
    throw new CustomError(e, 500);
  }
}

module.exports.keyPairExists = async (key) => {
  try {
    return await instance.exists(key);
  } catch (e) {
    throw new CustomError(e, 500);
  }
}