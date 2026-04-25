import ApiError from '../utils/apiError.js';
import { sendError } from '../utils/apiResponse.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
    errors = Object.keys(err.keyPattern || {}).map((field) => ({
      field,
      message: `${field} already exists`,
    }));
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier';
    errors = [
      {
        field: err.path,
        message: `Invalid value provided for ${err.path}`,
      },
    ];
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
    errors = [];
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
    errors = [];
  }

  return sendError(res, {
    statusCode,
    message,
    errors,
  });
};
