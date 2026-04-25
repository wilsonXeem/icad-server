import { body } from 'express-validator';

export const registerValidation = [
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
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['student', 'client'])
    .withMessage('Role must be either student or client'),
  body('avatar')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .withMessage('Avatar must be a string'),
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];
