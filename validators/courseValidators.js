const Joi = require('joi');

exports.createCourseSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(2).max(50).required()
});