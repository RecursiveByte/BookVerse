
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface EmailStepProps {
  email: string;
  setEmail: (val: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSignIn: () => void;
}

export interface OtpStepProps {
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
