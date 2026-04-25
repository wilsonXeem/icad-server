import ActivitySubmission from '../models/ActivitySubmission.js';
import Enrollment from '../models/Enrollment.js';
import { buildUserResponse } from './auth.service.js';

export const getDashboardSummary = async (user) => {
  const recentThreshold = new Date();
  recentThreshold.setDate(recentThreshold.getDate() - 30);

  const [
    enrolledCoursesCount,
    recentActivitySubmissionsCount,
    recentEnrollments,
    recentSubmissions,
  ] = await Promise.all([
    Enrollment.countDocuments({ user: user._id }),
    ActivitySubmission.countDocuments({
      user: user._id,
      submittedAt: { $gte: recentThreshold },
    }),
    Enrollment.find({ user: user._id })
      .populate('course', 'title slug category level thumbnail')
      .sort({ createdAt: -1 })
      .limit(5),
    ActivitySubmission.find({ user: user._id })
      .populate('course', 'title slug')
      .populate('module', 'title position')
      .sort({ submittedAt: -1 })
      .limit(5),
  ]);

  return {
    user: buildUserResponse(user),
    metrics: {
      enrolledCoursesCount,
      recentActivitySubmissionsCount,
    },
    recentEnrollments,
    recentSubmissions,
    placeholders: {
      announcements: [],
      upcomingDeadlines: [],
      researchUpdates: [],
    },
  };
};
