const Boom = require('@hapi/boom');
const MESSAGES = require('../../../config/messages');
const Exceptions = require('../../../exceptions/users');

class UsersHandler {
  constructor({ service }) {
    this._service = service;
  }

  registerUser = async (request, h) => {
    try {
      const userId = await this._service.addUser(request.payload);
      return h
        .response({
          message: MESSAGES.USERS_REGISTER_SUCCESS,
          data: { userId },
        })
        .code(201);
    } catch (error) {
      if (error instanceof Exceptions.UsernameExists) {
        throw Boom.badRequest(MESSAGES.USERS_USERNAME_EXISTS);
      }
      throw error;
    }
  }
}

module.exports = UsersHandler;
