import ActivitySubmission from '../models/ActivitySubmission.js';
import Course from '../models/Course.js';
import CourseModule from '../models/CourseModule.js';
import Enrollment from '../models/Enrollment.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { buildPaginationMeta, getPagination } from '../utils/pagination.js';

const canManageSubmissions = (user) => ['admin', 'instructor'].includes(user?.role);

const submissionPopulate = [
  { path: 'user', select: 'fullName email role' },
  { path: 'course', select: 'title slug' },
  { path: 'module', select: 'title position' },
];

const populateSubmission = (query) =>
  query
    .populate('user', 'fullName email role')
    .populate('course', 'title slug')
    .populate('module', 'title position');

export const createActivitySubmission = asyncHandler(async (req, res) => {
  const { course: courseId, module: moduleId, title, content, fileUrl } = req.body;
  const isManager = canManageSubmissions(req.user);

  let course = null;
  let module = null;

  if (courseId) {
    course = await Course.findById(courseId);

    if (!course) {
      throw new ApiError(404, 'Course not found.');
    }
  }

  if (moduleId) {
    module = await CourseModule.findById(moduleId);

    if (!module) {
      throw new ApiError(404, 'Course module not found.');
    }

    if (course && module.course.toString() !== course._id.toString()) {
      throw new ApiError(400, 'The selected module does not belong to the selected course.');
    }

    if (!course) {
      course = await Course.findById(module.course);

      if (!course) {
        throw new ApiError(404, 'Course not found.');
      }
    }
  }

  if (course && !isManager) {
    if (!course.isPublished) {
      throw new ApiError(403, 'You cannot submit activity for an unpublished course.');
    }

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: course._id,
    });

    if (!enrollment) {
      throw new ApiError(403, 'You must be enrolled in this course to submit activity.');
    }
  }

  const submission = await ActivitySubmission.create({
    user: req.user._id,
    course: course?._id || null,
    module: module?._id || null,
    title,
    content,
    fileUrl,
  });

  await submission.populate(submissionPopulate);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Activity submission created successfully',
    data: submission,
  });
});

export const getMyActivitySubmissions = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { user: req.user._id };

  const [total, submissions] = await Promise.all([
    ActivitySubmission.countDocuments(filter),
    populateSubmission(
      ActivitySubmission.find(filter).sort({ submittedAt: -1 }).skip(skip).limit(limit),
    ),
  ]);

  return sendSuccess(res, {
    message: 'Your activity submissions retrieved successfully',
    data: submissions,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

export const getActivitySubmissions = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const [total, submissions] = await Promise.all([
    ActivitySubmission.countDocuments(),
    populateSubmission(
      ActivitySubmission.find().sort({ submittedAt: -1 }).skip(skip).limit(limit),
    ),
  ]);

  return sendSuccess(res, {
    message: 'Activity submissions retrieved successfully',
    data: submissions,
    meta: {
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

export const getActivitySubmissionById = asyncHandler(async (req, res) => {
  const submission = await ActivitySubmission.findById(req.params.id);

  if (!submission) {
    throw new ApiError(404, 'Activity submission not found.');
  }

  const isOwner = submission.user.toString() === req.user._id.toString();

  if (!isOwner && !canManageSubmissions(req.user)) {
    throw new ApiError(403, 'You are not allowed to view this submission.');
  }

  await submission.populate(submissionPopulate);

  return sendSuccess(res, {
    message: 'Activity submission retrieved successfully',
    data: submission,
  });
});

export const updateActivitySubmissionFeedback = asyncHandler(async (req, res) => {
  const submission = await ActivitySubmission.findByIdAndUpdate(
    req.params.id,
    { feedback: req.body.feedback },
    { new: true, runValidators: true },
  );

  if (!submission) {
    throw new ApiError(404, 'Activity submission not found.');
  }

  await submission.populate(submissionPopulate);

  return sendSuccess(res, {
    message: 'Activity submission feedback updated successfully',
    data: submission,
  });
});

export const updateActivitySubmissionStatus = asyncHandler(async (req, res) => {
  const submission = await ActivitySubmission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  );

  if (!submission) {
    throw new ApiError(404, 'Activity submission not found.');
  }

  await submission.populate(submissionPopulate);

  return sendSuccess(res, {
    message: 'Activity submission status updated successfully',
    data: submission,
  });
});
