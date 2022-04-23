const redis = require('redis');
const client = redis.createClient({
  "socket.host": "redis"
});
client.set("key", "testvalue").then(r => console.log(r));
client.expire('key', 300).then(r => console.log(r));