export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Request successful', data = null, meta } = {},
) => {
  const payload = {
    success: true,
    message,
    data,
  };

  if (meta) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res,
  { statusCode = 500, message = 'Something went wrong', errors = [] } = {},
) =>
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
