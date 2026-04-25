import { Router } from 'express';
import {
  createCourse,
  deleteCourse,
  getCourseBySlug,
  getCourses,
  updateCourse,
} from '../controllers/course.controller.js';
import {
  createCourseModule,
  getCourseModules,
} from '../controllers/courseModule.controller.js';
import { authorize, optionalAuth, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import {
  createCourseValidation,
  createModuleValidation,
  courseIdValidation,
  singleCourseIdValidation,
  updateCourseValidation,
} from '../validators/course.validator.js';

const router = Router();

router.get('/', optionalAuth, getCourses);
router.post(
  '/',
  protect,
  authorize('admin', 'instructor'),
  createCourseValidation,
  validateRequest,
  createCourse,
);

router.get('/:courseId/modules', optionalAuth, courseIdValidation, validateRequest, getCourseModules);
router.post(
  '/:courseId/modules',
  protect,
  authorize('admin', 'instructor'),
  createModuleValidation,
  validateRequest,
  createCourseModule,
);

router.get('/:slug', optionalAuth, getCourseBySlug);
router.patch(
  '/:id',
  protect,
  authorize('admin', 'instructor'),
  updateCourseValidation,
  validateRequest,
  updateCourse,
);
router.delete(
  '/:id',
  protect,
  authorize('admin', 'instructor'),
  singleCourseIdValidation,
  validateRequest,
  deleteCourse,
);

export default router;
