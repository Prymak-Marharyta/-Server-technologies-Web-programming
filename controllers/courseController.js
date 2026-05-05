const catchAsync = require('../utils/catchAsync');
const courseService = require('../services/courseService');

exports.getAllCourses = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourses(req.query);

  res.status(200).json({
    success: true,
    count: result.courses.length,
    total: result.total,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
    data: result.courses
  });
});

exports.getCourse = catchAsync(async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);

  res.status(200).json({
    success: true,
    data: course
  });
});

exports.createCourse = catchAsync(async (req, res) => {
  const course = await courseService.createCourse(req.body, req.user._id);

  res.status(201).json({
    success: true,
    data: course
  });
});

exports.updateCourse = catchAsync(async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    data: course
  });
});

exports.deleteCourse = catchAsync(async (req, res) => {
  await courseService.deleteCourse(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Курс видалено'
  });
});