import { Router } from 'express';
import {
  getCurrentUser,
  login,
  logout,
  register,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validation.middleware.js';
import { loginValidation, registerValidation } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, getCurrentUser);

export default router;
