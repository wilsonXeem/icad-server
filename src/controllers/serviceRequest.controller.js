import ServiceRequest from '../models/ServiceRequest.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { buildPaginationMeta, getPagination } from '../utils/pagination.js';

export const createServiceRequest = asyncHandler(async (req, res) => {
  const serviceRequest = await ServiceRequest.create(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Service request submitted successfully',
    data: serviceRequest,
  });
});

export const getServiceRequests = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const [total, serviceRequests] = await Promise.all([
    ServiceRequest.countDocuments(),
    ServiceRequest.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  return sendSuccess(res, {
    message: 'Service requests retrieved successfully',
    data: serviceRequests,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

export const getServiceRequestById = asyncHandler(async (req, res) => {
  const serviceRequest = await ServiceRequest.findById(req.params.id);

  if (!serviceRequest) {
    throw new ApiError(404, 'Service request not found.');
  }

  return sendSuccess(res, {
    message: 'Service request retrieved successfully',
    data: serviceRequest,
  });
});

export const updateServiceRequest = asyncHandler(async (req, res) => {
  const serviceRequest = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!serviceRequest) {
    throw new ApiError(404, 'Service request not found.');
  }

  return sendSuccess(res, {
    message: 'Service request updated successfully',
    data: serviceRequest,
  });
});
