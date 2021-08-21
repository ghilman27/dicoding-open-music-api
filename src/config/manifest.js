const createManifest = (dependency) => ({
    server: {
        port: process.env.PORT || 5000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
            validate: {
                failAction: (req, h, validationError) => {
                    // pass the error to the next lifecycle
                    return validationError;
                },
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
                    validator: dependency.resolve('songsValidator'),
                },
            },
        ],
    },
});

module.exports = createManifest;
