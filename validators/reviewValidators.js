const Joi = require('joi');

exports.createReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required()
    .messages({
      'number.min': 'Оцінка не може бути менше 1',
      'number.max': 'Оцінка не може бути більше 5',
      'any.required': 'Оцінка обов’язкова'
    }),

  comment: Joi.string().min(10).max(500).required()
    .messages({
      'string.min': 'Коментар має містити мінімум 10 символів',
      'string.max': 'Коментар не може бути довшим за 500 символів',
      'any.required': 'Коментар обов’язковий'
    })
});