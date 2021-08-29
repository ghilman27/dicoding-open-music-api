const createManifest = (dependency) => ({
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
      validate: {
        // pass the error to the next lifecycle
        failAction: (req, h, validationError) => validationError,
      },
    },
  },
  register: {
    plugins: [
      /**
       * COMMON PLUGINS
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
    ],
  },
});

module.exports = createManifest;
