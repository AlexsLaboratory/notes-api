const redis = require("redis");
const crypto = require("crypto");

function redisInstance() {
  return redis.createClient({
    url: "redis://redis:6379"
  });
}

module.exports.generateHash = (value) => {
  return crypto.createHash("sha256").update(value).digest("base64");
}

module.exports.getKeyPair = async (key) => {
  try {
    const instance = redisInstance();
    await instance.connect();
    const result = await instance.get(key);
    await instance.quit();
    return result;
  } catch (e) {
    return e;
  }
}

module.exports.setKeyPair = async (key, value, time) => {
  try {
    const instance = redisInstance();
    await instance.connect();
    const result = await instance.set(key, value, {
      EX: time,
      NX: true
    });
    await instance.quit();
    return result;
  } catch (e) {
    return e;
  }
}