class CacheService {
  constructor({ cacheClient }) {
    this._client = cacheClient;
  }

  async set(key, value, expirationInSeconds = 3600) {
    this._client.set(key, value, expirationInSeconds);
  }

  async get(key) {
    return this._client.get(key);
  }

  async delete(key) {
    this._client.delete(key);
  }
}

module.exports = CacheService;
