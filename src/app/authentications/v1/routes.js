const routes = ({ handler, validator }) => [
  {
    method: 'POST',
    path: '/authentications',
    options: {
      handler: handler.login,
      validate: {
        payload: validator.credentialPayload,
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    options: {
      handler: handler.refreshToken,
      validate: {
        payload: validator.refreshTokenPayload,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    options: {
      handler: handler.logout,
      validate: {
        payload: validator.refreshTokenPayload,
      },
    },
  },
];

module.exports = routes;
