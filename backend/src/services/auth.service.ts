import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger";
import { googleClient } from "../lib/oauth/google";
import { githubClient } from "../lib/oauth/github";
import { sendOtpEmail,sendWelcomeEmail,sendPasswordResetSuccessEmail } from "../lib/mailer";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

interface LoginData {
  email: string;
  password: string;
  role: "admin" | "user";
}

class AuthService {
  async registerUser(data: RegisterData) {
    const { name, email, password, role = "user" } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    await sendWelcomeEmail(email, name);

    logger.info(`User registered successfully: ${email}`);
    return user;
  }

  async loginUser(data: LoginData) {
    console.log("in server ", data);
    const { email, password, role } = data;

    const user = await prisma.user.findFirst({
      where: { email, role },
    });

    if (!user) {
      logger.warn(`Login attempt failed - no ${role} found: ${email}`);
      throw new Error(`email not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Login attempt failed - invalid password: ${email}`);
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user.id, user.role);

    logger.info(`${role} logged in successfully: ${email}`);
    return {
      message: `${role} login successful`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async googleLoginUser(code: string) {
    const { tokens } = await googleClient.getToken(code);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      logger.error("Google login failed - no payload or email");
      throw new Error("Invalid Google token");
    }

    const { email, name } = payload;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || "Google User",
          email,
          password: "",
          role: "user",
        },
      });
      await sendWelcomeEmail(email, name ?? "Reader");

      logger.info(`New user created via Google login: ${email}`);
    }

    const token = this.generateToken(user.id, user.role);
    logger.info(`Google login successful: ${email}`);

    return {
      message: "Google login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async githubLoginUser(code: string) {
    const tokens = await githubClient.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();
  
    const [githubUser, emails] = await Promise.all([
      fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
      fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
    ]);
  
    const primaryEmail = emails.find(
      (e: { email: string; primary: boolean; verified: boolean }) =>
        e.primary && e.verified
    )?.email;
  
    if (!primaryEmail) {
      logger.error("GitHub login failed - no verified primary email");
      throw new Error("No verified email found on GitHub account");
    }
  
    let user = await prisma.user.findUnique({ where: { email: primaryEmail } });
  
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: githubUser.name || githubUser.login || "GitHub User",
          email: primaryEmail,
          password: "",
          role: "user",
        },
      });
      await sendWelcomeEmail(primaryEmail, githubUser.name);

      logger.info(`New user created via GitHub login: ${primaryEmail}`);
    }
  
    const token = this.generateToken(user.id, user.role);
    logger.info(`GitHub login successful: ${primaryEmail}`);
  
    return {
      message: "GitHub login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      logger.warn(`User not found: ${userId}`);
      throw new Error("User not found");
    }

    return user;
  }

  async sendOtp(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {
      logger.warn(`OTP request for non-existent email: ${email}`);
      throw new Error("User not found");
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    await prisma.otpVerification.deleteMany({ where: { email} });
    await prisma.otpVerification.create({ data: { email, otp } });
  
    await sendOtpEmail(email, otp);
    logger.info(`OTP sent to: ${email}`);
  }
  
  async verifyOtpAndReset(email: string, otp: string, newPassword: string) {
    const record = await prisma.otpVerification.findUnique({ where: { email } });
  
    if (!record) {
      logger.warn(`OTP not found for: ${email}`);
      throw new Error("OTP not found");
    }
  
    const minutesElapsed = (Date.now() - record.createdAt.getTime()) / 1000 / 60;
  
    if (minutesElapsed > 5) {
      await prisma.otpVerification.delete({ where: { email } });
      logger.warn(`OTP expired for: ${email}`);
      throw new Error("OTP expired");
    }
  
    if (record.otp !== otp) {
      logger.warn(`Invalid OTP attempt for: ${email}`);
      throw new Error("Invalid OTP");
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { password: hashedPassword } });
    await prisma.otpVerification.delete({ where: { email } });
  
    logger.info(`Password reset successful: ${email}`);
    await sendPasswordResetSuccessEmail(email)
  }
  

  private generateToken(userId: number, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  }
}

export const authService = new AuthService();
