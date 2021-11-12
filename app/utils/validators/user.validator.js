const Joi = require("joi");
const signUpSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports = signUpSchema;
