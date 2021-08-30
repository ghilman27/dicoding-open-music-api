const Joi = require('joi');

const CollaborationsValidator = {
  CollaborationPayloads: Joi.object({
    playlistId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

module.exports = CollaborationsValidator;
