import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema, googleLoginSchema } from '../validations/auth.validation';
import logger from '../utils/logger';
import  HTTP_STATUS  from '../utils/statusCodes';
import z from 'zod';
import { setAuthCookie } from '../utils/cookie';
import { generateState } from 'arctic';
import { githubClient } from '../lib/oauth/github';
import { sendOtpSchema, resetPasswordSchema } from "../validations/auth.validation";



export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    await authService.registerUser(validatedData);
    
    logger.info(`User registered successfully: ${validatedData.email}`);
    return res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully' });
  } catch (error: any) {
    logger.error('Error in register controller:', error);
    
    if (error.name === 'ZodError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    if (error.message === 'Email already registered') {
      return res.status(HTTP_STATUS.CONFLICT).json({ message: error.message });
    }
    
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.loginUser(validatedData);
    setAuthCookie(res, result.token);
    
    logger.info(`${validatedData.role} logged in successfully: ${validatedData.email}`);
    return res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    logger.error('Error in login controller:', error.message);  // add this
    logger.error('Error type:', error.constructor.name); 
    logger.error('Error in login controller:', error.issues);
    
    if (error instanceof z.ZodError) {
        console.log('Validation errors:', error.issues);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        message: 'Validation error', 
        errors: error.issues
      });
    }
    
    if (error.message.includes('not found')) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
    }
    
    if (error.message === 'Invalid credentials') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: error.message });
    }
    
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const validatedData = googleLoginSchema.parse(req.body);
    const result = await authService.googleLoginUser(validatedData.code);
    setAuthCookie(res, result.token)
    
    logger.info(`Google login successful: ${result.user.email}`);
    return res.status(HTTP_STATUS.OK).json(result);
  } catch (error: any) {
    logger.error('Error in googleLogin controller:', error);
    
    if (error.name === 'ZodError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
      message: 'Google login failed',
      error: error.message 
    });
  }
};



export const githubAuthUrl = (req: Request, res: Response) => {
  try {
    const state = generateState();
    const url = githubClient.createAuthorizationURL(state, ["user:email"]);

    res.cookie("github_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json({ url: url.toString() });
  } catch (error: any) {
    logger.error("Error generating GitHub auth URL:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

export const githubCallback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    const storedState = req.cookies.github_oauth_state;

    if (!code || !state || !storedState || state !== storedState) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid state" });
    }

    const result = await authService.githubLoginUser(code as string);
    setAuthCookie(res, result.token);

    logger.info(`GitHub login successful: ${result.user.email}`);
    return res.redirect(`${process.env.FRONTEND_URL}/userDashboard`);
  } catch (error: any) {
    logger.error("Error in githubCallback controller:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "GitHub login failed",
      error: error.message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  });
  
  logger.info('User logged out');
  return res.status(HTTP_STATUS.OK).json({ message: 'Logout successful' });
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    return res.status(HTTP_STATUS.OK).json({
      isAuthenticated: true,
      role: user.role
    });
  } catch (error) {
    logger.error(`Error in checkAuth: ${error}`);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      isAuthenticated: false 
    });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getUserById(userId);
    
    return res.status(HTTP_STATUS.OK).json({ userData: user });
  } catch (error: any) {
    logger.error('Error in getUserDetails controller:', error);
    
    if (error.message === 'User not found') {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
    }
    
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
      message: 'Server error' 
    });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = sendOtpSchema.parse(req.body);
    await authService.sendOtp(email);
    logger.info(`OTP sent to: ${email}`);
    return res.status(HTTP_STATUS.OK).json({ message: "OTP sent successfully" });
  } catch (error: any) {
    logger.error("Error in sendOtp controller:", error);
    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Validation error", errors: error.issues });
    }
    if (error.message === "User not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
    }
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = resetPasswordSchema.parse(req.body);
    await authService.verifyOtpAndReset(email, otp, newPassword);
    logger.info(`Password reset successful: ${email}`);
    return res.status(HTTP_STATUS.OK).json({ message: "Password reset successfully" });
  } catch (error: any) {
    logger.error("Error in resetPassword controller:", error);
    if (error instanceof z.ZodError) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Validation error", errors: error.issues });
    }
    if (error.message === "OTP not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message }); 
    }
    if (error.message === "Invalid OTP") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message }); 
    }
    if (error.message === "OTP expired") {
      return res.status(HTTP_STATUS.GONE).json({ message: error.message }); 
    }    
    
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};