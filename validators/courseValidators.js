const Joi = require('joi');

exports.createCourseSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
    .messages({
      'string.min': 'Назва курсу має містити мінімум 3 символи',
      'string.max': 'Назва курсу не може бути довшою за 100 символів',
      'any.required': 'Назва курсу обов’язкова'
    }),

  description: Joi.string().max(1000).allow('')
    .messages({
      'string.max': 'Опис курсу не може бути довшим за 1000 символів'
    }),

  price: Joi.number().min(0).required()
    .messages({
      'number.min': 'Ціна не може бути від’ємною',
      'any.required': 'Ціна обов’язкова'
    }),

  category: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Категорія має містити мінімум 2 символи',
      'string.max': 'Категорія не може бути довшою за 50 символів',
      'any.required': 'Категорія обов’язкова'
    })
});