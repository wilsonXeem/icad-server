import jwt from 'jsonwebtoken';

export const AUTH_COOKIE_NAME = 'icad_token';

const durationToMsMap = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

const parseDurationToMs = (value) => {
  if (!value) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  if (/^\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }

  const match = value.match(/^(\d+)([smhd])$/i);

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const [, amount, unit] = match;
  return Number.parseInt(amount, 10) * durationToMsMap[unit.toLowerCase()];
};

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: parseDurationToMs(process.env.JWT_EXPIRES_IN),
  };
};

export const setTokenCookie = (res, token) => {
  res.cookie(AUTH_COOKIE_NAME, token, getCookieOptions());
};

export const clearTokenCookie = (res) => {
  const options = getCookieOptions();

  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
  });
};

export const extractTokenFromRequest = (req) => {
  if (req.cookies?.[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  const authorization = req.headers.authorization;

  if (authorization?.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }

  return null;
};
