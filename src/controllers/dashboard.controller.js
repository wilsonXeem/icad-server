import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getDashboardSummary } from '../services/dashboard.service.js';

export const getMyDashboard = asyncHandler(async (req, res) => {
  const summary = await getDashboardSummary(req.user);

  return sendSuccess(res, {
    message: 'Dashboard summary retrieved successfully',
    data: summary,
  });
});
