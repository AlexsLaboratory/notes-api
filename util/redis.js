const redis = require("redis");
const crypto = require("crypto");
const {CustomError} = require("./error");

function redisInstance() {
  return redis.createClient({
    url: "redis://redis:6379"
  });
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
    return await instance.set(key, value, {
      EX: time,
      NX: true
    });
  } catch (e) {
    throw new CustomError(e, 500);
  }
}