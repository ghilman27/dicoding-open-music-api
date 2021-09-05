const routes = ({ handler, validator, auth }) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.exportsPlaylists,
    options: {
      auth,
      validate: {
        payload: validator.TargetEmailPayload,
      },
    },
  },
];

module.exports = routes;
