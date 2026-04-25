import { body } from 'express-validator';
import { mongoIdParam } from './common.validator.js';

export const createCourseValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 160 })
    .withMessage('Title must be between 3 and 160 characters'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20, max: 10000 })
    .withMessage('Description must be between 20 and 10000 characters'),
  body('category')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Category must not exceed 120 characters'),
  body('level')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Level must not exceed 120 characters'),
  body('thumbnail')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Thumbnail must not exceed 500 characters'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

export const updateCourseValidation = [
  mongoIdParam('id'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 160 })
    .withMessage('Title must be between 3 and 160 characters'),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20, max: 10000 })
    .withMessage('Description must be between 20 and 10000 characters'),
  body('category')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Category must not exceed 120 characters'),
  body('level')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 120 })
    .withMessage('Level must not exceed 120 characters'),
  body('thumbnail')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Thumbnail must not exceed 500 characters'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

export const courseIdValidation = [mongoIdParam('courseId')];
export const singleCourseIdValidation = [mongoIdParam('id')];

export const createModuleValidation = [
  mongoIdParam('courseId'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Module title is required')
    .isLength({ min: 2, max: 160 })
    .withMessage('Module title must be between 2 and 160 characters'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),
  body('videoUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Video URL must not exceed 500 characters'),
  body('position')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Position must be a positive integer or zero'),
  body('isPreview')
    .optional()
    .isBoolean()
    .withMessage('isPreview must be a boolean'),
];

export const updateModuleValidation = [
  mongoIdParam('id'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 160 })
    .withMessage('Module title must be between 2 and 160 characters'),
  body('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),
  body('videoUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Video URL must not exceed 500 characters'),
  body('position')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Position must be a positive integer or zero'),
  body('isPreview')
    .optional()
    .isBoolean()
    .withMessage('isPreview must be a boolean'),
];
