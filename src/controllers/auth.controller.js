import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { sendAuthResponse, sendLogoutResponse } from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, avatar } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, 'A user with this email already exists.');
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: role || 'student',
    avatar,
    lastLoginAt: new Date(),
  });

  return sendAuthResponse(res, user, {
    statusCode: 201,
    message: 'User registered successfully',
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  return sendAuthResponse(res, user, {
    message: 'User logged in successfully',
  });
});

export const logout = asyncHandler(async (req, res) => sendLogoutResponse(res));

export const getCurrentUser = asyncHandler(async (req, res) =>
  sendSuccess(res, {
    message: 'Current user retrieved successfully',
    data: {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status,
        avatar: req.user.avatar,
        lastLoginAt: req.user.lastLoginAt,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    },
  }),
);
