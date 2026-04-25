import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { extractTokenFromRequest } from '../utils/token.js';

const loadAuthenticatedUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, 'Authentication failed. User not found.');
  }

  if (user.status !== 'active') {
    throw new ApiError(403, 'Your account is not active.');
  }

  return user;
};

export const protect = asyncHandler(async (req, res, next) => {
  const token = extractTokenFromRequest(req);

  if (!token) {
    throw new ApiError(401, 'Authentication required.');
  }

  req.user = await loadAuthenticatedUser(token);
  next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = extractTokenFromRequest(req);

  if (!token) {
    return next();
  }

  try {
    req.user = await loadAuthenticatedUser(token);
  } catch (error) {
    req.user = null;
  }

  return next();
});

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You are not authorized to access this resource.'));
    }

    return next();
  };
