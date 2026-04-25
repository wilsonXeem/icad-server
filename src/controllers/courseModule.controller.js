import ActivitySubmission from '../models/ActivitySubmission.js';
import Course from '../models/Course.js';
import CourseModule from '../models/CourseModule.js';
import Enrollment from '../models/Enrollment.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const canManageCourseContent = (user) => ['admin', 'instructor'].includes(user?.role);

export const createCourseModule = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  const module = await CourseModule.create({
    ...req.body,
    course: req.params.courseId,
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Course module created successfully',
    data: module,
  });
});

export const getCourseModules = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  const isManager = canManageCourseContent(req.user);

  if (!course.isPublished && !isManager) {
    throw new ApiError(404, 'Course not found.');
  }

  let isEnrolled = false;

  if (!isManager && req.user?._id) {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: course._id,
    });

    isEnrolled = Boolean(enrollment);
  }

  const filter = { course: course._id };

  if (!isManager && !isEnrolled) {
    filter.isPreview = true;
  }

  const modules = await CourseModule.find(filter).sort({ position: 1, createdAt: 1 });

  return sendSuccess(res, {
    message: 'Course modules retrieved successfully',
    data: modules,
    meta: {
      accessLevel: isManager || isEnrolled ? 'full' : 'preview_only',
    },
  });
});

export const updateCourseModule = asyncHandler(async (req, res) => {
  const module = await CourseModule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!module) {
    throw new ApiError(404, 'Course module not found.');
  }

  return sendSuccess(res, {
    message: 'Course module updated successfully',
    data: module,
  });
});

export const deleteCourseModule = asyncHandler(async (req, res) => {
  const module = await CourseModule.findById(req.params.id);

  if (!module) {
    throw new ApiError(404, 'Course module not found.');
  }

  await ActivitySubmission.updateMany({ module: module._id }, { $unset: { module: 1 } });
  await module.deleteOne();

  return sendSuccess(res, {
    message: 'Course module deleted successfully',
    data: null,
  });
});
