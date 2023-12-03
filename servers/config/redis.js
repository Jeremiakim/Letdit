const Redis = require("ioredis");

const redis = new Redis(
  "redis://default:oEMbFW39ANls01V2PeKgai64G07V1kCI@redis-18838.c1.asia-northeast1-1.gce.cloud.redislabs.com:18838"
);

module.exports = redis;
