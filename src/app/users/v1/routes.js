const routes = ({ handler, validator }) => [
  {
    method: 'POST',
    path: '/users',
    options: {
      handler: handler.registerUser,
      validate: {
        payload: validator.registerPayload,
      },
    },
  },
];

module.exports = routes;
