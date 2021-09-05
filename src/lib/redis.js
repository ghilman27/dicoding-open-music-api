const redis = require('redis');

class RedisClient {
  constructor() {
    this._client = redis.createClient({
      host: process.env.REDIS_SERVER,
      port: process.env.REDIS_PORT,
    });

    this._client.on('error', (error) => {
      console.error(error);
    });
  }

  set(key, value, expirationInSeconds) {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, 'EX', expirationInSeconds, (error, ok) => {
        if (error) return reject(error);

        console.log(`Set key: ${key} with value: ${value}`);
        return resolve(ok);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this._client.get(key, (error, value) => {
        if (error) return reject(error);

        console.log(`Get key: ${key} with value: ${value}`);
        return resolve(value);
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, (error, deleteCount) => {
        if (error) return reject(error);

        console.log(`Delete key: ${key}`);
        return resolve(deleteCount);
      });
    });
  }
}

module.exports = RedisClient;
