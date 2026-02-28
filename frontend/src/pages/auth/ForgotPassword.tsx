import { useState } from "react";
import { showSuccess, showError, showWarn } from "@/utils/toast";
import useAppNavigate from "@/hooks/useAppNavigate";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import { sendOtp, verifyOtpAndReset } from "@/services/auth.service";
import GlowBackground from "@/components/common/Glowbackground";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toLogin, toRegister } = useAppNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showWarn("Please enter your email");
      return;
    }
    try {
      setIsLoading(true);
      await sendOtp({ email });
      showSuccess("OTP sent to your email!");
      setStep("otp");
    } catch (error: any) {
      if (error.response?.status === 404) {
        showError("No account found with this email. Please register first.");
        toRegister();
        toRegister();
      } else if (error.response?.status === 400) {
        showError("Please enter a valid email address.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      showWarn("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      await verifyOtpAndReset({ email, otp, newPassword });
      showSuccess("Password reset successfully!");
      toLogin();
    } catch (error: any) {
      if (error.response?.status === 400) {
        showError(
          "Invalid OTP or password must have min 8 characters, 1 uppercase, 1 number and 1 special character"
        );
      } else if (error.response?.status === 404) {
        showError("No OTP found. Please request a new one.");
      } else if (error.response?.status === 410) {
        showError("OTP has expired. Please request a new one.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <GlowBackground gridSize="80px" glowHeight="100px" glowWidth="50px" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-[hsl(var(--primary)/0.2)] blur-[150px]" />

      <div className="relative z-10 w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-8 shadow-[0_0_20px_hsl(var(--primary)/0.15),0_0_100px_hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            {step === "email" ? "Forgot Password" : "Verify OTP"}
          </h1>
        </div>

        {step === "email" ? (
          <EmailStep
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            onSubmit={handleSendOtp}
            onSignIn={toLogin}
          />
        ) : (
          <OtpStep
            email={email}
            otp={otp}
            setOtp={setOtp}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={handleResetPassword}
            onResend={() => setStep("email")}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
