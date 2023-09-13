const Joi = require("joi");

const emailRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const addSchemaErrorMessages = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format 000-000-00-00",
  "any.required": "missing required {#label} field",
};

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(emailRegex).required(),
}).messages(addSchemaErrorMessages);

module.exports = {
  addSchema,
};
