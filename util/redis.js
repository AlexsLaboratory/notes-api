const redis = require("redis");
const crypto = require("crypto");
const {CustomError} = require("./error");

function redisInstance() {
  const client = redis.createClient({
    url: "redis://redis:6379"
  });
  client.on("connect", () => {
    console.log("Redis Client Connected!");
  });
  client.on("error", (err) => {
    throw new CustomError(err, 500);
  });
  client.connect();
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
    return await instance.set(key, value, {
      EX: time,
      NX: true
    });
  } catch (e) {
    throw new CustomError(e, 500);
  }
}