import { Router } from 'express';
import {
  createActivitySubmission,
  getActivitySubmissionById,
  getActivitySubmissions,
  getMyActivitySubmissions,
  updateActivitySubmissionFeedback,
  updateActivitySubmissionStatus,
} from '../controllers/activitySubmission.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import {
  activitySubmissionIdValidation,
  createActivitySubmissionValidation,
  updateActivityFeedbackValidation,
  updateActivityStatusValidation,
} from '../validators/activitySubmission.validator.js';

const router = Router();

router.post('/', protect, createActivitySubmissionValidation, validateRequest, createActivitySubmission);
router.get('/me', protect, getMyActivitySubmissions);
router.get('/', protect, authorize('admin', 'instructor'), getActivitySubmissions);
router.get('/:id', protect, activitySubmissionIdValidation, validateRequest, getActivitySubmissionById);
router.patch(
  '/:id/feedback',
  protect,
  authorize('admin', 'instructor'),
  updateActivityFeedbackValidation,
  validateRequest,
  updateActivitySubmissionFeedback,
);
router.patch(
  '/:id/status',
  protect,
  authorize('admin', 'instructor'),
  updateActivityStatusValidation,
  validateRequest,
  updateActivitySubmissionStatus,
);

export default router;
