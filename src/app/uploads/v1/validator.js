const Joi = require('joi');

const UploadsValidator = {
  ImageFile: Joi.object({
    data: Joi.object({
      hapi: Joi.object({
        headers: Joi.object({
          'content-type': Joi.string()
            .valid(
              'image/apng',
              'image/avif',
              'image/gif',
              'image/jpeg',
              'image/png',
              'image/webp',
            )
            .required(),
        }).unknown(),
      }).unknown(),
    }).unknown(),
  }),
};

module.exports = UploadsValidator;
