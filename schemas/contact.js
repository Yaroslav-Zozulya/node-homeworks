const Joi = require("joi");

const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const addSchemaErrorMessages = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format 000-000-00-00",
  "object.min": "missing fields",
  "any.required": "missing required {#label} field",
};

const updateFavoriteSchemaErrorMessages = {
  "any.required": "missing field favorite",
  "object.min": "missing field favorite",
};

const addSchema = Joi.object()
  .min(1)
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(phoneRegex).required(),
      favorite: Joi.boolean(),
    }),
  })
  .messages(addSchemaErrorMessages);

const updateFavoriteSchema = Joi.object()
  .min(1)
  .when(Joi.object().min(1), {
    then: Joi.object({
      favorite: Joi.boolean().required(),
    }),
  })
  .messages(updateFavoriteSchemaErrorMessages);

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
