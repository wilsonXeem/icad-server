import ContactInquiry from '../models/ContactInquiry.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { buildPaginationMeta, getPagination } from '../utils/pagination.js';

export const createContactInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.create(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Contact inquiry submitted successfully',
    data: inquiry,
  });
});

export const getContactInquiries = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const [total, inquiries] = await Promise.all([
    ContactInquiry.countDocuments(),
    ContactInquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  return sendSuccess(res, {
    message: 'Contact inquiries retrieved successfully',
    data: inquiries,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

export const getContactInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findById(req.params.id);

  if (!inquiry) {
    throw new ApiError(404, 'Contact inquiry not found.');
  }

  return sendSuccess(res, {
    message: 'Contact inquiry retrieved successfully',
    data: inquiry,
  });
});

export const updateContactInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  );

  if (!inquiry) {
    throw new ApiError(404, 'Contact inquiry not found.');
  }

  return sendSuccess(res, {
    message: 'Contact inquiry status updated successfully',
    data: inquiry,
  });
});
