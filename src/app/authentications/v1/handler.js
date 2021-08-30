const Boom = require('@hapi/boom');
const MESSAGES = require('../../../config/messages');
const Exceptions = require('../../../exceptions/authentications');

class AuthHandler {
  constructor({ service }) {
    this._service = service;
  }

  login = async (request, h) => {
    try {
      const { username, password } = request.payload;
      const tokens = await this._service.login(username, password);
      return h
        .response({
          message: MESSAGES.AUTH_LOGIN_SUCCESS,
          data: tokens,
        })
        .code(201);
    } catch (error) {
      if (error instanceof Exceptions.WrongPassword) {
        throw Boom.unauthorized(MESSAGES.AUTH_LOGIN_WRONG_PASSWORD);
      }
      if (error instanceof Exceptions.WrongUsername) {
        throw Boom.unauthorized(MESSAGES.AUTH_LOGIN_WRONG_USERNAME);
      }
      throw error;
    }
  };

  refreshToken = async (request, h) => {
    try {
      const { refreshToken } = request.payload;
      const accessToken = await this._service.refreshToken(refreshToken);
      return h
        .response({
          message: MESSAGES.AUTH_REFRESH_TOKEN_SUCCESS,
          data: {
            accessToken,
          },
        })
        .code(200);
    } catch (error) {
      if (error instanceof Exceptions.TokenNotFound) {
        throw Boom.badRequest(MESSAGES.AUTH_REFRESH_TOKEN_NOT_FOUND);
      }
      if (error instanceof Exceptions.InvalidTokenSignature) {
        throw Boom.badRequest(MESSAGES.AUTH_REFRESH_TOKEN_INVALID_SIGNATURE);
      }
      throw error;
    }
  };

  logout = async (request, h) => {
    try {
      const { refreshToken } = request.payload;
      await this._service.logout(refreshToken);
      return h
        .response({
          message: MESSAGES.AUTH_LOGOUT_SUCCESS,
        })
        .code(200);
    } catch (error) {
      if (error instanceof Exceptions.TokenNotFound) {
        throw Boom.badRequest(MESSAGES.AUTH_REFRESH_TOKEN_NOT_FOUND);
      }
      if (error instanceof Exceptions.InvalidTokenSignature) {
        throw Boom.badRequest(MESSAGES.AUTH_REFRESH_TOKEN_INVALID_SIGNATURE);
      }
      throw error;
    }
  };
}

module.exports = AuthHandler;
