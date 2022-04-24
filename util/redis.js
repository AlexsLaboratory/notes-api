const redis = require('redis');

function redisInstance() {
  return redis.createClient({
    url: "redis://redis:6379"
  });
}

module.exports.getKey = async (key) => {
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

module.exports.setKey = async (key, value, time) => {
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