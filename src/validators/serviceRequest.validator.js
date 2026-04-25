import { body } from 'express-validator';
import { mongoIdParam } from './common.validator.js';

export const createServiceRequestValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('organization')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 160 })
    .withMessage('Organization must not exceed 160 characters'),
  body('projectTitle')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ min: 3, max: 160 })
    .withMessage('Project title must be between 3 and 160 characters'),
  body('serviceCategory')
    .trim()
    .notEmpty()
    .withMessage('Service category is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Service category must be between 2 and 120 characters'),
  body('projectDescription')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ min: 20, max: 10000 })
    .withMessage('Project description must be between 20 and 10000 characters'),
  body('timeline')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Timeline must not exceed 120 characters'),
  body('budgetRange')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Budget range must not exceed 120 characters'),
];

export const serviceRequestIdValidation = [mongoIdParam('id')];

export const updateServiceRequestValidation = [
  mongoIdParam('id'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('organization')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 160 })
    .withMessage('Organization must not exceed 160 characters'),
  body('projectTitle')
    .optional()
    .trim()
    .isLength({ min: 3, max: 160 })
    .withMessage('Project title must be between 3 and 160 characters'),
  body('serviceCategory')
    .optional()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage('Service category must be between 2 and 120 characters'),
  body('projectDescription')
    .optional()
    .trim()
    .isLength({ min: 20, max: 10000 })
    .withMessage('Project description must be between 20 and 10000 characters'),
  body('timeline')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Timeline must not exceed 120 characters'),
  body('budgetRange')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Budget range must not exceed 120 characters'),
  body('status')
    .optional()
    .isIn(['new', 'reviewing', 'quoted', 'in_progress', 'closed'])
    .withMessage('Status must be new, reviewing, quoted, in_progress, or closed'),
];
