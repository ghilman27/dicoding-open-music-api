const md5 = require('md5');

class StorageService {
  constructor({ blobStorage }) {
    this._storage = blobStorage;
  }

  _randomHash = () => md5(Math.random()).substring(0, 5);

  async upload(buffer, { filename, contentType }) {
    const options = {
      key: `${Date.now()}_${this._randomHash()}_${filename}`,
      contentType,
    };

    return this._storage.upload(buffer, options);
  }
}

module.exports = StorageService;
