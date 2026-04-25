import ActivitySubmission from '../models/ActivitySubmission.js';
import Course from '../models/Course.js';
import CourseModule from '../models/CourseModule.js';
import Enrollment from '../models/Enrollment.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { buildPaginationMeta, getPagination } from '../utils/pagination.js';

const canManageCourses = (user) => ['admin', 'instructor'].includes(user?.role);

export const getCourses = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = {};

  if (!canManageCourses(req.user)) {
    filter.isPublished = true;
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.level) {
    filter.level = req.query.level;
  }

  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [total, courses] = await Promise.all([
    Course.countDocuments(filter),
    Course.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  return sendSuccess(res, {
    message: 'Courses retrieved successfully',
    data: courses,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
      visibility: canManageCourses(req.user) ? 'all' : 'published_only',
    },
  });
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug.toLowerCase() });

  if (!course || (!course.isPublished && !canManageCourses(req.user))) {
    throw new ApiError(404, 'Course not found.');
  }

  return sendSuccess(res, {
    message: 'Course retrieved successfully',
    data: course,
  });
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Course created successfully',
    data: course,
  });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  return sendSuccess(res, {
    message: 'Course updated successfully',
    data: course,
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  await Promise.all([
    CourseModule.deleteMany({ course: course._id }),
    Enrollment.deleteMany({ course: course._id }),
    ActivitySubmission.deleteMany({ course: course._id }),
  ]);
  await course.deleteOne();

  return sendSuccess(res, {
    message: 'Course deleted successfully',
    data: null,
  });
});
