import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must not exceed 20 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: passwordSchema,
  role: z.enum(["admin", "user"]).optional()
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["admin", "user"])
});

export const googleLoginSchema = z.object({
  code: z.string().min(1, "Google auth code is required")
});


export const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character"),
});