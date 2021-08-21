const {
    CLIENT_ERROR_STATUS,
    INTERNAL_ERROR_STATUS,
    SUCCESS_STATUS,
} = require('../config/messages');

module.exports = {
    name: 'onPreResponse Handler',
    version: '1.0.0',
    register: async (server) => {
        server.ext('onPreResponse', (request, h) => {
            const { response } = request;
            const { statusCode } = response;

            const isBoom = response instanceof Error && response.isBoom;
            const isClientError = isBoom && !response.isServer;
            const isInternalError = isBoom && response.isServer;
            const isSuccess = statusCode >= 200 && statusCode < 300;

            // Client Error!
            if (isClientError) {
                response.output.payload.status = CLIENT_ERROR_STATUS;
                console.error(response);
            }

            // Internal Server Error!
            if (isInternalError) {
                response.output.payload.status = INTERNAL_ERROR_STATUS;
                console.error(response);
            }

            // Successful Response
            if (isSuccess) {
                return h
                    .response({
                        status: SUCCESS_STATUS,
                        ...response.source,
                    })
                    .code(statusCode);
            }

            return response.continue || response;
        });
    },
};
