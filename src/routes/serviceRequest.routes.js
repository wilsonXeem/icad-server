import { Router } from 'express';
import {
  createServiceRequest,
  getServiceRequestById,
  getServiceRequests,
  updateServiceRequest,
} from '../controllers/serviceRequest.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import {
  createServiceRequestValidation,
  serviceRequestIdValidation,
  updateServiceRequestValidation,
} from '../validators/serviceRequest.validator.js';

const router = Router();

router.post('/', createServiceRequestValidation, validateRequest, createServiceRequest);
router.get('/', protect, authorize('admin'), getServiceRequests);
router.get(
  '/:id',
  protect,
  authorize('admin'),
  serviceRequestIdValidation,
  validateRequest,
  getServiceRequestById,
);
router.patch(
  '/:id',
  protect,
  authorize('admin'),
  updateServiceRequestValidation,
  validateRequest,
  updateServiceRequest,
);

export default router;
