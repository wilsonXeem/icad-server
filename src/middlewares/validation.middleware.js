import { validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse.js';

const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array({ onlyFirstError: true }).map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  return sendError(res, {
    statusCode: 400,
    message: 'Validation failed',
    errors,
  });
};

export default validateRequest;
