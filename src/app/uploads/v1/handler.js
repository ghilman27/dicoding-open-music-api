class UploadsHandler {
  constructor({ service }) {
    this._service = service;
  }

  uploadImage = async (request, h) => {
    const { data } = request.payload;
    const { _data, hapi } = data;
    const options = {
      filename: hapi.filename,
      contentType: hapi.headers['content-type'],
    };

    const pictureUrl = await this._service.upload(_data, options);

    return h
      .response({
        data: {
          pictureUrl,
        },
      })
      .code(201);
  };
}

module.exports = UploadsHandler;
