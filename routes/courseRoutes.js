const express = require('express');

const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const validate = require('../middleware/validate');
const { createCourseSchema } = require('../validators/courseValidators');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:courseId/reviews', reviewRouter);

router.get('/', getAllCourses);
router.get('/:id', getCourse);

router.post('/', protect, validate(createCourseSchema), createCourse);

router.put('/:id', protect, validate(createCourseSchema), updateCourse);

router.delete('/:id', protect, restrictTo('admin'), deleteCourse);

module.exports = router;