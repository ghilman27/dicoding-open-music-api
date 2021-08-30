const routes = ({ handler, validator, auth }) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaboration,
    options: {
      auth,
      validate: {
        payload: validator.CollaborationPayload,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaboration,
    options: {
      auth,
      validate: {
        payload: validator.CollaborationPayload,
      },
    },
  },
];

module.exports = routes;
