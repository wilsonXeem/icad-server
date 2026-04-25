import { Router } from 'express';
import {
  createContactInquiry,
  getContactInquiries,
  getContactInquiryById,
  updateContactInquiryStatus,
} from '../controllers/contact.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import {
  contactIdValidation,
  createContactValidation,
  updateContactStatusValidation,
} from '../validators/contact.validator.js';

const router = Router();

router.post('/', createContactValidation, validateRequest, createContactInquiry);
router.get('/', protect, authorize('admin'), getContactInquiries);
router.get('/:id', protect, authorize('admin'), contactIdValidation, validateRequest, getContactInquiryById);
router.patch(
  '/:id/status',
  protect,
  authorize('admin'),
  updateContactStatusValidation,
  validateRequest,
  updateContactInquiryStatus,
);

export default router;
