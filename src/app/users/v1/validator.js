const Joi = require('joi');

const UsersValidator = {
  registerPayload: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    fullname: Joi.string().required(),
  }),
};

module.exports = UsersValidator;
