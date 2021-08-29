const Config = {
  dependencies: [
    /**
     * DATABASE CONNECTION
     */
    { name: 'database', type: 'value', path: './lib/postgres.js' },

    /**
     * DATA ACCESS OBJECTS
     */
    {
      name: 'songsModel',
      type: 'class',
      path: './models/postgres/SongsModel.js',
    },

    /**
     * BUSINESS LOGIC SERVICES
     */
    {
      name: 'songsService',
      type: 'class',
      path: './services/SongsService.js',
    },
  ],
};

module.exports = Config;
