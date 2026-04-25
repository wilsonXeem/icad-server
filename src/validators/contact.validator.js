import { body } from 'express-validator';
import { mongoIdParam } from './common.validator.js';

export const createContactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Name must be between 2 and 120 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('inquiryType')
    .trim()
    .notEmpty()
    .withMessage('Inquiry type is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Inquiry type must be between 2 and 100 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
];

export const contactIdValidation = [mongoIdParam('id')];

export const updateContactStatusValidation = [
  mongoIdParam('id'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['new', 'in_progress', 'resolved'])
    .withMessage('Status must be new, in_progress, or resolved'),
];
