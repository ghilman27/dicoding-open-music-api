const routes = ({ handler, validator, auth }) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylist,
    options: {
      auth,
      validate: {
        payload: validator.PlaylistPayload,
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylists,
    options: {
      auth,
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylist,
    options: {
      auth,
    },
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSong,
    options: {
      auth,
      validate: {
        payload: validator.SongPayload,
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongs,
    options: {
      auth,
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSong,
    options: {
      auth,
    },
  },
];

module.exports = routes;
