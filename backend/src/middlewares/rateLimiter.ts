import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import logger from "../utils/logger";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: Request, res: Response) => {
    console.log("Blocked IP:", req.ip);
    logger.info("blocked IP")
    
    res.status(429).json({
      success: false,
      message: "Too many requests. Try again later.",
    });
  },
});