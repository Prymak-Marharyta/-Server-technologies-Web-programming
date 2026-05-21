const AppError = require('../utils/AppError');

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const message = error.details
        .map(item => item.message)
        .join(', ');

      return next(new AppError(message, 400));
    }

    next();
  };
};