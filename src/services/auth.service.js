import { sendSuccess } from '../utils/apiResponse.js';
import { clearTokenCookie, generateAccessToken, setTokenCookie } from '../utils/token.js';

export const buildUserResponse = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  status: user.status,
  avatar: user.avatar,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const sendAuthResponse = (
  res,
  user,
  { statusCode = 200, message = 'Authentication successful' } = {},
) => {
  const token = generateAccessToken(user._id);
  setTokenCookie(res, token);

  return sendSuccess(res, {
    statusCode,
    message,
    data: {
      user: buildUserResponse(user),
    },
  });
};

export const sendLogoutResponse = (res) => {
  clearTokenCookie(res);

  return sendSuccess(res, {
    message: 'User logged out successfully',
    data: null,
  });
};
