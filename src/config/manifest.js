const Config = require('./config');

const createManifest = (dependency) => ({
  server: Config.server,
  register: {
    plugins: [
      /**
       * AUTHENTICATION STRATEGY
       */
      {
        plugin: './plugins/jwtAuthStrategy',
        options: Config.authStrategy,
      },

      /**
       * PRE RESPONSE HANDLER
       */
      {
        plugin: './plugins/onPreResponse',
      },

      /**
       * APP ROUTES
       */
      {
        plugin: './app/songs/v1',
        options: {
          service: dependency.resolve('songsService'),
        },
      },
      {
        plugin: './app/users/v1',
        options: {
          service: dependency.resolve('usersService'),
        },
      },
      {
        plugin: './app/authentications/v1',
        options: {
          service: dependency.resolve('authenticationsService'),
        },
      },
      {
        plugin: './app/playlists/v1',
        options: {
          service: dependency.resolve('playlistsService'),
          auth: Config.authStrategy.name,
        },
      },
      {
        plugin: './app/collaborations/v1',
        options: {
          service: dependency.resolve('playlistsService'),
          auth: Config.authStrategy.name,
        },
      },
    ],
  },
});

module.exports = createManifest;
