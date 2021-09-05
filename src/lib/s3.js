const AWS = require('aws-sdk');

class S3Client {
  constructor() {
    this._client = new AWS.S3();
    this._defaultParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
    };
  }

  async upload(buffer, { key, contentType }) {
    const params = {
      ...this._defaultParams,
      Key: key,
      ContentType: contentType,
      Body: buffer,
    };

    const upload = this._client.upload(params);
    const data = await upload.promise();
    return data.Location;
  }
}

module.exports = S3Client;
