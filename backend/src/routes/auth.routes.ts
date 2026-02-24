import { Router } from 'express';
import {
  register,
  login,
  googleLogin,
  logout,
  checkAuth,
  getUserDetails,
  githubAuthUrl,
  githubCallback,
  sendOtp,
  resetPassword
} from '../controllers/auth.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/logout', logout);
router.get('/userDetails', authenticateUser,getUserDetails);
router.get('/check-auth', authenticateUser, checkAuth);
router.get("/github", githubAuthUrl);
router.get("/github/callback", githubCallback);
router.post("/forgot-password", sendOtp);
router.post("/reset-password", resetPassword);

export default router;