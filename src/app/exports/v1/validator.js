const Joi = require('joi');

const ExportsValidator = {
  TargetEmailPayload: Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required(),
  }),
};

module.exports = ExportsValidator;
