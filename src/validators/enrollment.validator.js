import { body } from 'express-validator';
import { mongoIdParam } from './common.validator.js';

export const createEnrollmentValidation = [
  body('course')
    .notEmpty()
    .withMessage('Course is required')
    .isMongoId()
    .withMessage('Course must be a valid MongoDB ObjectId'),
];

export const updateEnrollmentProgressValidation = [
  mongoIdParam('id'),
  body('progress')
    .notEmpty()
    .withMessage('Progress is required')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
];
