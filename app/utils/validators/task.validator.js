const Joi = require("joi");
const taskSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  author: Joi.string(),
});

module.exports = taskSchema;
