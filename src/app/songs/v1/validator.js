const Joi = require('joi');

const SongsValidator = {
  songPayload: Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(2030)
      .required(),
    performer: Joi.string().required(),
    genre: Joi.string(),
    duration: Joi.number().integer(),
  }),
};

module.exports = SongsValidator;
