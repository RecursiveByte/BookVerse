import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, googleLoginUser,getGithubAuthUrl } from "@/services/auth.service";
import { showSuccess, showError, showWarn } from "@/utils/toast";
import useAppNavigate from "@/hooks/useAppNavigate";
import Button from "@/components/ui/Button";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [githubLoading, setGithubLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const {  toDashboard, toForgotPassword, toRegister } = useAppNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await googleLoginUser(codeResponse.code);
        showSuccess("Logged in successfully!");
        toDashboard();
      } catch (error: any) {
        showError(error.response?.data?.message || "Google login failed");
      }
    },
    onError: () => showError("Google Login Failed"),
    flow: "auth-code",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showWarn("Please fill in all fields");
      return;
    }

    try {
      setIsLoginClicked(true)
      await loginUser({ email: formData.email, password: formData.password });
      showSuccess("Logged in successfully!");
      toDashboard();
    } catch (error: any) {
      showError(error.response?.data?.message || "Invalid credentials");
    }finally{
      setIsLoginClicked(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setGithubLoading(true);
      const { data } = await getGithubAuthUrl();
      window.location.href = data.url;
    } catch (error: any) {
      showError(error.response?.data?.message || "GitHub login failed");
      setGithubLoading(false)
    }
    
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <div
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        className="absolute inset-0 opacity-40"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-[hsl(var(--primary)/0.2)] blur-[150px]" />

      <div className="relative z-10 w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-8 shadow-[0_0_20px_hsl(var(--primary)/0.15),0_0_100px_hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            BookVerse Login
          </h1>
        </div>

        <button
          onClick={() => googleLogin()}
          className="w-full h-11 mb-4 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="font-medium">Sign in with Google</span>
        </button>

        <button
          onClick={handleGithubLogin}
          className="w-full h-11 mb-6 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.1)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
          </svg>
          <span>{githubLoading ? "Redirecting..." : "Sign in with GitHub"}</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[hsl(var(--border))]" />
          <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase">OR</span>
          <div className="flex-1 h-px bg-[hsl(var(--border))]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <input
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

          <div className="flex justify-end -mt-1">
            <Button label="Forgot password?" variant="ghost" onClick={toForgotPassword} />
          </div>

          <Button label="Log In" disabled={isLoginClicked} variant="primary" type="submit" className="w-full" />

          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-6">
            Don't have an account?{" "}
            <Button label="Sign up" variant="ghost" onClick={toRegister} />
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;