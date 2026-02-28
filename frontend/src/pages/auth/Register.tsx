import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { registerUser } from "@/services/auth.service";
import { showSuccess, showError, showWarn } from "@/utils/toast";
import useAppNavigate from "@/hooks/useAppNavigate";
import Button from "@/components/ui/Button";
import GlowBackground from "@/components/common/Glowbackground";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toLogin } = useAppNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showWarn("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      setIsRegisterClicked(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      showSuccess("Account created successfully!");
      toLogin();
    } catch (error: any) {
      if (error.response?.status === 400) {
        showWarn("Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character");
    } else if (error.   response?.status === 409) {
        showError("This email is already registered. Try signing in instead.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setIsRegisterClicked(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      
      <GlowBackground gridSize="40px" glowHeight="100px" glowWidth="50px"/>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-[hsl(var(--primary)/0.2)] blur-[150px]" />

      <div className="relative z-10 w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-8 shadow-[0_0_20px_hsl(var(--primary)/0.15),0_0_100px_hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            BookVerse Sign Up
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full pl-10 pr-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

            

          <Button
            label="Sign Up"
            disabled={isRegisterClicked}
            variant="primary"
            type="submit"
            className="w-full"
          />

          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-6">
            Already have an account?{" "}
            <Button label="Sign in" variant="ghost" onClick={toLogin} />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
