const routes = ({ handler, validator }) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.uploadImage,
    options: {
      validate: {
        payload: validator.ImageFile,
      },
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 1000 * 100 * 5,
      },
    },
  },
];

module.exports = routes;
