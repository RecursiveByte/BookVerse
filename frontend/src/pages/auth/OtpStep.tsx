import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

interface OtpStepProps {
  email: string;
  otp: string;
  setOtp: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
}

const OtpStep = ({
  email,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit,
  onResend,
}: OtpStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <p className="text-sm text-[hsl(var(--muted-foreground))] text-center -mt-4 mb-2">
      Enter the OTP sent to{" "}
      <span className="text-[hsl(var(--foreground))]">{email}</span> and your
      new password.
    </p>

    <div className="relative">
      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
      <input
        required
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
      />
    </div>

    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
      <input
        required
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>

    <Button
      label={isLoading ?"Reseting Please wait..." :"Reset Password"}
      disabled={isLoading}
      variant="primary"
      type="submit"
    />

    <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
      Didn't receive OTP?{" "}
      <Button label="Resend" variant="ghost" onClick={onResend} />
    </p>
  </form>
);

export default OtpStep;