const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  rating: {
    type: Number,
    required: [true, 'Оцінка обов’язкова'],
    min: 1,
    max: 5
  },

  comment: {
    type: String,
    required: [true, 'Коментар обов’язковий'],
    trim: true,
    minlength: 10,
    maxlength: 500
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);