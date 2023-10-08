const Joi = require("joi");

const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/im;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
}).messages({ "any.required": "missing required {#label} field" });

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({ "any.required": "missing required {#label} field" });

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}).messages({ "any.required": "missing required {#label} field" });

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
}).messages({ "any.required": "missing required field email" });

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};
