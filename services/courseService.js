const Course = require('../models/Course');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

exports.getAllCourses = async (queryParams = {}) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (queryParams.category) {
    filter.category = queryParams.category;
  }

  const courses = await Course.find(filter)
    .populate('createdBy', 'name email')
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(filter);

  return {
    courses,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

exports.getCourseById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Курс не знайдено', 404);
  }

  const course = await Course.findById(id).populate('createdBy', 'name email');

  if (!course) {
    throw new AppError('Курс не знайдено', 404);
  }

  return course;
};

exports.createCourse = async (data, userId) => {
  const course = await Course.create({
    ...data,
    createdBy: userId
  });

  return course;
};

exports.updateCourse = async (id, data, currentUser) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Курс не знайдено', 404);
  }

  const course = await Course.findById(id);

  if (!course) {
    throw new AppError('Курс не знайдено', 404);
  }

  if (
    course.createdBy.toString() !== currentUser._id.toString() &&
    currentUser.role !== 'admin'
  ) {
    throw new AppError('Ви не маєте прав редагувати цей запис', 403);
  }

  Object.assign(course, data);
  await course.save();

  return course;
};

exports.deleteCourse = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Курс не знайдено', 404);
  }

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    throw new AppError('Курс не знайдено', 404);
  }

  return course;
};