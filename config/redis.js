const { Redis } = require("@upstash/redis");

module.exports = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
