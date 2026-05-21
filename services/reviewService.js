const Review = require('../models/Review');
const AppError = require('../utils/AppError');

exports.getReviewsByCourse = async (courseId) => {
  return await Review.find({ course: courseId })
    .populate('user', 'name email');
};

exports.createReview = async (data, courseId, userId) => {
  try {
    return await Review.create({
      rating: data.rating,
      comment: data.comment,
      course: courseId,
      user: userId
    });
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('Ви вже залишали відгук до цього курсу', 400);
    }

    throw err;
  }
};

exports.deleteReview = async (reviewId, currentUser) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError('Відгук не знайдено', 404);
  }

  if (
    review.user.toString() !== currentUser._id.toString() &&
    currentUser.role !== 'admin'
  ) {
    throw new AppError('Ви не маєте прав видалити цей відгук', 403);
  }

  await review.deleteOne();

  return review;
};