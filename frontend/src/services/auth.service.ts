import axios from "@/lib/axios";
import type { LoginPayload, AuthResponse,RegisterPayload, RegisterResponse } from "@/types/auth.types";

export const loginUser = ({ email, password }: LoginPayload) =>
  axios.post<AuthResponse>("/auth/login", { email, password, role: "user" });

export const googleLoginUser = (code: string) =>
  axios.post<AuthResponse>("/auth/google-login", { code });

export const registerUser = (data: RegisterPayload) =>
  axios.post<RegisterResponse>("/auth/register", data);

export const getGithubAuthUrl = () =>
    axios.get<{ url: string }>("/auth/github");

export const sendOtp = (data: { email: string }) =>
  axios.post("/auth/forgot-password", data);

export const verifyOtpAndReset = (data: { email: string; otp: string; newPassword: string }) =>
  axios.post("/auth/reset-password", data);