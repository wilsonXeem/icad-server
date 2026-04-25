import { Router } from 'express';
import { getMyDashboard } from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/me', protect, getMyDashboard);

export default router;
