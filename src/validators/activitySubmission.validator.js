import { body } from 'express-validator';
import { mongoIdParam } from './common.validator.js';

export const createActivitySubmissionValidation = [
  body('course')
    .optional({ values: 'falsy' })
    .isMongoId()
    .withMessage('Course must be a valid MongoDB ObjectId'),
  body('module')
    .optional({ values: 'falsy' })
    .isMongoId()
    .withMessage('Module must be a valid MongoDB ObjectId'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 160 })
    .withMessage('Title must be between 2 and 160 characters'),
  body('content')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 10000 })
    .withMessage('Content must not exceed 10000 characters'),
  body('fileUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('File URL must not exceed 500 characters'),
];

export const activitySubmissionIdValidation = [mongoIdParam('id')];

export const updateActivityFeedbackValidation = [
  mongoIdParam('id'),
  body('feedback')
    .trim()
    .notEmpty()
    .withMessage('Feedback is required')
    .isLength({ min: 2, max: 5000 })
    .withMessage('Feedback must be between 2 and 5000 characters'),
];

export const updateActivityStatusValidation = [
  mongoIdParam('id'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['submitted', 'reviewed', 'approved', 'needs_revision'])
    .withMessage('Status must be submitted, reviewed, approved, or needs_revision'),
];
