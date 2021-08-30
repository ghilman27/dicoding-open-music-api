const Joi = require('joi');

const PlaylistValidator = {
  PlaylistPayload: Joi.object({
    name: Joi.string().required(),
  }),

  SongPayload: Joi.object({
    songId: Joi.string().required(),
  }),
};

module.exports = PlaylistValidator;
