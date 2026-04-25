import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { buildPaginationMeta, getPagination } from '../utils/pagination.js';

const canManageEnrollment = (user) => ['admin', 'instructor'].includes(user?.role);

export const createEnrollment = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.body.course);

  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  if (!course.isPublished && !canManageEnrollment(req.user)) {
    throw new ApiError(400, 'You can only enroll in published courses.');
  }

  const existingEnrollment = await Enrollment.findOne({
    user: req.user._id,
    course: req.body.course,
  });

  if (existingEnrollment) {
    throw new ApiError(409, 'You are already enrolled in this course.');
  }

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: req.body.course,
  });

  await enrollment.populate('course', 'title slug category level thumbnail isPublished');

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Enrollment created successfully',
    data: enrollment,
  });
});

export const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate('course', 'title slug category level thumbnail isPublished')
    .sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Your enrollments retrieved successfully',
    data: enrollments,
  });
});

export const getEnrollments = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const [total, enrollments] = await Promise.all([
    Enrollment.countDocuments(),
    Enrollment.find()
      .populate('user', 'fullName email role status')
      .populate('course', 'title slug category level isPublished')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  return sendSuccess(res, {
    message: 'Enrollments retrieved successfully',
    data: enrollments,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

export const updateEnrollmentProgress = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment not found.');
  }

  const isOwner = enrollment.user.toString() === req.user._id.toString();

  if (!isOwner && !canManageEnrollment(req.user)) {
    throw new ApiError(403, 'You are not allowed to update this enrollment.');
  }

  enrollment.progress = Number.parseFloat(req.body.progress);
  await enrollment.save();
  await enrollment.populate('course', 'title slug category level');

  return sendSuccess(res, {
    message: 'Enrollment progress updated successfully',
    data: enrollment,
  });
});
