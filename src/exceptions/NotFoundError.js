const Boom = require('@hapi/boom');

class NotFoundError extends Error {
    constructor(message) {
        const error = Boom.notFound(message);
        return error;
    }
}

module.exports = NotFoundError;
