const Joi = require('joi');
const loginValidationSchema = Joi.object({
    name: Joi.string().min(5).max(20).required()
});

module.exports = { loginValidationSchema }