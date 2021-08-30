const Joi = require('joi');

const AuthenticationsValidator = {
  refreshTokenPayload: Joi.object({
    refreshToken: Joi.string().required(),
  }),
  credentialPayload: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = AuthenticationsValidator;
