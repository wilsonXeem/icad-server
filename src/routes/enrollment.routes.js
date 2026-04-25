import { Router } from 'express';
import {
  createEnrollment,
  getEnrollments,
  getMyEnrollments,
  updateEnrollmentProgress,
} from '../controllers/enrollment.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import {
  createEnrollmentValidation,
  updateEnrollmentProgressValidation,
} from '../validators/enrollment.validator.js';

const router = Router();

router.post('/', protect, createEnrollmentValidation, validateRequest, createEnrollment);
router.get('/me', protect, getMyEnrollments);
router.get('/', protect, authorize('admin'), getEnrollments);
router.patch(
  '/:id/progress',
  protect,
  updateEnrollmentProgressValidation,
  validateRequest,
  updateEnrollmentProgress,
);

export default router;
