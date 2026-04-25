import { param } from 'express-validator';

export const mongoIdParam = (field = 'id') =>
  param(field).isMongoId().withMessage(`${field} must be a valid MongoDB ObjectId`);
