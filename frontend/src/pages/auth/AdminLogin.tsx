import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/services/auth.service";
import { showSuccess, showError } from "@/utils/toast";
import useAppNavigate from "@/hooks/useAppNavigate";
import GlowBackground from "@/components/common/Glowbackground";
import Button from "@/components/ui/Button";

type AdminLoginForm = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toAdminDashboard } = useAppNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    try {
      await loginAdmin({ email: data.email, password: data.password });
      showSuccess("Welcome, Admin!");
      toAdminDashboard();
    } catch (error: any) {
      showError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <GlowBackground gridSize="50px" glowWidth="300px" glowHeight="300px" />

      <div className="relative z-10 w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-8 shadow-[0_0_20px_hsl(var(--primary)/0.15),0_0_100px_hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-[hsl(var(--primary))]" />
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">Admin Login</h1>
        </div>

        <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mb-8">
          Restricted access — authorized personnel only
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              type="email"
              placeholder="Admin Email"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-10 pr-10 h-11 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-md text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            label={isSubmitting ? "Logging in..." : "Login as Admin"}
            disabled={isSubmitting}
            variant="primary"
            type="submit"
            className="w-full mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;