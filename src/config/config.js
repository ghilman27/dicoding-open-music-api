const Config = {
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
      validate: {
        // on ValidationError, pass the error to the next lifecycle
        failAction: (req, h, validationError) => validationError,
      },
    },
  },
  authStrategy: {
    name: 'jwt_strategy',
    config: {
      keys: process.env.ACCESS_TOKEN_KEY,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: process.env.ACCESS_TOKEN_AGE,
      },
      validate: (artifacts) => ({
        isValid: true,
        credentials: {
          id: artifacts.decoded.payload.id,
        },
      }),
    },
  },
  dependencies: [
    /**
     * DATABASE CONNECTION
     */
    { name: 'database', type: 'value', path: './lib/postgres.js' },

    /**
     * JWT TOKEN MANAGER
     */
    {
      name: 'tokenManager',
      type: 'value',
      path: './lib/hapiJwtTokenManager.js',
    },

    /**
     * DATA ACCESS OBJECTS
     */
    {
      name: 'songsModel',
      type: 'class',
      path: './models/postgres/SongsModel.js',
    },
    {
      name: 'usersModel',
      type: 'class',
      path: './models/postgres/UsersModel.js',
    },
    {
      name: 'authenticationsModel',
      type: 'class',
      path: './models/postgres/AuthenticationsModel.js',
    },

    /**
     * BUSINESS LOGIC SERVICES
     */
    {
      name: 'songsService',
      type: 'class',
      path: './services/SongsService.js',
    },
    {
      name: 'usersService',
      type: 'class',
      path: './services/UsersService.js',
    },
    {
      name: 'authenticationsService',
      type: 'class',
      path: './services/AuthenticationsService.js',
    },
  ],
};

module.exports = Config;
