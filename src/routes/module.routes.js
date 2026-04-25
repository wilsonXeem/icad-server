import { Router } from 'express';
import {
  deleteCourseModule,
  updateCourseModule,
} from '../controllers/courseModule.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import { updateModuleValidation } from '../validators/course.validator.js';
import { mongoIdParam } from '../validators/common.validator.js';

const router = Router();

router.patch(
  '/:id',
  protect,
  authorize('admin', 'instructor'),
  updateModuleValidation,
  validateRequest,
  updateCourseModule,
);
router.delete(
  '/:id',
  protect,
  authorize('admin', 'instructor'),
  mongoIdParam('id'),
  validateRequest,
  deleteCourseModule,
);

export default router;
