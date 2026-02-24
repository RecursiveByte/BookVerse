import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"BookVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your BookVerse OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #16a34a;">BookVerse Password Reset</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="letter-spacing: 8px; color: #16a34a;">${otp}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  await transporter.sendMail({
    from: `"BookVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Successful",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Password Reset Successful</h2>
        <p>Your BookVerse password has been reset successfully.</p>
        <p>If you did not do this, please contact us immediately.</p>
      </div>
    `,
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  await transporter.sendMail({
    from: `"BookVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to BookVerse!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Welcome to BookVerse, ${name}!</h2>
        <p>Your account has been created successfully.</p>
        <p>Start exploring books, reading reviews, and sharing your thoughts with the community.</p>
        <p>Happy reading!</p>
      </div>
    `,
  });
};

