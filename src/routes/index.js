import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import serviceRequestRoutes from './serviceRequest.routes.js';
import courseRoutes from './course.routes.js';
import moduleRoutes from './module.routes.js';
import enrollmentRoutes from './enrollment.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import activitySubmissionRoutes from './activitySubmission.routes.js';
import { sendSuccess } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', (req, res) =>
  sendSuccess(res, {
    message: 'ICAD API is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  }),
);

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/activity-submissions', activitySubmissionRoutes);

export default router;
