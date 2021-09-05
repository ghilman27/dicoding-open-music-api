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
     * MESSAGE BROKER
     */
    {
      name: 'messageBroker',
      type: 'value',
      path: './lib/rabbitmq.js',
    },

    /**
     * FILE / BLOB STORAGE CLIENT
     */
    {
      name: 'blobStorage',
      type: 'class',
      path: './lib/s3.js',
    },

    /**
     * CACHE CLIENT
     */
    {
      name: 'cacheClient',
      type: 'class',
      path: './lib/redis.js',
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
    {
      name: 'playlistsModel',
      type: 'class',
      path: './models/postgres/PlaylistsModel.js',
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
    {
      name: 'playlistsService',
      type: 'class',
      path: './services/PlaylistsService.js',
    },
    {
      name: 'producerService',
      type: 'class',
      path: './services/ProducerService.js',
    },
    {
      name: 'storageService',
      type: 'class',
      path: './services/StorageService.js',
    },
    {
      name: 'cacheService',
      type: 'class',
      path: './services/CacheService.js',
    },
  ],
};

module.exports = Config;
